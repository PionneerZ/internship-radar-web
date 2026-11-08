'use strict';
// Pure presentation; the owning page keeps its existing data-refresh loop.
window.ReadingQueue = (() => {
 const el=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!=null)n.textContent=value;return n;};
 const time=v=>v&&Number.isFinite(Date.parse(v))?new Date(v).toLocaleString('zh-CN',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}):'暂无记录';
 function sourceLabel(source,catalog){
  const name=source.name||'',kind=source.kind||'',url=source.url||'';
  const local=location.port==='18936'&&['127.0.0.1','localhost','[::1]'].includes(location.hostname);
  const group=catalog?.groups?.find(g=>g.name===name||(source.id&&g.id===source.id));
  if(group||kind.startsWith('群')||source.read_status==='group_text'){
   const groupName=group?.name||name;
   return local&&groupName?'微信群 · '+groupName:'招聘微信群';
  }
  const isArticle=/^https?:\/\/mp\.weixin\.qq\.com\//i.test(url);
  const account=kind.startsWith('公众号')||catalog?.accounts?.some(a=>a.name===name);
  let label='来源待核实';
  if(account)label='公众号';
  else if(kind.startsWith('机构官方招聘'))label='官方招聘';
  else if(kind==='学校就业网')label=kind;
  else if(isArticle)label='微信文章';
  else if(url||name)label='第三方转载';
  const showName=local||account||(url&&!isArticle)||label==='官方招聘'||label==='学校就业网';
  return showName&&name&&name!==label?label+' · '+name:label;
 }
 function sourceRow(sources,catalog){
  const row=el('div','rq-job-sources');
  const labels=[...new Set(sources.map(source=>sourceLabel(source,catalog)))];
  row.append(el('span','rq-source-label','来源'));
  for(const label of labels.slice(0,2))row.append(el('span','rq-source-chip',label));
  if(!labels.length)row.append(el('span','rq-source-chip','来源待核实'));
  if(labels.length>2)row.append(el('span','rq-source-more',`另 ${labels.length-2} 个来源`));
  return row;
 }
 const topics={finance:'金融线索',product:'产品线索',roundup:'混合汇总',other:'方向待判'};
 const stages={queued:'排队等读取',verification:'实际触发验证',parse:'正文解析失败',images:'文章图片待补',complete:'已读全',location_skipped:'明确异地已跳过'};
 const unread=a=>a.stage!=='complete'&&a.stage!=='location_skipped';
 const filtered=a=>unread(a)&&a.read_priority==='skip';
 const priority=a=>unread(a)&&a.read_priority==='focus';
 const sample=a=>unread(a)&&a.read_priority==='sample';
 const pending=a=>priority(a)||sample(a);
 const direction=a=>unread(a)&&a.read_priority==='clue';
 function weekQueue(q){
  if(!q?.items)return null;
  const first=q.items.filter(priority).length, checks=q.items.filter(sample).length;
  return {priority:first,sample:checks,total:first+checks};
 }
 const previewRank=a=>a.excerpt_kind==='body'?2:a.card_evidence?1:0;
 function previewKey(a){
  if(!unread(a)||filtered(a)||a.excerpt_kind!=='card'||a.title.length>=280||a.excerpt.length>=850)return '';
  const title=a.title.replace(/\s+/g,' ').trim(),excerpt=a.excerpt.replace(/\s+/g,' ').trim();
  return title&&excerpt.length>=20?JSON.stringify([title,excerpt]):'';
 }
 function groupPreviews(articles){
  const groups=[],previews=new Map();
  for(const a of articles){
   const key=previewKey(a);
   if(previews.has(key)){previews.get(key).others.push(a);continue;}
   const group={first:a,key,others:[]};
   groups.push(group);
   if(key)previews.set(key,group);
  }
  return groups;
 }
 const cluePools={core:'核心投研',quant:'交易量化',primary:'一级投行',adjacent:'战略咨询及相邻',unassigned:'细分待确认'};
 const clueStates=new WeakMap();
 function mountClues(jobs,queue,topic,known=[],catalog){
  if(!jobs||!queue)return;
  let s=clueStates.get(jobs);
  if(s?.queue===queue&&s?.known===known)return;
  if(!s){
   const panel=el('section','rq-clues');panel.id='role-clues';panel.setAttribute('aria-labelledby','role-clues-title');
   const title=el('h2','','岗位线索');title.id='role-clues-title';
   const status=el('p','rq-muted'),heading=el('div','rq-clues-head');
   const toggle=el('button','rq-clue-toggle');toggle.type='button';toggle.setAttribute('aria-controls','role-clues-controls');
   heading.append(title,toggle);
   const controls=el('div','rq-clue-controls');controls.id='role-clues-controls';
   const period=el('select'),periodLabel=el('label','','时间');
   period.setAttribute('aria-label',periodLabel.textContent);
   for(const [value,label] of [['week','近七天'],['all','含历史']]){
    const option=el('option','',label);option.value=value;period.append(option);
   }
   periodLabel.append(period);
   const pool=el('select'),poolLabel=el('label','','方向');pool.setAttribute('aria-label',poolLabel.textContent);poolLabel.append(pool);
   const search=el('input'),searchLabel=el('label','','机构或岗位');search.type='search';search.placeholder='搜索岗位线索';searchLabel.append(search);
   controls.append(periodLabel,poolLabel,searchLabel);
   const result=el('span','rq-muted');result.setAttribute('role','status');
   const list=el('div','rq-clue-list');
   const more=el('button','rq-clue-toggle','显示更多');more.type='button';
   panel.append(heading,status,controls,list,result,more);
   (jobs.querySelector('#inbox')||jobs.querySelector('.page-heading'))?.after(panel);
   if(!panel.isConnected)jobs.prepend(panel);
   s={panel,status,controls,toggle,list,period,pool,search,result,more,expanded:false,limit:12};
   clueStates.set(jobs,s);
   toggle.onclick=()=>{
    s.expanded=!s.expanded;renderClues(s);
    if(s.expanded)period.focus({preventScroll:true});
   };
   for(const [field,event] of [[period,'change'],[pool,'change'],[search,'input']])
    field.addEventListener(event,()=>{s.limit=12;renderClues(s);});
   more.onclick=()=>{
    const prior=s.list.children.length;
    s.limit+=12;renderClues(s);s.list.children[prior]?.querySelector('a')?.focus({preventScroll:true});
   };
  }
  Object.assign(s,{queue,known,topic,catalog});
  const localJobs=new Set(known.map(j=>j.id));
  const visible=a=>unread(a)&&!filtered(a)&&a.role_clue?.topic===topic&&![
   a.card_evidence,...(a.read_priority==='clue'?a.official_matches||[]:[]),
  ].some(match=>match?.topic===topic&&localJobs.has(match.job_id));
  s.week=(queue.items||[]).filter(visible);
  s.history=(queue.retained_items||[]).filter(visible);
  const selected=s.pool.value;
  s.pool.replaceChildren(el('option','','全部方向'));s.pool.options[0].value='';
  const pools=[...new Set([...s.week,...s.history].map(a=>a.role_clue.pool))];
  for(const key of pools.sort((a,b)=>Object.keys(cluePools).indexOf(a)-Object.keys(cluePools).indexOf(b))){
   const option=el('option','',cluePools[key]||key);option.value=key;s.pool.append(option);
  }
  s.pool.value=pools.includes(selected)?selected:'';
  renderClues(s);
 }
 function renderClues(s){
  s.panel.hidden=!s.week.length&&!s.history.length;
  s.toggle.setAttribute('aria-expanded',String(s.expanded));
  s.toggle.textContent=s.expanded?'收起线索':`查看全部 · ${s.week.length+s.history.length} 条`;
  s.controls.hidden=!s.expanded;
  s.status.textContent=`近七天 ${s.week.length} 条 · 按标题或卡片归类，投递与条件待核`;
  if(!s.expanded&&!s.week.length)s.status.textContent='近七天暂无新线索，可展开查看历史。';
  const needle=s.expanded?s.search.value.trim().toLocaleLowerCase():'';
  const pool=s.expanded?s.pool.value:'';
  const source=s.expanded&&s.period.value==='all'?[...s.week,...s.history]:s.week;
  const rows=source.filter(a=>(!pool||a.role_clue.pool===pool)&&(!needle||
   [a.role_clue.heading,a.role_clue.label,a.title].join(' ').toLocaleLowerCase().includes(needle)))
   .sort((a,b)=>Number(a.role_clue.pool==='unassigned')-Number(b.role_clue.pool==='unassigned')||
    String(b.seen_at||'').localeCompare(a.seen_at||''));
  const groups=groupPreviews(rows),limit=s.expanded?s.limit:3;
  s.list.replaceChildren();
  for(const {first:a,others} of groups.slice(0,limit)){
   const clue=a.role_clue,card=el('article','rq-clue');card.dataset.cluePool=clue.pool;
   const label=el('div','rq-clue-label');
   label.append(el('span','',cluePools[clue.pool]||clue.pool),el('span','rq-muted',clue.label===clue.pool?'':clue.label));
   const title=el('h3');
   if(a.url)title.append(originalLink(a,clue.heading||a.title));else title.textContent=clue.heading||a.title;
   const evidence=[clue.cities.join(' / ')||'地点待核',clue.basis==='card'?'卡片线索':'标题线索',time(a.seen_at)];
   if(others.length)evidence.push(`${others.length+1} 条相同预览`);
    card.append(label,title,sourceRow([{name:a.account,url:a.url}],s.catalog),el('p','rq-muted',evidence.join(' · ')));
   s.list.append(card);
  }
  s.result.textContent=s.expanded?(groups.length?`显示 ${Math.min(groups.length,limit)} / ${groups.length} 条线索`:'没有符合筛选的线索。'):'';
  s.more.hidden=!s.expanded||groups.length<=limit;
 }
 function jobLink(evidence){
  const finance=evidence.topic==='finance';
  const path=window.RadarPublication?(finance?'./':'./product.html'):(finance?'/finance':'/');
  const url=new URL(path,location.href);url.searchParams.set('job',evidence.job_id);return url.href;
 }
 const lanes={messages:['群消息',300],body:['微信正文',60],offline:['本机缓存与群文件',300],article_images:['文章图片',300],group_images:['群图片',1800],public_sources:['已登记招聘网站',1800],weread:['微信读书实测',60]};
 const chinaDate=value=>new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai'}).format(value);
 function decisionReady(j){
  if(j.decision)return j.decision.ready===true;
  return j.bucket!=='明显不符'&&!j.excluded_reason&&!j.bank_gate&&j.category!=='lead'&&
    !['已过期','明确关闭'].includes(j.opening_status)&&Boolean(j.original&&(j.application_url||j.email||j.emails?.length));
 }
 function decisionNew(j){
  const at=Date.parse(j.decision?.first_ready_at||'');
  return decisionReady(j)&&Number.isFinite(at)&&chinaDate(at)===chinaDate(Date.now());
 }
 function decisionOpen(j){
  return j.decision?.opening==='open'&&decisionReady(j);
 }
 const missingFields={company:'机构',role:'具体岗位',duties:'工作职责',requirements:'任职条件',application:'投递方式',location:'地点',direction:'方向'};
 function decisionMissing(j){
  return (j.decision?.missing||[]).filter(key=>!['direction','location'].includes(key)).map(key=>missingFields[key]).filter(Boolean);
 }
 function decisionToday(j){
  if(!decisionReady(j))return false;
  const discovered=Date.parse(j.first_discovered_at||j.first_seen_at||'');
  const deadline=Date.parse((j.deadline||'')+'T23:59:59+08:00')-Date.now();
  const changed=Date.parse(j.changes?.at(-1)?.at||'');
  return (Number.isFinite(discovered)&&chinaDate(discovered)===chinaDate(Date.now()))||
    (deadline>=0&&deadline<=7*86400000)||(Number.isFinite(changed)&&chinaDate(changed)===chinaDate(Date.now()));
 }
 function decisions(root,queue,jobs,images,onAction){
  if(!root)return;
  const backlog=weekQueue(queue);
  const missing=(images||[]).filter(x=>!x.verified_copy).length;
  const gaps=missing+(queue?.source_gaps?.length||0);
  const wanted=jobs.filter(j=>!j.excluded_reason&&!j.bank_gate&&j.decision?.opening!=='closed');
  const needs={};
  for(const j of wanted)for(const label of decisionMissing(j))needs[label]=(needs[label]||0)+1;
  const top=Object.entries(needs).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([label,count])=>`${label} ${count}`).join(' · ');
  const entries=[
   ['new_ready','今日新增可判断',jobs.some(j=>j.decision)?jobs.filter(decisionNew).length:'—','首次补齐岗位和投递证据'],
   ['open','已确认开放',jobs.some(j=>j.decision)?jobs.filter(decisionOpen).length:'—','官方页面确认仍开放的岗位'],
   ['ready','可直接判断',jobs.filter(decisionReady).length,'可看 JD 和投递方式，仍需核对条件'],
   ['pending','近七天补读队列',backlog?.total??'—',backlog?`优先补读 ${backlog.priority} · 限量抽查 ${backlog.sample}`:'补读清单暂不可用'],
   ['gaps','还缺什么',queue?.local_login?1:queue?gaps:'—',queue?.local_login?'一次登录恢复微信读书':top||'查看原图和同步缺口'],
  ];
  const active=document.activeElement?.dataset.decision;
  root.replaceChildren();
  for(const [key,label,count,hint] of entries){
   const b=el('button','rq-decision');b.type='button';b.dataset.decision=key;
   b.append(el('span','rq-decision-label',label),el('strong','',count),el('small','',hint));
   b.onclick=()=>onAction(key,key==='gaps'?(missing?'group_images':'sources'):'pending');root.append(b);
   if(key===active)b.focus({preventScroll:true});
  }
 }
 const states=new WeakMap();
 function show(root,stage){
  const s=states.get(root);if(!s)return;
  Object.assign(s,{period:['priority','pending'].includes(stage)?'week':'all',stage,topic:'',account:'',query:'',page:0});s.input.value='';render(s);save(s);
  s.stageSelect.focus({preventScroll:true});root.scrollIntoView({block:'start'});
 }
 function setFilter(s,key,value){s[key]=value;s.page=0;render(s);save(s);}
 function save(s){const u=new URL(location.href);for(const k of ['period','stage','topic','account','query']){const v=s[k];if(v&&v!==({period:'week',stage:'priority'})[k])u.searchParams.set('rq_'+k,v);else u.searchParams.delete('rq_'+k);}history.replaceState(null,'',u);}
 function mount(root,queue,images=[]){
  if(!root)return;
  if(!queue){root.replaceChildren(el('p','rq-alert','未读清单暂不可用，不能据此认定全部读完。'));return;}
  let s=states.get(root);
  if(!s){const p=new URLSearchParams(location.search);s={period:['week','all','retained'].includes(p.get('rq_period'))?p.get('rq_period'):'week',stage:p.get('rq_stage')||'priority',topic:p.get('rq_topic')||'',account:p.get('rq_account')||'',query:p.get('rq_query')||'',page:0,opened:new Set()};states.set(root,s);}
  s.queue=queue;s.images=images;
  if(!s.ui){
   root.classList.add('reading-queue');
   const head=el('div','rq-heading'),title=el('div');s.heading=el('h2');title.append(s.heading,el('p','rq-muted','先补有用的正文和图片，汇总和方向不明的材料限量抽查。'));s.updated=el('span','rq-muted');head.append(title,s.updated);
   s.capacity=el('section','rq-capacity');s.capacity.setAttribute('aria-label','原文覆盖与读全进度');
   const ledger=el('details','rq-ledger');s.screening=el('div','rq-digest rq-screening');ledger.append(el('summary','','查看分流记录与原文覆盖'),s.screening,s.capacity);
   s.schedule=el('details','rq-schedule');s.scheduleTitle=el('summary');s.batchHelp=el('div','rq-batch-help');s.schedule.append(s.scheduleTitle,s.batchHelp);s.digest=el('div','rq-digest');
   const overview=el('div','rq-overview');overview.append(s.schedule,ledger);
   s.controls=el('div','rq-controls');
   function select(key,label,options){const box=el('label','',label),n=el('select');n.id=root.id+'-'+key;n.setAttribute('aria-label',label);for(const [v,t] of options){const o=el('option','',t);o.value=v;n.append(o);}n.onchange=()=>setFilter(s,key,n.value);box.append(n);s.controls.append(box);s[key+'Select']=n;}
   select('period','时间范围',[['week','近七天'],['all','全部保留记录'],['retained','七天以前']]);
   select('topic','线索方向',[['','全部方向'],...Object.entries(topics)]);
   select('stage','处理状态',[['priority','优先补读'],['sample','限量抽查'],['direction','已归类线索'],['filtered','已筛除'],['pending','优先补读及抽查'],['body','正文待补及抽查'],['official','官方 JD 已核实'],['card_evidence','卡片有职责或条件'],['formal_review','正式招聘线索'],['blocked','实际读取受阻'],['partial','已有正文片段'],...Object.entries(stages),['group_images','群图片缺口'],['sources','来源同步缺口']]);
   select('account','公众号',[['','全部公众号']]);
   const box=el('label','rq-search','搜索标题或已读片段');s.input=el('input');s.input.type='search';s.input.placeholder='产品、投研、实习汇总…';s.input.value=s.query;s.input.oninput=()=>setFilter(s,'query',s.input.value);box.append(s.input);s.controls.append(box);
   const reset=el('button','','重置');reset.onclick=()=>{Object.assign(s,{period:'week',stage:'priority',topic:'',account:'',query:'',page:0});s.input.value='';render(s);save(s);};s.controls.append(reset);
   s.result=el('p','rq-result');s.result.setAttribute('role','status');s.result.setAttribute('aria-live','polite');s.list=el('div','rq-list');
   const pages=el('div','rq-pages');s.prev=el('button','','上一页');s.next=el('button','','下一页');s.pageLabel=el('span');s.prev.onclick=()=>{s.page--;render(s);};s.next.onclick=()=>{s.page++;render(s);};pages.append(s.prev,s.pageLabel,s.next);s.pages=pages;
   root.replaceChildren(head,s.digest,overview,s.controls,s.result,s.list,pages);s.ui=true;
  }
  const accounts=[...new Set([...(queue.items||[]),...(queue.retained_items||[])].map(a=>a.account).filter(Boolean))].sort();
  s.accountSelect.replaceChildren();for(const a of ['',...accounts]){const o=el('option','',a||'全部公众号');o.value=a;s.accountSelect.append(o);}
  render(s);
 }
 function retry(value){return value?(Date.parse(value)>Date.now()?'可重试时间 '+time(value):'已到可重试时间，等待队列安排'):'尚无确定重试时间';}
 function originalLink(a,label){
  const link=el('a','',label);link.href=a.url;link.target='_blank';link.rel='noopener noreferrer';return link;
 }
 function samePreview(group,s){
  const detail=el('details','rq-same-preview'),key='preview:'+group.key;
  detail.open=s.opened.has(key);
  detail.ontoggle=()=>{if(detail.open)s.opened.add(key);else s.opened.delete(key);};
  detail.append(el('summary','',`同标题和简介 · 还有 ${group.others.length} 篇`));
  const list=el('ul');
  for(const a of group.others){
   const row=el('li'),action=a.action||{};
   const top=el('div','rq-item-top');
   top.append(el('span','rq-badge',action.label||a.stage_label),el('span','rq-muted',a.account+' · '+time(a.seen_at)));
   const next=a.read_priority==='clue'?'已按线索展示':retry(action.retry_at||a.next_retry_at);
   const clock=el('p','rq-muted',`实际访问 ${a.attempt_count} 次 · ${next}`);
   const links=el('div','rq-evidence-actions');
   for(const match of a.official_matches||[]){
    const jd=el('a','rq-existing-jd','官方 JD 已核实 · 转载未读全');jd.href=jobLink(match);links.append(jd);
   }
   if(a.card_evidence?.job_id&&!a.official_matches?.some(m=>m.job_id===a.card_evidence.job_id)){
    const jd=el('a','rq-existing-jd','看已收录 JD');jd.href=jobLink(a.card_evidence);links.append(jd);
   }
   links.append(originalLink(a,'打开这篇原文 ↗'));
   row.append(top,clock,links);list.append(row);
  }
  detail.append(list);return detail;
 }
 function renderBatchHelp(s){
  const q=s.queue,all=[...(q.items||[]),...(q.retained_items||[])],focus=all.filter(priority),images=focus.filter(a=>a.stage==='images').length;
  s.scheduleTitle.textContent=`补读原因与其他缺口 · ${s.images.length} 张群图`;
  s.batchHelp.replaceChildren();
  const groups=new Map();for(const image of s.images){const name=image.source||'已授权招聘来源';groups.set(name,(groups.get(name)||0)+1);}
  const entries=[
   ['正文待补（含历史）',`${focus.length-images} 篇优先 · ${all.filter(sample).length} 篇抽查`,q.cooldown_until?`共同等待验证冷却至 ${time(q.cooldown_until)}，到期先正常试读 1 篇，成功后接续。`:'金融、产品和实习汇总优先。微信正文通道每小时最多抽查 1 篇方向不明的文章。','缓存与图片通道独立工作。','body'],
   ['文章图片待补（含历史）',images+' 篇','已读正文片段仍可查看；后台继续寻找和识别完整图片。空 OCR 不会被当作完成。','只有缺失的新原图或可靠复核能补齐的部分会继续明确保留。','images'],
   ['群图未读全',s.images.length+' 张 / '+groups.size+' 个来源',[...groups].map(([name,count])=>name+' '+count+' 张').join('；')||'当前没有群图片缺口。','后台每 30 分钟重查原图，也会从已保存的招聘文章查找清晰同版。','group_images'],
   ['来源历史待同步',(q.source_gaps||[]).length+' 个来源','本机未同步到的历史无法靠重复刷新补出；后台每 5 分钟复查已有授权来源。','具体来源和缺口集中列在下方。用途未知的来源仅记录数量，不擅自读取。','sources']
  ];
  for(const [title,count,reason,next,stage] of entries){const card=el('section','rq-batch-card');card.append(el('strong','',title+' · '+count),el('p','',reason),el('p','rq-muted',next));const button=el('button','','查看这类内容');button.onclick=()=>{Object.assign(s,{period:'all',stage,topic:'',account:'',query:'',page:0});s.input.value='';render(s);save(s);s.result.scrollIntoView({block:'center'});};card.append(button);s.batchHelp.append(card);}
 }
 function render(s){
  const q=s.queue,historyItems=q.retained_items||[],current=q.items||[];
  const candidates=s.period==='retained'?historyItems:s.period==='all'?[...current,...historyItems]:current;
  s.updated.textContent=`处理截至 ${time(q.updated_at)} · 京沪、明确远程及地点待确认`;
  renderCapacity(s.capacity,q.capacity,q,s);
  renderBatchHelp(s);
  s.digest.replaceChildren();s.screening.replaceChildren();
  const evidence=candidates.filter(a=>unread(a)&&!filtered(a)&&a.card_evidence);
  const focus=candidates.filter(priority),checks=candidates.filter(sample).length;
  const images=focus.filter(a=>a.stage==='images').length,quick=candidates.filter(direction);
  const period=s.period==='week'?'近七天':s.period==='retained'?'七天以前':'全部保留记录';
  s.heading.textContent=`${period}补读队列 · ${focus.length+checks} 篇`;
  const summary=[
   ['priority',focus.length,'优先补读',`正文 ${focus.length-images} · 图片 ${images}`],
   ['sample',checks,'限量抽查','汇总或方向待判'],
   ['direction',quick.length,'已归类线索',`金融 ${quick.filter(a=>a.role_clue?.topic==='finance').length} · 产品 ${quick.filter(a=>a.role_clue?.topic==='product').length}`],
   ['filtered',candidates.filter(filtered).length,'已筛除','可查看原因和原卡片'],
  ];
  for(const [key,count,label,hint] of summary){const group=key==='priority'||key==='sample'?s.digest:s.screening;const b=el('button','rq-digest-button');b.type='button';b.dataset.stage=key;b.setAttribute('aria-pressed',String(s.stage===key));b.append(el('strong','',count),el('span','',label),el('small','',hint));b.onclick=()=>{setFilter(s,'stage',key);group.querySelector('[aria-pressed=true]').focus({preventScroll:true});};group.append(b);}
  for(const k of ['period','stage','topic','account'])s[k+'Select'].value=s[k];
  const special=['group_images','sources'].includes(s.stage);
  for(const k of ['period','topic','account'])s[k+'Select'].disabled=special;
  s.input.disabled=special;
  s.list.replaceChildren();s.pages.hidden=special;
  if(special){renderGaps(s);return;}
  const needle=s.query.trim().toLocaleLowerCase();
  const cardView=s.stage==='card_evidence';
  const stageMatches=a=>{
   switch(s.stage){
    case 'priority':return priority(a);
    case 'pending':return pending(a);
    case 'body':return pending(a)&&a.stage!=='images';
    case 'direction':return direction(a);
    case 'sample':return sample(a);
    case 'filtered':case 'deferred':return filtered(a);
    case 'official':return unread(a)&&a.official_matches?.length;
    case 'formal_review':return unread(a)&&(a.formal_review||a.filter_reason==='employment_only');
    case 'blocked':return pending(a)&&['verification','parse','images'].includes(a.stage);
    case 'partial':return pending(a)&&a.excerpt_kind==='body';
    default:return !filtered(a)&&a.stage===s.stage;
   }
  };
  const all=(cardView?evidence:candidates.filter(stageMatches))
   .filter(a=>(!s.topic||(cardView?a.card_evidence.topic===s.topic:a.topics.includes(s.topic)))&&(!s.account||a.account===s.account)&&(!needle||(a.title+' '+a.account+' '+a.excerpt).toLocaleLowerCase().includes(needle)))
   .sort((a,b)=>(cardView?Number(Boolean(b.card_evidence.job_id))-Number(Boolean(a.card_evidence.job_id)):previewRank(b)-previewRank(a))||Number(a.read_priority==='sample')-Number(b.read_priority==='sample')||String(b.seen_at||'').localeCompare(a.seen_at||''));
  const groups=groupPreviews(all),folded=all.length-groups.length;
  const size=12,total=Math.max(1,Math.ceil(groups.length/size));s.page=Math.min(Math.max(0,s.page),total-1);
  const notes={priority:'待补正文或文章图片',pending:'优先补读与限量抽查',body:'优先补读和限量抽查中的正文',direction:'按标题或简介先看方向，岗位和投递条件仍需核实',sample:'微信正文每小时最多抽查 1 篇',filtered:'已退出自动取文，保留原卡片和原因',deferred:'已退出自动取文，保留原卡片和原因',card_evidence:'查看已收到的职责或条件，原文仍待补',formal_review:'按标题或简介识别，实际读全单列',location_skipped:'按地点跳过，未计为读全'};
  s.result.textContent=`${all.length} 篇符合筛选 · ${period} · ${notes[s.stage]||'优先显示已有内容'}${folded?` · 已折叠 ${folded} 篇相同预览`:''}`;
  if(!all.length)s.list.append(el('p','rq-empty','没有符合筛选的内容。重置筛选可查看其他未读任务。'));
  for(const group of groups.slice(s.page*size,(s.page+1)*size)){
   const row=article(group.first,s);
   if(group.others.length)row.append(samePreview(group,s));
   s.list.append(row);
  }
  s.prev.disabled=s.page===0;s.next.disabled=s.page===total-1;s.pageLabel.textContent=`${s.page+1} / ${total} 页`;
 }
 function article(a,s){
  const row=el('article','rq-item');row.dataset.article=a.id;
  const action=a.action||{label:a.stage_label,next_action:a.reason,retry_at:a.next_retry_at};
  const top=el('div','rq-item-top');top.append(el('span','rq-badge',action.label),el('span','rq-muted',a.account+' · '+time(a.seen_at)));row.append(top);
  const h=el('h3');h.append(originalLink(a,a.title||'标题尚未取得'));row.append(h);
  if(a.official_matches?.length)row.append(el('p','rq-official','官方原帖已核实 · 微信转载仍未读全'));
  row.append(el('p','rq-next-action',action.next_action));
  const note=action.retry_at?retry(action.retry_at):action.blocker==='image_review'?'等待新增原图或有效复核，不重复空跑 OCR':a.stage==='complete'?'岗位状态以最新原文为准':filtered(a)||a.stage==='location_skipped'?'已保留来源记录':a.read_priority==='sample'?'保留少量抽查名额':'后台保留任务，等待可处理条件';
  row.append(el('p','rq-retry',note));
  for(const gap of action.image_gaps||[])row.append(el('span','rq-gap-tag',`第 ${gap.number} 张 · ${gap.reason}`));
  const hint=a.card_evidence,evidence=el('div','rq-evidence');
   const label=hint?({duties:'卡片职责片段',requirement:'标题注明的条件',operations:'卡片职责 · 运营支持线索'})[hint.kind]+' · 原文待补':({body:'已读正文片段',card:'仅有原卡片介绍',title:'仅有标题，正文尚未取得'})[a.excerpt_kind];
  evidence.append(el('span','rq-evidence-label',label));
  if(hint||a.excerpt_kind!=='title')evidence.append(el('p','rq-excerpt',hint?.quote||a.excerpt));row.append(evidence);
  const foot=el('div','rq-item-foot'),actions=el('div','rq-evidence-actions');
  const role=a.role_clue||hint;
  foot.append(el('span','rq-topic',role?[role.label,role.cities.join(' / ')||'地点待确认'].join(' · '):a.topics.map(t=>topics[t]).join(' / ')));
  for(const match of a.official_matches||[]){const jd=el('a','rq-existing-jd','查看官方 JD');jd.href=jobLink(match);actions.append(jd);}
  if(hint?.job_id&&!a.official_matches?.some(m=>m.job_id===hint.job_id)){const jd=el('a','rq-existing-jd','看已收录 JD');jd.href=jobLink(hint);actions.append(jd);}
  actions.append(originalLink(a,'打开原文 ↗'));foot.append(actions);row.append(foot);
  const detail=el('details','rq-task-detail');detail.open=s.opened.has(a.id);detail.ontoggle=()=>{if(detail.open)s.opened.add(a.id);else s.opened.delete(a.id);};detail.append(el('summary','','处理记录'),el('p','',`实际访问 ${a.attempt_count} 次 · 最近尝试 ${time(a.last_attempt_at)}`),el('p','',`文章首发 ${time(a.published_at)} · 来源记录 ${time(a.seen_at)}，两者不等同。`));
  if(action.optional_action)detail.append(el('p','',action.optional_action));detail.append(el('p','rq-muted','方向按标题和介绍提示，内容完整后再核对岗位。打开链接不会把任务自动标记为已读。'));row.append(detail);return row;
 }
 function renderGaps(s){
  const q=s.queue,group=s.stage==='group_images',rows=group?s.images:q.source_gaps||[];
  const checked=group?rows.filter(a=>a.verified_copy):[];
  s.result.textContent=group?`${rows.length} 张群图未读全${checked.length?` · ${checked.length} 张已有同版结论`:''}`:`${rows.length} 个已授权来源有同步缺口 · 另有 ${q.unconfirmed_sources||0} 个来源用途待核查，未自动授权`;
  for(const a of [...checked,...rows.filter(a=>!a.verified_copy)]){
   const row=el('article','rq-item rq-gap-item'),copy=a.verified_copy;
   row.append(el('span','rq-badge',copy?'同版海报已核对 · 原图待补':group?'群图未读全':'本机历史未齐'),
    el('h3','',a.source+(group?' · '+time(a.time):'')),el('p','rq-next-action',copy?.summary||a.reason),el('p','rq-muted',a.next_step||a.next_action));
   if(copy){const foot=el('div','rq-item-foot');foot.append(originalLink(copy,'查看公众号原文'));row.append(foot);}
   else if(a.optional_action)row.append(el('p','rq-muted',a.optional_action));
   s.list.append(row);
  }
  if(!rows.length)s.list.append(el('p','rq-empty',group?'当前没有已记录的群图缺口。':'当前没有已授权来源的同步缺口；用途待确认的来源不会擅自采集。'));
 }
 function renderCapacity(root,c,q,s){
  root.replaceChildren(el('p','rq-muted','原文覆盖按正文和必要图片核对，已归类和已筛除也计入未读全。明确异地另计 '+(q.all_location_skipped??0)+' 篇。'));
  if(!c||c.pending==null){root.append(el('p','rq-muted','自动处理记录暂不可用，无法判断是否追上更新。'));return;}
  const w72=c.independent_window;
  const status=w72?(w72.assessment==='passed'&&q.independent?.state!=='pilot'?'passed':w72.assessment==='behind'?'behind':'observing'):c.assessment;
  const head=el('div','rq-capacity-head');head.append(el('strong','rq-capacity-state',({passed:'已追上 · 72 小时实测通过',behind:'实测产能尚未追上',observing:'补读中 · 仍在观察'})[status]||'仍在观察'),el('span','rq-muted',`今天新发现 ${c.today_discovered??0} / 首次读全 ${c.today_completed??0}`));root.append(head);
   if(c.last_24h){const {discovered,completed}=c.last_24h;root.append(el('p','rq-muted',`近 24 小时（按当前采集范围）新增 ${discovered} 篇 · 首次读全 ${completed} 篇`));}
  const w=q.independent,f=q.public_frontier;
  const nums=el('div','rq-capacity-grid');for(const [n,t] of [[q.remaining,'近七天未读全'],[(q.retained_items||[]).filter(unread).length,'历史未读全'],[q.all_pending,'全部未读全'],[c.complete,'累计已读全']]){const b=el('div');b.append(el('strong','',n??'—'),el('span','',t));nums.append(b);}root.append(nums);
  const detail=el('details','rq-capacity-detail');detail.open=s.opened.has('capacity');detail.ontoggle=()=>{if(detail.open)s.opened.add('capacity');else s.opened.delete('capacity');};
  const progress=['查看补读进度'];
  if(w?.state)progress.push(`微信读书读全 ${w.full??0} 篇`);
  if(f)progress.push(`招聘网站今日 ${f.today_new_details_read} 个详情`);
  detail.append(el('summary','',progress.join(' · ')));
  if(w?.state){
   const box=el('div','rq-schedule rq-independent');
   box.append(el('strong','',`微信读书 · ${w.state==='enabled'?'自动运行':'真实样本验证'}`),
    el('p','',`样本已判定 ${w.sample_evaluated??0} / ${w.sample_total??0} · 新取得正文 ${w.new_body??0} · 首次读全 ${w.full??0}`),
    el('p','rq-muted',w.history_state==='unavailable'?'历史列表读取失败，旧文继续保留在未读队列。':w.history_state==='verified'?'历史列表已有实际可读记录。':'历史补读能力待核验。'));
   const missing=w.coverage_shortfalls||{};
   if(Object.values(missing).some(Boolean))box.append(el('p','rq-muted',`48 篇验收仍缺：${[['finance','金融'],['product','产品'],['mixed','混合/未知'],['history','历史']].filter(([k])=>missing[k]).map(([k,label])=>label+' '+missing[k]+' 篇').join('、')}。`));
   if(w.worker_action==='no_executable_task')box.append(el('p','rq-muted','当前没有可执行的微信读书取文任务，其他通道继续更新。'));
   if(w72)box.append(el('p','rq-muted',`新通道观察 ${w72.hours} 小时 · ${w72.hour_buckets} 个真实样本小时 · 新增 ${w72.arrivals} / 首次读全 ${w72.completed} · 清积压工程目标 ${w72.engineering_target} 篇/天`));
   detail.append(box);
  }
  if(f){
   const box=el('div','rq-schedule rq-independent');
   box.append(el('strong','',`网站独立补读 · 今日新读 ${f.today_new_details_read} 个详情`),
    el('p','',`金融候选 ${f.today_new_finance_details} / 产品候选 ${f.today_new_product_details} · 本轮新读 ${f.new_details_read} · 待读 ${f.pending} · 失败 ${f.failed} · ${time(f.finished_at)}`));
   const coverage=el('p','rq-muted');
   if(f.index_state==='members_only')coverage.append(el('span','rq-index-progress',`招聘列表${f.index_oldest_date?`公开首屏最早 ${f.index_oldest_date}`:'首屏日期待核验'} · 后续分页需会员。`));
   coverage.append('网站详情不抵扣微信未读。');box.append(coverage);
   detail.append(box);
  }
  const failed=Object.entries(q.dispatch?.errors||{});if(failed.length)root.append(el('p','rq-schedule','后台启动失败：'+failed.map(([k,v])=>(lanes[k]?.[0]||k)+'（'+v+'）').join('、')+'。独立恢复将继续重试，其他通道不受阻。'));
  const ls=el('div','rq-lanes');
  for(const r of c.lanes||[]){if(!lanes[r.lane])continue;const [label,interval]=lanes[r.lane],last=r.finished_at||r.started_at,stale=!last||Date.now()-Date.parse(last)>(Math.max(interval*3,900))*1000;
   const state=r.state==='failed'?'失败，待自动重试':r.state==='interrupted'?'中断，待自动恢复':r.state==='running'?'正在处理':stale?'记录过旧，请检查后台':'最近执行完成';
   const n=el('div','rq-lane');n.append(el('strong','',label+' · '+state),el('span','',`最近开始 ${time(r.started_at)} / 完成 ${time(r.finished_at)}`));if(r.error)n.append(el('span','','错误类型：'+r.error));ls.append(n);
  }detail.append(ls);
   if(f){
    detail.append(el('p','',`登记网站跳过明确异地 ${f.skipped_city}、其他岗位 ${f.skipped_other_role} 个链接。${f.bounded_remaining?`还有 ${f.bounded_remaining} 个链接到达采集边界，尚未展开。`:''}同岗位多来源合并，网站详情数与岗位数分开统计。`));
    if(f.covered_reposts||f.skipped_old_listing)detail.append(el('p','',`${f.covered_reposts?`已读的同岗详情覆盖 ${f.covered_reposts} 个重复入口。`:''}${f.skipped_old_listing?`登记列表有 ${f.skipped_old_listing} 条记录早于近一周。`:''}`));
   }
   const offline=q.offline;
    if(offline)detail.append(el('p','',`群文件读全 ${offline.documents_read} 份（含转发 ${offline.documents_forwarded_read??0} 份），部分读取 ${offline.documents_partial} 份，待处理 ${offline.documents_pending} 份。浏览器缓存上轮核对 ${offline.checked_articles} 篇，命中 ${offline.browser_matches} 篇。`));
   detail.append(el('p','',`观察期新增 ${c.arrivals_observed??0} / 首次读全 ${c.completed_observed??0}；按原口径积压 ${c.baseline_pending??0} → ${c.pending}。标题筛除仍保留在原口径账中。已观察 ${c.elapsed_hours??0} 小时，${c.observed_hour_buckets??0} 个小时有实际记录。`));
  detail.append(el('p','',`初始导入 ${c.bootstrap_total??0} 篇、历史找回 ${c.recovered_total??0} 篇均单列，不算新读全。最早未读任务：${time(c.oldest_pending_at)}。`));
  for(const d of c.daily||[])detail.append(el('p','',`${d.date}：新发现 ${d.discovered} / 首次读全 ${d.completed}`));
  detail.append(el('p','rq-muted','72 个日历小时内至少 60 个小时有真实样本，连续三日读全不落后新增且总积压下降，才认定追上；未满足时不估算清空日期。'));root.append(detail);
 }
 return {mount,mountClues,show,decisions,decisionReady,decisionToday,decisionNew,decisionOpen,decisionMissing,weekQueue,weekPriority:q=>weekQueue(q)?.priority,sourceLabel,sourceRow};
})();
