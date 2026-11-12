'use strict';
let DATA, PRODUCT, pool='core', view='jobs', feedback={}, activeJob=null, toastTimer, updating=false;
const $=id=>document.getElementById(id);
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n};
const unknown=x=>x||'未知', date=x=>x?x.slice(0,16).replace('T',' '):'未知';
try{feedback=JSON.parse(localStorage.getItem('finance-feedback-v1')||'{}')}catch{}
const fields=['query','city','type','family','eligibility','bucket','period','focus','sort'];
const restoreParams=new URLSearchParams(location.search),desktopMedia=matchMedia('(min-width:801px)');
$('filter-panel').open=desktopMedia.matches;desktopMedia.addEventListener('change',e=>{$('filter-panel').open=e.matches});
function link(label,url){const a=el('a','',label);if(url&&(/^https?:\/\//.test(url)||(url.startsWith('/')||url.startsWith('./')))){a.href=url;if(!(url.startsWith('/')||url.startsWith('./'))){a.target='_blank';a.rel='noopener noreferrer'}}return a}
function table(target,headers,rows){const wrap=el('div','tablewrap');wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',headers.join(' / '));const t=el('table'),head=el('tr'),body=el('tbody');headers.forEach(x=>head.append(el('th','',x)));const thead=el('thead');thead.append(head);t.append(thead,body);rows.forEach(r=>{const tr=el('tr');r.forEach(v=>{const td=el('td');if(v instanceof Node)td.append(v);else td.textContent=unknown(v);tr.append(td)});body.append(tr)});wrap.append(t);target.replaceChildren(wrap)}
function toast(text,undo){clearTimeout(toastTimer);($('job-detail').open?$('job-detail'):document.body).append($('toast'));$('toast').replaceChildren(el('span','',text));if(undo){const b=el('button','','撤销');b.onclick=()=>{undo();$('toast').hidden=true};$('toast').append(b)}$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,6000)}
function syncURL(){const p=new URLSearchParams();if(pool!=='core')p.set('pool',pool);if(view!=='jobs')p.set('view',view);for(const id of fields){const v=$(id).value;if(v&&v!==({period:'week',sort:'direction'}[id]||''))p.set(id,v)}if(activeJob)p.set('job',activeJob);history.replaceState(null,'',location.pathname+(p.size?'?'+p:''))}
function setView(next){view=['jobs','unread','coverage','profile','acceptance'].includes(next)?next:'jobs';for(const x of ['jobs','unread','coverage','profile','acceptance'])$(x).hidden=x!==view;if($('personal-picks'))$('personal-picks').hidden=view!=='jobs';$('reading-entry').hidden=view==='unread';$('decision-entry').hidden=view==='unread';document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===view));syncURL()}
function option(id,value,label=value){const o=el('option','',label);o.value=value;$(id).append(o)}
function recent(j){if(j.outside_current_scan)return false;if(j.published_at)return j.published_at>=DATA.window_start.slice(0,10);const t=j.forwarded_at||j.article_published_at;return Boolean(t&&t>=DATA.window_start)}
function closing(j){if(!j.deadline)return false;const d=(Date.parse(j.deadline+'T23:59:59')-Date.now())/86400000;return d>=0&&d<=7}
function feedbackAction(j,key){const before=!!feedback[j.id]?.[key];feedback[j.id]??={};feedback[j.id][key]=!before;let saved=true;try{localStorage.setItem('finance-feedback-v1',JSON.stringify(feedback))}catch{saved=false}render();if(activeJob===j.id)showDetail(j,false);const msg=key==='saved'?(before?'已取消收藏':'已收藏，可在“收藏”查看'):key==='ignored'?(before?'已恢复显示':'已忽略这条岗位'):(before?'已取消投递标记':'已标记为已投递，不会自动发送');toast(msg+(saved?'':' · 本次页面有效'),()=>{feedback[j.id][key]=before;try{localStorage.setItem('finance-feedback-v1',JSON.stringify(feedback))}catch{}render();if(activeJob===j.id)showDetail(j,false)})}
function feedbackButton(j,key,label){const b=el('button','feedback',feedback[j.id]?.[key]?({saved:'已收藏',ignored:'恢复显示',applied:'已投递 ✓'}[key]):label);b.setAttribute('aria-pressed',!!feedback[j.id]?.[key]);b.onclick=()=>feedbackAction(j,key);return b}
function compactReason(j){return j.why.replace(/\s+/g,' ').trim()}
function barrier(j){const conflicts=j.matching.eligibility.conditions.filter(x=>x.state==='冲突');if(conflicts.length)return conflicts.map(x=>x.name+'：'+x.reason).join('；');return j.confirm.length?'待确认 '+j.confirm.slice(0,3).join('、')+(j.confirm.length>3?'等 '+j.confirm.length+' 项':''):'暂无已知硬条件冲突'}
function card(j){const c=el('article','card');c.dataset.id=j.id;const top=el('div','cardhead'),title=el('div','card-title');title.append(el('div','company',unknown(j.company)+(j.team?' / '+j.team:'')));const open=el('button','job-title',j.title.replace(/[【\[]感兴趣可以私信[】\]]/g,'').trim());open.onclick=()=>showDetail(j);title.append(open);const state=el('span','badge '+(j.bucket==='明显不符'?'conflict':j.bucket==='优先看'?'positive':'warning'),j.bucket);top.append(title,state);c.append(top,ReadingQueue.sourceRow(j.sources,PRODUCT));const meta=el('div','facts');meta.append(el('span','place',j.cities.join(' / ')||'地点未知'),el('span','',j.family),el('span','',j.internship_type||'类型未知'),el('span','',j.days||'出勤未知'));c.append(meta);
 const reason=el('div','decision-line');reason.append(el('span','line-label','值得看'),el('p','why',compactReason(j)));const gate=el('div','decision-line gate');gate.append(el('span','line-label','门槛'),el('p','barrier',barrier(j)));c.append(reason,gate);const missingProof=ReadingQueue.decisionMissing(j);if(missingProof.length)c.append(el('p','small','还缺 '+missingProof.join('、')));
 const bottom=el('div','card-bottom'),tags=el('div','signals');if(j.is_new)tags.append(el('span','new-dot','新发现'));if(closing(j))tags.append(el('span','deadline','截止 '+j.deadline));if(j.changes.length)tags.append(el('span','deadline','JD 有变化'));tags.append(el('span','muted',!j.published_at?'首发未知':j.published_at),el('span','muted',j.opening_status));const acts=el('div','cardactions');acts.append(feedbackButton(j,'saved','收藏'));const detail=el('button','primary','看岗位 →');detail.onclick=()=>showDetail(j);acts.append(detail);bottom.append(tags,acts);c.append(bottom);return c}
const pickWeek=7*86400000;
const pickDuties=/^(?:岗位职责|职责描述|工作职责|工作内容|实习内容|职位描述|岗位描述|Responsibilities)\s*[】\]:：]?\s*/i;
const pickRequirements=/^(?:任职资格|任职要求|岗位要求|应聘要求|招聘要求|职位要求|实习要求|基本要求|招聘条件|任职条件|Qualifications|Requirements)\s*[】\]:：]?\s*/i;
const pickSectionEnd=/^(?:应聘方式|申请方式|报名方式|投递方式|投递说明|简历投递|工作地点|实习地点|工作时间|实习待遇|岗位福利|实习补贴|你将获得|公司介绍|联系方式|Application)\s*[】\]:：]?\s*/i;
const researchWork=[
 ['研究报告',/(?:撰写|完成|产出|输出|形成)[^。；\n]{0,22}(?:报告|研报|研究材料)/],
 ['模型与估值',/(?:搭建|建立|构建|开发|维护|更新)[^。；\n]{0,18}(?:模型|因子)|财务预测|估值分析|策略回测|绩效归因/],
 ['行业或公司研究',/(?:行业|产业|公司|个股|信用|宏观|利率|债券|策略|投资价值)(?:跟踪|研究|分析)|(?:行业|产业|宏观|公司)[^。；\n]{0,22}专题研究/],
 ['组合与资产配置',/资产配置|组合(?:研究|构建|优化|分析)|基金研究|基金评价|多资产研究/],
 ['项目尽调',/尽职调查|尽调访谈|投资尽调|项目尽调|管理层访谈/]
];
const productWork=[
 ['调研与需求分析',/用户调研|竞品分析|需求分析|需求挖掘|用户需求|产品调研/],
 ['方案与原型',/原型设计|需求文档|PRD|方案设计|产品设计|实验需求|策略设计/i],
 ['数据与实验',/数据分析|实验效果|指标设计|AB\s*(?:测试|实验|指标)|A\/B|效果评估|模型评测/i],
 ['推动上线',/跟进[^。\n]{0,22}(?:研发|上线)|推动[^。\n]{0,22}(?:上线|落地)|全流程|版本迭代|迭代上线/]
];
// Only dated evidence about the matching business. Brand, compensation and conversion are separate.
const institutionEvidence=[
 {company:'中金公司',applies:j=>j.pool==='core'&&j.team==='研究部',
  label:'2024 年报 · 研究团队与行业覆盖',url:'https://www.cicc.com/upload/file/2025/04/01/ccb3aeab-9739-4169-aaa0-1d890bba7148.pdf'},
 {company:'兴证全球基金',applies:j=>j.family==='配置与基金',
  label:'2025 三季报 · 多资产 FOF',url:'https://www.xqfunds.com/data/20251027164455jjpz.pdf'}
];
const pickOverlap=[
 [/消费.*研究/,/消费品|消费行业|家电|零售|餐饮|食品饮料|纺服|美妆|快消/],
 [/资产配置/,/资产配置|多[元]?资产|组合(?:研究|构建|优化)|基金评价|FOF/i],
 [/债券|信用|固收/,/债券|信用研究|发行人|固收|固定收益/],
 [/并购/,/并购|收购|M&A/i],
 [/期权|波动率/,/期权|波动率/],
];
let personalPicksState;

