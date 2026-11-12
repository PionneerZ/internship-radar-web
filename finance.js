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
function defaultSort(){return priorityOwner()?'priority':'direction'}
function syncURL(){const p=new URLSearchParams();if(pool!=='core')p.set('pool',pool);if(view!=='jobs')p.set('view',view);for(const id of fields){const v=$(id).value;if(v&&v!==({period:'week',sort:defaultSort()}[id]||''))p.set(id,v)}if(activeJob)p.set('job',activeJob);history.replaceState(null,'',location.pathname+(p.size?'?'+p:''))}
function setView(next){view=['jobs','unread','coverage','profile','acceptance'].includes(next)?next:'jobs';for(const x of ['jobs','unread','coverage','profile','acceptance'])$(x).hidden=x!==view;if($('personal-picks'))$('personal-picks').hidden=view!=='jobs';$('reading-entry').hidden=view==='unread';$('decision-entry').hidden=view==='unread';document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===view));syncURL()}
function option(id,value,label=value){const o=el('option','',label);o.value=value;$(id).append(o)}
function recent(j){if(j.outside_current_scan)return false;if(j.published_at)return j.published_at>=DATA.window_start.slice(0,10);const t=j.forwarded_at||j.article_published_at;return Boolean(t&&t>=DATA.window_start)}
function closing(j){if(!j.deadline)return false;const d=(Date.parse(j.deadline+'T23:59:59')-Date.now())/86400000;return d>=0&&d<=7}
function feedbackAction(j,key){const before=!!feedback[j.id]?.[key];feedback[j.id]??={};feedback[j.id][key]=!before;let saved=true;try{localStorage.setItem('finance-feedback-v1',JSON.stringify(feedback))}catch{saved=false}render();if(activeJob===j.id)showDetail(j,false);const msg=key==='saved'?(before?'已取消收藏':'已收藏，可在“收藏”查看'):key==='ignored'?(before?'已恢复显示':'已忽略这条岗位'):(before?'已取消投递标记':'已标记为已投递，不会自动发送');toast(msg+(saved?'':' · 本次页面有效'),()=>{feedback[j.id][key]=before;try{localStorage.setItem('finance-feedback-v1',JSON.stringify(feedback))}catch{}render();if(activeJob===j.id)showDetail(j,false)})}
function feedbackButton(j,key,label){const b=el('button','feedback',feedback[j.id]?.[key]?({saved:'已收藏',ignored:'恢复显示',applied:'已投递 ✓'}[key]):label);b.setAttribute('aria-pressed',!!feedback[j.id]?.[key]);b.onclick=()=>feedbackAction(j,key);return b}
function compactReason(j){return j.why.replace(/\s+/g,' ').trim()}
function barrier(j){const conflicts=j.matching.eligibility.conditions.filter(x=>x.state==='冲突');if(conflicts.length)return conflicts.map(x=>x.name+'：'+x.reason).join('；');return j.confirm.length?'待确认 '+j.confirm.slice(0,3).join('、')+(j.confirm.length>3?'等 '+j.confirm.length+' 项':''):'暂无已知硬条件冲突'}
function card(j,assessment){const c=el('article','card');c.dataset.id=j.id;const top=el('div','cardhead'),title=el('div','card-title');title.append(el('div','company',unknown(j.company)+(j.team?' / '+j.team:'')));const open=el('button','job-title',j.title.replace(/[【\[]感兴趣可以私信[】\]]/g,'').trim());open.onclick=()=>showDetail(j);title.append(open);const state=assessment?priorityBadge(assessment):el('span','badge '+(j.bucket==='明显不符'?'conflict':j.bucket==='优先看'?'positive':'warning'),j.bucket);top.append(title,state);c.append(top,ReadingQueue.sourceRow(j.sources,PRODUCT));const meta=el('div','facts');meta.append(el('span','place',assessment?.place.where||j.cities.join(' / ')||'地点未知'),el('span','',assessment?.type||j.family),el('span','',j.internship_type||'类型未知'),el('span','',j.days||'出勤未知'));c.append(meta);
 const reason=el('div','decision-line');reason.append(el('span','line-label',assessment?'职责':'值得看'),el('p','why',assessment?priorityWork(assessment):compactReason(j)));const gate=el('div','decision-line gate');gate.append(el('span','line-label',assessment?'下一步':'门槛'),el('p','barrier',assessment?priorityNext(assessment):barrier(j)));c.append(reason,gate);const missingProof=ReadingQueue.decisionMissing(j);if(missingProof.length)c.append(el('p','small','还缺 '+missingProof.join('、')));
 const bottom=el('div','card-bottom'),tags=el('div','signals');if(j.is_new)tags.append(el('span','new-dot','新发现'));if(closing(j))tags.append(el('span','deadline','截止 '+j.deadline));if(j.changes.length)tags.append(el('span','deadline','JD 有变化'));tags.append(el('span','muted',!j.published_at?'首发未知':j.published_at),el('span','muted',assessment?priorityOpening(assessment):j.opening_status));const acts=el('div','cardactions');acts.append(feedbackButton(j,'saved','收藏'));const detail=el('button','primary','看岗位 →');detail.onclick=()=>showDetail(j);acts.append(detail);bottom.append(tags,acts);c.append(bottom);return c}
