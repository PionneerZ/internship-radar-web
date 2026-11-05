'use strict';
// Pure presentation; the owning page keeps its existing data-refresh loop.
window.ReadingQueue = (() => {
 const el=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!=null)n.textContent=value;return n;};
 const time=v=>v&&Number.isFinite(Date.parse(v))?new Date(v).toLocaleString('zh-CN',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}):'暂无记录';
 const topics={finance:'金融线索',product:'产品线索',roundup:'混合汇总',other:'方向待判'};
 const stages={queued:'排队等读取',verification:'实际触发验证',parse:'正文解析失败',images:'文章图片待补',complete:'已读全',location_skipped:'明确异地已跳过'};
 const pending=a=>a.stage!=='complete'&&a.stage!=='location_skipped';
 const previewRank=a=>a.excerpt_kind==='body'?2:a.card_evidence?1:0;
 function jobLink(evidence){
  const finance=evidence.topic==='finance';
  const path=window.RadarPublication?(finance?'./':'./product.html'):(finance?'/finance':'/');
  const url=new URL(path,location.href);url.searchParams.set('job',evidence.job_id);return url.href;
 }
 const lanes={messages:['群消息',300],body:['微信正文',60],offline:['本机缓存与群文件',300],article_images:['文章图片',300],group_images:['群图片',1800],public_sources:['已登记招聘网站',1800]};
 const states=new WeakMap();
 function setFilter(s,key,value){s[key]=value;s.page=0;render(s);save(s);}
 function save(s){const u=new URL(location.href);for(const k of ['period','stage','topic','account','query']){const v=s[k];if(v&&v!==({period:'week',stage:'pending'})[k])u.searchParams.set('rq_'+k,v);else u.searchParams.delete('rq_'+k);}history.replaceState(null,'',u);}
 function mount(root,queue,images=[]){
  if(!root)return;
  if(!queue){root.replaceChildren(el('p','rq-alert','未读清单暂不可用，不能据此认定全部读完。'));return;}
  let s=states.get(root);
  if(!s){const p=new URLSearchParams(location.search);s={period:['week','all','retained'].includes(p.get('rq_period'))?p.get('rq_period'):'week',stage:p.get('rq_stage')||'pending',topic:p.get('rq_topic')||'',account:p.get('rq_account')||'',query:p.get('rq_query')||'',page:0,opened:new Set()};states.set(root,s);}
  s.queue=queue;s.images=images;
  if(!s.ui){
   root.classList.add('reading-queue');
   const head=el('div','rq-heading'),title=el('div');title.append(el('h2','','还有哪些没读到'),el('p','rq-muted','已读片段可以先看；标题和简介不算读全。'));s.updated=el('span','rq-muted');head.append(title,s.updated);
   s.capacity=el('section','rq-capacity');s.capacity.setAttribute('aria-label','自动补读与积压');
   s.schedule=el('details','rq-schedule');s.scheduleTitle=el('summary');s.batchHelp=el('div','rq-batch-help');s.schedule.append(s.scheduleTitle,s.batchHelp);s.digest=el('div','rq-digest');
   s.controls=el('div','rq-controls');
   function select(key,label,options){const box=el('label','',label),n=el('select');n.id=root.id+'-'+key;n.setAttribute('aria-label',label);for(const [v,t] of options){const o=el('option','',t);o.value=v;n.append(o);}n.onchange=()=>setFilter(s,key,n.value);box.append(n);s.controls.append(box);s[key+'Select']=n;}
   select('period','时间范围',[['week','近一周'],['all','全部积压'],['retained','移出本周仍未读']]);
   select('topic','线索方向',[['','全部方向'],...Object.entries(topics)]);
    select('stage','处理状态',[['pending','全部未读'],['card_evidence','卡片有岗位线索'],['formal_review','疑似正式招聘待复核'],['blocked','实际读取受阻'],['partial','已有正文片段'],...Object.entries(stages),['group_images','群图片缺口'],['sources','来源同步缺口']]);
   select('account','公众号',[['','全部公众号']]);
   const box=el('label','rq-search','搜索标题或已读片段');s.input=el('input');s.input.type='search';s.input.placeholder='产品、投研、实习汇总…';s.input.value=s.query;s.input.oninput=()=>setFilter(s,'query',s.input.value);box.append(s.input);s.controls.append(box);
   const reset=el('button','','重置');reset.onclick=()=>{Object.assign(s,{period:'week',stage:'pending',topic:'',account:'',query:'',page:0});s.input.value='';render(s);save(s);};s.controls.append(reset);
   s.result=el('p','rq-result');s.result.setAttribute('role','status');s.result.setAttribute('aria-live','polite');s.list=el('div','rq-list');
   const pages=el('div','rq-pages');s.prev=el('button','','上一页');s.next=el('button','','下一页');s.pageLabel=el('span');s.prev.onclick=()=>{s.page--;render(s);};s.next.onclick=()=>{s.page++;render(s);};pages.append(s.prev,s.pageLabel,s.next);s.pages=pages;
   root.replaceChildren(head,s.capacity,s.schedule,s.digest,s.controls,s.result,s.list,pages);s.ui=true;
  }
  const accounts=[...new Set([...(queue.items||[]),...(queue.retained_items||[])].map(a=>a.account).filter(Boolean))].sort();
  s.accountSelect.replaceChildren();for(const a of ['',...accounts]){const o=el('option','',a||'全部公众号');o.value=a;s.accountSelect.append(o);}
  render(s);
 }
 function retry(value){return value?(Date.parse(value)>Date.now()?'可重试时间 '+time(value):'已到可重试时间，等待队列安排'):'尚无确定重试时间';}
 function renderBatchHelp(s){
  const q=s.queue,all=[...(q.items||[]),...(q.retained_items||[])].filter(pending),images=all.filter(a=>a.stage==='images'),bodies=all.filter(a=>a.stage!=='images');
  s.scheduleTitle.textContent=`${all.length} 篇未读由后台接续处理 · 展开查看共同原因和省力办法`;
  s.batchHelp.replaceChildren();
  const groups=new Map();for(const image of s.images){const name=image.source||'已授权招聘来源';groups.set(name,(groups.get(name)||0)+1);}
  const entries=[
   ['正文待补',bodies.length+' 篇',q.cooldown_until?`共同等待验证冷却至 ${time(q.cooldown_until)}，到期仅正常试读 1 篇；成功后接续读取。`:'按来源和金融 / 产品方向轮换补读，保留历史和未知标题名额。','无需逐篇打开或反复刷新；缓存与图片通道仍独立工作。','pending'],
   ['文章图片待补',images.length+' 篇','已读正文片段仍可查看；后台继续寻找和识别完整图片。空 OCR 不会被当作完成。','只有缺失的新原图或可靠复核能补齐的部分会继续明确保留。','images'],
   ['群图片缺原图',s.images.length+' 张 / '+groups.size+' 个来源',[...groups].map(([name,count])=>name+' '+count+' 张').join('；')||'当前没有群图片缺口。','后台每 30 分钟重查原图。若你以后同步到原图，后续会自动识别；现在无需逐条处理。','group_images'],
   ['来源历史待同步',(q.source_gaps||[]).length+' 个来源','本机未同步到的历史无法靠重复刷新补出；后台每 5 分钟复查已有授权来源。','具体来源和缺口集中列在下方。用途未知的来源仅记录数量，不擅自读取。','sources']
  ];
  for(const [title,count,reason,next,stage] of entries){const card=el('section','rq-batch-card');card.append(el('strong','',title+' · '+count),el('p','',reason),el('p','rq-muted',next));const button=el('button','','查看这类内容');button.onclick=()=>{Object.assign(s,{period:'all',stage,topic:'',account:'',query:'',page:0});s.input.value='';render(s);save(s);s.result.scrollIntoView({block:'center'});};card.append(button);s.batchHelp.append(card);}
 }
 function render(s){
  const q=s.queue,historyItems=q.retained_items||[],current=q.items||[];
  const candidates=s.period==='retained'?historyItems:s.period==='all'?[...current,...historyItems]:current;
   s.updated.textContent=`处理截至 ${time(q.updated_at)} · 京沪及地点待确认 · 明确异地已跳过 ${q.all_location_skipped??0} 篇`;
  renderCapacity(s.capacity,q.capacity,q,s);
   renderBatchHelp(s);
  s.digest.replaceChildren();
  const evidence=candidates.filter(a=>pending(a)&&a.card_evidence);
  const linked=evidence.filter(a=>a.card_evidence.job_id).length;
  const summary=[['pending',candidates.filter(pending).length,'文章未读全','排队任务也保留'],['card_evidence',evidence.length,'卡片可先看',linked?`${linked} 篇可看已收录 JD`:'显示职责和明确条件'],['group_images',s.images.length,'群图未读全','缺原图或识别不完整'],['sources',(q.source_gaps||[]).length,'来源同步缺口','本机历史未同步']];
  for(const [key,count,label,hint] of summary){const b=el('button','rq-digest-button');b.setAttribute('aria-pressed',String(s.stage===key));b.append(el('strong','',count),el('span','',label),el('small','',hint));b.onclick=()=>{setFilter(s,'stage',key);s.digest.querySelector('[aria-pressed=true]').focus({preventScroll:true});};s.digest.append(b);}
  for(const k of ['period','stage','topic','account'])s[k+'Select'].value=s[k];
  const special=['group_images','sources'].includes(s.stage);
  for(const k of ['period','topic','account'])s[k+'Select'].disabled=special;
  s.input.disabled=special;
  s.list.replaceChildren();s.pages.hidden=special;
  if(special){renderGaps(s);return;}
  const needle=s.query.trim().toLocaleLowerCase();
  const cardView=s.stage==='card_evidence';
   const stageMatches=a=>s.stage==='pending'?pending(a):s.stage==='formal_review'?pending(a)&&a.formal_review:s.stage==='blocked'?['verification','parse','images'].includes(a.stage):s.stage==='partial'?pending(a)&&a.excerpt_kind==='body':a.stage===s.stage;
  const all=(cardView?evidence:candidates.filter(stageMatches))
   .filter(a=>(!s.topic||(cardView?a.card_evidence.topic===s.topic:a.topics.includes(s.topic)))&&(!s.account||a.account===s.account)&&(!needle||(a.title+' '+a.account+' '+a.excerpt).toLocaleLowerCase().includes(needle)))
   .sort((a,b)=>(cardView?Number(Boolean(b.card_evidence.job_id))-Number(Boolean(a.card_evidence.job_id)):previewRank(b)-previewRank(a))||String(b.seen_at||'').localeCompare(a.seen_at||''));
  const size=12,total=Math.max(1,Math.ceil(all.length/size));s.page=Math.min(Math.max(0,s.page),total-1);
  const period=s.period==='week'?'近一周':s.period==='retained'?'历史队列':'全部保留任务';
   s.result.textContent=`${all.length} 篇符合筛选 · ${period}${cardView?' · 查看已收到的职责或条件，原文仍待补':s.stage==='formal_review'?' · 卡片偏正式招聘，后台留名额复核，仍计未读':s.stage==='location_skipped'?' · 按地点跳过，未计为读全':' · 优先显示已有内容'}`;
  if(!all.length)s.list.append(el('p','rq-empty','没有符合筛选的内容。重置筛选可查看其他未读任务。'));
  for(const a of all.slice(s.page*size,(s.page+1)*size))s.list.append(article(a,s));
  s.prev.disabled=s.page===0;s.next.disabled=s.page===total-1;s.pageLabel.textContent=`${s.page+1} / ${total} 页`;
 }
 function article(a,s){
  const row=el('article','rq-item');row.dataset.article=a.id;
  const action=a.action||{label:a.stage_label,next_action:a.reason,retry_at:a.next_retry_at};
  const top=el('div','rq-item-top');top.append(el('span','rq-badge',action.label),el('span','rq-muted',a.account+' · '+time(a.seen_at)));row.append(top);
  const h=el('h3'),link=el('a','',a.title||'标题尚未取得');link.href=a.url;link.target='_blank';link.rel='noopener noreferrer';h.append(link);row.append(h);
  row.append(el('p','rq-next-action',action.next_action));
   const note=action.retry_at?retry(action.retry_at):action.blocker==='image_review'?'等待新增原图或有效复核，不重复空跑 OCR':a.stage==='complete'?'岗位状态以最新原文为准':a.stage==='location_skipped'?'已保留来源记录':'后台保留任务，等待可处理条件';
  row.append(el('p','rq-retry',note));
  for(const gap of action.image_gaps||[])row.append(el('span','rq-gap-tag',`第 ${gap.number} 张 · ${gap.reason}`));
  const hint=a.card_evidence,evidence=el('div','rq-evidence');
  const label=hint?(hint.kind==='duties'?'卡片职责片段':'标题注明的条件')+' · 原文待补':({body:'已读正文片段',card:'仅有原卡片介绍',title:'仅有标题，正文尚未取得'})[a.excerpt_kind];
  evidence.append(el('span','rq-evidence-label',label));
  if(hint||a.excerpt_kind!=='title')evidence.append(el('p','rq-excerpt',hint?.quote||a.excerpt));row.append(evidence);
  const foot=el('div','rq-item-foot'),actions=el('div','rq-evidence-actions');
  foot.append(el('span','rq-topic',hint?[hint.label,hint.cities.join(' / ')||'地点待确认'].join(' · '):a.topics.map(t=>topics[t]).join(' / ')));
  if(hint?.job_id){const jd=el('a','rq-existing-jd','看已收录 JD');jd.href=jobLink(hint);actions.append(jd);}
  const original=el('a','','打开原文 ↗');original.href=a.url;original.target='_blank';original.rel='noopener noreferrer';actions.append(original);foot.append(actions);row.append(foot);
  const detail=el('details','rq-task-detail');detail.open=s.opened.has(a.id);detail.ontoggle=()=>{if(detail.open)s.opened.add(a.id);else s.opened.delete(a.id);};detail.append(el('summary','','处理记录'),el('p','',`实际访问 ${a.attempt_count} 次 · 最近尝试 ${time(a.last_attempt_at)}`),el('p','',`文章首发 ${time(a.published_at)} · 来源记录 ${time(a.seen_at)}，两者不等同。`));
  if(action.optional_action)detail.append(el('p','',action.optional_action));detail.append(el('p','rq-muted','方向按标题和介绍提示，内容完整后再核对岗位。打开链接不会把任务自动标记为已读。'));row.append(detail);return row;
 }
 function renderGaps(s){
  const q=s.queue,group=s.stage==='group_images',rows=group?s.images:q.source_gaps||[];
  s.result.textContent=group?`${rows.length} 张群图未读全 · 按本机可定位的招聘群和消息时间列出`:`${rows.length} 个已授权来源有同步缺口 · 另有 ${q.unconfirmed_sources||0} 个来源用途待核查，未自动授权`;
  for(const a of rows){const row=el('article','rq-item rq-gap-item');row.append(el('span','rq-badge',group?'群图未读全':'本机历史未齐'),el('h3','',a.source+(group?' · '+time(a.time):'')),el('p','rq-next-action',a.reason),el('p','rq-muted',a.next_step||a.next_action));if(a.optional_action)row.append(el('p','rq-muted',a.optional_action));s.list.append(row);}
  if(!rows.length)s.list.append(el('p','rq-empty',group?'当前没有已记录的群图缺口。':'当前没有已授权来源的同步缺口；用途待确认的来源不会擅自采集。'));
 }
 function renderCapacity(root,c,q,s){
  root.replaceChildren();if(!c||c.pending==null){root.append(el('p','rq-muted','自动处理记录暂不可用，无法判断是否追上更新。'));return;}
  const head=el('div','rq-capacity-head');head.append(el('strong','rq-capacity-state',({passed:'已追上 · 72 小时实测通过',behind:'积压仍在增加',observing:'补读中 · 仍在观察'})[c.assessment]||'仍在观察'),el('span','rq-muted',`今天新发现 ${c.today_discovered??0} / 首次读全 ${c.today_completed??0}`));root.append(head);
  const f=q.public_frontier;
  if(f){
   const box=el('div','rq-schedule rq-independent');
   box.append(el('strong','',`网站独立补读 · 今日新读 ${f.today_new_details_read} 个详情`),
    el('p','',`金融 ${f.today_new_finance_details} / 产品 ${f.today_new_product_details} · 本轮新读 ${f.new_details_read} · 待读 ${f.pending} · 失败 ${f.failed} · ${time(f.finished_at)}`));
   if(f.index_state==='members_only')box.append(el('p','rq-index-progress',`招聘列表公开首屏${f.index_oldest_date?` · 最早列表日期 ${f.index_oldest_date}`:''} · 后续分页需会员，后台继续核对公开详情`));
   box.append(el('p','rq-muted',`只展开已登记网站的真实岗位链接；跳过明确异地 ${f.skipped_city}、其他岗位 ${f.skipped_other_role} 个链接。${f.bounded_remaining?`另有 ${f.bounded_remaining} 个链接到达采集边界，尚未展开。`:''}网站详情数不是新增岗位数，也不抵扣微信未读。`));
   root.append(box);
  }
  const failed=Object.entries(q.dispatch?.errors||{});if(failed.length)root.append(el('p','rq-schedule','后台启动失败：'+failed.map(([k,v])=>(lanes[k]?.[0]||k)+'（'+v+'）').join('、')+'。独立恢复将继续重试，其他通道不受阻。'));
   const nums=el('div','rq-capacity-grid');for(const [n,t] of [[q.remaining,'本周未读'],[(q.retained_items||[]).filter(pending).length,'历史待补'],[q.all_pending,'全部待补'],[c.complete,'累计已读全']]){const b=el('div');b.append(el('strong','',n??'—'),el('span','',t));nums.append(b);}root.append(nums);
  const detail=el('details','rq-capacity-detail');detail.open=s.opened.has('capacity');detail.ontoggle=()=>{if(detail.open)s.opened.add('capacity');else s.opened.delete('capacity');};detail.append(el('summary','','查看自动任务、失败与实际处理进度'));
  const ls=el('div','rq-lanes');
  for(const r of c.lanes||[]){if(!lanes[r.lane])continue;const [label,interval]=lanes[r.lane],last=r.finished_at||r.started_at,stale=!last||Date.now()-Date.parse(last)>(Math.max(interval*3,900))*1000;
   const state=r.state==='failed'?'失败，待自动重试':r.state==='interrupted'?'中断，待自动恢复':r.state==='running'?'正在处理':stale?'记录过旧，请检查后台':'最近执行完成';
   const n=el('div','rq-lane');n.append(el('strong','',label+' · '+state),el('span','',`最近开始 ${time(r.started_at)} / 完成 ${time(r.finished_at)}`));if(r.error)n.append(el('span','','错误类型：'+r.error));ls.append(n);
  }detail.append(ls);
   const offline=q.offline;
    if(offline)detail.append(el('p','',`群文件读全 ${offline.documents_read} 份（含转发 ${offline.documents_forwarded_read??0} 份），部分读取 ${offline.documents_partial} 份，待处理 ${offline.documents_pending} 份。浏览器缓存上轮核对 ${offline.checked_articles} 篇，命中 ${offline.browser_matches} 篇。`));
   detail.append(el('p','',`观察期新增 ${c.arrivals_observed??0} / 首次读全 ${c.completed_observed??0}；按原口径积压 ${c.baseline_pending??0} → ${c.pending}。异地跳过不计入读全。已观察 ${c.elapsed_hours??0} 小时，${c.observed_hour_buckets??0} 个小时有实际记录。`));
  detail.append(el('p','',`初始导入 ${c.bootstrap_total??0} 篇、历史找回 ${c.recovered_total??0} 篇均单列，不算新读全。最早未读任务：${time(c.oldest_pending_at)}。`));
  for(const d of c.daily||[])detail.append(el('p','',`${d.date}：新发现 ${d.discovered} / 首次读全 ${d.completed}`));
  detail.append(el('p','rq-muted','72 个日历小时内至少 60 个小时有真实样本，连续三日读全不落后新增且总积压下降，才认定追上；未满足时不估算清空日期。'));root.append(detail);
 }
 return {mount};
})();