function pickSections(j){
 const duties=[],requirements=[];
 let section=null;
 for(const line of (j.original||'').split(/\r?\n/)){
  const value=line.trim().replace(/^[【\[]/,'');
  if(pickDuties.test(value)){section=duties;section.push(value.replace(pickDuties,''))}
  else if(pickRequirements.test(value)){section=requirements;section.push(value.replace(pickRequirements,''))}
  else if(pickSectionEnd.test(value))section=null;
  else if(section&&value)section.push(line.trim());
 }
 if(!duties.some(Boolean)){
  const quote=j.matching?.direction?.quote;
  if(quote&&/(?:撰写|搭建|构建|开展|负责|参与|协助)/.test(quote)&&!/(?:优先|要求|投递|请发送)/.test(quote))duties.push(quote);
 }
 return {duties:duties.filter(Boolean),requirements:requirements.filter(Boolean)};
}

function pickTime(value){
 if(typeof value!=='string'||!value)return NaN;
 if(/^\d{4}-\d{2}-\d{2}$/.test(value))return Date.parse(value+'T23:59:59+08:00');
 const iso=value.replace(' ','T');
 return Date.parse(/T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?$/.test(iso)?iso+'+08:00':iso);
}

function pickDeadline(j){
 const parsed=pickTime(j.deadline);
 if(Number.isFinite(parsed))return parsed;
 const lines=(j.original||'').match(/(?:招聘时间\s*[:：][^\r\n]{0,50}(?:至|截至|到期|～|~)|(?:投递|报名|招聘|申请)截止(?:时间)?\s*[:：]?)[^\r\n]{0,40}/g)||[];
 const dates=lines.flatMap(line=>[...line.matchAll(/(20\d{2})[-/年](\d{1,2})[-/月](\d{1,2})(?:日)?/g)].slice(-1));
 return dates.length?Math.max(...dates.map(([,year,month,day])=>pickTime([year,month.padStart(2,'0'),day.padStart(2,'0')].join('-')))):NaN;
}

function pickFullTimeRequirement(requirements){
 return requirements.some(line=>line.normalize('NFKC').split(/[；;。]/).some(clause=>{
  const years=clause.match(/(?:^|[^\d])(?:至少\s*)?(?:[2-9]|\d{2,}|[二两三四五六七八九十])\s*年(?:以上|及以上)?[^，,；;。]{0,18}(?:经验|经历)(?:者\s*)?/);
  return years&&/(?:工作|全职|行业|互联网|产品|从业|研发|分析师|投研)/.test(years[0])&&!/(?:优先|加分|为佳|更佳)/.test(clause.slice(years.index+years[0].length));
 }));
}

function pickGate(j,requirements,remoteOnly){
 const trim=line=>line.replace(/^\s*(?:[-•]|[0-9]+[、.)．])\s*/,'').replace(/[；;。]+$/,'');
 const cohort=[j.cohort,...requirements].filter(Boolean)
  .map(line=>line.normalize('NFKC').match(/(?:限|面向)?20\d{2}\s*(?:[–—~-]\s*(?:20)?\d{2}\s*)?(?:届|年毕业)/)?.[0]).find(Boolean);
 const availability=requirements.map(trim).find(line=>/(?:每周|每星期|实习期|到岗|连续实习)\s*[^。\n]{0,28}(?:[天日]|个月)/.test(line));
 const schedule=availability?.replace(/^.*?[,，]\s*(?=(?:能|可)?(?:每周|每星期|实习期|连续实习))/,'')||
  [j.days,j.months].filter(Boolean).join(' · ');
 const skill=requirements.map(trim).find(line=>/\b(?:SQL|Python|Axure|Figma|Wind)\b|C\+\+|AI\s*工具|估值模型|财务模型|中英文读写/i.test(line));
 const gate=[cohort,remoteOnly?'远程安排待确认':null,schedule||skill].filter(Boolean).join(' · ');
 return gate||'任职条件见原文';
}