const pickWeek=7*86400000;
const pickDuties=/^(?:岗位主要职责|岗位职责|职责描述|工作职责|工作内容|实习内容|实习职责|职位职责|主要职责|主要工作(?:内容)?|工作任务|职位描述|岗位描述|Responsibilities|Job Description)(?=$|[\s】\]:：])\s*[】\]:：]?\s*/i;
const pickRequirements=/^(?:任职资格|任职要求|岗位要求|应聘要求|招聘要求|职位要求|实习要求|基本要求|招聘条件|任职条件|Qualifications|Requirements)(?=$|[\s】\]:：])\s*[】\]:：]?\s*/i;
const pickAvailability=/^(?:工作时间|实习时间|实习时长|实习周期|实习期限|到岗要求|毕业届别|出勤要求)(?=$|[\s】\]:：])\s*[】\]:：]?\s*[:：]?\s*/;
const pickSectionEnd=/^(?:应聘方式|申请方式|报名方式|投递方式|投递说明|简历投递|工作地点|实习地点|实习待遇|实习收获|岗位福利|实习补贴|你将获得|公司介绍|公司简介|联系方式|Application|申请)(?=$|[\s】\]:：])/i;
const financeOutputs=[
 ['研究报告',/(?:撰写|完成|产出|输出|形成|编制)[^。；\n]{0,26}(?:研报|(?:深度|研究|策略|行业|信用|尽调|点评|专题|投资|可行性)[^。；\n]{0,8}报告)|(?:研究|策略|信用|尽调|专题)报告(?:撰写|编制)|(?:专题研究|行业研究|尽职调查)[^。；\n]{0,20}(?:撰写|编制)分析报告|上市公司[^。；\n]{0,16}报告撰写/],
 ['建模与估值',/(?:搭建|建立|构建|开发|优化)[^。；\n]{0,22}(?:预测|估值|定价|风险|财务|金融|量化)[^。；\n]{0,6}模型|(?:财务|估值|定价|风险|量化)模型(?:搭建|开发|构建)|财务预测|估值(?:分析|建模)|(?:财务|估值|定价)建模/],
 ['组合与基金分析',/(?:分析|研究|构建|优化|拟定|制定)[^。；\n]{0,18}(?:资产配置|投资组合|基金组合|配置方案)|资产配置(?:研究|模型|方案|建议)|组合(?:构建|优化|归因|分析|研究)|基金(?:评价|筛选|研究|绩效归因)|管理人(?:研究|尽调)|绩效归因/],
 ['因子与策略开发',/(?:开发|构建|检验|优化|回测)[^。；\n]{0,20}(?:因子|策略|信号)|策略(?:回测|开发|测试)|因子(?:挖掘|开发|检验)|衍生品定价|波动率曲面/]
];
const financeResearch=[
 ['行业与基本面',/(?:行业|产业|赛道|公司|个股|上市公司|金融市场|资本市场|二级市场|商业模式|投资价值|基本面)[^。；\n]{0,9}(?:深度研究|研究|分析)|(?:深入|深度|专题|基本面)研究/],
 ['宏观与信用',/(?:宏观(?:经济)?|利率|债券|固收|信用|转债|发债主体|发行人|商品产业链)[^。；\n]{0,10}(?:研究|分析)|开展[^。；\n]{0,30}(?:发债主体|发行人)[^。；\n]{0,8}(?:研究|分析)/],
 ['尽调与投资判断',/尽职调查|(?:投资|项目|主体|信用)尽调|尽调访谈|管理层访谈|可行性分析|投资(?:机会|标的)(?:筛选|评估)|挖掘投资机会|投资判断/]
];
const financeSupport=/清算|对账|划款|档案归档|材料归档|报送|排版|设备台账|会议安排|路演安排|系统维护|行政事务|拉新|开户|获客|销售指标|渠道维护|客户开发|审批流程|准入材料|推介材料|产品介绍材料/;
const financeSales=/机构销售|销售实习|渠道销售|财富顾问|理财顾问|开户拉新|销售指标|客户开发|开发客户|销售转化|产品销售|销售产品/;
const financeExecution=/簿记建档|债券承销|申报材料|发行材料|发行执行|交易执行|交易指令|下单|询价配售|项目执行|融资流程|交易要素整理|交易数据统计/;
const technicalGate=/(?:熟练|精通|掌握|擅长|具备|必须|要求|熟悉)[^。；\n]{0,40}(?:\b(?:Python|C\+\+|MATLAB|Linux|机器学习|深度学习)\b|C\+\+|高频|随机过程|复杂定价|量化(?:策略|研究)经验|(?:财务|估值|定价|风险|金融)模型)|(?:已有|曾有|曾在|必须有|至少)[^。；\n]{0,32}(?:投研|并购|量化|投行|行业)[^。；\n]{0,14}(?:实习|经验|经历)/i;
const preferredCondition=/优先|加分|为佳|更佳|不限|优先考虑|preferred|a plus/i;
const cohortCondition=/(?:20\d{2}(?:\s*(?:至|[—–~/-])\s*(?:20)?\d{2})?\s*(?:届|年毕业)|次年毕业|毕业时间|毕业届别)/;
const pickAttendance=/(?:每周|每星期|一周)[^。；;\n]{0,22}(?:[0-7一二三四五六七]\s*(?:天|日))|全勤/;
const pickDuration=/(?:\d+(?:\s*[-至~—]\s*\d+)?|[一二三四五六七八九十]+)\s*个\s*月|(?:实习(?:期|时长)?|至少|不少于|连续|持续)\s*(?:\d+|[一二三四五六七八九十]+)\s*月(?!份|[0-9日])/;
const pickStart=/(?:立即|尽快|近期|下周|本周|尽早)\s*(?:到岗|入职)|(?:到岗|入职)时间|(?:到岗|入职)[^。；;\n]{0,18}\d+月/;
const pickListPrefix=/^\s*(?:[-•·]\s*|\(?\s*[0-9]+\s*[、.)．，,]\s*)/;
const dutyAction=/^(?:(?:在|由)[^，,。；]{1,28}(?:指导|带领)下\s*[，,]?\s*)?(?:协助|负责|参与|开展|进行|完成|支持|撰写|搭建|分析|研究|开发|维护|跟踪|收集|编制|整理|了解|Assist\b|Conduct\b|Support\b|Develop\b)/i;
const productWork=[
 ['调研与需求分析',/用户调研|竞品分析|需求分析|需求挖掘|用户需求|产品调研/],
 ['方案与原型',/原型设计|需求文档|PRD|方案设计|产品设计|实验需求|策略设计/i],
 ['数据与实验',/数据分析|实验效果|指标设计|AB\s*(?:测试|实验|指标)|A\/B|效果评估|模型评测/i],
 ['推动上线',/跟进[^。\n]{0,22}(?:研发|上线)|推动[^。\n]{0,22}(?:上线|落地)|全流程|版本迭代|迭代上线/]
];
// Only dated evidence about the matching business. Brand, compensation and conversion are separate.
const institutionEvidence=[
  {company:'中金公司',applies:j=>j.pool==='core'&&j.team==='研究部',
   label:'2025 年报 · 研究业务与行业覆盖',scope:'年报披露研究部业务，家电组的独立规模及留用待核。',
   url:'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0416/2026041600447_c.pdf'},
 {company:'兴证全球基金',applies:j=>j.family==='配置与基金',
   label:'2025 三季报 · 多资产 FOF',scope:'已披露的同类策略，团队当前规模及留用未核实。',
   url:'https://www.xqfunds.com/data/20251027164455jjpz.pdf'}
];
let personalPicksState, financeAssessmentCache;

