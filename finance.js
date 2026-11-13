'use strict';
let DATA, PRODUCT, pool, view='jobs', feedback={}, activeJob=null, toastTimer, updating=false;
const $=id=>document.getElementById(id);
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n};
const unknown=x=>x||'未知', date=x=>x?x.slice(0,16).replace('T',' '):'未知';
try{feedback=JSON.parse(localStorage.getItem('finance-feedback-v1')||'{}')}catch{}
const fields=['query','city','type','direction','family','eligibility','bucket','period','focus','sort'];
const restoreParams=new URLSearchParams(location.search),desktopMedia=matchMedia('(min-width:801px)');
$('filter-panel').open=desktopMedia.matches;desktopMedia.addEventListener('change',e=>{$('filter-panel').open=e.matches});
function link(label,url){const a=el('a','',label);if(url&&(/^https?:\/\//.test(url)||(url.startsWith('/')||url.startsWith('./')))){a.href=url;if(!(url.startsWith('/')||url.startsWith('./'))){a.target='_blank';a.rel='noopener noreferrer'}}return a}
function table(target,headers,rows){const wrap=el('div','tablewrap');wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',headers.join(' / '));const t=el('table'),head=el('tr'),body=el('tbody');headers.forEach(x=>head.append(el('th','',x)));const thead=el('thead');thead.append(head);t.append(thead,body);rows.forEach(r=>{const tr=el('tr');r.forEach(v=>{const td=el('td');if(v instanceof Node)td.append(v);else td.textContent=unknown(v);tr.append(td)});body.append(tr)});wrap.append(t);target.replaceChildren(wrap)}
function toast(text,undo){clearTimeout(toastTimer);($('job-detail').open?$('job-detail'):document.body).append($('toast'));$('toast').replaceChildren(el('span','',text));if(undo){const b=el('button','','撤销');b.onclick=()=>{undo();$('toast').hidden=true};$('toast').append(b)}$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,6000)}
function defaultSort(){return priorityOwner()?'priority':'direction'}
function defaultPool(){return 'all'}
function defaultPeriod(){return priorityOwner()?'all':'week'}
function syncURL(){const p=new URLSearchParams();if(pool&&pool!==defaultPool())p.set('pool',pool);if(view!=='jobs')p.set('view',view);for(const id of fields){const v=$(id).value;if(v&&v!==({period:defaultPeriod(),sort:defaultSort()}[id]||''))p.set(id,v)}if(activeJob)p.set('job',activeJob);history.replaceState(null,'',location.pathname+(p.size?'?'+p:''))}
function setView(next){view=['jobs','unread','coverage','profile','acceptance'].includes(next)?next:'jobs';for(const x of ['jobs','unread','coverage','profile','acceptance'])$(x).hidden=x!==view;$('reading-entry').hidden=view==='unread';$('decision-entry').hidden=view==='unread';document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===view));syncURL()}
function option(id,value,label=value){const o=el('option','',label);o.value=value;$(id).append(o)}
function inPeriod(j,period){
 if(period==='all')return true;
 const cutoff=pickTime(DATA.window_start);
 if(period==='published')return pickTime(j.published_at)>=cutoff;
 return !j.outside_current_scan&&[j.published_at,j.forwarded_at,j.article_published_at].some(value=>pickTime(value)>=cutoff);
}
function closing(j){if(!j.deadline)return false;const d=(Date.parse(j.deadline+'T23:59:59')-Date.now())/86400000;return d>=0&&d<=7}
function feedbackAction(j,key){const before=!!feedback[j.id]?.[key];feedback[j.id]??={};feedback[j.id][key]=!before;let saved=true;try{localStorage.setItem('finance-feedback-v1',JSON.stringify(feedback))}catch{saved=false}render();if(activeJob===j.id)showDetail(j,false);const msg=key==='saved'?(before?'已取消收藏':'已收藏，可在“收藏”查看'):key==='ignored'?(before?'已恢复显示':'已忽略这条岗位'):(before?'已取消投递标记':'已标记为已投递，不会自动发送');toast(msg+(saved?'':' · 本次页面有效'),()=>{feedback[j.id][key]=before;try{localStorage.setItem('finance-feedback-v1',JSON.stringify(feedback))}catch{}render();if(activeJob===j.id)showDetail(j,false)})}
function feedbackButton(j,key,label){const b=el('button','feedback',feedback[j.id]?.[key]?({saved:'已收藏',ignored:'恢复显示',applied:'已投递 ✓'}[key]):label);b.setAttribute('aria-pressed',!!feedback[j.id]?.[key]);b.onclick=()=>feedbackAction(j,key);return b}
function compactReason(j){return j.why.replace(/\s+/g,' ').trim()}
function barrier(j){const conflicts=j.matching.eligibility.conditions.filter(x=>x.state==='冲突');if(conflicts.length)return conflicts.map(x=>x.name+'：'+x.reason).join('；');return j.confirm.length?'待确认 '+j.confirm.slice(0,3).join('、')+(j.confirm.length>3?'等 '+j.confirm.length+' 项':''):'暂无已知硬条件冲突'}
function companyLabel(j,assessment){
 return [unknown(assessment?assessment.company:j.company),assessment?assessment.namedTeam:j.team].filter(Boolean).join(' / ');
}
function card(j,assessment){const c=el('article','card');c.dataset.id=j.id;const top=el('div','cardhead'),title=el('div','card-title');title.append(el('div','company',companyLabel(j,assessment)));const open=el('button','job-title',j.title.replace(/[【\[]感兴趣可以私信[】\]]/g,'').trim());open.onclick=()=>showDetail(j);title.append(open);const state=assessment?priorityBadge(assessment):el('span','badge '+(j.bucket==='明显不符'?'conflict':j.bucket==='优先看'?'positive':'warning'),j.bucket);top.append(title,state);c.append(top,ReadingQueue.sourceRow(j.sources,PRODUCT));const meta=el('div','facts');meta.append(el('span','place',assessment?.place.where||j.cities.join(' / ')||'地点未知'),el('span','',assessment?.type||j.family),el('span','',j.internship_type||'类型未知'),el('span','',(assessment?assessment.schedule.attendance:j.days)||'出勤未知'));c.append(meta);
 if(assessment)c.dataset.priority=assessment.choice.label;
 const reason=el('div','decision-line');reason.append(el('span','line-label',assessment?'职责':'值得看'),el('p','why',assessment?priorityWork(assessment):compactReason(j)));const gate=el('div','decision-line gate');gate.append(el('span','line-label',assessment?'下一步':'门槛'),el('p','barrier',assessment?priorityNext(assessment):barrier(j)));c.append(reason,gate);const missingProof=ReadingQueue.decisionMissing(j);if(missingProof.length)c.append(el('p','small','还缺 '+missingProof.join('、')));
 const bottom=el('div','card-bottom'),tags=el('div','signals');if(j.is_new)tags.append(el('span','new-dot','新发现'));if(closing(j))tags.append(el('span','deadline','截止 '+j.deadline));if(j.changes.length)tags.append(el('span','deadline','JD 有变化'));tags.append(el('span','muted',!j.published_at?'首发未知':j.published_at),el('span','muted',assessment?priorityOpening(assessment):j.opening_status));const acts=el('div','cardactions');acts.append(feedbackButton(j,'saved','收藏'));const detail=el('button','primary','看岗位 →');detail.onclick=()=>showDetail(j);acts.append(detail);bottom.append(tags,acts);c.append(bottom);return c}
const pickWeek=7*86400000;
const pickDuties=/^(?:岗位主要职责|岗位职责|职责描述|工作职责|工作内容|实习内容|实习职责|职位职责|主要职责|主要工作(?:内容)?|工作任务|职位描述|岗位描述|Responsibilities|Job Description)(?=$|[\s】\]:：])\s*[】\]:：]?\s*/i;
const pickRequirements=/^(?:任职资格|任职要求|岗位要求|应聘要求|招聘要求|职位要求|实习要求|基本要求|工作要求|资格要求|招聘条件|任职条件|Qualifications|Requirements|Successful Applicants?)(?=$|[\s】\]:：])\s*[】\]:：]?\s*/i;
const pickAvailability=/^(?:工作时间|实习时间|实习时长|实习周期|实习期限|到岗要求|毕业届别|出勤要求)(?=$|[\s】\]:：])\s*[】\]:：]?\s*[:：]?\s*/;
const pickSectionEnd=/^(?:应聘方式|申请方式|报名方式|投递方式|投递说明|简历投递|工作地点|实习地点|实习待遇|实习收获|岗位福利|实习补贴|你将获得|我们能提供|我们提供|福利待遇|公司介绍|公司简介|联系方式|Application|申请)(?=$|[\s】\]:：])/i;
const financeOutputs=[
 ['研究报告',/(?:撰写|完成|产出|输出|形成|编制)[^。；\n]{0,26}(?:研报|(?:深度|研究|策略|行业|信用|尽调|点评|专题|投资|可行性|新股申购)[^。；\n]{0,8}报告)|(?:研究|策略|信用|尽调|专题)报告(?:的)?(?:撰写|编制)|(?:专题研究|行业研究|尽职调查|行业及公司的研究)[^。；\n]{0,24}(?:报告(?:的)?撰写|(?:撰写|编制)分析报告)|上市公司[^。；\n]{0,16}报告撰写/],
 ['建模与估值',/(?:搭建|建立|构建|开发|优化)[^。；\n]{0,22}(?:预测|估值|定价|风险|财务|金融|量化)[^。；\n]{0,6}模型|(?:财务|估值|定价|风险|量化)模型(?:搭建|开发|构建)|模型(?:搭建|构建)|财务预测|估值(?:分析|建模)|(?:财务|估值|定价)建模/],
 ['组合与基金分析',/(?:分析|研究|构建|优化|拟定|制定)[^。；\n]{0,18}(?:资产配置|投资组合|基金组合|配置方案)|资产配置(?:研究|模型|方案|建议)|组合(?:构建|优化|归因|分析|研究)|基金(?:评价|筛选|研究|绩效归因)|管理人(?:研究|尽调)|绩效归因/],
 ['因子与策略开发',/(?:开发|构建|检验|优化|回测)[^。；\n]{0,20}(?:因子|策略|信号)|策略(?:回测|开发|测试)|因子(?:挖掘|开发|检验)|衍生品定价|波动率曲面/],
 ['战略分析与建议',/(?:商业|战略|经营)(?:决策|分析)[^。；\n]{0,22}(?:决策建议|战略机会|分析结论)|(?:制定|撰写|提出)[^。；\n]{0,20}(?:战略建议|投资建议|投资备忘录)/]
];
const financeResearch=[
 ['行业与基本面',/(?:行业|产业|赛道|公司|个股|上市公司|金融市场|资本市场|二级(?:市场|权益)|商业模式|投资价值|基本面)[^。；\n]{0,9}(?:深度研究|研究|分析)|(?:深入|深度|专题|基本面)研究/],
 ['宏观与信用',/(?:宏观(?:经济)?|利率|债券|固收|信用|转债|发债主体|发行主体|发行人|商品产业链)[^。；\n]{0,10}(?:研究|分析)|开展[^。；\n]{0,30}(?:发债主体|发行人)[^。；\n]{0,8}(?:研究|分析)/],
 ['尽调与投资判断',/尽职调查|(?:投资|项目|主体|信用)尽调|尽调访谈|管理层访谈|可行性分析|投资(?:机会|标的)(?:筛选|评估)|挖掘投资机会|投资判断/]
];
const financeSupport=/清算|对账|划款|(?:档案|材料|资料)归档|报送|排版|PPT\s*美化|(?:设备|业务)台账|会议安排|路演安排|系统维护|行政(?:事务|支持)|拉新|开户|销户|获客|销售指标|渠道维护|客户开发|审批流程|准入材料|推介材料|产品介绍材料|业务准入|运营支持|文件用印|其他[^。；\n]{0,16}支持工作|日常运维/i;
const financeSales=/机构销售|销售实习|渠道销售|财富顾问|理财顾问|开户拉新|销售指标|客户开发|开发客户|销售转化|产品销售|销售产品/;
const financeExecution=/簿记建档|债券承销|申报材料|发行材料|发行执行|(?:项目)?发行阶段|交易执行|交易指令|下单|询价配售|项目执行|项目投标|项目建议书制作|募集说明书撰写|工作底稿整理|融资流程|交易要素整理|交易数据统计/;
const technicalGate=/(?:熟练|精通|掌握|擅长|具备|必须|要求|熟悉)[^。；\n]{0,40}(?:\b(?:Python|SQL|R|MATLAB|Linux|Wind|Bloomberg)\b|C\+\+|彭博|机器学习|深度学习|高频|随机过程|复杂定价|量化(?:策略|研究)经验|(?:财务|估值|定价|风险|金融)模型)|(?:已有|曾有|曾在|必须有|至少)[^。；\n]{0,32}(?:投研|并购|量化|投行|行业)[^。；\n]{0,14}(?:实习|经验|经历)/i;
const preferredCondition=/优先|加分|为佳|更佳|不限|优先考虑|preferred|a plus/i;
const cohortCondition=/(?:20\d{2}(?:\s*(?:至|[—–~/-])\s*(?:20)?\d{2})?\s*(?:届|年(?:\s*(?:及|或)\s*(?:以[后前]|之后|之前))?\s*毕业)|次年毕业|毕业时间|毕业届别)/;
const pickAttendance=/(?:每周|每星期|一周|周\s*[≥>])[^。；;\n]{0,22}(?:[0-7一二两三四五六七]\s*(?:天|日))|全勤/;
const pickDuration=/(?:\d+(?:\s*[-至~—]\s*\d+)?|[一二三四五六七八九十]+)\s*个\s*月|(?:实习(?:期|时长)?|至少|不少于|连续|持续)\s*(?:\d+|[一二三四五六七八九十]+)\s*月(?!份|[0-9日])/;
const pickStart=/(?:可|能)?\s*(?:立即|尽快|近期|下周|本周|尽早)\s*(?:到岗|入职)(?:者?\s*优先)?|(?:到岗|入职)(?:日期|时间)?\s*[:：]?\s*(?:20\d{2}[-/年])?\d{1,2}(?:[-/]\d{1,2}|月(?:\d{1,2}日?)?)(?:前|起)?/;
const pickListPrefix=/^\s*(?:[-•·]\s*|\(?\s*[0-9]+\s*[、.)．，,]\s*)/;
const dutyAction=/^(?:(?:在|由)[^，,。；]{1,28}(?:指导|带领)下\s*[，,]?\s*)?(?:协助|负责|参与|开展|进行|完成|支持|撰写|搭建|分析|研究|开发|维护|跟踪|收集|编制|整理|了解|Assist\b|Conduct\b|Support\b|Develop\b)/i;
const dutyRequirement=/^(?:对.{1,30}(?:感兴趣|有.{0,8}(?:兴趣|热情))|具备|熟悉|熟练|精通|擅长|有.{0,30}(?:经验|经历)者?优先|相关专业|在校[本科硕研究生]|能(?:够)?(?:保证|连续|实习)|(?:每周|至少实习|尽快到岗))/;
const productWork=[
 ['调研与需求分析',/用户调研|竞品分析|需求分析|需求挖掘|用户需求|产品调研/],
 ['方案与原型',/原型设计|需求文档|PRD|方案设计|产品设计|实验需求|策略设计/i],
 ['数据与实验',/数据分析|实验效果|指标设计|AB\s*(?:测试|实验|指标)|A\/B|效果评估|模型评测/i],
 ['推动上线',/跟进[^。\n]{0,22}(?:研发|上线)|推动[^。\n]{0,22}(?:上线|落地)|全流程|版本迭代|迭代上线/]
];
// These sources verify a line of business only. They never certify pay or offers.
const institutionEvidence=[
  {company:'中金公司',applies:j=>j.pool==='core'&&j.team==='研究部',
   label:'2025 年报 · 研究业务与行业覆盖',scope:'公司研究部的业务披露。具体团队规模及留用待核。',
   asOf:'2026-04-16',
   url:'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0416/2026041600447_c.pdf'},
 {company:'兴证全球基金',applies:j=>j.family==='配置与基金',
   label:'2025 三季报 · 多资产 FOF',scope:'可核对同类资产配置策略。该岗团队的管理规模与留用待核。',
    asOf:'2025-10-28',url:'https://www.xqfunds.com/data/20251027164455jjpz.pdf'},
 {company:'蓝驰创投',applies:j=>j.pool==='primary'&&/AI|人工智能|硬科技/i.test(j.title),
   label:'蓝驰创投 · 2026 合伙人会议',scope:'可核对机构早期科技投资方向；个人决策权、奖金和分成均未知。',
    asOf:'2026-11-06',url:'https://www.lanchivc.com/8906/'},
 {company:'中芯聚源投资',applies:j=>j.family==='一级与战略投资'&&/投资/.test(j.team||''),
  label:'中芯聚源 · 半导体投资业务',scope:'官网披露半导体投资方向。实习中的项目参与深度以岗位原文为准。',
  asOf:'2026-11-13',checked:true,url:'https://cftcapital.com/about.aspx'},
 {company:'景顺投资',applies:j=>j.family==='一级与战略投资'&&/REPE/i.test(j.title),
  label:'景顺 · 中国投资业务',scope:'官网披露地产投资业务。该团队管理规模及实习留用情况待核。',
  asOf:'2026-11-13',checked:true,url:'https://www.invesco.com/apac/en/institutional/who-we-are/investing-in-china.html'},
 {company:'联想创投',applies:j=>j.family==='一级与战略投资',
  label:'联想创投 · 企业风险投资',scope:'官网披露 CVC 的科技投资与产业协同方向。实际负责的项目以岗位原文为准。',
  asOf:'2026-11-13',checked:true,url:'https://capital.lenovo.com/news/detail/id/1200/s/1.html'},
 {company:'光源资本',applies:j=>j.family==='股权投行与并购'&&/兼并|并购|M\s*[&＆]\s*A/i.test(j.title),
  label:'光源资本 · 并购顾问业务',scope:'官网披露并购顾问业务。实习是否参与交易建模及关键执行环节需按 JD 核对。',
  asOf:'2026-11-13',checked:true,url:'https://lighthousecap.cn/business.html'},
 {company:'易凯资本',applies:j=>j.family==='股权投行与并购',
  label:'易凯资本 · 并购及融资案例',scope:'官网披露已完成的交易案例。该岗位的项目分工、薪酬和留用待核。',
  asOf:'2026-11-13',checked:true,url:'https://www.ceccapitalgroup.com/index.php?a=lists&catid=8&happened=&industry=&service_type='},
 {company:'华泰联合证券',applies:j=>j.family==='债券承销与结构融资',
  label:'华泰证券 · 投行及债务融资业务',scope:'官网披露债务融资业务。具体团队的项目质量和实习分工以岗位证据为准。',
  asOf:'2026-11-13',checked:true,url:'https://www.htzq.com.cn/what-we-do/institutional-services/ib'},
 {company:'华泰联合证券',applies:j=>j.pool==='primary'&&/并购|重组|独立财务顾问/.test([j.team,j.title].join(' ')),
   label:'上交所 · 华电国际重组项目',scope:'披露华泰联合担任该项目的独立财务顾问。只说明并购业务，不外推至承销岗。',
    asOf:'2025-08-16',url:'https://www.sse.com.cn/disclosure/listedinfo/announcement/c/new/2025-08-16/600027_20250816_DNWH.pdf'}
];
const employerAliases=[
 ['申万宏源',/^(?:申万|申万宏源(?:证券)?(?:股份有限公司|有限公司)?(?:研究所|研究院|承销保荐(?:有限责任公司|有限公司)?)?|申万研究所.{0,24}|申银万国(?:证券)?研究所(?:有限公司)?|上海申银万国证券研究所(?:有限公司)?)$/],
 ['华西证券',/^华西证券(?:(?:股份)?有限公司)?(?:研究所|研究院)?$/],
 ['中金公司',/^(?:中金(?:公司)?|中国国际金融(?:股份有限公司)?|CICC)$/i],
 ['兴证全球基金',/^兴证全球(?:基金(?:管理(?:有限公司)?)?)?$/],
 ['蓝驰创投',/^蓝驰(?:创投|投资)$/],
 ['华泰联合证券',/^华泰联合(?:证券(?:有限责任公司)?)?$/]
];
const toEmployer=value=>{
 const normalized=(value||'').normalize('NFKC').replace(/\s/g,'').replace(/^[【\[]|[】\]]$/g,'');
 return employerAliases.find(([,pattern])=>pattern.test(normalized))?.[0]||value;
};
const exactHireSignal=/(?:进入|参加|直通|衔接)(?:本公司|本部门|本团队)?(?:正式)?(?:校招|秋招)(?:面试|考核|绿色通道|流程)|(?:发放|给予|获得)(?:全职|正式)(?:录用通知|offer)|(?:通过|经)(?:实习|留用|转正)?(?:考核|答辩)[^，。；]{0,12}(?:可转正|转为正式员工|予以留用|正式录用)/i;
const positiveHireSignal=/有留用|留用机会|留用答辩|可留用|予以留用|可转正|转正机会|转正留用|(?:可|优先)(?:进入|参加)(?:正式)?(?:校招|秋招)|直通(?:校招|秋招)|(?:校招|秋招)(?:优先|绿色通道)/;
const noHireSignal=/(?:暂)?不(?:提供|考虑|涉及|设|安排|予以)[^。；]{0,12}(?:留用|转正|正式录用)|无(?:留用|转正|正式录用)|不属于正式校招|不等于正式录用/;
const uncertainHireSignal=/不(?:保证|承诺|作为|代表|等于)[^。；]{0,16}(?:留用|转正|录用|offer)|未(?:承诺|公布)[^。；]{0,16}(?:留用|转正|录用)/i;
const formalPayLine=/^(?:【|\[)?(?:正式(?:岗(?:位)?|员工)|校招(?:全职|正式)岗(?:位)?)(?:固定薪酬|基本工资|底薪|基本薪酬)(?:】|\])?\s*[:：]?\s*(?:人民币\s*)?(?:￥|¥)?\d+(?:\.\d+)?(?:\s*(?:至|[-~—–])\s*\d+(?:\.\d+)?)?\s*(?:万?元\s*(?:[/／]\s*[月年]|每[月年])|[kK万]\s*[/／]\s*[月年])(?=$|[，,。；;\s（(])/;
const capitalWork=/投委会|投资决策|组合(?:构建|优化|归因)|账户风险分析|信用主体研究|发行人(?:研究|分析)|尽调报告|投资备忘录|投资建议|投资价值分析|策略(?:开发|回测)|因子(?:构建|开发|挖掘)|衍生品定价|组合配置方案/;
const bankingWork=/财务建模|财务模型|估值(?:分析|建模)|估值模型|交易结构(?:设计|分析)|尽调报告|并购分析|投资可行性分析/;

function careerPathway(j,opening,multipleRoles){
 const raw=(j.conversion_quote||'').trim();
 const source=j.sources?.[0]; // The primary source owns original and conversion_quote.
 const currentOfficial=!multipleRoles&&opening.open&&opening.internship&&source?.original_verified&&source.url;
 const quotes=[...new Set([raw,...(j.original||'').split(/\r?\n/)].flatMap(s=>s.split(/[。；;]/))
  .map(s=>s.trim()).filter(Boolean))];
 if(!multipleRoles){
  const denied=quotes.find(s=>noHireSignal.test(s));
  if(denied)return {rank:currentOfficial?-1:0,text:'原文写明不提供正式岗通道',quote:denied,url:source?.url};
  const positive=quotes.filter(s=>!uncertainHireSignal.test(s));
  const exact=positive.find(s=>exactHireSignal.test(s));
  const quote=exact||positive.find(s=>positiveHireSignal.test(s));
  if(quote)return {rank:currentOfficial&&exact?2:1,
   text:currentOfficial&&exact?'本岗位公告载明正式岗考核或招聘通道，录用未知':'原文提及留用或校招机会，名额和录用未知',quote,url:source?.url};
 }
 return {rank:0,text:raw?'正式岗通道未核实':'正式岗通道未披露',quote:raw||null,url:source?.url};
}

function careerPay(j,opening,multipleRoles){
 const source=j.sources?.[0];
 const comparable=!multipleRoles&&opening.open&&opening.internship&&source?.original_verified&&source.url&&j.team&&j.cohort&&j.cities?.length===1;
 const quote=comparable&&(j.original||'').split(/\r?\n/).map(line=>line.trim().normalize('NFKC'))
  .find(line=>formalPayLine.test(line));
 return quote?{text:'本岗位公告载明正式岗固定薪酬；实发奖金待核',quote,url:source.url}:
  {text:'同团队、同届正式岗的固定薪酬和奖金未知'};
}

function careerReturn(j,data,company,opening,analysisLines,ownsOutput,mainlySupport,multipleRoles){
 const backup=(data.profile.career_preferences?.backup_employers||[]).some(name=>toEmployer(name)===company);
 const pathway=careerPathway(j,opening,multipleRoles);
 const quote=analysisLines.find(line=>(j.pool==='primary'&&/承销|股权投行|并购|财务顾问/.test(j.family||'')?bankingWork:capitalWork).test(line));
 const evidence=quote||analysisLines.find(line=>workOwnership.test(line))||analysisLines[0];
 const valuable=Boolean(evidence&&!mainlySupport&&!multipleRoles);
 const route=!valuable?'下一跳待核':j.pool==='core'?
  (/卖方/.test(j.family||'')||/证券研究所|证券研究院/.test(j.title)?'卖方研究 / 行业覆盖':
   /固收/.test(j.family||'')?'固收投研 / 信用分析':/配置/.test(j.family||'')?'多资产 / 组合研究':
   /买方/.test(j.family||'')?'买方研究 / 投资判断':'研究 / 行业与公司分析'):
  j.pool==='quant'?'策略研究 / 交易研究':j.pool==='primary'?
  (/承销|股权投行|并购|财务顾问/.test(j.family||'')?'投行 / 并购与融资':'一级投资 / 行业与项目判断'):
  '商业分析 / 咨询备选';
  return {backup,pathway,evidence:valuable?evidence:null,route,decisionWork:Boolean(valuable&&quote),
  depth:valuable?(quote||ownsOutput?2:1):0,
  compensation:careerPay(j,opening,multipleRoles)};
}
let financeAssessmentCache;

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
 const seen=Math.max(0,...[j.published_at,j.article_published_at,j.forwarded_at].map(pickTime).filter(Number.isFinite));
 const current=open||(!j.outside_current_scan&&seen>=now-pickWeek&&seen<=now);
 const internship=Boolean((j.internship_type&&j.internship_type!=='未知')||
  /实习|\bIntern(?:ship)?\b/i.test(j.title)||
  /^\s*[【\[]?(?:招聘类别|岗位性质|招聘类型|岗位类别|工作性质|项目类型)[】\]]?\s*[:：]?\s*[^\n]{0,28}(?:实习|\binternship\b)/im.test(j.original||''));
 return {officialSource,official,open,closed,current,deadline,seen,internship};
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

const workOwnership=/^(?:在[^，。；]{1,25}(?:带领|指导)下[，,]?\s*)?(?:独立(?:完成|开展|撰写)?|主导|负责|撰写|搭建|构建|开发|编制)/;
const workAssistance=/^(?:协助|辅助|配合|参与|支持|跟随)/;
const contingentWork=/^(?:有机会|视(?:个人)?能力|视表现|表现(?:优异|优秀|良好|合格)|后续可|如果表现)/;
const teamMentoring=/带教|定期反馈|(?:导师|mentor)[^，。；]{0,26}(?:指导|培训)|分析师[^，。；]{0,15}指导|一对一(?:指导|培养)/i;
const englishGate=/(?:英语|中?英文)[^。；]{0,9}(?:流利|熟练|读写|工作语言)|(?:熟练|流利)[^。；]{0,14}(?:英语|英文|中英文)|雅思|托福|IELTS|TOEFL/i;
const specialistEnglish=/(?:工作语言|雅思|托福|IELTS|TOEFL|流利|TEM-?8|专八)/i;

function dutyLines(duties){
 return duties.flatMap(line=>line.split(/[。；;]|(?<=\s)[（(]?\d{1,2}[、.）)](?=\s*[^\d])|[、，,]\s*(?:包括但不限于\s*)?(?=(?:发债主体|发行主体|发行人)(?:研究|分析)|(?:项目|现场)?尽职调查|项目投标|项目建议书制作|募集说明书撰写|申报材料制作|工作底稿整理)/))
  .map(line=>line.trim().replace(pickListPrefix,'').replace(/^[（(]\d+[）)]\s*/,'')
   .split(/[，,](?=\s*(?:有机会|视(?:个人)?能力|视表现|表现(?:优异|优秀|良好|合格)|后续可|如果表现))/)[0])
  .filter(line=>line&&!contingentWork.test(line)&&!dutyRequirement.test(line));
}

function workEvidence(patterns,lines){
 return patterns.flatMap(([label,pattern])=>{
  const matches=lines.filter(line=>pattern.test(line));
  const quote=matches.find(line=>workOwnership.test(line))||matches.find(line=>!workAssistance.test(line))||matches[0];
  return quote?[{label,quote,owned:workOwnership.test(quote)}]:[];
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
 return requirements.flatMap(line=>line.normalize('NFKC').replace(pickListPrefix,'').split(/[。；;，,]/))
  .map(line=>line.trim()).filter(Boolean);
}

function financeSchedule(j,clauses){
 const pick=pattern=>clauses.find(part=>pattern.test(part)&&!preferredCondition.test(part))||clauses.find(part=>pattern.test(part));
 const attendance=pick(pickAttendance),duration=pick(pickDuration);
 const start=pick(pickStart)||j.start?.match(pickStart)?.[0];
 const quotes=[...new Set([attendance,duration,start].filter(Boolean))];
 const unknown=!attendance&&!duration?'出勤、时长待核':!attendance?'出勤待核':!duration?'时长待核':'';
 return {summary:quotes.join(' · '),quotes,attendance,duration,unknown};
}

function financeAssessment(j,data,now){
 const {duties,requirements}=pickSections(j);
 const lines=dutyLines(duties);
 const outputs=workEvidence(financeOutputs,lines),research=workEvidence(financeResearch,lines);
 const work=[...outputs,...research];
 const salesLines=lines.filter(line=>financeSales.test(line));
 const sales=financeSales.test(j.title)||salesLines.length>0;
 const support=lines.filter(line=>financeSupport.test(line));
 const execution=lines.filter(line=>financeExecution.test(line));
 const secondary=[...new Set([...salesLines,...execution,...support])];
 const analysisLines=lines.filter(line=>!secondary.includes(line)&&[...financeOutputs,...financeResearch].some(([,pattern])=>pattern.test(line)));
 const ownsOutput=outputs.some(item=>item.owned&&!secondary.includes(item.quote));
 const mixed=work.length>0&&secondary.length>0;
 const mainlySupport=sales||(!ownsOutput&&secondary.length>analysisLines.length&&secondary.length>0);
 const depth=ownsOutput?4:outputs.length?3:research.length?2:secondary.length||sales?1:0;
 const nature=mixed?(sales?'研究与销售混合':execution.length?'研究与交易支持混合':'研究与运营支持混合'):
  depth>=3?'有研究或投资产出':depth===2?'参与研究或尽调':
  sales?'销售职责':execution.length?'交易执行与材料':support.length?'流程与运营支持':'职责待核';
 const fit=financeFit(j,data.profile,work);
 const direct=fit.filter(x=>x.level==='直接相关'),transferable=fit.filter(x=>x.level==='方法可迁移');
 const company=toEmployer(j.company);
 const institution=institutionEvidence.find(e=>{
  const asOf=pickTime(e.asOf+'T00:00:00+08:00');
  return e.company===company&&e.applies(j)&&asOf<=now&&now-asOf<=550*86400000;
 });
 const opening=pickOpening(j,now),place=pickLocation(j,data.profile,requirements);
 const titleTeam=j.title.match(/研究所\s*[|｜·]?[\s]*([^，,。()（）]{1,16}(?:团队|小组))/)?.[1];
 const namedTeam=titleTeam||(!/水晶球|新财富/.test(j.team||'')?j.team:null);
 const teamProof=namedTeam?(opening.official?'官方 JD 载明 '+namedTeam:'招聘原帖载明 '+namedTeam):'具体团队待核';
 const mentoring=(j.original||'').split(/\r?\n/).find(line=>teamMentoring.test(line)&&!pickRequirements.test(line));
 const conditions=j.matching?.eligibility?.conditions||[];
 const conflicts=conditions.filter(c=>c.state==='冲突');
 const clauses=requirementClauses(requirements);
 const required=clauses.filter(line=>!preferredCondition.test(line));
 const cohort=required.find(line=>cohortCondition.test(line));
 const technical=required.find(line=>technicalGate.test(line));
 const english=required.find(line=>englishGate.test(line));
 const skill=technical||english;
 const unknownCohort=cohort&&!conditions.some(c=>c.name==='毕业届别'&&c.state==='满足');
 const unprovenSkill=skill&&!conditions.some(c=>c.name==='硬性技能/经历'&&c.state==='满足');
 const missing=new Set(j.decision?.information_missing||[]);
 const type=j.family||data.pools[j.pool]||'岗位方向待核';
 const schedule=financeSchedule(j,clauses);
 const shortCohort=cohort?.match(cohortCondition)?.[0];
 const gap=unprovenSkill?(/\b(?:Python|Linux|MATLAB)\b|C\+\+/i.test(skill)?'编程及相关环境待核':
  /模型|定价|随机过程/.test(skill)?'建模或定价能力待核':englishGate.test(skill)?'JD 英语门槛待核':
  /Bloomberg|彭博/i.test(skill)?'金融终端熟练度待核':/Wind|万德/i.test(skill)?'Wind 熟练度待核':'JD 要求的专业技能或经历待核'):'';
 const specialist=unprovenSkill&&Boolean(technical||specialistEnglish.test(skill));
 const multipleRoles=/(?:岗|实习生)\s*[/／、及和]\s*[^。]{2,28}(?:岗|实习生)/.test(j.title)&&
  /如应聘|岗位[一二三四1-4]|分别招聘/.test(j.original||'');
 const checks=[!opening.internship&&'招聘类型待核',unknownCohort&&shortCohort+'待核',!place.known&&!place.outside&&'实习地点待核',
  place.remoteOnly&&data.profile.remote==null&&'远程安排待核',gap,technical&&english&&'JD 英语门槛待核',schedule.summary,schedule.unknown].filter(Boolean);
 const workExperience=pickFullTimeRequirement(requirements);
  const fullTime=workExperience||/博士后|社会招聘|全职招聘/.test(j.title)&&!/实习/.test(j.title);
 const bankGate=j.bank_gate&&data.profile.bank_specialist!==true;
  const career=careerReturn(j,data,company,opening,analysisLines,ownsOutput,mainlySupport,multipleRoles);
 const choice=opening.closed?{label:opening.closed,level:0,note:'以 JD 的截止时间或关闭状态为准'}:
  conflicts.length||place.outside||fullTime||j.excluded_reason?{label:'明显不符',level:0,note:conflicts.length?
   conflicts.map(c=>c.name+' '+c.reason).join('；'):place.outside?'JD 地点超出当前实习范围':fullTime?(workExperience?'原文要求多年工作经历':'原文为社会或全职招聘'):j.excluded_reason}:
  bankGate?{label:'待核专业岗',level:2,note:'银行专业岗待确认是否考虑'}:
   career.backup?{label:'备选',level:2,note:'按职业回报偏好降为备选；具体薪酬和留用未核实'}:
  !j.company||missing.has('company')||missing.has('role')?{label:'资料待补',level:1,note:'机构或具体岗位待核'}:
  multipleRoles?{label:'先核条件',level:3,note:'同一原文包含多岗，先核对各岗位职责'}:
  !depth||missing.has('duties')?{label:'资料待补',level:1,note:'JD 中尚无可确认的研究、投资或交易职责'}:
   mainlySupport||depth===1||(j.pool==='adjacent'&&j.family!=='战略与咨询')||!career.depth?{label:'备选',level:2,note:mainlySupport?'支持或销售职责较多，核实研究分工':nature}:
  !opening.internship?{label:'先核条件',level:3,note:'核对招聘类型是否为实习'}:
  !place.known||!opening.current||unknownCohort?{label:'先核条件',level:3,note:!opening.current?'旧线索，先核当前招聘状态':!place.known?'实习地点待核':shortCohort+'待核'}:
  missing.has('requirements')||!requirements.length?{label:'先核条件',level:3,note:'JD 未披露可核对的任职要求'}:
  specialist?{label:'值得冲刺',level:5,note:gap}:
  {label:opening.open?'优先评估':'先核开放',level:5,note:opening.open?'':'确认是否仍招'};
 const due=Number(opening.open&&opening.internship&&opening.deadline>=now&&opening.deadline-now<=3*86400000);
  return {j,company,namedTeam,choice,type,nature,work,secondary,mixed,depth,fit,direct,transferable,institution,teamProof,mentoring,career,
  opening,place,checks,schedule,cohort:unknownCohort?cohort:null,
  skills:unprovenSkill?[...new Set([technical,english].filter(Boolean))]:[],conflicts,due};
}

function compareCareerValue(a,b){
 return Number(b.career.pathway.rank===2)-Number(a.career.pathway.rank===2)||
   Number(a.career.pathway.rank===-1)-Number(b.career.pathway.rank===-1)||
   b.career.depth-a.career.depth||Number(b.career.decisionWork)-Number(a.career.decisionWork)||
    Number(Boolean(b.institution))-Number(Boolean(a.institution))||
   Number(Boolean(b.direct.length))-Number(Boolean(a.direct.length))||
   Number(Boolean(b.transferable.length))-Number(Boolean(a.transferable.length));
}

function compareFinance(a,b){
 return b.choice.level-a.choice.level||Number(a.career.backup)-Number(b.career.backup)||
   Number(b.opening.open&&b.opening.internship)-Number(a.opening.open&&a.opening.internship)||
   Number(b.opening.current)-Number(a.opening.current)||
   compareCareerValue(a,b)||Number(a.choice.label==='值得冲刺')-Number(b.choice.label==='值得冲刺')||
  b.due-a.due||
   b.career.pathway.rank-a.career.pathway.rank||Number(Boolean(b.mentoring))-Number(Boolean(a.mentoring))||
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

function productSuggestions(now=Date.now()){
 const candidates=(PRODUCT?.jobs||[]).map(j=>productPick(j,PRODUCT,DATA.profile,now)).filter(Boolean);
 candidates.sort((a,b)=>{
  for(let i=0;i<a.rank.length;i++)if(a.rank[i]!==b.rank[i])return b.rank[i]-a.rank[i];
  return a.j.id.localeCompare(b.j.id);
 });
 const companies=new Set();
 return candidates.filter(pick=>{
  const company=pick.j.company.normalize('NFKC').replace(/\s/g,'');
  if(companies.has(company))return false;
  companies.add(company);
  return true;
 }).slice(0,2);
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
 if(a.opening.open)return a.opening.internship?'已核实开放':'招聘页开放 · 实习类型待核';
 return a.opening.closed||(a.opening.current?'开放状态待核':a.opening.seen?'旧线索 · 开放待核':'时间及开放待核');
}

function workQuote(a){
 const evidence=a.work.find(item=>item.owned)||a.work[0];
 return a.choice.level===2&&a.mixed?a.secondary[0]||evidence?.quote:evidence?.quote||a.secondary[0];
}

function priorityWork(a){
 const quote=workQuote(a);
 const evidence=quote?.replace(/\s+/g,' ').trim();
 return evidence?evidence.slice(0,112)+(evidence.length>112?'…':''):a.nature;
}

const financeChoices=['优先评估','先核开放','值得冲刺','先核条件','备选','待核专业岗','资料待补','明显不符','已截止','已关闭或过期'];
const decisionFocus=new Set(['ready','information_gaps','new_ready','open','today']);
const careerDirections={
 buy:'买方投研与资配',quant:'量化与交易',investing:'一级与产业投资',
 equity:'股权投行与并购',debt:'债券承销与结构融资',strategy:'战略与咨询',sell:'券商研究',other:'相邻及其他岗位'
};

function careerDirection(j){
 if(j.pool==='core')return ['买方投资研究','配置与基金','固收投资研究'].includes(j.family)?'buy':'sell';
 if(j.pool==='quant')return 'quant';
 if(j.pool==='primary')return j.family==='债券承销与结构融资'?'debt':j.family==='股权投行与并购'?'equity':'investing';
 return j.family==='战略与咨询'?'strategy':'other';
}

function shortlistRepostKey(a){
 const {j}=a, compact=value=>(value||'').normalize('NFKC').toLowerCase().replace(/[\s\p{P}]/gu,'');
 const employer=compact(a.company),cities=(j.cities||[]).map(city=>compact(city).replace(/市$/,'')).sort();
 const quote=compact(a.career.evidence);
 if(!employer||employer==='未知'||!cities.length||quote.length<18||a.opening.official)return null;
 const heading=j.title.normalize('NFKC').replace(/^(?:实习招聘|招聘)\s*[丨|:·-]\s*/,'')
  .replace(/(?:【([^】]+)】|\[([^\]]+)\]|\(([^)]+)\))$/, (match,a,b,c)=>cities.includes(compact(a||b||c).replace(/市$/,''))?'':match);
 const normalized=compact(heading);
 const role=normalized.startsWith(employer)?normalized.slice(employer.length).replace(/^招聘/,''):normalized;
 if(!role)return null;
 const team=compact(a.namedTeam);
 return JSON.stringify([employer,role,role.includes(team)?'':team,cities,compact(j.cohort),compact(j.internship_type),quote]);
}

function renderCareerShortlist(target,assessment,scoped){
 const selected=$('direction').value;
 const byDirection=new Map(Object.keys(careerDirections).map(key=>[key,[]]));
 for(const j of scoped)byDirection.get(careerDirection(j)).push(assessment.get(j.id));
 const groups=[...byDirection].filter(([,rows])=>rows.length).map(([key,rows])=>{
  const ranked=rows.filter(a=>a.choice.level>=3&&a.career.depth&&!feedback[a.j.id]?.applied)
   .sort((a,b)=>Number(b.opening.internship)-Number(a.opening.internship)||
    Number(b.opening.open)-Number(a.opening.open)||Number(b.opening.current)-Number(a.opening.current)||
    compareCareerValue(a,b)||compareFinance(a,b));
  const employers=new Set(),reposts=new Set(),shortlist=[];
  for(const a of ranked){
   const repost=shortlistRepostKey(a);
   if(employers.has(a.company)||(repost&&reposts.has(repost)))continue;
   employers.add(a.company);
   if(repost)reposts.add(repost);
   shortlist.push(a);
   if(shortlist.length===2)break;
  }
  return {key,count:rows.length,shortlist};
 });
 const signature=JSON.stringify([selected,groups.map(({key,count,shortlist})=>[key,count,shortlist.map(a=>[
  a.j.id,a.j.title,a.company,a.namedTeam,a.place.where,priorityOpening(a),a.career.evidence,priorityNext(a),a.career.pathway.text,
  (a.j.sources||[]).map(source=>ReadingQueue.sourceLabel(source,PRODUCT))])])]);
 if(target.dataset.signature===signature)return;
 target.dataset.signature=signature;
 const entryFor=a=>{
  const entry=el('div','career-entry'),title=el('button','career-job',a.j.title);
  title.dataset.careerJob=a.j.id;
  title.onclick=()=>showDetail(a.j);
  const proof=a.career.evidence.replace(/\s+/g,' ');
  entry.append(el('p','career-employer',[a.company,a.namedTeam,a.place.where].filter(Boolean).join(' · ')),title,
   el('p','career-opening',priorityOpening(a)),ReadingQueue.sourceRow(a.j.sources||[],PRODUCT),
   el('p','career-duty',proof.slice(0,110)+(proof.length>110?'…':'')),
   el('p','career-check',priorityNext(a)||'核对 JD 中的出勤和到岗要求'));
  if(a.career.pathway.rank!==0)entry.append(el('p','career-check',a.career.pathway.text));
  return entry;
 };
 target.replaceChildren(...groups.map(({key,count,shortlist})=>{
  const section=el('section','career-list');
  section.dataset.careerDirection=key;
  const heading=el('div','career-heading'),filter=el('button','career-filter',selected===key?'清除方向':'看 '+count+' 条');
  filter.setAttribute('aria-label',selected===key?'清除'+careerDirections[key]+'筛选':'查看'+careerDirections[key]+count+'条岗位');
  filter.setAttribute('aria-pressed',selected===key);
  filter.onclick=()=>{
   $('direction').value=selected===key?'':key;
   $('bucket').value='';
   render();
   $('count').focus({preventScroll:true});
   $('count').scrollIntoView({block:'center'});
  };
  heading.append(el('h3','',careerDirections[key]),filter);
  section.append(heading);
  if(shortlist.length) section.append(entryFor(shortlist[0]));
  else section.append(el('p','career-empty','暂无达到优先跟进条件的岗位。'));
  if(shortlist.length>1){
   const more=el('details','career-more');
   more.append(el('summary','','另一个可比较的岗位'),entryFor(shortlist[1]));
   section.append(more);
  }
  return section;
 }));
}

function renderPriorityPanel(assessment,scoped,directional){
 if(!assessment){$('personal-picks')?.remove();return}
 let panel=$('personal-picks');
 if(!panel){
  panel=el('section','personal-picks');
  panel.id='personal-picks';
  panel.setAttribute('aria-label','评估优先级筛选');
   panel.append(el('div','priority-summary'),el('p','career-pay-note'),el('div','career-shortlist'),el('div','priority-filters'));
  const filters=panel.lastElementChild;
  for(const state of ['',...financeChoices]){
   const b=el('button','priority-filter');
   b.dataset.priorityFilter=state;
   b.append(el('span','',state||'全部评估'),el('span','n'));
   b.onclick=()=>{$('bucket').value=state;render()};
   filters.append(b);
  }
  const products=el('details','product-suggestions');
  products.append(el('summary','','产品备选'),el('ul','product-suggestion-list'));
  panel.append(products);
  $('pools').before(panel);
 }
 const counts=new Map();
 for(const j of directional){
  const label=assessment.get(j.id).choice.label;
  counts.set(label,(counts.get(label)||0)+1);
 }
  const summary=[scoped.length+' 条已评估 · 按方向优先看'];
 if(pool!=='all')summary.push(DATA.pools[pool]);
 if($('period').value!=='all')summary.push($('period').selectedOptions[0].text);
 panel.querySelector('.priority-summary').textContent=summary.join(' · ');
  const payCount=scoped.filter(j=>assessment.get(j.id).career.compensation.quote).length;
  panel.querySelector('.career-pay-note').textContent=payCount?
   payCount+' 条官方 JD 披露了同团队、同届的正式岗固定薪酬；在岗位详情查看原句。':
   '暂无可核对的同团队、同届正式岗薪酬。先按招聘通道和实际工作排。';
  renderCareerShortlist(panel.querySelector('.career-shortlist'),assessment,scoped);
 for(const button of panel.querySelectorAll('[data-priority-filter]')){
  const key=button.dataset.priorityFilter,count=key?(counts.get(key)||0):directional.length;
  const selected=$('bucket').value===key;
  button.setAttribute('aria-pressed',selected);
  button.hidden=Boolean(key&&!count&&!selected);
  button.lastElementChild.textContent=count;
 }
 const products=panel.querySelector('.product-suggestions');
 const picks=productSuggestions();
 const key=JSON.stringify(picks.map(pick=>[pick.j.id,pick.j.title,pick.gate,pick.where,pick.origin]));
 if(products.dataset.signature!==key){
  products.dataset.signature=key;
  products.lastElementChild.replaceChildren(...picks.map(pick=>{
   const row=el('li');
   row.append(link(pick.j.title,'/?job='+encodeURIComponent(pick.j.id)),
    el('span','muted',[pick.where,pick.origin,pick.gate].filter(Boolean).join(' · ')));
   return row;
  }));
 }
 products.hidden=!picks.length;
}

function matchesFocus(j,focus,assessment){
 if(feedback[j.id]?.ignored&&focus!=='ignored')return false;
 switch(focus){
  case '':return true;
  case 'ready':return ReadingQueue.decisionReady(j);
  case 'information_gaps':return ReadingQueue.decisionNeedsInformation(j);
  case 'new_ready':return ReadingQueue.decisionNew(j);
  case 'open':return assessment?assessment.opening.open&&assessment.opening.internship:ReadingQueue.decisionOpen(j);
  case 'today':return ReadingQueue.decisionToday(j);
  case 'new':return j.is_new;
  case 'closing':return closing(j);
  case 'changed':return j.changes.length>0;
  default:return Boolean(feedback[j.id]?.[focus]);
 }
}

function render(){
 if(!DATA)return;
 ReadingQueue.mountClues($('jobs'),PRODUCT?.reading_queue,'finance',DATA.jobs,PRODUCT);
 ReadingQueue.decisions($('decision-entry'),PRODUCT?.reading_queue,DATA.jobs.filter(j=>!feedback[j.id]?.ignored),PRODUCT?.image_issues,(key,stage)=>{
  if(key==='pending'||key==='gaps'){
   if(key==='gaps'&&PRODUCT?.reading_queue?.local_login){location.assign(PRODUCT.reading_queue.local_login);return}
   setView('unread');ReadingQueue.show($('reading-panel'),stage);return
  }
  pool='all';
  for(const id of fields)$(id).value=({period:'all',sort:defaultSort(),focus:key}[id]||'');
  setView('jobs');render();$('query').focus({preventScroll:true});$('jobs').scrollIntoView({block:'start'});
 });
 const assessment=priorityOwner()?financeAssessments():null;
 const q=$('query').value.trim().toLowerCase(),focus=$('focus').value,period=$('period').value;
 const city=$('city').value,type=$('type').value,direction=$('direction').value,family=$('family').value,eligibility=$('eligibility').value;
 const bucket=$('bucket').value,order=$('sort').value;
 const all=DATA.jobs.filter(j=>inPeriod(j,period));
 const currentPool=all.filter(j=>pool==='all'||j.pool===pool);
 const scoped=currentPool.filter(j=>{
  const a=assessment?.get(j.id);
  return (!q||[a?.company,j.company,j.title,j.team,j.original].join(' ').toLowerCase().includes(q))&&
   (!city||(city==='unknown'?!j.cities.length:j.cities.includes(city)))&&
   (!type||j.internship_type===type)&&(!family||j.family===family)&&
   (!eligibility||j.matching.eligibility.state===eligibility)&&matchesFocus(j,focus,a);
 });
 const directional=direction?scoped.filter(j=>careerDirection(j)===direction):scoped;
 renderPriorityPanel(assessment,scoped,directional);
 const rows=bucket?directional.filter(j=>(assessment?.get(j.id)?.choice.label||j.bucket)===bucket):directional;
 const rank={主方向:0,研究扩展:1,探索比较:2,相邻备选:3};
 rows.sort((a,b)=>{
  if(order==='priority'&&assessment){
   if(focus!=='applied'){
    const applied=Number(!!feedback[a.id]?.applied)-Number(!!feedback[b.id]?.applied);
    if(applied)return applied;
   }
   return compareFinance(assessment.get(a.id),assessment.get(b.id));
  }
  const bad=Number(a.bucket==='明显不符')-Number(b.bucket==='明显不符');
  if(bad)return bad;
  if(order==='evidence')return b.matching.competitiveness.evidence.length-a.matching.competitiveness.evidence.length;
  if(order==='deadline')return(a.deadline||'9999').localeCompare(b.deadline||'9999');
  if(order==='discovered')return b.first_discovered_at.localeCompare(a.first_discovered_at);
  return(rank[a.matching.direction.label]??0)-(rank[b.matching.direction.label]??0)||Number(b.is_new)-Number(a.is_new)||a.title.localeCompare(b.title,'zh');
 });
 $('count').tabIndex=-1;
 $('count').replaceChildren(el('strong','',rows.length+' 条'),document.createTextNode(' · '+(careerDirections[direction]||(pool==='all'?'金融四池':DATA.pools[pool]))));
 const undated=rows.filter(j=>!j.published_at).length;
 const ignored=currentPool.filter(j=>feedback[j.id]?.ignored).length;
 $('date-note').textContent=[undated+' 条首发未知',ignored&&ignored+' 条已忽略','招聘信息条数不等于 HC'].filter(Boolean).join(' · ');
 if(!rows.length){
  const empty=el('div','empty');
  empty.append(el('h3','','暂时没有匹配的岗位'));
  const reset=el('button','','清空筛选');
  reset.onclick=resetFilters;
  empty.append(reset);
  $('cards').replaceChildren(empty);
 }else $('cards').replaceChildren(...rows.map(j=>card(j,assessment?.get(j.id))));
 $('inbox').replaceChildren();
 for(const [key,label]of[['','全部'],['new','新发现'],['open','已核开放'],['closing','临近截止'],['changed','有变化'],['saved','收藏']]){
  const b=el('button','quick-focus');
  b.setAttribute('aria-pressed',focus===key);
  b.append(el('span','',label),el('span','n',currentPool.filter(j=>matchesFocus(j,key,assessment?.get(j.id))).length));
  b.onclick=()=>{$('focus').value=key;render()};
  $('inbox').append(b);
 }
 const n=fields.filter(id=>!['query','sort'].includes(id)&&$(id).value!==({period:defaultPeriod()}[id]||'')).length;
 $('filter-count').textContent=n;
 $('filters-toggle').textContent=n?'筛选 · '+n:'筛选';
 $('quick-query').value=$('query').value;
 document.querySelectorAll('[data-pool]').forEach(button=>{
  const key=button.dataset.pool;
  button.setAttribute('aria-pressed',key===pool);
  button.lastElementChild.textContent=all.filter(j=>(key==='all'||j.pool===key)&&!feedback[j.id]?.ignored).length;
 });
 syncURL();
}
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
 const workQuotes=[...new Set([workQuote(a),...a.work.map(e=>e.quote)].filter(Boolean))].slice(0,3);
 if(a.mixed&&a.secondary.length)workQuotes.push(a.secondary.find(quote=>!workQuotes.includes(quote))||a.secondary[0]);
 add('路线与职责',el('p','priority-lead',a.type+' · '+a.nature),
  ...[...new Set(workQuotes)].map(quote=>el('blockquote','quote',quote)));
 add('正式岗与下一跳',el('p','priority-lead',a.career.compensation.text),
   ...(a.career.compensation.quote?[el('blockquote','quote',a.career.compensation.quote)]:[]),
   el('p','',a.career.pathway.text),
   ...(a.career.pathway.quote?[el('blockquote','quote',a.career.pathway.quote)]:[]),
   ...(a.career.compensation.url||a.career.pathway.rank===2&&a.career.pathway.url?
    [link('核对官方招聘原文',a.career.compensation.url||a.career.pathway.url)]:[]),
   el('p','muted',(a.career.evidence?'可积累到的方向：':'')+a.career.route),
   ...(a.career.backup?[el('p','muted','按你的职业回报偏好放在备选。')]:[]));
 const business=[el('p','priority-lead',a.teamProof)];
 if(a.institution)business.push(link(a.institution.label+' · '+(a.institution.checked?'核验于 ':'')+a.institution.asOf,a.institution.url),el('p','muted',a.institution.scope));
 if(a.mentoring)business.push(el('blockquote','quote',a.mentoring));
 add('团队与业务',...business);
 const fits=a.fit.slice(0,2).map(f=>el('p','',f.level+' · '+f.experience+'。'+f.note+'。'));
 add('经历与缺口',...(fits.length?fits:[el('p','muted','已确认经历中暂无直接对应的职责。')]));
 const opening=priorityOpening(a)+(a.opening.open?' · '+date(a.j.last_verified_at):'');
 const quotes=[a.cohort,...a.skills,...a.conflicts.map(c=>c.quote),...a.schedule.quotes].filter(Boolean);
 add('下一步核对',el('p','priority-lead',priorityNext(a)),el('p','muted',opening),
  ...[...new Set(quotes)].map(quote=>el('blockquote','quote',quote)));
 section.append(rows);
 return section;
}

function showDetail(j,open=true){activeJob=j.id;const d=$('detail-content');d.replaceChildren();const assessment=priorityOwner()?financeAssessments().get(j.id):null;const h=el('div','detail-intro');h.append(el('p','company',companyLabel(j,assessment)),el('h2','',j.title));h.lastChild.id='detail-title';h.append(ReadingQueue.sourceRow(j.sources,PRODUCT),assessment?priorityBadge(assessment):el('span','badge warning',j.bucket));if(!assessment)h.append(el('p','detail-why',j.why),el('p','notice',barrier(j)));d.append(h);if(assessment)d.append(renderFinancePriority(assessment));
 const apply=el('div','apply-box');apply.append(el('h3','','投递方式'));if(j.application_url)apply.append(link('打开投递入口 ↗',j.application_url));for(const email of j.emails){const row=el('div','email-row');row.append(el('span','',email));const b=el('button','','复制邮箱');b.onclick=async()=>{try{await navigator.clipboard.writeText(email);b.textContent='已复制 ✓';toast('投递邮箱已复制')}catch{toast('复制失败，请选中邮箱复制')}};row.append(b);apply.append(row)}if(!j.application_url&&!j.emails.length)apply.append(el('p','muted','投递方式尚未取得，请查看原文来源。'));if(j.application_note)apply.append(el('p','hint',j.application_note));const acts=el('div','cardactions');acts.append(feedbackButton(j,'saved','收藏'),feedbackButton(j,'applied','标记已投递'),feedbackButton(j,'ignored','忽略'));apply.append(acts);
 const facts=el('div','facts detail-facts');for(const[k,v]of[['地点',assessment?assessment.place.where:j.cities.join(' / ')],['类型',j.internship_type],['出勤',assessment?assessment.schedule.attendance:j.days],['时长',assessment?assessment.schedule.duration:j.months],['补贴',j.pay],['截止',j.deadline],['远程',j.remote_arrangement],['到岗',j.start],['状态',assessment?priorityOpening(assessment):j.opening_status]])fact(facts,k,v);d.append(facts);
 const jd=el('details','jd');jd.open=!assessment;jd.append(el('summary','','原始 JD'),el('pre','',j.original));d.append(jd,apply);const grid=el('div','detailgrid'),a=el('div'),b=el('div');a.append(el('h3','','① 职业方向'),el('p','',j.matching.direction.reason),el('div','quote',unknown(j.matching.direction.quote)),el('h3','','② 当前竞争力'));for(const x of j.matching.competitiveness.evidence)a.append(el('p','',x.experience+'：'+x.note),el('div','quote',x.quote));if(!j.matching.competitiveness.evidence.length)a.append(el('p','','尚无明确经历证据。'));a.append(el('h3','','主要缺口'));for(const x of j.matching.competitiveness.gaps)a.append(el('p','',x.mandatory?'要求需补证':'偏好 / 加分，非硬门槛'),el('div','quote',x.quote));if(!j.matching.competitiveness.gaps.length)a.append(el('p','','JD 未提供可进一步核对的技能要求。'));table(b,['条件','状态','JD 原句 / 解释'],j.matching.eligibility.conditions.map(x=>[x.name,x.state,(x.quote||'JD 未写明')+'；'+x.reason]));b.prepend(el('h3','','③ 可投条件'));b.append(el('h3','','④ 机会质量'),el('p','',j.matching.quality.note),el('p','','职责性质：'+j.work_nature),el('div','quote','留用原话：'+unknown(j.conversion_quote)));grid.append(a,b);
 if(assessment){const conditions=el('details');conditions.append(el('summary','','完整匹配条件'),grid);d.append(conditions)}else d.append(grid);
 for(const version of j.repost_versions||[]){
  const other=el('details','jd repost-jd');other.append(el('summary','','转载原文 · '+version.title));
  if(version.source.url)other.append(link('打开该转载来源 ↗',version.source.url));
  other.append(el('pre','',version.original));d.append(other);
 }
 const meta=el('details');meta.append(el('summary','','来源与时间'));const dates=el('div','facts');for(const[k,v]of[['JD 首发',j.published_at],['文章发布',j.article_published_at],['转发',j.forwarded_at],['首次发现',j.first_discovered_at],['最后核验',j.last_verified_at]])fact(dates,k,date(v));meta.append(dates);j.sources.forEach(s=>{const label=ReadingQueue.sourceLabel(s,PRODUCT);meta.append(s.url?link(label+' ↗',s.url):el('span','',label),el('p','hint',s.kind+(s.original_verified?' · 官方页面已读，开放状态另核验':' · 原始发布方未独立核验')))});d.append(meta);if(open&&!$('job-detail').open)$('job-detail').showModal();syncURL()}
function resetFilters(){pool=defaultPool();for(const id of fields)$(id).value=({period:defaultPeriod(),sort:defaultSort()}[id]||'');render()}
function setupData(initial=false){
 for(const [old,id] of Object.entries(DATA.job_aliases||{})){
  if(!feedback[old])continue;
  feedback[id]={...feedback[old],...feedback[id]};
  try{localStorage.setItem('finance-feedback-v1',JSON.stringify(feedback))}catch{}
 }
 const first=!pool;
 pool??=defaultPool();
 const desired=Object.fromEntries(fields.map(id=>[id,$(id).value]));
 if(first){desired.period=defaultPeriod();desired.sort=defaultSort()}
 const priorPriority=$('sort').querySelector('[value="priority"]'),owner=priorityOwner();
 if(owner&&!priorPriority){option('sort','priority','评估优先级');$('sort').prepend($('sort').lastElementChild);desired.sort='priority'}
 else if(!owner&&priorPriority){priorPriority.remove();if(desired.sort==='priority')desired.sort='direction'}
 if(owner!==Boolean(priorPriority)){
  const states=owner?financeChoices:
   ['优先看','值得冲刺','待确认条件','备选','明显不符'];
  while($('bucket').options.length>1)$('bucket').remove(1);
  for(const state of states)option('bucket',state);
  if(!states.includes(desired.bucket))desired.bucket='';
 }
 if(!$('pools').children.length){
  for(const id of ['all','core','quant','primary','adjacent']){
   const b=el('button');
   b.dataset.pool=id;
   b.append(el('span','',id==='all'?'全部金融':DATA.pools[id]),el('span','n'));
   b.onclick=()=>{pool=id;$('direction').value='';$('family').value='';$('bucket').value='';render()};
   $('pools').append(b);
  }
 }
 for(const id of ['city','type','family'])while($(id).options.length>({city:4,type:1,family:1}[id]))$(id).remove($(id).options.length-1);
 [...new Set(DATA.jobs.flatMap(j=>j.cities))].sort().filter(c=>!['北京','上海'].includes(c)).forEach(c=>option('city',c));
 DATA.types.forEach(x=>option('type',x));
 if($('direction').options.length===1)for(const [key,label] of Object.entries(careerDirections))option('direction',key,label);
 [...new Set(DATA.role_coverage.map(r=>r.family))].forEach(x=>option('family',x));
 if(initial){
  const requestedPool=restoreParams.get('pool');
  if(requestedPool==='all'||Object.hasOwn(DATA.pools,requestedPool))pool=requestedPool;
  else if(decisionFocus.has(restoreParams.get('focus')))pool='all';
  for(const id of fields)if(restoreParams.has(id))desired[id]=restoreParams.get(id);
 }
 for(const id of fields){
  const field=$(id);
  const fallback=({period:defaultPeriod(),sort:defaultSort()}[id]||'');
  field.value=field.tagName!=='SELECT'||Array.from(field.options).some(o=>o.value===desired[id])?desired[id]:fallback;
 }
 for(const id of ['profile-content','rules','coverage-stats','institution-list','change-list','wechat-coverage'])$(id).replaceChildren();
 renderInformation();
 $('stamp').textContent='数据截至 '+date(DATA.generated_at);
 if(initial)setView(restoreParams.get('view')||'jobs');
 render();
 if(initial){
  const j=DATA.jobs.find(x=>x.id===restoreParams.get('job'));
  if(j)showDetail(j);
 }
}
let reconnectTimer,reconnectAttempts=0;
async function load(initial=false){
 clearTimeout(reconnectTimer);
 let retryable=true;
 try{
  const r=await fetch('./data/finance.json',{cache:'no-store'});
  if([401,403,503].includes(r.status)){try{localStorage.removeItem('finance-cache-v1')}catch{}}
  if(!r.ok){retryable=r.status>=500;throw Error(r.status===401?'登录已过期，请回到入口重新登录。':'岗位读取失败（'+r.status+'）。')}
  DATA=await r.json();
  reconnectAttempts=0;
  try{localStorage.setItem('finance-cache-v1',JSON.stringify(DATA))}catch{}
  try{const p=await fetch('./data/data.json');if(p.ok)PRODUCT=await p.json()}catch{}
  setupData(initial);
  $('error').hidden=true;
  return true;
 }catch(e){
  $('error').replaceChildren(el('span','',e.message));
  const retry=el('button','','立即重连');
  retry.onclick=()=>load(initial);
  $('error').append(retry);
  if(retryable){
   const delay=Math.min(30000,5000*2**Math.min(reconnectAttempts++,3));
   $('error').append(el('span','',` ${delay/1000} 秒后自动重连`));
   reconnectTimer=setTimeout(()=>load(initial),delay);
  }
  $('error').hidden=false;
  if(!DATA){
   try{
    DATA=JSON.parse(localStorage.getItem('finance-cache-v1'));
    if(DATA){setupData(initial);$('error').prepend(el('strong','','当前为上次缓存，请核对数据时间。 '))}
   }catch{}
  }
  if(!DATA)$('count').textContent='岗位暂时无法读取';
  return false;
 }
}
function renderRuntime(s){if(s.snapshot_at){RadarPublication.update(s);return;}const running=s.status==='running';$('refresh').disabled=running||updating;$('refresh').textContent=running||updating?'正在更新…':'更新岗位';$('status').textContent=running?'正在后台读取，完成后自动更新页面':s.status==='failed'?'上次更新失败 · 已保留成功结果':'每 5 分钟检查新消息 · 未读内容独立补齐';if(s.status==='failed')toast('后台更新失败，可重试；已保留成功结果')}
async function refreshNow(){if(updating)return;updating=true;$('refresh').disabled=true;$('refresh').textContent='正在更新…';const old=DATA?.generated_at;try{const r=await fetch('/api/refresh',{method:'POST',headers:{'X-Workbench':'local'}});if(!r.ok)throw Error('更新未启动（'+r.status+'），请重试。');toast('后台更新已开始，完成后自动显示结果');let seen=false,done=false;for(let n=0;n<90;n++){await new Promise(r=>setTimeout(r,2000));const r=await fetch('./data/status.json');if(!r.ok)throw Error('更新状态暂时无法读取，请稍后重试');const s=await r.json();renderRuntime(s);if(s.status==='running'){seen=true;continue}if(s.status==='failed')throw Error('本次更新失败，已保留上次结果');if(s.status==='ok'&&(seen||n>=1)){await load();toast(DATA.generated_at===old?'更新完成，当前没有新增岗位':'岗位已更新，筛选已保留');done=true;break}}if(!done)toast('后台仍在处理，下次进入会读取最新结果')}catch(e){toast(e.message);$('status').textContent=e.message}finally{updating=false;$('refresh').disabled=false;$('refresh').textContent='更新岗位'}}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>setView(b.dataset.view));for(const id of fields)$(id).addEventListener(id==='query'?'input':'change',()=>DATA&&render());$('quick-query').addEventListener('input',()=>{$('query').value=$('quick-query').value;render()});$('clear').onclick=resetFilters;$('refresh').onclick=refreshNow;$('filters-toggle').onclick=()=>{$('filter-panel').open=!$('filter-panel').open;if($('filter-panel').open){$('filter-panel').scrollIntoView({block:'nearest'});$('query').focus()}};$('filter-panel').addEventListener('toggle',()=>$('filters-toggle').setAttribute('aria-expanded',$('filter-panel').open));$('close-detail').onclick=()=>$('job-detail').close();$('job-detail').addEventListener('close',()=>{activeJob=null;syncURL()});
for(const id of fields){$(id).name=id;$(id).autocomplete='off'}
load(true).then(async()=>{try{const r=await fetch('./data/status.json');if(r.ok)renderRuntime(await r.json());if(location.hostname==='127.0.0.1'||location.hostname==='localhost'){const m=await(await fetch('./data/mobile.json')).json();if(m.available){$('mobile').href=m.url;$('mobile').hidden=false}}}catch{}});

function renderInformation(){
 const queue=PRODUCT?.reading_queue,backlog=ReadingQueue.weekQueue(queue);ReadingQueue.mount($('reading-panel'),queue,PRODUCT?.image_issues||[]);$('unread-count').textContent=backlog?.total??'';$('reading-entry-text').textContent=backlog?`近七天补读队列 ${backlog.total} 篇 · 优先 ${backlog.priority} · 已归类原文 ${backlog.classified} · 抽查 ${backlog.sample}`:'暂时无法读取补读清单。';
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
let checkingBackground=false;setInterval(async()=>{if(document.hidden||updating||checkingBackground)return;checkingBackground=true;try{const r=await fetch('./data/status.json',{cache:'no-store'});if(r.ok){const status=await r.json();renderRuntime(status);const published=status.published_at||status.finished_at;if(published&&(!DATA||Date.parse(published)>Date.parse(DATA.generated_at)))await load();}}catch{}finally{checkingBackground=false}},60000);