function pickCandidate(j,snapshot,profile,lane,now){
 if(!j.company||!j.title||!ReadingQueue.decisionReady(j)||pickDeadline(j)<now)return null;
 if(feedback[j.id]?.ignored||feedback[j.id]?.applied)return null;
 const officialSource=j.sources?.find(s=>s.original_verified);
 const official=j.official_verified||officialSource;
 const open=j.decision.opening==='open'&&official&&pickTime(j.last_verified_at)>=now-pickWeek;
 const seen=pickTime(j.published_at||j.forwarded_at||j.article_published_at||j.first_seen_at||j.first_discovered_at);
 if(!open&&(!Number.isFinite(seen)||seen<now-pickWeek||j.outside_current_scan))return null;
 const places=(j.cities||j.city?.split(/[、/，,]/)||[]).map(p=>p.trim());
 const cities=places.filter(p=>profile.internship_cities.some(city=>p===city||p===city+'市'));
 const remoteText=[j.title,j.remote_arrangement].filter(Boolean).join('\n');
 const remoteWork=/(?:可|支持|接受|全程|允许)(?:短期)?远程(?!面试|笔试|面谈|测评|沟通)|远程(?:实习|办公|工作)/.test(remoteText);
 const remoteOnly=!cities.length&&profile.remote!==false&&(remoteWork||places.includes('远程')&&!/远程(?:面试|笔试|面谈|测评)/.test(remoteText));
 if(!cities.length&&!remoteOnly)return null;
 const isProduct=lane==='product';
 const title=j.title;
 if(isProduct&&(!/产品(?:经理|策划|实习|助理|设计)|Product (?:Manager|Intern)/i.test(title)||
    /硬件产品|产品运营(?:实习|助理|专员)|(?:市场营销|渠道销售|内容运营|销售)(?:岗|助理|经理|实习|专员)/.test(title)))return null;
 if(!isProduct&&(j.matching?.eligibility?.state==='冲突'||
    j.matching?.eligibility?.conditions?.some(c=>c.state==='冲突')||(j.bank_gate&&profile.bank_specialist!==true)))return null;
 const {duties,requirements}=pickSections(j);
 if(pickFullTimeRequirement(requirements))return null;
 const work=(isProduct?productWork:researchWork).filter(([,pattern])=>duties.some(line=>pattern.test(line))).map(([label])=>label);
 if(!work.length||(isProduct&&!work.some(label=>label!=='数据与实验')))return null;
 const evidenceScope=[title,...duties].join('\n');
 const confirmed=[...(profile.experience||[]),...(profile.projects||[])];
 const fit=[...new Set((j.matching?.competitiveness?.evidence||[])
  .filter(e=>e.quote&&evidenceScope.includes(e.quote)&&confirmed.includes(e.experience)).map(e=>e.experience))];
 const direct=fit.filter(exp=>pickOverlap.some(([experience,role])=>experience.test(exp)&&role.test(evidenceScope)));
 const transferable=fit.filter(exp=>!direct.includes(exp)&&/(?:行业研究|尽调)/.test(exp));
 const institution=institutionEvidence.find(e=>e.company===j.company&&e.applies(j));
 const cohortUnknown=j.matching?.eligibility?.conditions?.some(c=>c.name==='毕业届别'&&c.quote&&c.state==='未知');
 const source=isProduct?{kind:j.source_kind,name:j.source_name,url:j.url}:officialSource||j.sources?.[0];
 const origin=source?ReadingQueue.sourceLabel(source.name===title?{...source,name:''}:source,snapshot):'来源待核实';
 return {j,isProduct,open:Boolean(open),where:cities.join(' / ')||'远程',work,direct,transferable,institution,
         gate:pickGate(j,requirements,remoteOnly),origin,
         rank:[Math.min(work.length,2),Number(open),direct.length,Number(Boolean(institution)),Number(!cohortUnknown),
               Math.min(transferable.length,2),work.length,Number(Boolean(j.team)),Number(Boolean(official)),seen||0]};
}