function pickSections(j){
 const duties=[],requirements=[];
 let section=null,pendingAvailability=false;
 for(const [index,line] of (j.original||'').split(/\r?\n/).entries()){
  const value=line.trim().replace(pickListPrefix,'').replace(/^[【\[]\s*/,'');
  if(!value)continue;
  const inline=value.match(/(?:【|\[)(?:任职资格|岗位要求|任职要求|应聘要求|实习要求)(?:】|\])/);
  if(pickDuties.test(value)){
   section=duties;
   duties.push(value.slice(0,inline?.index??value.length).replace(pickDuties,''));
   if(inline){section=requirements;requirements.push(value.slice(inline.index+inline[0].length).replace(/^\s*[:：]?\s*/,''))}
  }
  else if(pickRequirements.test(value)){section=requirements;section.push(value.replace(pickRequirements,''))}
  else if(pickAvailability.test(value)){
   section=false;
   const content=value.replace(pickAvailability,'');
   if(content)requirements.push(line.trim());
   else {pendingAvailability=true;continue}
  }
  else if(pickSectionEnd.test(value)||/^(?:转正后|实习期满|正式入职后|投递|请将简历)/.test(value))section=false;
  else if(pendingAvailability){requirements.push(line.trim());section=false}
  else if(section)section.push(line.trim());
  else if(index>0&&section===null&&dutyAction.test(value.normalize('NFKC').replace(/^\s*\(?\d+[)、.．]\s*/,'')))duties.push(line.trim());
  pendingAvailability=false;
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
  return years&&/(?:工作|全职|行业|互联网|产品|从业|研发|分析师|投研)/.test(years[0])&&
   !/^(?:者|的)?\s*(?:优先|加分|为佳|更佳)/.test(clause.slice(years.index+years[0].length));
 }));
}

function pickGate(j,requirements,remoteOnly){
 const trim=line=>line.replace(/^\s*(?:[-•]|[0-9]+[、.)．])\s*/,'').replace(/[；;。]+$/,'');
 const cohort=[j.cohort,...requirements].filter(Boolean)
  .map(line=>line.normalize('NFKC').match(/(?:限|面向)?20\d{2}\s*(?:[–—~-]\s*(?:20)?\d{2}\s*)?(?:届|年毕业)/)?.[0]).find(Boolean);
 const timePattern=/(?:每周|每星期|实习期|到岗|连续实习)\s*[^。\n]{0,28}(?:[天日]|个月)/;
 const availability=requirements.map(trim).find(line=>timePattern.test(line));
 const schedule=availability?.slice(availability.search(timePattern))||[j.days,j.months].filter(Boolean).join(' · ');
 const skill=requirements.map(trim).find(line=>/\b(?:SQL|Python|Axure|Figma|Wind)\b|C\+\+|AI\s*工具|估值模型|财务模型|中英文读写/i.test(line));
 const gate=[cohort,remoteOnly?'远程安排待确认':null,schedule||skill].filter(Boolean).join(' · ');
 return gate||'任职条件见原文';
}

function pickOpening(j,now){
 const officialSource=j.sources?.find(s=>s.original_verified);
 const official=Boolean(j.official_verified||officialSource);
 const deadline=pickDeadline(j),verified=pickTime(j.last_verified_at);
 const closed=deadline<now?'已截止':j.decision?.opening==='closed'||/^(?:明确关闭|已过期)$/.test(j.opening_status)?'已关闭或过期':'';
 const open=!closed&&j.decision?.opening==='open'&&official&&verified>=now-pickWeek&&verified<=now;
 const seen=pickTime(j.published_at||j.article_published_at||j.forwarded_at||j.first_seen_at||j.first_discovered_at);
 const current=open||(!j.outside_current_scan&&Number.isFinite(seen)&&seen>=now-pickWeek);
 return {officialSource,official,open,closed,current,deadline,seen};
}