function rankPersonalPicks(data,product,now=Date.now()){
 const profile=data.profile;
 const used=new Set();
 const lanes=[
  {key:'core',title:'投研主线',limit:2,jobs:data.jobs.filter(j=>j.pool==='core')},
  {key:'expansion',title:'金融拓展',limit:1,jobs:data.jobs.filter(j=>['quant','primary'].includes(j.pool))},
  {key:'product',title:'产品备选',limit:2,jobs:product?.jobs||[]}
 ];
 for(const lane of lanes){
  const candidates=lane.jobs.map(j=>pickCandidate(j,product,profile,lane.key,now)).filter(Boolean);
  candidates.sort((a,b)=>{
   for(let i=0;i<a.rank.length;i++)if(a.rank[i]!==b.rank[i])return b.rank[i]-a.rank[i];
   return a.j.id.localeCompare(b.j.id);
  });
  lane.picks=[];
  for(const pick of candidates){
   const employer=pick.j.company.normalize('NFKC').replace(/\s/g,'');
   if(used.has(employer))continue;
   used.add(employer);
   lane.picks.push(pick);
   if(lane.picks.length===lane.limit)break;
  }
 }
 return lanes;
}

function personalPickCard(pick){
 const {j,isProduct,open,where,work,direct,transferable,institution,gate,origin}=pick;
 const article=el('article','personal-pick');
 const top=el('div','pick-top');
 top.append(el('strong','pick-company',[j.company,j.team].filter(Boolean).join(' / ')),el('span','badge '+(open?'positive':'warning'),open?'已核实开放':'开放待核'));
 const title=link(j.title,(isProduct?'/?job=':'/finance?job=')+encodeURIComponent(j.id));
 title.className='pick-title';
 if(!isProduct)title.onclick=e=>{
  if(e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  e.preventDefault();showDetail(j);
 };
 article.append(top,title,el('p','pick-meta',where+' · '+origin),
  el('p','pick-work',work.slice(0,3).join(' · ')),
  el('p','pick-gate','先核对 '+(gate.length>84?gate.slice(0,83)+'…':gate)));
 if(direct.length)article.append(el('p','pick-fit','相近经历 '+direct.slice(0,2).join('、')));
 else if(transferable.length)article.append(el('p','pick-fit','方法可迁移 '+transferable.slice(0,2).join('、')));
 if(institution){
  const fact=link(institution.label,institution.url);
  fact.className='pick-evidence';
  article.append(fact);
 }
 return article;
}

function renderPersonalPicks(){
 const local=location.protocol==='http:'&&location.port==='18936'&&['127.0.0.1','localhost','[::1]'].includes(location.hostname);
 const profile=DATA?.profile;
 if(!local||window.RadarPublication||!profile?.education?.length||!profile.priorities?.length||!profile.internship_cities?.length){
  $('personal-picks')?.remove();
  personalPicksState=null;
  return;
 }
 const now=Date.now();
 const dismissed=JSON.stringify(Object.entries(feedback).filter(([,v])=>v?.applied||v?.ignored).map(([id])=>id).sort());
 if(personalPicksState?.data===DATA&&personalPicksState.product===PRODUCT&&personalPicksState.dismissed===dismissed&&now-personalPicksState.at<60000)return;
 const lanes=rankPersonalPicks(DATA,PRODUCT,now);
 const signature=JSON.stringify(lanes.map(lane=>lane.picks.map(({j,institution,rank,...pick})=>
  [j.id,j.company,j.team,j.title,institution?.url,pick])));
 if(personalPicksState?.signature===signature){
  personalPicksState={data:DATA,product:PRODUCT,dismissed,at:now,signature};
  return;
 }
 let panel=$('personal-picks');
 if(panel?.contains(document.activeElement))return;
 personalPicksState={data:DATA,product:PRODUCT,dismissed,at:now,signature};
 if(!panel){
  panel=el('section','personal-picks');
  panel.id='personal-picks';
  panel.setAttribute('aria-labelledby','personal-picks-title');
  panel.hidden=view!=='jobs';
  $('decision-entry').before(panel);
 }
 const heading=el('div','picks-heading'),name=el('h2','','优先看');
 name.id='personal-picks-title';
 heading.append(name,el('p','','按新岗位资料自动更新 · 最多 5 条'));
 const list=el('div','picks-lanes');
 for(const lane of lanes){
  const group=el('div','picks-lane');
  group.append(el('h3','',lane.title));
  if(lane.picks.length)group.append(...lane.picks.map(personalPickCard));
  else group.append(el('p','pick-meta','暂无资料齐备的合适岗位'));
  list.append(group);
 }
 panel.replaceChildren(heading,list);
}

const decisionFocus=new Set(['ready','information_gaps','new_ready','open','today']);
function render(){if(!DATA)return;
 ReadingQueue.mountClues($('jobs'),PRODUCT?.reading_queue,'finance',DATA.jobs,PRODUCT);
 renderPersonalPicks();
 ReadingQueue.decisions($('decision-entry'),PRODUCT?.reading_queue,DATA.jobs.filter(j=>!feedback[j.id]?.ignored),PRODUCT?.image_issues,(key,stage)=>{
  if(key==='pending'||key==='gaps'){
   if(key==='gaps'&&PRODUCT?.reading_queue?.local_login){location.assign(PRODUCT.reading_queue.local_login);return}
   setView('unread');ReadingQueue.show($('reading-panel'),stage);return
  }
  for(const id of fields)$(id).value=({period:'all',sort:'direction',focus:key}[id]||'');
  setView('jobs');render();$('query').focus({preventScroll:true});$('jobs').scrollIntoView({block:'start'})
 });
 const q=$('query').value.trim().toLowerCase(),focus=$('focus').value,period=$('period').value,allPools=decisionFocus.has(focus);let rows=DATA.jobs.filter(j=>(allPools||j.pool===pool)&&(!q||[j.company,j.title,j.team,j.original].join(' ').toLowerCase().includes(q))&&(!$('city').value||($('city').value==='unknown'?!j.cities.length:j.cities.includes($('city').value)))&&(!$('type').value||j.internship_type===$('type').value)&&(!$('family').value||j.family===$('family').value)&&(!$('eligibility').value||j.matching.eligibility.state===$('eligibility').value)&&(!$('bucket').value||j.bucket===$('bucket').value)&&(period==='all'||period==='week'&&recent(j)||period==='published'&&j.published_at&&recent(j))&&(!focus||focus==='ready'&&ReadingQueue.decisionReady(j)||focus==='information_gaps'&&ReadingQueue.decisionNeedsInformation(j)||focus==='new_ready'&&ReadingQueue.decisionNew(j)||focus==='open'&&ReadingQueue.decisionOpen(j)||focus==='today'&&ReadingQueue.decisionToday(j)||focus==='new'&&j.is_new||focus==='closing'&&closing(j)||focus==='changed'&&j.changes.length||feedback[j.id]?.[focus])&&(focus==='ignored'||!feedback[j.id]?.ignored));const rank={主方向:0,研究扩展:1,探索比较:2,相邻备选:3};const order=$('sort').value;rows.sort((a,b)=>{const bad=Number(a.bucket==='明显不符')-Number(b.bucket==='明显不符');if(bad)return bad;if(order==='evidence')return b.matching.competitiveness.evidence.length-a.matching.competitiveness.evidence.length;if(order==='deadline')return(a.deadline||'9999').localeCompare(b.deadline||'9999');if(order==='discovered')return b.first_discovered_at.localeCompare(a.first_discovered_at);return(rank[a.matching.direction.label]??0)-(rank[b.matching.direction.label]??0)||Number(b.is_new)-Number(a.is_new)||a.title.localeCompare(b.title,'zh')});
 $('count').replaceChildren(el('strong','',rows.length+' 条'),document.createTextNode(' · '+(allPools?'金融四池':DATA.pools[pool])));$('date-note').textContent=rows.filter(j=>!j.published_at).length+' 条首发未知 · 招聘信息条数不等于 HC';$('cards').replaceChildren();if(!rows.length){const e=el('div','empty');e.append(el('h3','','暂时没有匹配的岗位'),el('p','','可以清空筛选，或查看日期未知与历史信息。'));const reset=el('button','','清空筛选');reset.onclick=resetFilters;e.append(reset);$('cards').append(e)}else rows.forEach(j=>$('cards').append(card(j)));
 $('inbox').replaceChildren();const all=DATA.jobs.filter(j=>j.pool===pool&&(period==='all'||recent(j)));for(const [key,label,test]of[['','全部',()=>true],['new','新发现',j=>j.is_new],['closing','临近截止',closing],['changed','有变化',j=>j.changes.length],['saved','收藏',j=>feedback[j.id]?.saved]]){const b=el('button','quick-focus');b.setAttribute('aria-pressed',focus===key);b.append(el('span','',label),el('span','n',all.filter(test).length));b.onclick=()=>{$('focus').value=key;render()};$('inbox').append(b)}
 const n=fields.filter(id=>!['query','sort'].includes(id)&&$(id).value!==({period:'week'}[id]||'')).length;$('filter-count').textContent=n;$('filters-toggle').textContent=n?'筛选 · '+n:'筛选';$('quick-query').value=$('query').value;document.querySelectorAll('[data-pool]').forEach(b=>b.setAttribute('aria-pressed',!allPools&&b.dataset.pool===pool));syncURL()}
function fact(parent,label,value){const n=el('span');n.append(el('span','muted',label+' '),el('b','',unknown(value)));parent.append(n)}
function showDetail(j,open=true){activeJob=j.id;const d=$('detail-content');d.replaceChildren();const h=el('div','detail-intro');h.append(el('p','company',unknown(j.company)+(j.team?' / '+j.team:'')),el('h2','',j.title));h.lastChild.id='detail-title';h.append(ReadingQueue.sourceRow(j.sources,PRODUCT),el('span','badge warning',j.bucket),el('p','detail-why',j.why),el('p','notice',barrier(j)));d.append(h);
 const apply=el('div','apply-box');apply.append(el('h3','','投递方式'));if(j.application_url)apply.append(link('打开投递入口 ↗',j.application_url));for(const email of j.emails){const row=el('div','email-row');row.append(el('span','',email));const b=el('button','','复制邮箱');b.onclick=async()=>{try{await navigator.clipboard.writeText(email);b.textContent='已复制 ✓';toast('投递邮箱已复制')}catch{toast('复制失败，请选中邮箱复制')}};row.append(b);apply.append(row)}if(!j.application_url&&!j.emails.length)apply.append(el('p','muted','投递方式尚未取得，请查看原文来源。'));if(j.application_note)apply.append(el('p','hint',j.application_note));const acts=el('div','cardactions');acts.append(feedbackButton(j,'saved','收藏'),feedbackButton(j,'applied','标记已投递'),feedbackButton(j,'ignored','忽略'));apply.append(acts);
 const facts=el('div','facts detail-facts');for(const[k,v]of[['地点',j.cities.join(' / ')],['类型',j.internship_type],['出勤',j.days],['时长',j.months],['补贴',j.pay],['截止',j.deadline],['远程',j.remote_arrangement],['到岗',j.start],['状态',j.opening_status]])fact(facts,k,v);d.append(facts);
 const jd=el('details','jd');jd.open=true;jd.append(el('summary','','原始 JD'),el('pre','',j.original));d.append(jd,apply);const grid=el('div','detailgrid'),a=el('div'),b=el('div');a.append(el('h3','','① 职业方向'),el('p','',j.matching.direction.reason),el('div','quote',unknown(j.matching.direction.quote)),el('h3','','② 当前竞争力'));for(const x of j.matching.competitiveness.evidence)a.append(el('p','',x.experience+'：'+x.note),el('div','quote',x.quote));if(!j.matching.competitiveness.evidence.length)a.append(el('p','','尚无明确经历证据。'));a.append(el('h3','','主要缺口'));for(const x of j.matching.competitiveness.gaps)a.append(el('p','',x.mandatory?'要求需补证':'偏好 / 加分，非硬门槛'),el('div','quote',x.quote));if(!j.matching.competitiveness.gaps.length)a.append(el('p','','JD 未提供可进一步核对的技能要求。'));table(b,['条件','状态','JD 原句 / 解释'],j.matching.eligibility.conditions.map(x=>[x.name,x.state,(x.quote||'JD 未写明')+'；'+x.reason]));b.prepend(el('h3','','③ 可投条件'));b.append(el('h3','','④ 机会质量'),el('p','',j.matching.quality.note),el('p','','职责性质：'+j.work_nature),el('div','quote','留用原话：'+unknown(j.conversion_quote)));grid.append(a,b);d.append(grid);
 for(const version of j.repost_versions||[]){
  const other=el('details','jd repost-jd');other.append(el('summary','','转载原文 · '+version.title));
  if(version.source.url)other.append(link('打开该转载来源 ↗',version.source.url));
  other.append(el('pre','',version.original));d.append(other);
 }
 const meta=el('details');meta.append(el('summary','','来源与时间'));const dates=el('div','facts');for(const[k,v]of[['JD 首发',j.published_at],['文章发布',j.article_published_at],['转发',j.forwarded_at],['首次发现',j.first_discovered_at],['最后核验',j.last_verified_at]])fact(dates,k,date(v));meta.append(dates);j.sources.forEach(s=>{const label=ReadingQueue.sourceLabel(s,PRODUCT);meta.append(s.url?link(label+' ↗',s.url):el('span','',label),el('p','hint',s.kind+(s.original_verified?' · 官方页面已读，开放状态另核验':' · 原始发布方未独立核验')))});d.append(meta);if(open&&!$('job-detail').open)$('job-detail').showModal();syncURL()}
function resetFilters(){for(const id of fields)$(id).value=({period:'week',sort:'direction'}[id]||'');render()}
function setupData(){for(const [old,id] of Object.entries(DATA.job_aliases||{})){if(feedback[old]){feedback[id]={...feedback[old],...feedback[id]};try{localStorage.setItem('finance-feedback-v1',JSON.stringify(feedback))}catch{}}}const desired={};for(const id of fields)desired[id]=$(id).value;$('pools').replaceChildren();for(const id of ['core','quant','primary','adjacent']){const b=el('button');b.dataset.pool=id;b.setAttribute('aria-pressed',id===pool);b.append(el('span','',DATA.pools[id]),el('span','n',DATA.jobs.filter(j=>j.pool===id).length));b.onclick=()=>{pool=id;$('family').value='';if(decisionFocus.has($('focus').value))$('focus').value='';render()};$('pools').append(b)}for(const id of ['city','type','family'])while($(id).options.length>({city:4,type:1,family:1}[id]))$(id).remove($(id).options.length-1);[...new Set(DATA.jobs.flatMap(j=>j.cities))].sort().filter(c=>!['北京','上海'].includes(c)).forEach(c=>option('city',c));DATA.types.forEach(x=>option('type',x));[...new Set(DATA.role_coverage.map(r=>r.family))].forEach(x=>option('family',x));for(const id of fields)if(desired[id])$(id).value=desired[id];for(const id of ['profile-content','rules','coverage-stats','institution-list','change-list','wechat-coverage'])$(id).replaceChildren();renderInformation();$('stamp').textContent='数据截至 '+date(DATA.generated_at);render()}
let reconnectTimer,reconnectAttempts=0;
async function load(initial=false){clearTimeout(reconnectTimer);let retryable=true;try{const r=await fetch('./data/finance.json',{cache:'no-store'});if([401,403,503].includes(r.status)){try{localStorage.removeItem('finance-cache-v1')}catch{}}if(!r.ok){retryable=r.status>=500;throw Error(r.status===401?'登录已过期，请回到入口重新登录。':'岗位读取失败（'+r.status+'）。')}DATA=await r.json();reconnectAttempts=0;try{localStorage.setItem('finance-cache-v1',JSON.stringify(DATA))}catch{}try{const p=await fetch('./data/data.json');if(p.ok)PRODUCT=await p.json()}catch{}setupData();$('error').hidden=true;if(initial){const p=restoreParams;if(DATA.pools[p.get('pool')])pool=p.get('pool');for(const id of fields)if(p.has(id))$(id).value=p.get(id);setView(p.get('view')||'jobs');render();const j=DATA.jobs.find(x=>x.id===p.get('job'));if(j)showDetail(j)}return true}catch(e){$('error').replaceChildren(el('span','',e.message));const retry=el('button','','立即重连');retry.onclick=()=>load();$('error').append(retry);if(retryable){const delay=Math.min(30000,5000*2**Math.min(reconnectAttempts++,3));$('error').append(el('span','',` ${delay/1000} 秒后自动重连`));reconnectTimer=setTimeout(()=>load(initial&&!DATA),delay)}$('error').hidden=false;if(!DATA){try{DATA=JSON.parse(localStorage.getItem('finance-cache-v1'));if(DATA){setupData();$('error').prepend(el('strong','','当前为上次缓存，请核对数据时间。 '))}}catch{}}if(!DATA)$('count').textContent='岗位暂时无法读取';return false}}
function renderRuntime(s){if(s.snapshot_at){RadarPublication.update(s);return;}const running=s.status==='running';$('refresh').disabled=running||updating;$('refresh').textContent=running||updating?'正在更新…':'更新岗位';$('status').textContent=running?'正在后台读取，完成后自动更新页面':s.status==='failed'?'上次更新失败 · 已保留成功结果':'每 5 分钟检查新消息 · 未读内容独立补齐';if(s.status==='failed')toast('后台更新失败，可重试；已保留成功结果')}
async function refreshNow(){if(updating)return;updating=true;$('refresh').disabled=true;$('refresh').textContent='正在更新…';const old=DATA?.generated_at;try{const r=await fetch('/api/refresh',{method:'POST',headers:{'X-Workbench':'local'}});if(!r.ok)throw Error('更新未启动（'+r.status+'），请重试。');toast('后台更新已开始，完成后自动显示结果');let seen=false,done=false;for(let n=0;n<90;n++){await new Promise(r=>setTimeout(r,2000));const r=await fetch('./data/status.json');if(!r.ok)throw Error('更新状态暂时无法读取，请稍后重试');const s=await r.json();renderRuntime(s);if(s.status==='running'){seen=true;continue}if(s.status==='failed')throw Error('本次更新失败，已保留上次结果');if(s.status==='ok'&&(seen||n>=1)){await load();toast(DATA.generated_at===old?'更新完成，当前没有新增岗位':'岗位已更新，筛选已保留');done=true;break}}if(!done)toast('后台仍在处理，下次进入会读取最新结果')}catch(e){toast(e.message);$('status').textContent=e.message}finally{updating=false;$('refresh').disabled=false;$('refresh').textContent='更新岗位'}}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>setView(b.dataset.view));for(const id of fields)$(id).addEventListener(id==='query'?'input':'change',()=>DATA&&render());$('quick-query').addEventListener('input',()=>{$('query').value=$('quick-query').value;render()});$('clear').onclick=resetFilters;$('refresh').onclick=refreshNow;$('filters-toggle').onclick=()=>{$('filter-panel').open=!$('filter-panel').open;if($('filter-panel').open){$('filter-panel').scrollIntoView({block:'nearest'});$('query').focus()}};$('filter-panel').addEventListener('toggle',()=>$('filters-toggle').setAttribute('aria-expanded',$('filter-panel').open));$('close-detail').onclick=()=>$('job-detail').close();$('job-detail').addEventListener('close',()=>{activeJob=null;syncURL()});
for(const id of fields){$(id).name=id;$(id).autocomplete='off'}
load(true).then(async()=>{try{const r=await fetch('./data/status.json');if(r.ok)renderRuntime(await r.json());if(location.hostname==='127.0.0.1'||location.hostname==='localhost'){const m=await(await fetch('./data/mobile.json')).json();if(m.available){$('mobile').href=m.url;$('mobile').hidden=false}}}catch{}});