function pickLocation(j,profile,requirements){
 const places=(j.cities||j.city?.split(/[、/，,]/)||[]).map(p=>p.trim());
 const cities=places.filter(p=>profile.internship_cities.some(city=>p===city||p===city+'市'));
 const remoteText=[j.title,j.remote_arrangement,...requirements,...(j.original||'').split(/\r?\n/).filter(line=>
  /^(?:[【\[]\s*)?(?:工作地点|实习地点|远程安排|实习形式|可(?:短期)?远程|(?:线上|线下)\s*[/、或]\s*(?:线上|线下)(?:方式)?均可)/.test(line.trim().normalize('NFKC').replace(pickListPrefix,''))
 )].filter(Boolean).join('\n');
 const remoteWork=/(?:可|支持|接受|全程|允许)\s*(?:短期)?远程(?!面试|笔试|面谈|测评|沟通|培训)|远程(?:实习|办公|工作)|[【\[]远程[】\]]|(?:线上\s*[/、或]\s*线下|线下\s*[/、或]\s*线上)(?:方式)?均可/.test(remoteText);
 const remoteDenied=/(?:不支持|不接受|不能|不可|不允许|谢绝)\s*(?:安排)?远程(?!面试|笔试|面谈|测评)/.test(remoteText);
 const remoteOnly=!cities.length&&profile.remote!==false&&!remoteDenied&&
  (remoteWork||places.includes('远程')&&!/远程(?:面试|笔试|面谈|测评)/.test(remoteText));
 return {where:cities.join(' / ')||(remoteOnly?'远程':places.join(' / ')||'地点待核'),
  remoteOnly,known:Boolean(cities.length||remoteOnly),outside:!cities.length&&!remoteOnly&&places.length>0};
}

function productPick(j,snapshot,profile,now){
 if(!j.company||!j.title||!ReadingQueue.decisionReady(j)||feedback[j.id]?.ignored||feedback[j.id]?.applied)return null;
 const {open,closed,current,official,seen}=pickOpening(j,now);
 const {duties,requirements}=pickSections(j);
 const {where,known,remoteOnly}=pickLocation(j,profile,requirements);
 if(closed||!current||!known)return null;
 const title=j.title;
 if(!/产品(?:经理|策划|实习|助理|设计)|Product (?:Manager|Intern)/i.test(title)||
    /硬件产品|产品运营(?:实习|助理|专员)|(?:市场营销|渠道销售|内容运营|销售)(?:岗|助理|经理|实习|专员)/.test(title))return null;
 if(pickFullTimeRequirement(requirements))return null;
 const work=productWork.filter(([,pattern])=>duties.some(line=>pattern.test(line))).map(([label])=>label);
 if(!work.some(label=>label!=='数据与实验'))return null;
 const source={kind:j.source_kind,name:j.source_name,url:j.url};
 const origin=ReadingQueue.sourceLabel(source.name===title?{...source,name:''}:source,snapshot);
 return {j,isProduct:true,open,where,work,gate:pickGate(j,requirements,remoteOnly),origin,
  rank:[Math.min(work.length,2),Number(open),work.length,Number(Boolean(j.team)),Number(official),seen||0]};
}

function priorityOwner(){
 const local=location.protocol==='http:'&&location.port==='18936'&&['127.0.0.1','localhost','[::1]'].includes(location.hostname);
 const profile=DATA?.profile;
 return local&&!window.RadarPublication&&Boolean(profile?.education?.length&&profile.priorities?.length&&profile.internship_cities?.length);
}

function workEvidence(patterns,lines){
 return patterns.flatMap(([label,pattern])=>{
  const quote=lines.find(line=>pattern.test(line));
  return quote?[{label,quote}]:[];
 });
}

function financeFit(j,profile,work){
 const confirmed=[...(profile.experience||[]),...(profile.projects||[])];
 const consumer=/消费(?:品|行业)|家电|零售|餐饮|食品饮料|纺服|美妆|快消|消费组/;
 const sector=/(?:消费|零售).*(?:研究|分析)/,allocation=/(?:资产.*配置|多资产)/,credit=/(?:债券|信用).*尽调/;
 const rules=[
  [sector,'直接相关',work.filter(e=>['行业与基本面','研究报告','建模与估值'].includes(e.label)&&(consumer.test(j.title)||consumer.test(e.quote))),'已有行业研究经历可接续同类赛道'],
  [allocation,'直接相关',work.filter(e=>e.label==='组合与基金分析'&&j.pool==='core'),'已有配置经历可接续配置、组合或基金研究'],
  [credit,'直接相关',work.filter(e=>j.family==='固收投资研究'&&/债券|信用|发行人|发债主体|固收|转债/.test(e.quote)),'已有尽调经历可接续信用和发行人研究'],
  [sector,'方法可迁移',work.filter(e=>['行业与基本面','研究报告'].includes(e.label)),'可迁移行业框架，需补该团队覆盖行业的知识'],
  [credit,'方法可迁移',work.filter(e=>e.label==='尽调与投资判断'),'可迁移资料核验和访谈，股权判断和交易执行需另核'],
  [allocation,'方法可迁移',work.filter(e=>e.label==='组合与基金分析'),'可迁移组合思维，量化建模能力单独核对'],
  [/并购.*(?:公告|文本)/,'方法可迁移',work.filter(e=>/并购|公告|收购|M&A/i.test(e.quote)),'可迁移公告分析，估值和交易执行需另核'],
  [/期权.*概率/,'方法可迁移',work.filter(e=>/期权|衍生品|波动率/.test(e.quote)),'可迁移概率分析，编程、交易和复杂定价需另核'],
 ];
 const used=new Set();
 return rules.flatMap(([pattern,level,evidence,note])=>{
  const experience=confirmed.find(value=>pattern.test(value)&&!used.has(value));
  if(!experience||!evidence.length)return [];
  used.add(experience);
  return [{experience,level,note,quote:evidence[0].quote}];
 });
}

function requirementClauses(requirements){
 return requirements.flatMap(line=>line.normalize('NFKC').replace(pickListPrefix,'').split(/[。；;]/))
  .map(line=>line.trim()).filter(Boolean);
}

function requiredClauses(clauses){
 return clauses.flatMap(line=>!preferredCondition.test(line)?[line]:line.split(/[，,]/)
  .filter(part=>/必须|限于|只招|至少|不少于|须具备|熟练(?:掌握|使用)|(?<!非)全勤/.test(part)&&!preferredCondition.test(part)));
}

function financeSchedule(j,clauses){
 const parts=clauses.flatMap(line=>line.split(/[，,]/)).map(part=>part.trim());
 const available=[
  parts.find(part=>pickAttendance.test(part))||j.days,
  parts.find(part=>pickDuration.test(part))||j.months,
  parts.find(part=>pickStart.test(part))||j.start,
 ];
 const [attendance,duration,start]=available;
 const unknown=!attendance&&!duration?'出勤与时长待核':!attendance?'出勤待核':!duration?'实习时长待核':'';
 return {summary:[...new Set(available.filter(Boolean))].join(' · '),quotes:[...new Set(available.filter(Boolean))],unknown};
}

function financeAssessment(j,data,now){
 const {duties,requirements}=pickSections(j);
 const lines=duties.flatMap(line=>line.split(/[。；;]/)).map(line=>line.trim()).filter(Boolean);
 const outputs=workEvidence(financeOutputs,lines),research=workEvidence(financeResearch,lines);
 const work=[...outputs,...research];
 const salesLines=lines.filter(line=>financeSales.test(line));
 const sales=financeSales.test(j.title)||salesLines.length>0;
 const support=lines.filter(line=>financeSupport.test(line));
 const execution=lines.filter(line=>financeExecution.test(line));
 const secondary=[...new Set([...salesLines,...execution,...support])];
 const analysisLines=lines.filter(line=>!secondary.includes(line)&&[...financeOutputs,...financeResearch].some(([,pattern])=>pattern.test(line)));
 const mixed=work.length>0&&(sales||secondary.length>0&&secondary.length>=analysisLines.length);
 const depth=outputs.length>1?4:outputs.length?3:research.length?2:secondary.length||sales?1:0;
 const nature=mixed?(sales?'研究与销售混合':execution.length?'研究与交易支持混合':'研究与运营支持混合'):
  depth>=3?'有研究或投资产出':depth===2?'参与研究或尽调':
  sales?'销售职责':execution.length?'交易执行与材料':support.length?'流程与运营支持':'职责待核';
 const fit=financeFit(j,data.profile,work);
 const direct=fit.filter(x=>x.level==='直接相关'),transferable=fit.filter(x=>x.level==='方法可迁移');
 const institution=institutionEvidence.find(e=>e.company===j.company&&e.applies(j));
 const opening=pickOpening(j,now),place=pickLocation(j,data.profile,requirements);
 const namedTeam=j.team||j.title.match(/研究所[^，,。()（）]{1,16}(?:团队|小组)/)?.[0];
 const teamProof=namedTeam?(opening.official?'官方 JD 载明 '+namedTeam:'招聘原帖载明 '+namedTeam):'具体团队待核';
 const business=2*Number(Boolean(institution))+Number(Boolean(namedTeam&&opening.official));
 const conditions=j.matching?.eligibility?.conditions||[];
 const conflicts=conditions.filter(c=>c.state==='冲突');
 const clauses=requirementClauses(requirements);
 const required=requiredClauses(clauses);
 const cohort=required.find(line=>cohortCondition.test(line));
 const skill=required.find(line=>technicalGate.test(line));
 const unknownCohort=cohort&&!conditions.some(c=>c.name==='毕业届别'&&c.state==='满足');
 const unprovenSkill=skill&&!conditions.some(c=>c.name==='硬性技能/经历'&&c.state==='满足');
 const missing=new Set(j.decision?.information_missing||[]);
 const source=opening.officialSource||j.sources?.[0];
 const origin=source?ReadingQueue.sourceLabel(source.name===j.title?{...source,name:''}:source,PRODUCT):'来源待核实';
 const type=j.family||data.pools[j.pool]||'岗位方向待核';
 const schedule=financeSchedule(j,clauses);
 const shortCohort=cohort?.match(cohortCondition)?.[0];
 const gap=unprovenSkill?(/\b(?:Python|Linux|MATLAB)\b|C\+\+/i.test(skill)?'编程及相关环境待核':
  /模型|定价|随机过程/.test(skill)?'建模或定价能力待核':'JD 要求的专业技能或经历待核'):'';
 const checks=[unknownCohort&&shortCohort+'待核',!place.known&&!place.outside&&'实习地点待核',
  place.remoteOnly&&data.profile.remote==null&&'远程安排待核',gap,schedule.summary,schedule.unknown].filter(Boolean);
 const fullTime=pickFullTimeRequirement(requirements);
 const bankGate=j.bank_gate&&data.profile.bank_specialist!==true;
 const choice=opening.closed?{label:opening.closed,level:0,note:'以 JD 的截止时间或关闭状态为准'}:
  conflicts.length||place.outside||fullTime||j.excluded_reason?{label:'明显不符',level:0,note:conflicts.length?
   conflicts.map(c=>c.name+' '+c.reason).join('；'):place.outside?'JD 地点超出当前实习范围':fullTime?'原文要求多年工作经历':j.excluded_reason}:
  bankGate?{label:'待核专业岗',level:2,note:'银行专业岗待确认是否考虑'}:
  !j.company||missing.has('company')||missing.has('role')?{label:'资料待补',level:1,note:'机构或具体岗位待核'}:
  mixed||sales||depth===1||j.pool==='adjacent'?{label:'备选',level:2,note:nature}:
  !depth||missing.has('duties')?{label:'资料待补',level:1,note:'JD 中尚无可确认的研究、投资或交易职责'}:
  !place.known||!opening.current||unknownCohort?{label:'先核条件',level:3,note:!opening.current?'旧线索，先核当前招聘状态':!place.known?'实习地点待核':shortCohort+'待核'}:
  missing.has('requirements')||!requirements.length?{label:'先核条件',level:3,note:'JD 未披露可核对的任职要求'}:
  unprovenSkill?{label:'值得冲刺',level:4,note:gap}:
  {label:opening.open?'优先评估':'先核开放',level:5,note:opening.open?'':'确认是否仍招'};
 const route={core:3,quant:2,primary:1,adjacent:0}[j.pool]??0;
 const due=Number(opening.open&&opening.deadline>=now&&opening.deadline-now<=3*86400000);
 return {j,choice,type,nature,work,secondary,mixed,depth,fit,direct,transferable,institution,teamProof,business,
  opening,place,origin,checks,schedule,cohort:unknownCohort?cohort:null,skill:unprovenSkill?skill:null,conflicts,route,due};
}

function compareFinance(a,b){
 return b.choice.level-a.choice.level||b.depth-a.depth||b.route-a.route||
  Number(Boolean(b.direct.length))-Number(Boolean(a.direct.length))||b.business-a.business||
  Number(Boolean(b.transferable.length))-Number(Boolean(a.transferable.length))||
  b.due-a.due||Number(b.opening.open)-Number(a.opening.open)||
  (b.opening.seen||0)-(a.opening.seen||0)||a.j.id.localeCompare(b.j.id);
}

function financeAssessments(now=Date.now()){
 const minute=Math.floor(now/60000);
 if(financeAssessmentCache?.data!==DATA||financeAssessmentCache?.product!==PRODUCT||financeAssessmentCache?.minute!==minute){
  financeAssessmentCache={data:DATA,product:PRODUCT,minute,
   byId:new Map(DATA.jobs.map(j=>[j.id,financeAssessment(j,DATA,now)]))};
 }
 return financeAssessmentCache.byId;
}

function rankPersonalPicks(data,product,now=Date.now()){
 const profile=data.profile;
 const assessments=financeAssessments(now);
 const used=new Set();
 const lanes=[
  {key:'core',title:'投研主线',limit:2,jobs:data.jobs.filter(j=>j.pool==='core')},
  {key:'quant',title:'交易量化',limit:1,jobs:data.jobs.filter(j=>j.pool==='quant')},
  {key:'primary',title:'一级投资与投行',limit:1,jobs:data.jobs.filter(j=>j.pool==='primary')},
  {key:'product',title:'产品备选',limit:2,jobs:product?.jobs||[]}
 ];
 for(const lane of lanes){
  const candidates=lane.key==='product'?lane.jobs.map(j=>productPick(j,product,profile,now)).filter(Boolean).sort((a,b)=>{
    for(let i=0;i<a.rank.length;i++)if(a.rank[i]!==b.rank[i])return b.rank[i]-a.rank[i];
    return a.j.id.localeCompare(b.j.id);
   }):lane.jobs.map(j=>assessments.get(j.id)).filter(a=>
    a.choice.level>=4&&!feedback[a.j.id]?.ignored&&!feedback[a.j.id]?.applied&&a.opening.current&&a.place.known
   ).sort(compareFinance);
  lane.picks=[];
  for(const pick of candidates){
   const company=pick.j.company.normalize('NFKC').replace(/\s/g,'');
   const group=[lane.key,company].join('|');
   if(used.has(group))continue;
   used.add(group);
   lane.picks.push(pick);
   if(lane.picks.length===lane.limit)break;
  }
 }
 return lanes;
}

function priorityBadge(a){
 const tone=a.choice.level===0?'conflict':a.choice.label==='优先评估'?'positive':a.choice.level>2?'warning':'';
 return el('span','badge '+tone,a.choice.label);
}

function priorityNext(a){
 const check=[a.choice.note,...a.checks].filter(Boolean);
 return [...new Set(check)].slice(0,a.choice.level===0?1:3).join(' · ');
}

function priorityOpening(a){
 return a.opening.open?'已核实开放':a.opening.closed||'开放状态待核';
}

function priorityWork(a){
 const evidence=[...new Set(a.work.map(x=>x.label))].slice(0,3).join('、');
 return a.mixed? a.nature+(evidence?' · '+evidence:''):evidence||a.nature;
}

function personalPickCard(pick){
 const {j,isProduct,institution,origin}=pick;
 const article=el('article','personal-pick');
 article.dataset.id=j.id;
 const top=el('div','pick-top');
 top.append(el('strong','pick-company',[j.company,j.team].filter(Boolean).join(' / ')),
  isProduct?el('span','badge '+(pick.open?'positive':'warning'),pick.open?'已核实开放':'开放待核'):priorityBadge(pick));
 const title=link(j.title,(isProduct?'/?job=':'/finance?job=')+encodeURIComponent(j.id));
 title.className='pick-title';
 if(!isProduct)title.onclick=e=>{
  if(e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  e.preventDefault();showDetail(DATA?.jobs.find(job=>job.id===j.id)||j);
 };
 const where=isProduct?pick.where:pick.place.where;
 const fit=isProduct?null:pick.fit[0];
 const gate=isProduct?pick.gate:priorityNext(pick);
 article.append(top,title,el('p','pick-meta',where+' · '+origin),
  el('p','pick-work',isProduct?pick.work.slice(0,3).join(' · '):priorityWork(pick)));
 if(fit)article.append(el('p','pick-fit',fit.level+' · '+fit.experience));
 if(gate)article.append(el('p','pick-gate',gate));
 if(institution){
  const fact=link(institution.label,institution.url);
  fact.className='pick-evidence';
  article.append(fact);
 }
 return article;
}

function renderPersonalPicks(){
 if(!priorityOwner()){
  $('personal-picks')?.remove();
  personalPicksState=null;
  return;
 }
 const now=Date.now();
 const dismissed=JSON.stringify(Object.entries(feedback).filter(([,v])=>v?.applied||v?.ignored).map(([id])=>id).sort());
 if(personalPicksState?.data===DATA&&personalPicksState.product===PRODUCT&&personalPicksState.dismissed===dismissed&&now-personalPicksState.at<60000)return;
 const lanes=rankPersonalPicks(DATA,PRODUCT,now);
 const signature=JSON.stringify(lanes.map(lane=>lane.picks.map(p=>{
  const {j,isProduct,origin,institution}=p;
  return [j.id,j.company,j.team,j.title,origin,institution?.url,isProduct?[p.where,p.work,p.gate,p.open]:
   [p.place.where,priorityWork(p),p.choice.label,p.fit[0]?.experience,p.fit[0]?.level,priorityNext(p)]];
 })));
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
 heading.append(name,el('p','','金融先看职责深度与团队证据 · 随岗位更新'));
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
  for(const id of fields)$(id).value=({period:'all',sort:defaultSort(),focus:key}[id]||'');
  setView('jobs');render();$('query').focus({preventScroll:true});$('jobs').scrollIntoView({block:'start'})
 });
 const assessment=priorityOwner()?financeAssessments():null;
 const q=$('query').value.trim().toLowerCase(),focus=$('focus').value,period=$('period').value,allPools=decisionFocus.has(focus);
 const bucket=$('bucket').value;
 const rows=DATA.jobs.filter(j=>(allPools||j.pool===pool)&&(!q||[j.company,j.title,j.team,j.original].join(' ').toLowerCase().includes(q))&&(!$('city').value||($('city').value==='unknown'?!j.cities.length:j.cities.includes($('city').value)))&&(!$('type').value||j.internship_type===$('type').value)&&(!$('family').value||j.family===$('family').value)&&(!$('eligibility').value||j.matching.eligibility.state===$('eligibility').value)&&(!bucket||(assessment?.get(j.id)?.choice.label||j.bucket)===bucket)&&(period==='all'||period==='week'&&recent(j)||period==='published'&&j.published_at&&recent(j))&&(!focus||focus==='ready'&&ReadingQueue.decisionReady(j)||focus==='information_gaps'&&ReadingQueue.decisionNeedsInformation(j)||focus==='new_ready'&&ReadingQueue.decisionNew(j)||focus==='open'&&(assessment?assessment.get(j.id).opening.open:ReadingQueue.decisionOpen(j))||focus==='today'&&ReadingQueue.decisionToday(j)||focus==='new'&&j.is_new||focus==='closing'&&closing(j)||focus==='changed'&&j.changes.length||feedback[j.id]?.[focus])&&(focus==='ignored'||!feedback[j.id]?.ignored));
 const rank={主方向:0,研究扩展:1,探索比较:2,相邻备选:3},order=$('sort').value;
 rows.sort((a,b)=>{if(order==='priority'&&assessment)return compareFinance(assessment.get(a.id),assessment.get(b.id));const bad=Number(a.bucket==='明显不符')-Number(b.bucket==='明显不符');if(bad)return bad;if(order==='evidence')return b.matching.competitiveness.evidence.length-a.matching.competitiveness.evidence.length;if(order==='deadline')return(a.deadline||'9999').localeCompare(b.deadline||'9999');if(order==='discovered')return b.first_discovered_at.localeCompare(a.first_discovered_at);return(rank[a.matching.direction.label]??0)-(rank[b.matching.direction.label]??0)||Number(b.is_new)-Number(a.is_new)||a.title.localeCompare(b.title,'zh')});
 $('count').replaceChildren(el('strong','',rows.length+' 条'),document.createTextNode(' · '+(allPools?'金融四池':DATA.pools[pool])));$('date-note').textContent=rows.filter(j=>!j.published_at).length+' 条首发未知 · 招聘信息条数不等于 HC';$('cards').replaceChildren();if(!rows.length){const e=el('div','empty');e.append(el('h3','','暂时没有匹配的岗位'),el('p','','可以清空筛选，或查看日期未知与历史信息。'));const reset=el('button','','清空筛选');reset.onclick=resetFilters;e.append(reset);$('cards').append(e)}else rows.forEach(j=>$('cards').append(card(j,assessment?.get(j.id))));
 $('inbox').replaceChildren();const all=DATA.jobs.filter(j=>j.pool===pool&&(period==='all'||recent(j)));for(const [key,label,test]of[['','全部',()=>true],['new','新发现',j=>j.is_new],['closing','临近截止',closing],['changed','有变化',j=>j.changes.length],['saved','收藏',j=>feedback[j.id]?.saved]]){const b=el('button','quick-focus');b.setAttribute('aria-pressed',focus===key);b.append(el('span','',label),el('span','n',all.filter(test).length));b.onclick=()=>{$('focus').value=key;render()};$('inbox').append(b)}
 const n=fields.filter(id=>!['query','sort'].includes(id)&&$(id).value!==({period:'week'}[id]||'')).length;$('filter-count').textContent=n;$('filters-toggle').textContent=n?'筛选 · '+n:'筛选';$('quick-query').value=$('query').value;document.querySelectorAll('[data-pool]').forEach(b=>b.setAttribute('aria-pressed',!allPools&&b.dataset.pool===pool));syncURL()}
function fact(parent,label,value){const n=el('span');n.append(el('span','muted',label+' '),el('b','',unknown(value)));parent.append(n)}

function renderFinancePriority(a){
 const section=el('section','finance-priority');
 section.append(el('h3','','评估依据'));
 const rows=el('dl','priority-rows');
 const add=(label,...nodes)=>{
  const row=el('div','priority-row'),value=el('dd');
  value.append(...nodes);
  row.append(el('dt','',label),value);
  rows.append(row);
 };
 const workQuotes=[...new Set(a.work.map(e=>e.quote))].slice(0,2);
 if(a.mixed&&a.secondary.length)workQuotes.push(a.secondary.find(quote=>!workQuotes.includes(quote))||a.secondary[0]);
 add('路线与职责',el('p','priority-lead',a.type+' · '+a.nature),
  ...[...new Set(workQuotes)].map(quote=>el('blockquote','quote',quote)));
 const business=[el('p','priority-lead',a.teamProof)];
 if(a.institution)business.push(link(a.institution.label,a.institution.url),el('p','muted',a.institution.scope));
 business.push(el('p','muted','团队独立排名、长期收入和实际留用待核。'));
 add('团队与业务',...business);
 const fits=a.fit.slice(0,2).map(f=>el('p','',f.level+' · '+f.experience+'。'+f.note+'。'));
 add('经历与缺口',...(fits.length?fits:[el('p','muted','已确认经历中暂无直接对应的职责。')]));
 const opening=priorityOpening(a)+(a.opening.open?' · '+date(a.j.last_verified_at):'');
 const quotes=[a.cohort,a.skill,...a.conflicts.map(c=>c.quote),...a.schedule.quotes].filter(Boolean);
 add('下一步核对',el('p','priority-lead',priorityNext(a)),el('p','muted',opening),
  ...[...new Set(quotes)].map(quote=>el('blockquote','quote',quote)));
 section.append(rows);
 return section;
}