function renderInformation(){
 const queue=PRODUCT?.reading_queue,backlog=ReadingQueue.weekQueue(queue);ReadingQueue.mount($('reading-panel'),queue,PRODUCT?.image_issues||[]);$('unread-count').textContent=backlog?.total??'';$('reading-entry-text').textContent=backlog?`近七天补读队列 ${backlog.total} 篇 · 优先补读 ${backlog.priority} · 限量抽查 ${backlog.sample}`:'暂时无法读取补读清单。';
 const p=DATA.profile;$('profile-content').append(el('p','',p.education.map(e=>e.school+' '+e.degree+' '+e.major+' '+(e.year||'')).join('；')),el('p','','当前主方向：'+p.career+'。重视：'+p.priorities.join('、')+'。'),el('p','','经历：'+p.experience.join('、')+'；项目：'+p.projects.join('、')+'。'),el('p','','当前实习：'+p.internship_cities.join('、')+'；长期就业目标：'+p.long_term_city+'。'),el('p','notice',p.note),el('p','','未知：毕业届别、到岗日期、每周天数、连续月数、远程与异地接受度、最低补贴、英语、证书、银行专业岗开关。'));
 DATA.rules.forEach(x=>$('rules').append(el('li','',x)));$('coverage-note').textContent=DATA.coverage_note;
 const sources=DATA.sources;for(const [v,l] of [[DATA.jobs.length,'已取得 JD 的条目'],[sources.filter(s=>s.status==='read').length,'公开页面已读'],[sources.filter(s=>s.status==='failed').length,'公开来源读取失败'],[sources.filter(s=>s.status==='index_only'||s.status==='not_checked').length,'目录 / 待展开']]){const m=el('div','metric');m.append(el('b','',v),el('span','',l));$('coverage-stats').append(m)}
 table($('source-table'),['来源 / 类型','读取状态','最后核验','下次重试','缺口'],sources.map(s=>[link(s.name+' / '+s.kind,s.url),({read:'页面已读，开放状态另核验',failed:'采集失败',index_only:'仅目录，岗位未覆盖',not_checked:'待读取'})[s.status]||s.status,date(s.verified_at),date(s.next_retry_at),s.error||(s.status==='index_only'?'动态岗位正文尚未取得':'来源可读不代表机构岗位全收齐')]));
 table($('keyword-table'),['岗位池','方向','检索表达','已提取'],DATA.role_coverage.map(r=>[DATA.pools[r.pool],r.family,r.keywords.join(' / ')+'；组合：'+r.query,String(r.count)]));
 $('institution-list').append(el('p','',DATA.institutions.join('；')),el('p','',DATA.sectors.join('；')),el('p','notice','养老金 / 年金、主权基金、评级 / 信托等方向已支持分类，尚无已核验岗位不等于没有机会。官方招聘公众号与公开团队原帖尚未全部建立独立验证入口。'));
 table($('diff-table'),['能力','已有','本次增量'],DATA.diffs);table($('acceptance-table'),['真实样例 / 场景','结果','判定与未知项','原文来源'],(DATA.acceptance||[]).map(a=>[a.case,a.pass?'通过':'未通过',a.result,link('查看来源',a.url)]));
 const changed=DATA.jobs.filter(j=>j.changes.length);if(!changed.length)$('change-list').append(el('p','hint','当前为金融基线；尚无后续实质变化。以后保留每次变更前后值。'));for(const j of changed){const d=el('details','card');d.append(el('summary','',j.title));j.changes.forEach(x=>d.append(el('p','',date(x.at)+' · '+x.fields.join(' / ')),el('pre','',JSON.stringify({变更前:x.before,变更后:x.after},null,2))));$('change-list').append(d)}
 const wc=$('wechat-coverage');if(PRODUCT){wc.append(el('p','',`微信读取沿用已授权招聘来源，详细范围和待补队列见产品看板。`),link('查看微信来源与未读清单','./product.html?tab=pending'));const summary=DATA.wechat_coverage;if(summary){const counts=el('div');wc.append(counts);table(counts,['项目','当前数量'],Object.entries(summary).map(([k,v])=>[k,String(v)]))}}else wc.append(el('p','notice','微信覆盖接口读取失败，不能认定没有缺口。'));
}

$('open-unread').onclick=()=>setView('unread');
let checkingBackground=false;setInterval(async()=>{if(document.hidden||updating||checkingBackground)return;checkingBackground=true;try{const r=await fetch('./data/status.json',{cache:'no-store'});if(r.ok){const status=await r.json();renderRuntime(status);const published=status.published_at||status.finished_at;if(published&&(!DATA||Date.parse(published)>Date.parse(DATA.generated_at)))await load();}}catch{}finally{renderPersonalPicks();checkingBackground=false}},60000);