function showDetail(j,open=true){activeJob=j.id;const d=$('detail-content');d.replaceChildren();const assessment=priorityOwner()?financeAssessments().get(j.id):null;const h=el('div','detail-intro');h.append(el('p','company',unknown(j.company)+(j.team?' / '+j.team:'')),el('h2','',j.title));h.lastChild.id='detail-title';h.append(ReadingQueue.sourceRow(j.sources,PRODUCT),assessment?priorityBadge(assessment):el('span','badge warning',j.bucket));if(!assessment)h.append(el('p','detail-why',j.why),el('p','notice',barrier(j)));d.append(h);if(assessment)d.append(renderFinancePriority(assessment));
 const apply=el('div','apply-box');apply.append(el('h3','','投递方式'));if(j.application_url)apply.append(link('打开投递入口 ↗',j.application_url));for(const email of j.emails){const row=el('div','email-row');row.append(el('span','',email));const b=el('button','','复制邮箱');b.onclick=async()=>{try{await navigator.clipboard.writeText(email);b.textContent='已复制 ✓';toast('投递邮箱已复制')}catch{toast('复制失败，请选中邮箱复制')}};row.append(b);apply.append(row)}if(!j.application_url&&!j.emails.length)apply.append(el('p','muted','投递方式尚未取得，请查看原文来源。'));if(j.application_note)apply.append(el('p','hint',j.application_note));const acts=el('div','cardactions');acts.append(feedbackButton(j,'saved','收藏'),feedbackButton(j,'applied','标记已投递'),feedbackButton(j,'ignored','忽略'));apply.append(acts);
 const facts=el('div','facts detail-facts');for(const[k,v]of[['地点',j.cities.join(' / ')],['类型',j.internship_type],['出勤',j.days],['时长',j.months],['补贴',j.pay],['截止',j.deadline],['远程',j.remote_arrangement],['到岗',j.start],['状态',assessment?priorityOpening(assessment):j.opening_status]])fact(facts,k,v);d.append(facts);
 const jd=el('details','jd');jd.open=!assessment;jd.append(el('summary','','原始 JD'),el('pre','',j.original));d.append(jd,apply);const grid=el('div','detailgrid'),a=el('div'),b=el('div');a.append(el('h3','','① 职业方向'),el('p','',j.matching.direction.reason),el('div','quote',unknown(j.matching.direction.quote)),el('h3','','② 当前竞争力'));for(const x of j.matching.competitiveness.evidence)a.append(el('p','',x.experience+'：'+x.note),el('div','quote',x.quote));if(!j.matching.competitiveness.evidence.length)a.append(el('p','','尚无明确经历证据。'));a.append(el('h3','','主要缺口'));for(const x of j.matching.competitiveness.gaps)a.append(el('p','',x.mandatory?'要求需补证':'偏好 / 加分，非硬门槛'),el('div','quote',x.quote));if(!j.matching.competitiveness.gaps.length)a.append(el('p','','JD 未提供可进一步核对的技能要求。'));table(b,['条件','状态','JD 原句 / 解释'],j.matching.eligibility.conditions.map(x=>[x.name,x.state,(x.quote||'JD 未写明')+'；'+x.reason]));b.prepend(el('h3','','③ 可投条件'));b.append(el('h3','','④ 机会质量'),el('p','',j.matching.quality.note),el('p','','职责性质：'+j.work_nature),el('div','quote','留用原话：'+unknown(j.conversion_quote)));grid.append(a,b);
 if(assessment){const conditions=el('details');conditions.append(el('summary','','完整匹配条件'),grid);d.append(conditions)}else d.append(grid);
 for(const version of j.repost_versions||[]){
  const other=el('details','jd repost-jd');other.append(el('summary','','转载原文 · '+version.title));
  if(version.source.url)other.append(link('打开该转载来源 ↗',version.source.url));
  other.append(el('pre','',version.original));d.append(other);
 }
 const meta=el('details');meta.append(el('summary','','来源与时间'));const dates=el('div','facts');for(const[k,v]of[['JD 首发',j.published_at],['文章发布',j.article_published_at],['转发',j.forwarded_at],['首次发现',j.first_discovered_at],['最后核验',j.last_verified_at]])fact(dates,k,date(v));meta.append(dates);j.sources.forEach(s=>{const label=ReadingQueue.sourceLabel(s,PRODUCT);meta.append(s.url?link(label+' ↗',s.url):el('span','',label),el('p','hint',s.kind+(s.original_verified?' · 官方页面已读，开放状态另核验':' · 原始发布方未独立核验')))});d.append(meta);if(open&&!$('job-detail').open)$('job-detail').showModal();syncURL()}
function resetFilters(){for(const id of fields)$(id).value=({period:'week',sort:defaultSort()}[id]||'');render()}
function setupData(){for(const [old,id] of Object.entries(DATA.job_aliases||{})){if(feedback[old]){feedback[id]={...feedback[old],...feedback[id]};try{localStorage.setItem('finance-feedback-v1',JSON.stringify(feedback))}catch{}}}const desired={};for(const id of fields)desired[id]=$(id).value;
 const priorPriority=$('sort').querySelector('[value="priority"]'),owner=priorityOwner();
 if(owner&&!priorPriority){option('sort','priority','评估优先级');$('sort').prepend($('sort').lastElementChild);desired.sort='priority'}
 else if(!owner&&priorPriority){priorPriority.remove();if(desired.sort==='priority')desired.sort='direction'}
 if(owner!==Boolean(priorPriority)){
  const states=owner?['优先评估','先核开放','值得冲刺','先核条件','资料待补','待核专业岗','备选','明显不符','已截止','已关闭或过期']:
   ['优先看','值得冲刺','待确认条件','备选','明显不符'];
  while($('bucket').options.length>1)$('bucket').remove(1);
  for(const state of states)option('bucket',state);
  if(!states.includes(desired.bucket))desired.bucket='';
 }
 $('pools').replaceChildren();for(const id of ['core','quant','primary','adjacent']){const b=el('button');b.dataset.pool=id;b.setAttribute('aria-pressed',id===pool);b.append(el('span','',DATA.pools[id]),el('span','n',DATA.jobs.filter(j=>j.pool===id).length));b.onclick=()=>{pool=id;$('family').value='';if(decisionFocus.has($('focus').value))$('focus').value='';render()};$('pools').append(b)}for(const id of ['city','type','family'])while($(id).options.length>({city:4,type:1,family:1}[id]))$(id).remove($(id).options.length-1);[...new Set(DATA.jobs.flatMap(j=>j.cities))].sort().filter(c=>!['北京','上海'].includes(c)).forEach(c=>option('city',c));DATA.types.forEach(x=>option('type',x));[...new Set(DATA.role_coverage.map(r=>r.family))].forEach(x=>option('family',x));for(const id of fields)if(desired[id])$(id).value=desired[id];for(const id of ['profile-content','rules','coverage-stats','institution-list','change-list','wechat-coverage'])$(id).replaceChildren();renderInformation();$('stamp').textContent='数据截至 '+date(DATA.generated_at);render()}
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
let checkingBackground=false;setInterval(async()=>{if(document.hidden||updating||checkingBackground)return;checkingBackground=true;try{const r=await fetch('./data/status.json',{cache:'no-store'});if(r.ok){const status=await r.json();renderRuntime(status);const published=status.published_at||status.finished_at;if(published&&(!DATA||Date.parse(published)>Date.parse(DATA.generated_at)))await load();}}catch{}finally{checkingBackground=false;renderPersonalPicks()}},60000);
