'use strict';
// BEGIN INSTITUTION RESEARCH V1
const INSTITUTION_RESEARCH = {"schema_version":1,"revision":"employer-research-20261117-1","reviewed_at":"2026-11-17","scope":"当前岗位集合中的全部机构；机构事实、具名观点与分析判断分开保存。不是全金融机构总榜。","limitations":["未取得可验证全文的小红书内容未作为已读证据。","陈思炜的历史职业文章已读；未声称读过其全部公众号或付费材料。","机构官网能证明业务和主体，不能单独证明同行认可、招聘转化率或正式薪酬。","来源未知日期保留为空；核验日不充当首发日。转载的多位受访者保留一个采编来源，不按多份独立验证计算。"],"comparison_order":["先检查可投条件","公司在目标招聘市场的认可度","对应业务的真实地位与资源","实际职责与可带走的分析成果","正式回报、成长和下一站"],"sources":[{"id":"legacy-1","title":"院校人物访谈","url":"https://www.saif.sjtu.edu.cn/show-70-1509.html","publisher":"中金公司","author":null,"kind":"career_case","published_at":"2021-08-13","checked_at":"2026-11-17","read_level":"prior_verified","scope":"历史个案仅作履历识别证据，不代表转岗概率、现时薪酬、任何团队或中金资本的评级。","commercial_interest":false,"independence_key":"legacy-1"},{"id":"legacy-2","title":"公司年报","url":"https://crm.htsc.com.cn/pdf_finchina/HKSTOCK/2026/2026-3/2026-03-30/2469554.pdf","publisher":"华泰证券","author":null,"kind":"institutional_fact","published_at":"2026-03-31","checked_at":"2026-11-17","read_level":"prior_verified","scope":"主流平台属于分析判断。平台覆盖不能代替行业小组实力、同届正式薪酬或留用证据。","commercial_interest":false,"independence_key":"legacy-2"},{"id":"legacy-3","title":"公司年报","url":"https://static.www.tencent.com/uploads/2026/03/18/559e5d480a4411165e6c7367d61fefbd.pdf","publisher":"腾讯","author":null,"kind":"institutional_fact","published_at":"2026-03-18","checked_at":"2026-11-17","read_level":"prior_verified","scope":"不能据公司品牌把云、游戏、投资或一般支持岗位视为同等质量，也不替代金融投研经历。","commercial_interest":false,"independence_key":"legacy-3"},{"id":"legacy-4","title":"机构公开披露","url":"https://www.jsfund.cn/main/a/20250804/483943.shtml","publisher":"嘉实基金","author":null,"kind":"institutional_fact","published_at":"2025-08-04","checked_at":"2026-11-17","read_level":"prior_verified","scope":"主流公募判断不由ETF名次直接生成；ETF证据不外推主动权益、信用研究团队或正式岗回报。","commercial_interest":false,"independence_key":"legacy-4"},{"id":"legacy-5","title":"产品定期披露","url":"https://www.xqfunds.com/data/20251027164455jjpz.pdf","publisher":"兴证全球基金","author":null,"kind":"institutional_fact","published_at":"2025-10-28","checked_at":"2026-11-17","read_level":"prior_verified","scope":"公司认可与具体产品表现分开；不据总规模、单期收益或母公司名气推断岗位质量。","commercial_interest":false,"independence_key":"legacy-5"},{"id":"legacy-6","title":"机构投资披露","url":"https://www.lanchivc.com/8906/","publisher":"蓝驰创投","author":null,"kind":"institutional_fact","published_at":"2026-11-06","checked_at":"2026-11-17","read_level":"prior_verified","scope":"专业认可属于分析判断。未验证退出回报、薪酬、资金稳定性及该实习的投委参与。","commercial_interest":false,"independence_key":"legacy-6"},{"id":"legacy-7","title":"机构投资披露","url":"https://www.niocapital.com/news/announcements","publisher":"蔚来资本","author":null,"kind":"institutional_fact","published_at":"2026-01-02","checked_at":"2026-11-17","read_level":"prior_verified","scope":"不继承蔚来汽车的业务评价；投资公告不能证明退出业绩、基金存续或该团队招聘质量。","commercial_interest":false,"independence_key":"legacy-7"},{"id":"legacy-8","title":"机构业务说明","url":"https://capital.lenovo.com/news/detail/id/797/s/3.html","publisher":"联想创投","author":null,"kind":"institutional_fact","published_at":"2023-04-06","checked_at":"2026-11-17","read_level":"prior_verified","scope":"历史材料用于解释CVC定位，现时岗位需另核。不能与纯财务PE、联想战略部或母公司自动互评。","commercial_interest":false,"independence_key":"legacy-8"},{"id":"legacy-9","title":"公司业务介绍","url":"https://brand.lenovo.com.cn/brand/ppn03771.html","publisher":"联想","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"prior_verified","scope":"核验日不是文章首发日。集团品牌不证明具体战略团队，更不自动赋予联想创投相同档位。","commercial_interest":false,"independence_key":"legacy-9"},{"id":"legacy-10","title":"交易所项目文件","url":"https://www.sse.com.cn/disclosure/listedinfo/announcement/c/new/2025-08-16/600027_20250816_DNWH.pdf","publisher":"华泰联合证券","author":null,"kind":"institutional_fact","published_at":"2025-08-16","checked_at":"2026-11-17","read_level":"prior_verified","scope":"不因华泰母公司自动升档；单个项目、承销量或名次不证明整个团队及正式岗薪酬。","commercial_interest":false,"independence_key":"legacy-10"},{"id":"legacy-11","title":"机构业务介绍","url":"https://lighthousecap.cn/business.html","publisher":"光源资本","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"prior_verified","scope":"专业平台判断仍需目标行业的已完成交易与实际职责支撑；不把融资宣传额当收入或回报。","commercial_interest":false,"independence_key":"legacy-11"},{"id":"legacy-12","title":"机构业务介绍","url":"https://cftcapital.com/about.aspx","publisher":"中芯聚源投资","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"prior_verified","scope":"不外推为所有行业的头部PE；未验证该团队退出、薪酬或实习投资决策参与。","commercial_interest":false,"independence_key":"legacy-12"},{"id":"legacy-13","title":"机构业务介绍","url":"https://www.invesco.com/apac/en/institutional/who-we-are/investing-in-china.html","publisher":"景顺投资","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"prior_verified","scope":"品牌不替代实际雇佣主体、办公室和资产线；未验证具体北京上海团队或总部薪酬。","commercial_interest":false,"independence_key":"legacy-13"},{"id":"cicc-pe","title":"中金公司：私募股权","url":"https://www.cicc.com/services/pe","publisher":"中金资本","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"full_text","scope":"独立依据来自中金的私募业务说明，未继承中金公司档位。管理规模与母公司品牌不能证明基金回报、实习职责或薪酬。","commercial_interest":false,"independence_key":"cicc-pe"},{"id":"cmc-about","title":"CMC资本：关于我们","url":"https://www.cmccap.com/about","publisher":"CMC资本","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"full_text","scope":"官网定位与投资活动支持专业平台判断，不证明IRR、退出回款、招聘转化或正式薪酬。","commercial_interest":false,"independence_key":"cmc-about"},{"id":"taikang-about","title":"泰康资产：公司介绍","url":"https://www.taikangasset.cn/knowus/aboutus/companyintro/companyintro.html","publisher":"泰康资产","author":null,"kind":"institutional_fact","published_at":"2026-09-11","checked_at":"2026-11-17","read_level":"full_text","scope":"主流保险资管是分析判断。总规模、获奖与母公司待遇均不代替对应业务、团队和正式薪酬。","commercial_interest":false,"independence_key":"taikang-about"},{"id":"chinaamc-about","title":"华夏基金：公司概览","url":"https://www.chinaamc.com/guanyu/gailan/index.shtml","publisher":"华夏基金","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"full_text","scope":"公募品牌判断不来自总规模或奖项；未核实具体组别的稳定性、同届正式回报及留用。","commercial_interest":false,"independence_key":"chinaamc-about"},{"id":"lanchi-about","title":"蓝驰创投：关于我们","url":"https://www.lanchivc.com/about/","publisher":"蓝驰创投","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"full_text","scope":"基金和案例说明业务，不证明退出业绩或下一轮募资；专业平台档位是有范围的分析判断。","commercial_interest":false,"independence_key":"lanchi-about"},{"id":"vivo-about","title":"维梧资本：关于我们","url":"https://www.vivocapital.com.cn/about","publisher":"维梧资本","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"full_text","scope":"专业平台判断仅适用医疗投资市场；未核实具体团队的退出、同届待遇或科学背景硬门槛。","commercial_interest":false,"independence_key":"vivo-about"},{"id":"citic-annual","title":"中信证券2025年年报摘要","url":"https://static.cninfo.com.cn/finalpage/2026-03-27/1225036048.PDF","publisher":"中信证券","author":null,"kind":"institutional_fact","published_at":"2026-03-27","checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"本轮读取公开摘要而非整份年报；不据数字或奖项升档。尚缺接收方对具体业务履历的独立验证。","commercial_interest":false,"independence_key":"citic-annual"},{"id":"gtht-annual","title":"国泰海通2025年年报","url":"https://static.cninfo.com.cn/finalpage/2026-03-28/1225047952.PDF","publisher":"国泰海通证券","author":null,"kind":"institutional_fact","published_at":"2026-03-28","checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"本轮读取官方公开摘要，未通读年报。主流平台为分析判断；旧名次、合并规模不自动提高团队或岗位等级。","commercial_interest":false,"independence_key":"gtht-annual"},{"id":"xingye-annual","title":"机构公开资料","url":"https://static.cninfo.com.cn/finalpage/2026-03-28/1225047578.PDF","publisher":"兴业证券","author":null,"kind":"institutional_fact","published_at":"2026-03-28","checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"xingye-annual"},{"id":"dongwu-annual","title":"机构公开资料","url":"https://static.cninfo.com.cn/finalpage/2026-04-29/1225226624.PDF","publisher":"东吴证券","author":null,"kind":"institutional_fact","published_at":"2026-04-29","checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"dongwu-annual"},{"id":"guojin-annual","title":"机构公开资料","url":"https://static.cninfo.com.cn/finalpage/2026-04-24/1225171783.PDF","publisher":"国金证券","author":null,"kind":"institutional_fact","published_at":"2026-04-24","checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"guojin-annual"},{"id":"chinalife-alt","title":"机构公开资料","url":"https://www.chinalifeinvest.com/invest/folder/2001/0023-1.html","publisher":"国寿投资","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"chinalife-alt"},{"id":"chinalife-jinshi","title":"机构公开资料","url":"https://www.chinalifeinvest.com/invest/folder/2011/0818-1.html","publisher":"国寿金石","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"chinalife-jinshi"},{"id":"huatai-amc","title":"机构公开资料","url":"https://htamc.htsc.com.cn/company/gs-intro.jsp","publisher":"华泰证券（上海）资产管理有限公司","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"huatai-amc"},{"id":"huabao-trust","title":"机构公开资料","url":"https://www.huabaotrust.com/V5html/aboutUs2.html","publisher":"华宝信托","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"huabao-trust"},{"id":"tianhong-about","title":"机构公开资料","url":"https://www.thfund.com.cn/?q=about%2Fcompany","publisher":"天弘基金","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"tianhong-about"},{"id":"szvc-about","title":"机构公开资料","url":"https://gzw.sz.gov.cn/ztzl/gzgqztzl/gyqyxxgk/qyjj/content/post_9395962.html","publisher":"深创投","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"szvc-about"},{"id":"qianhai-fof","title":"机构公开资料","url":"https://www.sz.gov.cn/cn/xxgk/zfxxgj/bmdt/content/post_12816703.html","publisher":"前海方舟","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"qianhai-fof"},{"id":"cec-about","title":"机构公开资料","url":"https://www.ceccapitalgroup.com/","publisher":"易凯资本","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"cec-about"},{"id":"fosun-about","title":"机构公开资料","url":"https://www.fosuncapital.com/","publisher":"复星创富","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"fosun-about"},{"id":"riverhead-about","title":"机构公开资料","url":"https://www.riverheadcapital.cn/web/us_introduce.php","publisher":"阳光融汇资本","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"riverhead-about"},{"id":"bai-about","title":"机构公开资料","url":"https://www.bai-cap.com/about.html","publisher":"贝塔斯曼","author":null,"kind":"institutional_fact","published_at":null,"checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"bai-about"},{"id":"icbcubs-name","title":"机构公开资料","url":"https://www.sse.com.cn/disclosure/fund/announcement/c/new/2025-06-13/510060_20250613_ON2F.pdf","publisher":"工银瑞信基金","author":null,"kind":"institutional_fact","published_at":"2025-06-13","checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"icbcubs-name"},{"id":"caitong-amc","title":"机构公开资料","url":"https://static.cninfo.com.cn/finalpage/2025-04-18/1223135038.PDF","publisher":"财通资管","author":null,"kind":"institutional_fact","published_at":"2025-04-18","checked_at":"2026-11-17","read_level":"indexed_excerpt","scope":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","commercial_interest":false,"independence_key":"caitong-amc"},{"id":"chen-source","title":"投行与PE的职业选择（历史文章）","url":"https://www.sohu.com/a/244179977_99993631","publisher":"陈思炜职业文章转载","author":"陈思炜","kind":"practitioner_opinion","published_at":"2018-07-30","checked_at":"2026-11-17","read_level":"full_text","scope":"历史、商业职业辅导语境；不能代表2026年全市场共识、排名或薪酬。相同知乎转载不计第二独立来源。","commercial_interest":true,"independence_key":"chen-2018-career-choice"},{"id":"brian-source","title":"Investment Banking Exit Opportunities","url":"https://mergersandinquisitions.com/investment-banking-exit-opportunities/","publisher":"Mergers & Inquisitions","author":"Brian DeChesare","kind":"practitioner_opinion","published_at":null,"checked_at":"2026-11-17","read_level":"partial_text","scope":"本轮读到文章前部及退出选择讨论，未通读全篇；主要为欧美市场，只作机制参考，不照搬京沪机构名次。","commercial_interest":true,"independence_key":"brian-source"},{"id":"lin-source","title":"首席分析师流动与卖方业务变化","url":"https://api3.cls.cn/share/article/2313359?app=&os=web&sv=845","publisher":"财联社","author":"林坚；责编李桂芳","kind":"practitioner_opinion","published_at":"2026-03-15","checked_at":"2026-11-17","read_level":"full_text","scope":"报道讨论资深人员和机构变化，不是毕业生薪酬、某团队当下招聘或转岗概率。","commercial_interest":false,"independence_key":"lin-source"},{"id":"interviews-source","title":"卖方、买方与职业转型访谈","url":"https://www.sohu.com/a/460617731_494564","publisher":"金融老编辑转载圆手查薪酬","author":"匿名卖方研究员、私募从业者与猎头","kind":"anonymous_interview","published_at":"2021-04-13","checked_at":"2026-11-17","read_level":"partial_text","scope":"匿名历史访谈，四位受访者来自同一采编材料，仅计一个来源单位；资深待遇个案不外推应届。","commercial_interest":false,"independence_key":"yuanshou-2021-interviews"},{"id":"rosner-source","title":"How to Become a Portfolio Manager","url":"https://www.cfainstitute.org/insights/articles/career-portfolio-manager","publisher":"CFA Institute","author":"Lindsay Rosner, CFA","kind":"practitioner_opinion","published_at":"2026-04-16","checked_at":"2026-11-17","read_level":"full_text","scope":"作者为资深资管从业者的职业路径，不能当作所有实习或新人的晋升概率。","commercial_interest":false,"independence_key":"rosner-source"},{"id":"moody-source","title":"AI and the Missing First Rung of Investment Careers","url":"https://www.cfainstitute.org/insights/articles/ai-missing-first-rung-investment-careers","publisher":"CFA Institute","author":"Paul Moody, CFA","kind":"practitioner_opinion","published_at":"2026-09-28","checked_at":"2026-11-17","read_level":"full_text","scope":"职业培养观点，不是薪酬统计或机构排名。","commercial_interest":false,"independence_key":"moody-source"},{"id":"skills-source","title":"Employers’ New Skills Blueprint","url":"https://www.cfainstitute.org/insights/articles/employers-new-skills-blueprint","publisher":"CFA Institute","author":"CFA Institute 雇主研究","kind":"employer_research","published_at":"2026-03-06","checked_at":"2026-11-17","read_level":"full_text","scope":"机构研究摘要说明技能需求，不提供京沪各公司等级；与其他CFA文章不作为独立排名投票。","commercial_interest":false,"independence_key":"cfa-skills-2026"}],"claims":[{"id":"review-1","subject":"中金公司","aspect":"company_recognition","text":"投行与研究品牌在金融招聘中具有辨识度；有公开职业路径说明相关履历能被买方理解。","source_ids":["legacy-1"],"type":"analyst_inference","status":"supported_with_limits","market":["券商投行","卖方研究","买方转岗"],"checked_at":"2026-11-17","limitation":"历史个案仅作履历识别证据，不代表转岗概率、现时薪酬、任何团队或中金资本的评级。","contradicts":[]},{"id":"review-2","subject":"华泰证券","aspect":"company_recognition","text":"主流综合券商品牌；研究平台与覆盖可核，适合作为卖方及机构业务履历比较。","source_ids":["legacy-2"],"type":"analyst_inference","status":"supported_with_limits","market":["券商研究","机构业务"],"checked_at":"2026-11-17","limitation":"主流平台属于分析判断。平台覆盖不能代替行业小组实力、同届正式薪酬或留用证据。","contradicts":[]},{"id":"review-3","subject":"腾讯","aspect":"company_recognition","text":"公司品牌及核心经营业务的辨识度高；更适用于互联网战略和商业分析招聘市场。","source_ids":["legacy-3"],"type":"analyst_inference","status":"supported_with_limits","market":["互联网战略","商业分析","产业研究"],"checked_at":"2026-11-17","limitation":"不能据公司品牌把云、游戏、投资或一般支持岗位视为同等质量，也不替代金融投研经历。","contradicts":[]},{"id":"review-4","subject":"嘉实基金","aspect":"company_recognition","text":"公募基金品牌和持续运行的产品平台可核；在公募及资管招聘中具有可解释的履历价值。","source_ids":["legacy-4"],"type":"analyst_inference","status":"supported_with_limits","market":["公募投研","基金与ETF"],"checked_at":"2026-11-17","limitation":"主流公募判断不由ETF名次直接生成；ETF证据不外推主动权益、信用研究团队或正式岗回报。","contradicts":[]},{"id":"review-5","subject":"兴证全球基金","aspect":"company_recognition","text":"公募品牌与多资产、养老产品平台有对应证据；配置路线可作为主流公募候选比较。","source_ids":["legacy-5"],"type":"analyst_inference","status":"supported_with_limits","market":["公募投研","多资产与基金配置"],"checked_at":"2026-11-17","limitation":"公司认可与具体产品表现分开；不据总规模、单期收益或母公司名气推断岗位质量。","contradicts":[]},{"id":"review-6","subject":"蓝驰创投","aspect":"company_recognition","text":"早期科技投资的专业平台，有对应基金及真实投资案例；在VC招聘市场内比较。","source_ids":["legacy-6"],"type":"analyst_inference","status":"supported_with_limits","market":["早期科技投资","AI创投"],"checked_at":"2026-11-17","limitation":"专业认可属于分析判断。未验证退出回报、薪酬、资金稳定性及该实习的投委参与。","contradicts":[]},{"id":"review-7","subject":"蔚来资本","aspect":"company_recognition","text":"具名投资机构与产业方向可核，适合在产业资本及相关PE/VC中比较。","source_ids":["legacy-7"],"type":"analyst_inference","status":"supported_with_limits","market":["产业投资","出行与能源投资"],"checked_at":"2026-11-17","limitation":"不继承蔚来汽车的业务评价；投资公告不能证明退出业绩、基金存续或该团队招聘质量。","contradicts":[]},{"id":"review-8","subject":"联想创投","aspect":"company_recognition","text":"机构明确兼顾财务回报、战略生态与孵化；属于可识别的科技CVC平台。","source_ids":["legacy-8"],"type":"analyst_inference","status":"supported_with_limits","market":["CVC","科技产业投资"],"checked_at":"2026-11-17","limitation":"历史材料用于解释CVC定位，现时岗位需另核。不能与纯财务PE、联想战略部或母公司自动互评。","contradicts":[]},{"id":"review-9","subject":"联想","aspect":"company_recognition","text":"科技公司品牌与实际经营业务可核；在科技战略和商业分析招聘中有明确解释空间。","source_ids":["legacy-9"],"type":"analyst_inference","status":"supported_with_limits","market":["科技战略","商业分析"],"checked_at":"2026-11-17","limitation":"核验日不是文章首发日。集团品牌不证明具体战略团队，更不自动赋予联想创投相同档位。","contradicts":[]},{"id":"review-10","subject":"华泰联合证券","aspect":"company_recognition","text":"投行业务的专业主体，有真实重组项目和官方业务入口；与综合券商按投行市场比较。","source_ids":["legacy-10"],"type":"analyst_inference","status":"supported_with_limits","market":["股权投行","并购重组","债券融资"],"checked_at":"2026-11-17","limitation":"不因华泰母公司自动升档；单个项目、承销量或名次不证明整个团队及正式岗薪酬。","contradicts":[]},{"id":"review-11","subject":"光源资本","aspect":"company_recognition","text":"可核实的财务顾问与交易业务平台；应在相关融资及并购顾问市场比较。","source_ids":["legacy-11"],"type":"analyst_inference","status":"supported_with_limits","market":["精品投行","FA与并购"],"checked_at":"2026-11-17","limitation":"专业平台判断仍需目标行业的已完成交易与实际职责支撑；不把融资宣传额当收入或回报。","contradicts":[]},{"id":"review-12","subject":"中芯聚源投资","aspect":"company_recognition","text":"半导体产业投资定位和主体可核，在该产业投资市场具有针对性。","source_ids":["legacy-12"],"type":"analyst_inference","status":"supported_with_limits","market":["半导体产业投资"],"checked_at":"2026-11-17","limitation":"不外推为所有行业的头部PE；未验证该团队退出、薪酬或实习投资决策参与。","contradicts":[]},{"id":"review-13","subject":"景顺投资","aspect":"company_recognition","text":"可识别的资产管理平台；现有证据对应亚太及中国投资业务。","source_ids":["legacy-13"],"type":"analyst_inference","status":"supported_with_limits","market":["外资资管","不动产投资"],"checked_at":"2026-11-17","limitation":"品牌不替代实际雇佣主体、办公室和资产线；未验证具体北京上海团队或总部薪酬。","contradicts":[]},{"id":"cicc-pe-fact","subject":"中金资本","aspect":"entity_and_business","text":"中金官方明确中金资本为私募股权业务运营平台，2017年成立；募投管退一体化。","source_ids":["cicc-pe"],"type":"fact","status":"supported_with_limits","market":["一级投资","产业基金"],"checked_at":"2026-11-17","limitation":"独立依据来自中金的私募业务说明，未继承中金公司档位。管理规模与母公司品牌不能证明基金回报、实习职责或薪酬。","contradicts":[]},{"id":"cicc-pe-judgment","subject":"中金资本","aspect":"company_recognition","text":"专业平台是对所列招聘市场的分析判断，不是该官网给出的排名。","source_ids":["cicc-pe"],"type":"analyst_inference","status":"supported_with_limits","market":["一级投资","产业基金"],"checked_at":"2026-11-17","limitation":"独立依据来自中金的私募业务说明，未继承中金公司档位。管理规模与母公司品牌不能证明基金回报、实习职责或薪酬。","contradicts":[]},{"id":"cmc-about-fact","subject":"CMC资本","aspect":"entity_and_business","text":"机构公开披露2010年创立，关注早期及成长期的科技、互联网与消费，设北京、上海及香港办公室。","source_ids":["cmc-about"],"type":"fact","status":"supported_with_limits","market":["科技与消费PE/VC"],"checked_at":"2026-11-17","limitation":"官网定位与投资活动支持专业平台判断，不证明IRR、退出回款、招聘转化或正式薪酬。","contradicts":[]},{"id":"cmc-about-judgment","subject":"CMC资本","aspect":"company_recognition","text":"专业平台是对所列招聘市场的分析判断，不是该官网给出的排名。","source_ids":["cmc-about"],"type":"analyst_inference","status":"supported_with_limits","market":["科技与消费PE/VC"],"checked_at":"2026-11-17","limitation":"官网定位与投资活动支持专业平台判断，不证明IRR、退出回款、招聘转化或正式薪酬。","contradicts":[]},{"id":"taikang-about-fact","subject":"泰康资产","aspect":"entity_and_business","text":"保险资管主体成立于2006年，官网业务覆盖保险及第三方、年金、固定收益、权益、多资产、量化与另类。","source_ids":["taikang-about"],"type":"fact","status":"supported_with_limits","market":["保险资管","养老金投资","多资产"],"checked_at":"2026-11-17","limitation":"主流保险资管是分析判断。总规模、获奖与母公司待遇均不代替对应业务、团队和正式薪酬。","contradicts":[]},{"id":"taikang-about-judgment","subject":"泰康资产","aspect":"company_recognition","text":"主流平台是对所列招聘市场的分析判断，不是该官网给出的排名。","source_ids":["taikang-about"],"type":"analyst_inference","status":"supported_with_limits","market":["保险资管","养老金投资","多资产"],"checked_at":"2026-11-17","limitation":"主流保险资管是分析判断。总规模、获奖与母公司待遇均不代替对应业务、团队和正式薪酬。","contradicts":[]},{"id":"chinaamc-about-fact","subject":"华夏基金","aspect":"entity_and_business","text":"1998年成立的公募管理人；官网分别介绍主动权益、固收、指数、量化、多资产与跨境业务。","source_ids":["chinaamc-about"],"type":"fact","status":"supported_with_limits","market":["公募投研","指数与ETF","多资产"],"checked_at":"2026-11-17","limitation":"公募品牌判断不来自总规模或奖项；未核实具体组别的稳定性、同届正式回报及留用。","contradicts":[]},{"id":"chinaamc-about-judgment","subject":"华夏基金","aspect":"company_recognition","text":"主流平台是对所列招聘市场的分析判断，不是该官网给出的排名。","source_ids":["chinaamc-about"],"type":"analyst_inference","status":"supported_with_limits","market":["公募投研","指数与ETF","多资产"],"checked_at":"2026-11-17","limitation":"公募品牌判断不来自总规模或奖项；未核实具体组别的稳定性、同届正式回报及留用。","contradicts":[]},{"id":"lanchi-about-fact","subject":"蓝驰创投","aspect":"entity_and_business","text":"官网介绍2008年在中国成立，聚焦早期科技，并列示AI、硬科技、消费及生命科学等方向。","source_ids":["lanchi-about"],"type":"fact","status":"supported_with_limits","market":["早期科技投资","AI创投"],"checked_at":"2026-11-17","limitation":"基金和案例说明业务，不证明退出业绩或下一轮募资；专业平台档位是有范围的分析判断。","contradicts":[]},{"id":"lanchi-about-judgment","subject":"蓝驰创投","aspect":"company_recognition","text":"专业平台是对所列招聘市场的分析判断，不是该官网给出的排名。","source_ids":["lanchi-about"],"type":"analyst_inference","status":"supported_with_limits","market":["早期科技投资","AI创投"],"checked_at":"2026-11-17","limitation":"基金和案例说明业务，不证明退出业绩或下一轮募资；专业平台档位是有范围的分析判断。","contradicts":[]},{"id":"vivo-about-fact","subject":"维梧资本","aspect":"entity_and_business","text":"官网描述跨VC、PE及公开市场的医疗健康投资；中国办公室与全球平台须区分。","source_ids":["vivo-about"],"type":"fact","status":"supported_with_limits","market":["医疗健康投资"],"checked_at":"2026-11-17","limitation":"专业平台判断仅适用医疗投资市场；未核实具体团队的退出、同届待遇或科学背景硬门槛。","contradicts":[]},{"id":"vivo-about-judgment","subject":"维梧资本","aspect":"company_recognition","text":"专业平台是对所列招聘市场的分析判断，不是该官网给出的排名。","source_ids":["vivo-about"],"type":"analyst_inference","status":"supported_with_limits","market":["医疗健康投资"],"checked_at":"2026-11-17","limitation":"专业平台判断仅适用医疗投资市场；未核实具体团队的退出、同届待遇或科学背景硬门槛。","contradicts":[]},{"id":"citic-annual-fact","subject":"中信证券","aspect":"entity_and_business","text":"公开年报摘要可核对综合证券主体及机构、投行等业务。作为主流综合券商候选，是分析判断。","source_ids":["citic-annual"],"type":"fact","status":"supported_with_limits","market":["综合投行","机构业务","券商研究"],"checked_at":"2026-11-17","limitation":"本轮读取公开摘要而非整份年报；不据数字或奖项升档。尚缺接收方对具体业务履历的独立验证。","contradicts":[]},{"id":"citic-annual-judgment","subject":"中信证券","aspect":"company_recognition","text":"主流平台是对所列招聘市场的分析判断，不是该官网给出的排名。","source_ids":["citic-annual"],"type":"analyst_inference","status":"supported_with_limits","market":["综合投行","机构业务","券商研究"],"checked_at":"2026-11-17","limitation":"本轮读取公开摘要而非整份年报；不据数字或奖项升档。尚缺接收方对具体业务履历的独立验证。","contradicts":[]},{"id":"gtht-annual-fact","subject":"国泰海通证券","aspect":"entity_and_business","text":"2025年合并后的综合证券主体；旧国泰君安和海通履历、团队与当前招聘不能无条件互换。","source_ids":["gtht-annual"],"type":"fact","status":"supported_with_limits","market":["综合证券业务","机构业务"],"checked_at":"2026-11-17","limitation":"本轮读取官方公开摘要，未通读年报。主流平台为分析判断；旧名次、合并规模不自动提高团队或岗位等级。","contradicts":[]},{"id":"gtht-annual-judgment","subject":"国泰海通证券","aspect":"company_recognition","text":"主流平台是对所列招聘市场的分析判断，不是该官网给出的排名。","source_ids":["gtht-annual"],"type":"analyst_inference","status":"supported_with_limits","market":["综合证券业务","机构业务"],"checked_at":"2026-11-17","limitation":"本轮读取官方公开摘要，未通读年报。主流平台为分析判断；旧名次、合并规模不自动提高团队或岗位等级。","contradicts":[]},{"id":"xingye-annual-fact","subject":"兴业证券","aspect":"entity_and_business","text":"综合证券主体；研究、投行、资管业务分开。","source_ids":["xingye-annual"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"dongwu-annual-fact","subject":"东吴证券","aspect":"entity_and_business","text":"综合证券主体；项目规模不代表同届待遇或接收方认可。","source_ids":["dongwu-annual"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"guojin-annual-fact","subject":"国金证券","aspect":"entity_and_business","text":"综合证券主体；指数研究与指数运维不能混用。","source_ids":["guojin-annual"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"chinalife-alt-fact","subject":"国寿投资","aspect":"entity_and_business","text":"国寿体系另类投资主体；不等于国寿资产的公开市场投研。","source_ids":["chinalife-alt"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"chinalife-jinshi-fact","subject":"国寿金石","aspect":"entity_and_business","text":"国寿体系特定投资平台；项目研究不自动等同公开市场权益研究。","source_ids":["chinalife-jinshi"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"huatai-amc-fact","subject":"华泰证券（上海）资产管理有限公司","aspect":"entity_and_business","text":"2014年成立的证券资管子公司；不自动继承母公司研究与投行档位。","source_ids":["huatai-amc"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"huabao-trust-fact","subject":"华宝信托","aspect":"entity_and_business","text":"信托主体；主动标品投研、通道业务、运营与销售分开。","source_ids":["huabao-trust"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"tianhong-about-fact","subject":"天弘基金","aspect":"entity_and_business","text":"公募管理人；货币产品知名度不能外推主动权益、固收或量化团队。","source_ids":["tianhong-about"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"szvc-about-fact","subject":"深创投","aspect":"entity_and_business","text":"深圳国资创投主体；产业和早期投资与一般政府基金行政工作分开。","source_ids":["szvc-about"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"qianhai-fof-fact","subject":"前海方舟","aspect":"entity_and_business","text":"母基金及股权投资平台；FOF管理人与直接投资职责分别核验。","source_ids":["qianhai-fof"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"cec-about-fact","subject":"易凯资本","aspect":"entity_and_business","text":"精品投行和资产管理平台；具体交易与职责尚需核验。","source_ids":["cec-about"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"fosun-about-fact","subject":"复星创富","aspect":"entity_and_business","text":"股权投资平台；与复星集团其他主体、募资及投后岗位分开。","source_ids":["fosun-about"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"riverhead-about-fact","subject":"阳光融汇资本","aspect":"entity_and_business","text":"股权投资机构；不能继承阳光集团业务或保险资产配置评价。","source_ids":["riverhead-about"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"bai-about-fact","subject":"贝塔斯曼","aspect":"entity_and_business","text":"BAI与贝塔斯曼集团招聘主体须对应；集团名称不能直接认作BAI投资岗。","source_ids":["bai-about"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"icbcubs-name-fact","subject":"工银瑞信基金","aspect":"entity_and_business","text":"英文名称变更为ICBC UBS，不代表中文雇佣主体或业务线可省略核验。","source_ids":["icbcubs-name"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"caitong-amc-fact","subject":"财通资管","aspect":"entity_and_business","text":"证券资管主体；产品及资产线与母公司业务分开核验。","source_ids":["caitong-amc"],"type":"fact","status":"supported_with_limits","market":["对应业务待核"],"checked_at":"2026-11-17","limitation":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","contradicts":[]},{"id":"chen-claim","subject":"陈思炜","aspect":"career_method","text":"早期职业要比较平台训练与下一站；大投行与小PE的选择不能只看“买方”标签。","source_ids":["chen-source"],"type":"attributed_opinion","status":"supported_with_limits","market":null,"checked_at":"2026-11-17","limitation":"历史、商业职业辅导语境；不能代表2026年全市场共识、排名或薪酬。相同知乎转载不计第二独立来源。","contradicts":[]},{"id":"brian-claim","subject":"Brian DeChesare","aspect":"career_method","text":"投行退出取决于机构层级、岗位经历、地区和招聘网络；PE也包含募资与sourcing，不能假设工作或收入一定更好。","source_ids":["brian-source"],"type":"attributed_opinion","status":"supported_with_limits","market":null,"checked_at":"2026-11-17","limitation":"本轮读到文章前部及退出选择讨论，未通读全篇；主要为欧美市场，只作机制参考，不照搬京沪机构名次。","contradicts":[]},{"id":"lin-claim","subject":"林坚（财联社记者）","aspect":"career_method","text":"首席流动要结合研究收费、客户与机构经营压力，个人名气或团队迁移不能代替公司职业回报判断。","source_ids":["lin-source"],"type":"attributed_opinion","status":"supported_with_limits","market":null,"checked_at":"2026-11-17","limitation":"报道讨论资深人员和机构变化，不是毕业生薪酬、某团队当下招聘或转岗概率。","contradicts":[]},{"id":"interviews-claim","subject":"匿名卖方研究员、私募从业者与猎头","aspect":"career_method","text":"研究员、基金经理和猎头视角强调：买卖方工作机制不同，投资决策、客户服务、平台资源与风格适配都影响职业价值。","source_ids":["interviews-source"],"type":"attributed_opinion","status":"supported_with_limits","market":null,"checked_at":"2026-11-17","limitation":"匿名历史访谈，四位受访者来自同一采编材料，仅计一个来源单位；资深待遇个案不外推应届。","contradicts":[]},{"id":"rosner-claim","subject":"Lindsay Rosner, CFA","aspect":"career_method","text":"组合管理包含风险、配置、实施与客户需求；轮岗、长期资产线积累和导师反馈共同形成判断力。","source_ids":["rosner-source"],"type":"attributed_opinion","status":"supported_with_limits","market":null,"checked_at":"2026-11-17","limitation":"作者为资深资管从业者的职业路径，不能当作所有实习或新人的晋升概率。","contradicts":[]},{"id":"moody-claim","subject":"Paul Moody, CFA","aspect":"career_method","text":"AI和代码不能替代判断力；初级岗位仍需要来源核对、情景分析、决策记录与有反馈的训练。","source_ids":["moody-source"],"type":"attributed_opinion","status":"supported_with_limits","market":null,"checked_at":"2026-11-17","limitation":"职业培养观点，不是薪酬统计或机构排名。","contradicts":[]},{"id":"skills-claim","subject":"CFA Institute 雇主研究","aspect":"career_method","text":"雇主技能要求兼有数据工具、分析和沟通；工具熟练度与金融判断不能互相替代。","source_ids":["skills-source"],"type":"attributed_opinion","status":"supported_with_limits","market":null,"checked_at":"2026-11-17","limitation":"机构研究摘要说明技能需求，不提供京沪各公司等级；与其他CFA文章不作为独立排名投票。","contradicts":[]}],"employers":[{"company":"中信证券","aliases":[],"grade":3,"judgment":true,"markets":["综合投行","机构业务","券商研究"],"reason":"公开年报摘要可核对综合证券主体及机构、投行等业务。作为主流综合券商候选，是分析判断。","business":"投行、研究、资管与交易分开；综合平台不能保证每条业务或岗位质量。","source_ids":["citic-annual"],"claim_ids":["citic-annual-fact","citic-annual-judgment"],"limit":"本轮读取公开摘要而非整份年报；不据数字或奖项升档。尚缺接收方对具体业务履历的独立验证。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://static.cninfo.com.cn/finalpage/2026-03-27/1225036048.PDF","asOf":"2026-03-27","checked":false,"kind":"官方公开摘要"},{"company":"中金公司","aliases":[],"grade":3,"judgment":true,"markets":["券商投行","卖方研究","买方转岗"],"reason":"投行与研究品牌在金融招聘中具有辨识度；有公开职业路径说明相关履历能被买方理解。","business":"业务、资产线及具体职责另行核对，不能从公司档位继承。","source_ids":["legacy-1"],"claim_ids":["review-1"],"limit":"历史个案仅作履历识别证据，不代表转岗概率、现时薪酬、任何团队或中金资本的评级。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.saif.sjtu.edu.cn/show-70-1509.html","asOf":"2021-08-13","kind":"院校人物访谈","checked":false},{"company":"兴证全球基金","aliases":[],"grade":3,"judgment":true,"markets":["公募投研","多资产与基金配置"],"reason":"公募品牌与多资产、养老产品平台有对应证据；配置路线可作为主流公募候选比较。","business":"业务、资产线及具体职责另行核对，不能从公司档位继承。","source_ids":["legacy-5"],"claim_ids":["review-5"],"limit":"公司认可与具体产品表现分开；不据总规模、单期收益或母公司名气推断岗位质量。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.xqfunds.com/data/20251027164455jjpz.pdf","asOf":"2025-10-28","kind":"产品定期披露","checked":false},{"company":"华夏基金","aliases":[],"grade":3,"judgment":true,"markets":["公募投研","指数与ETF","多资产"],"reason":"1998年成立的公募管理人；官网分别介绍主动权益、固收、指数、量化、多资产与跨境业务。","business":"按资产线比较；指数运营、营销与基金研究不能互相替代。","source_ids":["chinaamc-about"],"claim_ids":["chinaamc-about-fact","chinaamc-about-judgment"],"limit":"公募品牌判断不来自总规模或奖项；未核实具体组别的稳定性、同届正式回报及留用。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.chinaamc.com/guanyu/gailan/index.shtml","asOf":"2026-11-17","checked":true,"kind":"官网业务说明"},{"company":"华泰证券","aliases":[],"grade":3,"judgment":true,"markets":["券商研究","机构业务"],"reason":"主流综合券商品牌；研究平台与覆盖可核，适合作为卖方及机构业务履历比较。","business":"业务、资产线及具体职责另行核对，不能从公司档位继承。","source_ids":["legacy-2"],"claim_ids":["review-2"],"limit":"主流平台属于分析判断。平台覆盖不能代替行业小组实力、同届正式薪酬或留用证据。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://crm.htsc.com.cn/pdf_finchina/HKSTOCK/2026/2026-3/2026-03-30/2469554.pdf","asOf":"2026-03-31","kind":"公司年报","checked":false},{"company":"嘉实基金","aliases":[],"grade":3,"judgment":true,"markets":["公募投研","基金与ETF"],"reason":"公募基金品牌和持续运行的产品平台可核；在公募及资管招聘中具有可解释的履历价值。","business":"业务、资产线及具体职责另行核对，不能从公司档位继承。","source_ids":["legacy-4"],"claim_ids":["review-4"],"limit":"主流公募判断不由ETF名次直接生成；ETF证据不外推主动权益、信用研究团队或正式岗回报。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.jsfund.cn/main/a/20250804/483943.shtml","asOf":"2025-08-04","kind":"机构公开披露","checked":false},{"company":"国泰海通证券","aliases":[],"grade":3,"judgment":true,"markets":["综合证券业务","机构业务"],"reason":"2025年合并后的综合证券主体；旧国泰君安和海通履历、团队与当前招聘不能无条件互换。","business":"综合券商业务需按合并后的主体、团队和资产线确认。","source_ids":["gtht-annual"],"claim_ids":["gtht-annual-fact","gtht-annual-judgment"],"limit":"本轮读取官方公开摘要，未通读年报。主流平台为分析判断；旧名次、合并规模不自动提高团队或岗位等级。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://static.cninfo.com.cn/finalpage/2026-03-28/1225047952.PDF","asOf":"2026-03-28","checked":false,"kind":"官方公开摘要"},{"company":"泰康资产","aliases":[],"grade":3,"judgment":true,"markets":["保险资管","养老金投资","多资产"],"reason":"保险资管主体成立于2006年，官网业务覆盖保险及第三方、年金、固定收益、权益、多资产、量化与另类。","business":"保险资管不能等同公募；公募业务2022年转至泰康基金，招聘主体及资产线须独立确认。","source_ids":["taikang-about"],"claim_ids":["taikang-about-fact","taikang-about-judgment"],"limit":"主流保险资管是分析判断。总规模、获奖与母公司待遇均不代替对应业务、团队和正式薪酬。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.taikangasset.cn/knowus/aboutus/companyintro/companyintro.html","asOf":"2026-09-11","checked":false,"kind":"官网业务说明"},{"company":"联想","aliases":[],"grade":3,"judgment":true,"markets":["科技战略","商业分析"],"reason":"科技公司品牌与实际经营业务可核；在科技战略和商业分析招聘中有明确解释空间。","business":"业务、资产线及具体职责另行核对，不能从公司档位继承。","source_ids":["legacy-9"],"claim_ids":["review-9"],"limit":"核验日不是文章首发日。集团品牌不证明具体战略团队，更不自动赋予联想创投相同档位。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://brand.lenovo.com.cn/brand/ppn03771.html","asOf":"2026-11-16","kind":"公司业务介绍","checked":true},{"company":"腾讯","aliases":[],"grade":3,"judgment":true,"markets":["互联网战略","商业分析","产业研究"],"reason":"公司品牌及核心经营业务的辨识度高；更适用于互联网战略和商业分析招聘市场。","business":"业务、资产线及具体职责另行核对，不能从公司档位继承。","source_ids":["legacy-3"],"claim_ids":["review-3"],"limit":"不能据公司品牌把云、游戏、投资或一般支持岗位视为同等质量，也不替代金融投研经历。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://static.www.tencent.com/uploads/2026/03/18/559e5d480a4411165e6c7367d61fefbd.pdf","asOf":"2026-03-18","kind":"公司年报","checked":false},{"company":"CMC资本","aliases":[],"grade":2,"judgment":true,"markets":["科技与消费PE/VC"],"reason":"机构公开披露2010年创立，关注早期及成长期的科技、互联网与消费，设北京、上海及香港办公室。","business":"成长及早期股权投资；与CVC、FOF、家办分开比较。","source_ids":["cmc-about"],"claim_ids":["cmc-about-fact","cmc-about-judgment"],"limit":"官网定位与投资活动支持专业平台判断，不证明IRR、退出回款、招聘转化或正式薪酬。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.cmccap.com/about","asOf":"2026-11-17","checked":true,"kind":"官网业务说明"},{"company":"中芯聚源投资","aliases":[],"grade":2,"judgment":true,"markets":["半导体产业投资"],"reason":"半导体产业投资定位和主体可核，在该产业投资市场具有针对性。","business":"业务、资产线及具体职责另行核对，不能从公司档位继承。","source_ids":["legacy-12"],"claim_ids":["review-12"],"limit":"不外推为所有行业的头部PE；未验证该团队退出、薪酬或实习投资决策参与。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://cftcapital.com/about.aspx","asOf":"2026-11-13","kind":"机构业务介绍","checked":true},{"company":"中金资本","aliases":[],"grade":2,"judgment":true,"markets":["一级投资","产业基金"],"reason":"中金官方明确中金资本为私募股权业务运营平台，2017年成立；募投管退一体化。","business":"PE、产业基金与基金管理；必须区分投资、募资、基金运营及战略支持。","source_ids":["cicc-pe"],"claim_ids":["cicc-pe-fact","cicc-pe-judgment"],"limit":"独立依据来自中金的私募业务说明，未继承中金公司档位。管理规模与母公司品牌不能证明基金回报、实习职责或薪酬。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.cicc.com/services/pe","asOf":"2026-11-17","checked":true,"kind":"官网业务说明"},{"company":"光源资本","aliases":[],"grade":2,"judgment":true,"markets":["精品投行","FA与并购"],"reason":"可核实的财务顾问与交易业务平台；应在相关融资及并购顾问市场比较。","business":"业务、资产线及具体职责另行核对，不能从公司档位继承。","source_ids":["legacy-11"],"claim_ids":["review-11"],"limit":"专业平台判断仍需目标行业的已完成交易与实际职责支撑；不把融资宣传额当收入或回报。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://lighthousecap.cn/business.html","asOf":"2026-11-13","kind":"机构业务介绍","checked":true},{"company":"华泰联合证券","aliases":[],"grade":2,"judgment":true,"markets":["股权投行","并购重组","债券融资"],"reason":"投行业务的专业主体，有真实重组项目和官方业务入口；与综合券商按投行市场比较。","business":"业务、资产线及具体职责另行核对，不能从公司档位继承。","source_ids":["legacy-10"],"claim_ids":["review-10"],"limit":"不因华泰母公司自动升档；单个项目、承销量或名次不证明整个团队及正式岗薪酬。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.sse.com.cn/disclosure/listedinfo/announcement/c/new/2025-08-16/600027_20250816_DNWH.pdf","asOf":"2025-08-16","kind":"交易所项目文件","checked":false},{"company":"景顺投资","aliases":[],"grade":2,"judgment":true,"markets":["外资资管","不动产投资"],"reason":"可识别的资产管理平台；现有证据对应亚太及中国投资业务。","business":"业务、资产线及具体职责另行核对，不能从公司档位继承。","source_ids":["legacy-13"],"claim_ids":["review-13"],"limit":"品牌不替代实际雇佣主体、办公室和资产线；未验证具体北京上海团队或总部薪酬。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.invesco.com/apac/en/institutional/who-we-are/investing-in-china.html","asOf":"2026-11-13","kind":"机构业务介绍","checked":true},{"company":"维梧资本","aliases":[],"grade":2,"judgment":true,"markets":["医疗健康投资"],"reason":"官网描述跨VC、PE及公开市场的医疗健康投资；中国办公室与全球平台须区分。","business":"生命科学与医疗投资；不能把全球管理人履历自动赋给任一上海实习主体。","source_ids":["vivo-about"],"claim_ids":["vivo-about-fact","vivo-about-judgment"],"limit":"专业平台判断仅适用医疗投资市场；未核实具体团队的退出、同届待遇或科学背景硬门槛。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.vivocapital.com.cn/about","asOf":"2026-11-17","checked":true,"kind":"官网业务说明"},{"company":"联想创投","aliases":[],"grade":2,"judgment":true,"markets":["CVC","科技产业投资"],"reason":"机构明确兼顾财务回报、战略生态与孵化；属于可识别的科技CVC平台。","business":"业务、资产线及具体职责另行核对，不能从公司档位继承。","source_ids":["legacy-8"],"claim_ids":["review-8"],"limit":"历史材料用于解释CVC定位，现时岗位需另核。不能与纯财务PE、联想战略部或母公司自动互评。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://capital.lenovo.com/news/detail/id/797/s/3.html","asOf":"2023-04-06","kind":"机构业务说明","checked":false},{"company":"蓝驰创投","aliases":[],"grade":2,"judgment":true,"markets":["早期科技投资","AI创投"],"reason":"官网介绍2008年在中国成立，聚焦早期科技，并列示AI、硬科技、消费及生命科学等方向。","business":"早期科技VC；行业知识与真实投资分析参与是岗位价值关键。","source_ids":["legacy-6","lanchi-about"],"claim_ids":["review-6","lanchi-about-fact","lanchi-about-judgment"],"limit":"基金和案例说明业务，不证明退出业绩或下一轮募资；专业平台档位是有范围的分析判断。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.lanchivc.com/about/","asOf":"2026-11-17","kind":"官网业务说明","checked":true},{"company":"蔚来资本","aliases":[],"grade":2,"judgment":true,"markets":["产业投资","出行与能源投资"],"reason":"具名投资机构与产业方向可核，适合在产业资本及相关PE/VC中比较。","business":"业务、资产线及具体职责另行核对，不能从公司档位继承。","source_ids":["legacy-7"],"claim_ids":["review-7"],"limit":"不继承蔚来汽车的业务评价；投资公告不能证明退出业绩、基金存续或该团队招聘质量。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.niocapital.com/news/announcements","asOf":"2026-01-02","kind":"机构投资披露","checked":false},{"company":"东吴证券","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"综合证券主体；项目规模不代表同届待遇或接收方认可。","business":"综合证券主体；项目规模不代表同届待遇或接收方认可。","source_ids":["dongwu-annual"],"claim_ids":["dongwu-annual-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://static.cninfo.com.cn/finalpage/2026-04-29/1225226624.PDF","asOf":"2026-04-29","checked":false,"kind":"官方公开摘要"},{"company":"兴业证券","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"综合证券主体；研究、投行、资管业务分开。","business":"综合证券主体；研究、投行、资管业务分开。","source_ids":["xingye-annual"],"claim_ids":["xingye-annual-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://static.cninfo.com.cn/finalpage/2026-03-28/1225047578.PDF","asOf":"2026-03-28","checked":false,"kind":"官方公开摘要"},{"company":"前海方舟","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"母基金及股权投资平台；FOF管理人与直接投资职责分别核验。","business":"母基金及股权投资平台；FOF管理人与直接投资职责分别核验。","source_ids":["qianhai-fof"],"claim_ids":["qianhai-fof-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.sz.gov.cn/cn/xxgk/zfxxgj/bmdt/content/post_12816703.html","asOf":"2026-11-17","checked":true,"kind":"官方公开摘要"},{"company":"华宝信托","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"信托主体；主动标品投研、通道业务、运营与销售分开。","business":"信托主体；主动标品投研、通道业务、运营与销售分开。","source_ids":["huabao-trust"],"claim_ids":["huabao-trust-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.huabaotrust.com/V5html/aboutUs2.html","asOf":"2026-11-17","checked":true,"kind":"官方公开摘要"},{"company":"华泰证券（上海）资产管理有限公司","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"2014年成立的证券资管子公司；不自动继承母公司研究与投行档位。","business":"2014年成立的证券资管子公司；不自动继承母公司研究与投行档位。","source_ids":["huatai-amc"],"claim_ids":["huatai-amc-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://htamc.htsc.com.cn/company/gs-intro.jsp","asOf":"2026-11-17","checked":true,"kind":"官方公开摘要"},{"company":"国寿投资","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"国寿体系另类投资主体；不等于国寿资产的公开市场投研。","business":"国寿体系另类投资主体；不等于国寿资产的公开市场投研。","source_ids":["chinalife-alt"],"claim_ids":["chinalife-alt-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.chinalifeinvest.com/invest/folder/2001/0023-1.html","asOf":"2026-11-17","checked":true,"kind":"官方公开摘要"},{"company":"国寿金石","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"国寿体系特定投资平台；项目研究不自动等同公开市场权益研究。","business":"国寿体系特定投资平台；项目研究不自动等同公开市场权益研究。","source_ids":["chinalife-jinshi"],"claim_ids":["chinalife-jinshi-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.chinalifeinvest.com/invest/folder/2011/0818-1.html","asOf":"2026-11-17","checked":true,"kind":"官方公开摘要"},{"company":"国金证券","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"综合证券主体；指数研究与指数运维不能混用。","business":"综合证券主体；指数研究与指数运维不能混用。","source_ids":["guojin-annual"],"claim_ids":["guojin-annual-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://static.cninfo.com.cn/finalpage/2026-04-24/1225171783.PDF","asOf":"2026-04-24","checked":false,"kind":"官方公开摘要"},{"company":"复星创富","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"股权投资平台；与复星集团其他主体、募资及投后岗位分开。","business":"股权投资平台；与复星集团其他主体、募资及投后岗位分开。","source_ids":["fosun-about"],"claim_ids":["fosun-about-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.fosuncapital.com/","asOf":"2026-11-17","checked":true,"kind":"官方公开摘要"},{"company":"天弘基金","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"公募管理人；货币产品知名度不能外推主动权益、固收或量化团队。","business":"公募管理人；货币产品知名度不能外推主动权益、固收或量化团队。","source_ids":["tianhong-about"],"claim_ids":["tianhong-about-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.thfund.com.cn/?q=about%2Fcompany","asOf":"2026-11-17","checked":true,"kind":"官方公开摘要"},{"company":"工银瑞信基金","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"英文名称变更为ICBC UBS，不代表中文雇佣主体或业务线可省略核验。","business":"英文名称变更为ICBC UBS，不代表中文雇佣主体或业务线可省略核验。","source_ids":["icbcubs-name"],"claim_ids":["icbcubs-name-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.sse.com.cn/disclosure/fund/announcement/c/new/2025-06-13/510060_20250613_ON2F.pdf","asOf":"2025-06-13","checked":false,"kind":"官方公开摘要"},{"company":"易凯资本","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"精品投行和资产管理平台；具体交易与职责尚需核验。","business":"精品投行和资产管理平台；具体交易与职责尚需核验。","source_ids":["cec-about"],"claim_ids":["cec-about-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.ceccapitalgroup.com/","asOf":"2026-11-17","checked":true,"kind":"官方公开摘要"},{"company":"深创投","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"深圳国资创投主体；产业和早期投资与一般政府基金行政工作分开。","business":"深圳国资创投主体；产业和早期投资与一般政府基金行政工作分开。","source_ids":["szvc-about"],"claim_ids":["szvc-about-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://gzw.sz.gov.cn/ztzl/gzgqztzl/gyqyxxgk/qyjj/content/post_9395962.html","asOf":"2026-11-17","checked":true,"kind":"官方公开摘要"},{"company":"贝塔斯曼","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"BAI与贝塔斯曼集团招聘主体须对应；集团名称不能直接认作BAI投资岗。","business":"BAI与贝塔斯曼集团招聘主体须对应；集团名称不能直接认作BAI投资岗。","source_ids":["bai-about"],"claim_ids":["bai-about-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.bai-cap.com/about.html","asOf":"2026-11-17","checked":true,"kind":"官方公开摘要"},{"company":"财通资管","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"证券资管主体；产品及资产线与母公司业务分开核验。","business":"证券资管主体；产品及资产线与母公司业务分开核验。","source_ids":["caitong-amc"],"claim_ids":["caitong-amc-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://static.cninfo.com.cn/finalpage/2025-04-18/1223135038.PDF","asOf":"2025-04-18","checked":false,"kind":"官方公开摘要"},{"company":"阳光融汇资本","aliases":[],"grade":1,"judgment":false,"markets":["对应业务待核"],"reason":"股权投资机构；不能继承阳光集团业务或保险资产配置评价。","business":"股权投资机构；不能继承阳光集团业务或保险资产配置评价。","source_ids":["riverhead-about"],"claim_ids":["riverhead-about-fact"],"limit":"仅取得官方页面或披露的公开摘要，未完成该主体的职业价值比较；不据此晋升首推。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"若实际主体、资产线、独立分析职责或正式回报与本依据不符，下调岗位优先级；有同市场接收方证据时重评公司判断。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]},"url":"https://www.riverheadcapital.cn/web/us_introduce.php","asOf":"2026-11-17","checked":true,"kind":"官方公开摘要"},{"company":"Alloco","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"Azure Capital Partners","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"CFI","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"Creekstone VC","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"JEBSEN","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"Kora Management","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"LHH FESCO","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"VC投资","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"gf证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"万联证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"东北证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"东方证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"东方财富证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"东证融汇证券资产管理有限公司","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"中关村原生引擎（北京）科技有限公司","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"中化资本有限公司","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"现有岗位内容存在机构与“恒越基金”线索不一致，先核对真实雇佣主体。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"消除主体冲突后再比较，不沿用名字相似机构的评价。","next_evidence":["消除主体冲突后再比较，不沿用名字相似机构的评价。"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"中国对外经济贸易信托有限公司","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"中泰证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"中航证券投资","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"中芯聚源","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"五矿证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"创业接力","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"北京交通发展研究院","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"北京国鼎实创投资管理有限公司","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"现有招聘职责不能证明机构的同业认可或投资业绩，暂不进入首推。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"需真实管理人、基金或交易证据及接收方认可；未知不等于劣质。","next_evidence":["需真实管理人、基金或交易证据及接收方认可；未知不等于劣质。"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"华创证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"华医资本","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"华泰期货","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"华西证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"华鑫证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"君屹资本","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"商汤国香资本","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"善达投资","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"国元证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"国寿投资不动产投资事业部","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"国寿金石资产管理","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"国泰君安期货","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"国盛证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"国联民生承销保荐","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"国联民生证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"国都证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"国金证券投资银行","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"天风证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"央企背景的市场化基金","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"奇迹资本","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"字节跳动","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"小红书","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"弗若斯特沙利文","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"德邦证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"抖音","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"招商证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"招商证券资管","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"挑战者创投","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"星连资本","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"智安链云","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"机构未知","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"原材料没有可确认的机构，不能比较公司含金量。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"从同段原文和可靠同岗出处核对主体；不猜公司。","next_evidence":["从同段原文和可靠同岗出处核对主体；不猜公司。"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"松垚资本","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"泓贝投资","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"深圳市天图投资管理股份有限公司","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"源合资本","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"滴滴","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"申万宏源","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"申通科技集团","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"百度","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"百胜中国","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"盈峰资本","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"科技投资","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"美团","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"股权投资基金","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"赛迪研究院","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"软银中国资本","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"野尘智能","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"银河证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"首创证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"首创证券固定收益事业部","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"高华证券","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"高华证券与高盛在华主体、历史合作及当前股权关系分开；不能看到“高华”就按高盛评级。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"需当前法律主体、招聘及业务的直接证据。","next_evidence":["需当前法律主体、招聘及业务的直接证据。"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"高瓴不动产基金资管","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"高瓴创投","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"高麓集团","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"不动产及新基建平台与高瓴创投、其他高瓴主体分开；名称或关联关系不能继承投资平台评价。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"核实雇佣主体、对应资产线、已完成项目与岗位职责。","next_evidence":["核实雇佣主体、对应资产线、已完成项目与岗位职责。"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}},{"company":"麟玺创投","aliases":[],"grade":0,"judgment":false,"markets":[],"reason":"尚不足以独立判断该主体在目标招聘市场的履历价值；保留待核，不能解释成差公司。","business":"需要先确认雇佣主体和对应业务，不能由“投资”“研究”“资管”等字样推定。","source_ids":[],"claim_ids":[],"limit":"无可靠比较依据时不进首推，也不永久排除。","next_evidence":["准确主体及办公室","目标招聘方认可或可验证职业流动","同业务产品、交易或投资记录"],"reversal":"补齐同主体、同市场的业务和接收方证据后重新比较。","formal_pay":{"state":"unknown","source_ids":[]},"retention":{"state":"unknown","source_ids":[]}}],"perspectives":[{"id":"chen","name":"陈思炜","title":"投行与PE的职业选择（历史文章）","source_id":"chen-source","claim_id":"chen-claim","idea":"早期职业要比较平台训练与下一站；大投行与小PE的选择不能只看“买方”标签。","application":"同方向先核公司辨识度及可验证培养，再核真实交易或投资职责。小基金缺证据时不凭买方名头超越主流平台。","limits":"历史、商业职业辅导语境；不能代表2026年全市场共识、排名或薪酬。相同知乎转载不计第二独立来源。","company_ranking":false},{"id":"brian","name":"Brian DeChesare","title":"Investment Banking Exit Opportunities","source_id":"brian-source","claim_id":"brian-claim","idea":"投行退出取决于机构层级、岗位经历、地区和招聘网络；PE也包含募资与sourcing，不能假设工作或收入一定更好。","application":"每个比较必须写目标招聘市场；精品FA、综合投行和PE/CVC分组，确认实际模型、交易与决策参与。","limits":"本轮读到文章前部及退出选择讨论，未通读全篇；主要为欧美市场，只作机制参考，不照搬京沪机构名次。","company_ranking":false},{"id":"lin","name":"林坚（财联社记者）","title":"首席分析师流动与卖方业务变化","source_id":"lin-source","claim_id":"lin-claim","idea":"首席流动要结合研究收费、客户与机构经营压力，个人名气或团队迁移不能代替公司职业回报判断。","application":"卖方公司、业务资源、团队与正式回报分别记账；奖项不加档，不因首席迁移预测实习留用。","limits":"报道讨论资深人员和机构变化，不是毕业生薪酬、某团队当下招聘或转岗概率。","company_ranking":false},{"id":"interviews","name":"匿名卖方研究员、私募从业者与猎头","title":"卖方、买方与职业转型访谈","source_id":"interviews-source","claim_id":"interviews-claim","idea":"研究员、基金经理和猎头视角强调：买卖方工作机制不同，投资决策、客户服务、平台资源与风格适配都影响职业价值。","application":"支持研究、机构销售、投资决策分开；不能把买方头衔或更少客户交流自动理解为高薪高成长。","limits":"匿名历史访谈，四位受访者来自同一采编材料，仅计一个来源单位；资深待遇个案不外推应届。","company_ranking":false},{"id":"rosner","name":"Lindsay Rosner, CFA","title":"How to Become a Portfolio Manager","source_id":"rosner-source","claim_id":"rosner-claim","idea":"组合管理包含风险、配置、实施与客户需求；轮岗、长期资产线积累和导师反馈共同形成判断力。","application":"在主流资管内继续比较资产线与实际PM支持；组合归因、配置建议与交易实施价值有差异。","limits":"作者为资深资管从业者的职业路径，不能当作所有实习或新人的晋升概率。","company_ranking":false},{"id":"moody","name":"Paul Moody, CFA","title":"AI and the Missing First Rung of Investment Careers","source_id":"moody-source","claim_id":"moody-claim","idea":"AI和代码不能替代判断力；初级岗位仍需要来源核对、情景分析、决策记录与有反馈的训练。","application":"不因JD写AI/Python就抬高机构；核对是否能形成可解释的研究和投资判断。","limits":"职业培养观点，不是薪酬统计或机构排名。","company_ranking":false},{"id":"skills","name":"CFA Institute 雇主研究","title":"Employers’ New Skills Blueprint","source_id":"skills-source","claim_id":"skills-claim","idea":"雇主技能要求兼有数据工具、分析和沟通；工具熟练度与金融判断不能互相替代。","application":"竞争力字段拆开技术证据、资产知识、沟通与实际成果；未知技能不默认满足。","limits":"机构研究摘要说明技能需求，不提供京沪各公司等级；与其他CFA文章不作为独立排名投票。","company_ranking":false}],"refresh_contract":{"on_new_employer":"先建立待核档案；精确主体、既有线索、官网与接收方证据逐项核验。未知不得升为优质。","on_new_source":"先记作者、日期、全文读取范围、商业利益和独立来源单位，再提取有边界的观点。","on_change":"来源失效、主体/业务/职责变化或出现同届正式回报证据，重新比较；保留旧结论与变更依据。","public_boundary":"只发布明确的机构比较信息；不含维护者画像、私有群标识、路径、登录状态或凭据。"}};
// END INSTITUTION RESEARCH V1
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
function defaultSort(){return 'priority'}
function defaultPool(){return 'all'}
function defaultPeriod(){return priorityOwner()?'all':'week'}
function syncURL(){const p=new URLSearchParams();if(pool&&pool!==defaultPool())p.set('pool',pool);if(view!=='jobs')p.set('view',view);for(const id of fields){const v=$(id).value;if(v&&v!==({period:defaultPeriod(),sort:defaultSort()}[id]||''))p.set(id,v)}if(activeJob)p.set('job',activeJob);history.replaceState(null,'',location.pathname+(p.size?'?'+p:''))}
function setView(next){view=['jobs','unread','research','coverage','profile','acceptance'].includes(next)?next:'jobs';for(const x of ['jobs','unread','research','coverage','profile','acceptance'])$(x).hidden=x!==view;$('decision-entry').hidden=view!=='jobs';document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===view));syncURL()}
function option(id,value,label=value){const o=el('option','',label);o.value=value;$(id).append(o)}
function inPeriod(j,period){
 if(period==='all')return true;
 return ReadingQueue.decisionInWindow(j,DATA,period==='published');
}
function closing(j){if(!j.deadline)return false;const d=(Date.parse(j.deadline+'T23:59:59')-Date.now())/86400000;return d>=0&&d<=7}
function feedbackAction(j,key){const before=!!feedback[j.id]?.[key];feedback[j.id]??={};feedback[j.id][key]=!before;let saved=true;try{localStorage.setItem('finance-feedback-v1',JSON.stringify(feedback))}catch{saved=false}render();if(activeJob===j.id)showDetail(j,false);const msg=key==='saved'?(before?'已取消收藏':'已收藏，可在“收藏”查看'):key==='ignored'?(before?'已恢复显示':'已忽略这条岗位'):(before?'已取消投递标记':'已标记为已投递，不会自动发送');toast(msg+(saved?'':' · 本次页面有效'),()=>{feedback[j.id][key]=before;try{localStorage.setItem('finance-feedback-v1',JSON.stringify(feedback))}catch{}render();if(activeJob===j.id)showDetail(j,false)})}
function feedbackButton(j,key,label){const b=el('button','feedback',feedback[j.id]?.[key]?({saved:'已收藏',ignored:'恢复显示',applied:'已投递 ✓'}[key]):label);b.setAttribute('aria-pressed',!!feedback[j.id]?.[key]);b.onclick=()=>feedbackAction(j,key);return b}
function compactReason(j){return j.why.replace(/\s+/g,' ').trim()}
function barrier(j){const conflicts=j.matching.eligibility.conditions.filter(x=>x.state==='冲突');if(conflicts.length)return conflicts.map(x=>x.name+'：'+x.reason).join('；');return j.confirm.length?'待确认 '+j.confirm.slice(0,3).join('、')+(j.confirm.length>3?'等 '+j.confirm.length+' 项':''):'暂无已知硬条件冲突'}
function companyLabel(j,assessment){
 return [unknown(assessment?assessment.company:j.company),assessment?assessment.namedTeam:j.team].filter(Boolean).join(' / ');
}
function isCardExcerpt(j){return j.sources?.[0]?.read_status==='card_preview'||j.sources?.[0]?.kind==='公众号卡片'}
function card(j,assessment){const c=el('article','card');c.dataset.id=j.id;const top=el('div','cardhead'),title=el('div','card-title');title.append(el('div','company',companyLabel(j,assessment)));const open=el('button','job-title',j.title.replace(/[【\[]感兴趣可以私信[】\]]/g,'').trim());open.onclick=()=>showDetail(j);title.append(open);const state=assessment?priorityBadge(assessment):el('span','badge '+(j.bucket==='明显不符'?'conflict':j.bucket==='优先看'?'positive':'warning'),j.bucket);top.append(title,state);c.append(top,ReadingQueue.sourceRow(j.sources,PRODUCT));if(isCardExcerpt(j))c.append(el('p','small','卡片摘录 · 原文待核'));const meta=el('div','facts');meta.append(el('span','place',assessment?.place.where||j.cities.join(' / ')||'地点未知'),el('span','',assessment?.type||j.family),el('span','',j.internship_type||'类型未知'),el('span','',(assessment?assessment.schedule.attendance:j.days)||'出勤未知'));c.append(meta);
 if(assessment){c.dataset.priority=assessment.choice.label;c.append(platformRow(assessment));}
 const reason=el('div','decision-line');reason.append(el('span','line-label',assessment?'职责':'值得看'),el('p','why',assessment?priorityWork(assessment):compactReason(j)));const gate=el('div','decision-line gate');gate.append(el('span','line-label',assessment?'下一步':'门槛'),el('p','barrier',assessment?priorityNext(assessment):barrier(j)));c.append(reason,gate);const missingProof=ReadingQueue.decisionMissing(j);if(missingProof.length)c.append(el('p','small','还缺 '+missingProof.join('、')));
 const bottom=el('div','card-bottom'),tags=el('div','signals');if(j.is_new)tags.append(el('span','new-dot','新发现'));if(closing(j))tags.append(el('span','deadline','截止 '+j.deadline));if(j.changes.length)tags.append(el('span','deadline','JD 有变化'));tags.append(el('span','muted',!j.published_at?'首发未知':j.published_at),el('span','muted',assessment?priorityOpening(assessment):j.opening_status));const acts=el('div','cardactions');acts.append(feedbackButton(j,'saved','收藏'));const detail=el('button','primary','看岗位 →');detail.onclick=()=>showDetail(j);acts.append(detail);bottom.append(tags,acts);c.append(bottom);return c}
const pickWeek=7*86400000;
const pickDuties=/^(?:岗位主要职责|岗位职责|职责描述|工作职责|工作内容|实习内容|实习职责|职位职责|主要职责|主要工作(?:内容)?|工作任务|职位描述|岗位描述|Responsibilities|Job Description)(?=$|[\s】\]:：])\s*[】\]:：]?\s*/i;
const pickRequirements=/^(?:任职资格|应聘资格|任职要求|岗位要求|应聘要求|招聘要求|职位要求|实习要求|基本要求|工作要求|资格要求|招聘条件|任职条件|我们希望你|Qualifications|Requirements|Successful Applicants?)(?=$|[\s】\]:：])\s*[】\]:：]?\s*/i;
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
// Evidence belongs to a business line. It never certifies team pay, role depth or an offer.
const debtPlatform=j=>j.family==='债券承销与结构融资'&&/债券|债务融资|债权融资|债融|\bDCM\b/i.test([j.title,j.team].join(' '))&&
 (!/ABS|REIT|资产证券化/i.test(j.title)||/债券|\bDCM\b/i.test(j.title));
const sacTechnologyDebt={
 key:'sac-tech-debt-lead',period:'2025 年',scope:'中证协表 6 · 证券公司主承销科技创新债券',unit:'亿元',
 total:10219.35,appliesTo:'tech-debt',
 asOf:'2026-03-11',url:'https://www.sac.net.cn/sjb/xxgk/hysj/yjpm/202603/t20260311_81421.html',
 limitation:'同一年度、同一张表的机构数据；不代表整个债承团队、ABS／REITs 或正式岗回报。'
};
const institutionEvidence=[
 {company:'华泰证券',applies:j=>careerDirection(j)==='sell',rating:{kind:'research-coverage',scope:'sell'},
   label:'华泰 · 2025 年报（研究）',scope:'集团 2025 年发布研究报告 11,729 篇、组织研究路演 65,663 场。可核对研究服务规模；与中金披露的人员和覆盖数不是同一指标，不能给具体行业小组排位。',
   asOf:'2026-03-31',url:'https://crm.htsc.com.cn/pdf_finchina/HKSTOCK/2026/2026-3/2026-03-30/2469554.pdf'},
 {company:'银河证券',applies:j=>careerDirection(j)==='buy'&&j.family==='固收投资研究',rating:{kind:'investment-track',scope:'fixed'},
   label:'中国银河 · 2025 年报（自营固收）',scope:'年报披露获上交所的债券交易机构和自营债券投资机构评价。支持核查固定收益投资业务；不能用于特定信评团队、基金收益或正式岗薪酬。',
   asOf:'2026-03-31',url:'https://cdn.chinastock.com.cn/omc/investRelation/sh/601881_20260331_XWZA.pdf'},
 {company:'嘉实基金',applies:j=>['fixed-credit','fixed-credit-mixed'].includes(platformScope(j).key),
   label:'嘉实 · 信用团队与债券产品',scope:'机构披露信用研究团队与对应债券产品；仅支持信用业务存在，不能据此给可转债策略、交易或正式岗定级。',
   asOf:'2026-09-22',url:'https://www.jsfund.cn/main/a/20260922/484235.shtml'},
 {company:'联想创投',applies:j=>platformScope(j).key==='venture-robotics',rating:{kind:'portfolio-and-sector',scope:'venture-robotics'},
   label:'联想创投 · 机器人投资组合',scope:'机构披露星动纪元、星海图、逐际动力、跨维智能等被投项目。多笔投资可核；退出回报、薪酬及实习生项目参与度另查。',
   asOf:'2026-01-29',url:'https://capital.lenovo.com/news/detail/id/1184/s/1.html'},
 {company:'腾讯',applies:j=>platformScope(j).key==='games-strategy',rating:{kind:'operating-segment',scope:'games-strategy'},
   label:'腾讯 · 2025 年游戏经营',scope:'2025 年报披露本土游戏收入 1,642 亿元、国际游戏收入 774 亿元。支持验证游戏商业分析对应的业务规模；不用于评价云业务或校招薪资。',
   asOf:'2026-03-18',url:'https://static.www.tencent.com/uploads/2026/03/18/559e5d480a4411165e6c7367d61fefbd.pdf'},
 {company:'腾讯',applies:j=>platformScope(j).key==='cloud-strategy',
   label:'腾讯 · 2025 年企业服务经营',scope:'年报披露企业服务进展，但分部收入也包含金融科技，不能当作云部门收入或该实习组表现。',
   asOf:'2026-03-18',url:'https://static.www.tencent.com/uploads/2026/03/18/559e5d480a4411165e6c7367d61fefbd.pdf'},
 {company:'中金公司',applies:j=>careerDirection(j)==='sell',rating:{kind:'research-coverage',scope:'sell'},
   label:'港交所公告 · 中金研究覆盖',scope:'截至 2024 年末，研究人员近 400 人，覆盖 40 多个行业及全球 1,800 多家上市公司。证明可用研究资源，具体行业组的质量、薪酬及留用待核。',
   asOf:'2025-10-16',url:'https://www.hkexnews.hk/listedco/listconews/sehk/2025/1016/2025101601034_c.pdf'},
 {company:'中金公司',applies:j=>j.family==='股权投行与并购'&&/股本|股权融资|ECM|IPO|保荐/i.test([j.team,j.title].join(' '))&&!/并购|重组/.test(j.title),
   rating:{kind:'repeated-transactions',scope:'hk-ipo'},
   label:'中金 · 股权融资业务',scope:'2025 年报分别披露境内及境外股权融资；香港 IPO 保荐主承销共 41 单。港股数据不能外推至 A 股团队或并购业务。',
   asOf:'2026-04-16',url:'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0416/2026041600447_c.pdf'},
 {company:'嘉实基金',applies:j=>platformScope(j).key==='index-fund',rating:{kind:'rank',scope:'index-fund',rank:5},
   label:'嘉实 · 非货 ETF 管理规模',scope:'机构引用 iFinD：截至 2025-07-30，非货 ETF 合计 2,933.6 亿元，处于行业前五。仅作这一产品线的规模参照；不能推断主动权益、因子收益或交易实力。',
   asOf:'2025-08-04',url:'https://www.jsfund.cn/main/a/20250804/483943.shtml'},
 {company:'嘉实基金',applies:j=>j.pool==='quant'&&/指数增强|增强策略|ETF.*指数|指数.*ETF|指数投资/i.test([j.team,j.title].join(' ')),
  label:'嘉实 · 创业板增强 ETF 招募说明书',scope:'正式文件披露增强 ETF 的量化模型；只证明指数增强产品能力，不代表整个基金公司的交易研究水平。',asOf:'2026-10-31',
  url:'https://www.jsfund.cn/plat_files/upload/product_ann/20261030/202610301793351703236/%E5%98%89%E5%AE%9E%E5%88%9B%E4%B8%9A%E6%9D%BF%E5%A2%9E%E5%BC%BA%E7%AD%96%E7%95%A5%E4%BA%A4%E6%98%93%E5%9E%8B%E5%BC%80%E6%94%BE%E5%BC%8F%E6%8C%87%E6%95%B0%E8%AF%81%E5%88%B8%E6%8A%95%E8%B5%84%E5%9F%BA%E9%87%91%E6%9B%B4%E6%96%B0%E6%8B%9B%E5%8B%9F%E8%AF%B4%E6%98%8E%E4%B9%A6%EF%BC%882026%E5%B9%B410%E6%9C%8831%E6%97%A5%E6%9B%B4%E6%96%B0%EF%BC%89.pdf'},
 {company:'兴证全球基金',applies:j=>platformScope(j).key==='multiasset',rating:{kind:'live-products-and-team',scope:'multiasset'},
   label:'兴证全球 · 多资产与 FOF 投研团队',scope:'官网披露权益、固收、海外和另类资产的分工，并有定期披露组合持仓的在运 FOF。可核对产品和投研分工；行业排名、该岗留用未知。',
   asOf:'2026-11-16',checked:true,url:'https://cloud.xqfunds.com/xqretire/page2.html'},
 {company:'兴证全球基金',applies:j=>platformScope(j).key==='multiasset',
   label:'兴证全球 · 在运 FOF 季报',scope:'可查产品实盘持仓与运作分析，不按单只产品推断全公司或其他资产线的水平。',
   asOf:'2025-10-28',url:'https://www.xqfunds.com/data/20251027164455jjpz.pdf'},
 {company:'蓝驰创投',applies:j=>platformScope(j).key==='venture-ai'||j.family==='一级与战略投资'&&/硬科技/.test(j.title),
   rating:{kind:'fund-and-investments',scope:'venture-ai'},
   label:'蓝驰 · 早期 AI 投资案例',scope:'官网披露月之暗面、智元等投资，另有新一期早期双币基金披露。只用于早期 AI 投资方向；退出回报、奖金及留用未知。',
    asOf:'2026-11-06',url:'https://www.lanchivc.com/8906/'},
 {company:'蓝驰创投',applies:j=>platformScope(j).key==='venture-ai',
   label:'蓝驰 · 新一期早期双币基金',scope:'机构披露早期人民币和美元基金合计约 39 亿元；募资规模不等于投资回报。',
   asOf:'2026-11-16',checked:true,url:'https://www.lanchivc.com/8850/'},
 {company:'蔚来资本',applies:j=>j.family==='一级与战略投资'&&/科技|先进制造|\bAI\b/i.test(j.title),
  label:'蔚来资本 · 科技投资案例',scope:'机构披露联合领投中科清能等案例。该岗位的投资分工、留用未知。',
  asOf:'2026-01-02',url:'https://www.niocapital.com/news/announcements'},
 {company:'国金证券',applies:j=>j.pool==='quant'&&/指数/.test([j.team,j.title].join(' ')),
  label:'国金 · 指数业务',scope:'年报披露指数及行业分类服务；不能用自营交易业务给指数产品岗加分。',
  asOf:'2026-04-24',url:'https://static.cninfo.com.cn/finalpage/2026-04-24/1225171783.PDF'},
 {company:'国盛证券',applies:j=>j.family==='债券承销与结构融资',
  label:'国盛 · 债券发行参与情况',scope:'2025 年报披露参与服务债券发行共 70.3 亿元。不能与主承销金额直接比较。',
  asOf:'2026-04-21',url:'https://disc.static.szse.cn/download/disc/disk03/finalpage/2026-04-21/a3673eaa-aae0-4937-b71f-bd8d22d607c1.PDF'},
 {company:'联想',applies:j=>j.family==='战略与咨询'&&/Lenovo集团战略部|联想集团战略部/i.test(j.title),
  label:'联想 · 集团业务披露',scope:'年报可核对业务板块，未披露该岗位的策略团队业绩或正式用人通道。',
  asOf:'2026-11-16',checked:true,url:'https://brand.lenovo.com.cn/brand/ppn03771.html'},
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
 {company:'易凯资本',applies:j=>j.family==='股权投行与并购'&&/科技|TMT/i.test(j.title),
  label:'易凯资本 · 科技并购及融资案例',scope:'官网列出科技领域交易；该岗位的建模、交易执行、薪酬和留用待核。',
  asOf:'2026-11-13',checked:true,url:'https://www.ceccapitalgroup.com/index.php?a=lists&catid=8&happened=&industry=&service_type='},
 {company:'华泰联合证券',applies:debtPlatform,
  label:'华泰证券 · 投行及债务融资业务',scope:'官网披露债务融资业务。具体团队的项目质量和实习分工以岗位证据为准。',
  asOf:'2026-11-13',checked:true,url:'https://www.htzq.com.cn/what-we-do/institutional-services/ib'},
 {company:'华泰联合证券',applies:j=>j.family==='股权投行与并购'&&/并购|重组|独立财务顾问/.test([j.team,j.title].join(' ')),
   label:'上交所 · 华电国际重组项目',scope:'披露华泰联合担任该项目的独立财务顾问。只说明并购业务，不外推至承销岗。',
    asOf:'2025-08-16',url:'https://www.sse.com.cn/disclosure/listedinfo/announcement/c/new/2025-08-16/600027_20250816_DNWH.pdf'},
 {company:'华泰联合证券',applies:j=>j.family==='股权投行与并购'&&/重组|独立财务顾问/.test([j.team,j.title].join(' ')),
  rating:{kind:'rank',scope:'a-reorg',rank:1},
  label:'华泰 · 2025 年报（并购）',scope:'按上市公司公开披露统计，独立财务顾问的审核类重组获注册 8 单，行业第一。该数据不能和融资额互排。',
  asOf:'2026-03-31',url:'https://crm.htsc.com.cn/pdf_finchina/HKSTOCK/2026/2026-3/2026-03-30/2469554.pdf'},
 ...[['中信证券',1904.72],['中信建投证券',1598.90],['国泰海通证券',1166.17],['中金公司',700.49],['华泰联合证券',641.18],['申万宏源',398.79]]
  .map(([company,value])=>({company,applies:debtPlatform,label:'中证协 · 2025 年科创债主承销',
   scope:`机构主承销 ${value.toFixed(2)} 亿元。${sacTechnologyDebt.limitation}`,
   asOf:sacTechnologyDebt.asOf,url:sacTechnologyDebt.url,metric:{...sacTechnologyDebt,value}}))
];
const platformGrades=['待核验','业务已知','成熟核心','领先核心'];
const platformBasis={
 rank:'可核对的细分业务排名进入前五',
 'research-coverage':'有规模可核的研究队伍和覆盖，未给具体小组排名',
 'repeated-transactions':'同一细分业务有成批可核的成交记录',
 'live-products-and-team':'有对应的在运产品及专门投研分工',
 'fund-and-investments':'对应投资阶段有专项基金和多笔已投项目',
 'portfolio-and-sector':'对应赛道有多个可核投资案例',
 'operating-segment':'年报单列且披露了相应经营板块的业务规模',
 'investment-track':'有实际投资业务，并披露对应的市场评价'
};
function platformScope(j,duties=''){
 const title=j.title||'',name=[title,j.team].filter(Boolean).join(' ');
 const line=(key,label)=>({key,label});
 switch(careerDirection(j)){
 case 'buy':
  if(/ETF|指数投资|指数增强/.test(name))return line('index-fund','ETF／指数投资');
  if(j.family==='配置与基金')return /组合配置|资产配置|多资产|FOF|MOM/i.test(name)?line('multiasset','多资产／FOF'):line('manager','基金及管理人研究');
  if(j.family==='固收投资研究'){
   if(/信用|信评/.test(name))return /可转债/.test(name)?line('fixed-credit-mixed','固收 · 信用与可转债'):line('fixed-credit','固收 · 信用与主体研究');
   if(/可转债/.test(name))return line('fixed-convertible','固收 · 可转债策略');
   if(/ABS|资产证券化/i.test(name))return line('fixed-abs','固收 · ABS 投资');
   if(/利率/.test(name))return line('fixed-rate','固收 · 利率研究');
   return line('fixed','固收投资研究');
  }
  return line('equity-research','买方权益／基本面研究');
 case 'sell':return line('sell','卖方研究 · 资源与具体行业组分开核对');
 case 'quant':
  if(/指数(?:产品|业务|服务|编制)|行业分类/.test(name)&&!/ETF|指数投资|指数增强/.test(name))return line('index-service','指数产品与编制服务');
  if(/ETF|指数投资|指数增强/i.test(name))return line('index-fund','ETF／指数投资');
  if(/定价|波动率|期权/.test(name))return line('derivatives','衍生品定价与波动率');
  if(/高频|做市|CTA|交易策略|自营/.test(name))return line('trading','自营／交易策略与做市');
  if(/量化|因子|回测|金工|金融工程|策略研究/.test(name))return line('systematic','因子、量化及策略研究');
  return line('quant-check','量化与交易分工待核');
 case 'investing':
  if(/具身智能|机器人/.test(name))return line('venture-robotics','具身智能／机器人投资');
  if(/CVC|企业风投|产业投资|战略投资|创投部门/i.test(name))return line('corporate-investment','产业投资／CVC');
  if(/半导体|芯片|集成电路|中芯聚源/.test(name))return line('venture-chip','半导体投资');
  if(/\bAI\b|人工智能/i.test(name))return line('venture-ai','早期 AI 投资能力（岗位阶段另核）');
  return line('private-investment','PE／VC · 阶段和赛道分别核对');
 case 'equity':
  if(/重组|独立财务顾问/.test(name)&&!/跨境|港股|H股/.test(name))return line('a-reorg','境内上市公司重组');
  if(/并购|重组|M\s*[&＆]\s*A/i.test(name))return line('ma','并购顾问与交易执行');
  if(/港股|香港|H\s*股/i.test(name)&&/IPO|股本|股权融资|保荐|ECM/i.test(name))return line('hk-ipo','香港 IPO 保荐及承销');
  if(/IPO|再融资|股本|股权融资|保荐|ECM/i.test(name))return line('ecm','股权承销保荐（市场待核）');
  return line('equity-advisory','投行融资与财务顾问');
 case 'debt':
  if(/REITs?|ABS|资产证券化/i.test(name))return line('structured','ABS／REITs 结构融资');
  if(/科技创新(?:公司)?债|科创(?:公司)?债/.test(name)||
     /(?:发行|承销|申报|参与)[^。；\n]{0,22}(?:科技创新(?:公司)?债|科创(?:公司)?债)|(?:科技创新(?:公司)?债|科创(?:公司)?债)[^。；\n]{0,22}(?:发行|承销|项目)/.test(duties))return line('tech-debt','科技创新债券主承销');
  return line('debt','通用债承 · 具体债种待核');
 case 'strategy':
  if(/战略部|战略分析|战略研究|商业分析|商业策略/.test(name)&&!/咨询|顾问/.test(title)){
   if(/\bIEG\b|互动娱乐|游戏/i.test(name))return line('games-strategy','游戏战略与商业分析');
   if(/\bCSIG\b|云与智慧产业|云计算|企业服务/i.test(name))return line('cloud-strategy','云与企业服务战略');
   return line('corporate-strategy','企业内部战略与商业分析');
  }
  if(/战略咨询|管理咨询|商业尽调/.test(name))return line('consulting','外部战略咨询／商业尽调');
  return line('strategy-check','战略咨询 · 咨询与实施分工待核');
 default:return /信用评级/.test(name)?line('credit-rating','信用评级'):line('adjacent','相邻业务 · 核对具体产出');
 }
}
function assessPlatform(j,company,duties,now){
 const scope=platformScope(j,duties);
 const proofs=institutionEvidence.filter(e=>{
  const stamp=pickTime(e.asOf+'T00:00:00+08:00');
  return e.company===company&&(e.applies(j)||e.metric?.appliesTo===scope.key)&&stamp<=now&&now-stamp<=550*86400000;
 }).map(e=>{
  if(e.metric?.appliesTo===scope.key){
   const share=100*e.metric.value/e.metric.total;
   return {...e,grade:1,basis:'同年同债种份额 '+share.toFixed(2)+'%，只作业务位置参考，不直接决定公司档位或推荐'};
  }
  if(e.metric)return {...e,grade:0,basis:'债种不同或待核，该数据仅作参考'};
  const rating=e.rating;
  if(!rating||rating.scope!==scope.key||!Object.hasOwn(platformBasis,rating.kind))return {...e,grade:1,basis:'已核业务或项目，未证明该岗位所在分线强项'};
  if(['rank','investment-track'].includes(rating.kind))return {...e,grade:1,basis:'排名或市场评价仅为辅助证据；不能单独证明业务含金量'};
  return {...e,grade:2,basis:platformBasis[rating.kind]+'；具体岗位的决策参与仍需核对'};
 }).sort((a,b)=>b.grade-a.grade||Number(Boolean(b.rating))-Number(Boolean(a.rating))||b.asOf.localeCompare(a.asOf));
 const lead=proofs[0],grade=lead?.grade||0;
 return {scope,grade,label:platformGrades[grade],proofs,note:lead?.basis||'暂无可核对的同业务线成果；不能判断机构好坏'};
}
const employerAliases=[
 ['申万宏源',/^(?:申万|申万宏源(?:证券)?(?:股份有限公司|有限公司)?(?:研究所|研究院|承销保荐(?:有限责任公司|有限公司)?)?|申万研究所.{0,24}|申银万国(?:证券)?研究所(?:有限公司)?|上海申银万国证券研究所(?:有限公司)?)$/],
 ['华西证券',/^华西证券(?:(?:股份)?有限公司)?(?:研究所|研究院)?$/],
 ['中金公司',/^(?:中金(?:公司)?|中国国际金融(?:股份有限公司)?|CICC)$/i],
 ['华泰证券',/^(?:华泰(?:证券(?:股份有限公司)?)?(?:研究所|研究院)|华泰证券(?:股份有限公司)?)$/],
 ['中信证券',/^中信证券(?:股份有限公司)?(?:研究所|研究院)?$/],
 ['腾讯',/^(?:腾讯(?:科技|集团|控股|公司)?|Tencent)$/i],
 ['兴证全球基金',/^兴证全球(?:基金(?:管理(?:有限公司)?)?)?$/],
 ['嘉实基金',/^嘉实基金(?:管理(?:有限公司)?)?$/],
 ['蓝驰创投',/^蓝驰(?:创投|投资)$/],
 ['华泰联合证券',/^华泰联合(?:证券(?:有限责任公司)?)?$/],
 ['国金证券',/^国金证券(?:股份有限公司)?$/],
 ['国盛证券',/^国盛证券(?:有限责任公司)?$/],
 ['中信建投证券',/^中信建投(?:证券)?(?:股份有限公司)?$/],
 ['国泰海通证券',/^国泰海通(?:证券)?(?:股份有限公司)?$/],
 ['银河证券',/^(?:中国)?银河证券(?:股份有限公司)?$/],
 ['蔚来资本',/^蔚来资本$/],
 ['联想',/^(?:联想(?:集团)?(?:有限公司)?|Lenovo(?:集团)?)$/i]
];
const toEmployer=value=>{
 const normalized=(value||'').normalize('NFKC').replace(/\s/g,'').replace(/^[【\[]|[】\]]$/g,'');
 return employerAliases.find(([,pattern])=>pattern.test(normalized))?.[0]||
  (normalized.endsWith('证券股份有限公司')?normalized.slice(0,-6):value);
};

// Analyst judgments, not a universal league table. The cited facts and their limits
// are retained separately; subsidiaries and unnamed employers never inherit grades.
const companyValueLabels=['认可待核','主体已核','专业平台','主流平台'];
const researchSources=new Map(INSTITUTION_RESEARCH.sources.map(s=>[s.id,s]));
const researchClaims=new Map(INSTITUTION_RESEARCH.claims.map(c=>[c.id,c]));
const institutionProfiles=new Map(INSTITUTION_RESEARCH.employers.map(p=>[p.company,p]));
const researchReadLabels={full_text:'本轮正文',partial_text:'局部已读',indexed_excerpt:'公开摘要',prior_verified:'历史已核资料'};
let researchAssessment, researchSelected='', researchSignature='';
function researchSource(sid){
 const s=researchSources.get(sid);if(!s)return el('p','muted','来源待核');
 const box=el('div','institution-source');
 box.append(link(s.title+' ↗',s.url),el('p','muted',[
  s.author||s.publisher,s.published_at?'发布 '+s.published_at:'首发日期未知',
  '核验 '+s.checked_at,researchReadLabels[s.read_level],s.commercial_interest?'商业职业服务背景':''
 ].filter(Boolean).join(' · ')));
 return box;
}
function openInstitutionResearch(company){
 researchSelected=company||'';setView('research');
 const search=$('institution-search');if(search){search.value=researchSelected;renderInstitutionResults();search.focus()}
}
function researchProfile(name){
 const p=assessCompany(name);
 return {...p,business:p.business||'对应业务与实际职责尚待核验。',
  source_ids:p.source_ids||[],claim_ids:p.claim_ids||[],
  next_evidence:p.next_evidence||['准确主体、目标招聘方认可、对应业务的项目或产品证据'],
  reversal:p.reversal||'取得同主体、同市场的可靠比较依据后重新评估。'};
}
function institutionJobs(name){return [...researchAssessment.values()].filter(a=>(a.company||'机构未知')===name)}
function institutionProfileCard(name,compact=false){
 const p=researchProfile(name),jobs=institutionJobs(name),box=el('article','card institution-card');box.dataset.company=name;
 const head=el('div','institution-card-head');
 head.append(el('h3','',name),el('span','badge '+(p.grade>=2?'positive':'warning'),p.label));box.append(head);
 box.append(el('p','institution-market','适用市场：'+(p.markets.join('、')||'待核，不能作跨方向排名')),
  el('p','institution-verdict',p.reason),el('p','', '业务：'+p.business));
 if(jobs.length){
  const duties=jobs.filter(a=>a.career.decisionWork).length,open=jobs.filter(a=>a.open==='confirmed_open'||a.j.availability?.state==='open').length;
  box.append(el('p','muted',`现有 ${jobs.length} 条岗位 · ${duties} 条有实质分析/决策职责；公司档位不替代岗位门槛与开放核验。`));
 }
 const caveat=el('div','institution-caveat');caveat.append(el('strong','','目前不能据此推断'),el('p','',p.limit),
  el('p','','同团队正式薪酬：未知 · 同届留用转化：未知'));box.append(caveat);
 if(compact){
  box.append(el('p','', '改变判断：'+p.reversal));
  if(p.source_ids[0])box.append(researchSource(p.source_ids[0]));
 }else{
  const evidence=el('details','institution-evidence');evidence.append(el('summary','',`查看依据与待核证据 · ${p.claim_ids.length} 项`));
  for(const cid of p.claim_ids){const c=researchClaims.get(cid);if(!c)continue;
   const part=el('div','institution-claim');part.append(el('strong','',({fact:'机构事实',analyst_inference:'分析判断',attributed_opinion:'作者观点'})[c.type]),el('p','',c.text),el('p','muted',c.limitation));
   for(const sid of c.source_ids)part.append(researchSource(sid));evidence.append(part);
  }
  evidence.append(el('strong','','下一项需要的证据'));
  const missing=el('ul');for(const x of p.next_evidence)missing.append(el('li','',x));evidence.append(missing,el('p','','改变判断：'+p.reversal));
  if(!p.claim_ids.length)evidence.append(el('p','muted','尚无可靠比较材料。保留待核，不因“买方”“投资”字样升级。'));
  box.append(evidence);
  const actions=el('div','institution-actions');
  const compare=el('button','','加入比较');compare.onclick=()=>{
   const left=$('institution-left'),right=$('institution-right');(left.value===name||!left.value?left:right).value=name;
   renderInstitutionComparison();$('institution-comparison').scrollIntoView({block:'start',behavior:'smooth'});
  };actions.append(compare);
  if(jobs.length){const see=el('button','',`看 ${jobs.length} 条岗位`);see.onclick=()=>{setView('jobs');pool='all';$('query').value=name==='机构未知'?'未知':name;$('period').value='all';render()};actions.append(see)}
  box.append(actions);
 }
 return box;
}
function renderInstitutionComparison(){
 const target=$('institution-comparison'),left=$('institution-left').value,right=$('institution-right').value;
 target.replaceChildren();if(!left||!right){target.append(el('p','muted','选择两家机构，先比较同一目标市场的公司和业务，再查看具体岗位。'));return}
 const a=researchProfile(left),b=researchProfile(right),common=a.markets.filter(m=>b.markets.includes(m));
 let text;
 if(left===right)text='目前选择了同一机构。请选另一家，或到岗位列表比较具体业务和职责。';
 else if(a.grade<2||b.grade<2)text='比较证据尚未齐备。待核机构不会因为头衔好听进入首推，也不能据此认定它较差。先补右侧列明的主体与同业证据。';
 else if(!common.length)text='两家机构当前依据对应不同招聘市场，不能把档位直接当成总排名。先明确要去的业务和下一站，再比较公司辨识度。';
 else if(a.grade===b.grade)text='在共同市场「'+common.join('、')+'」中公司档位相同；继续比较业务资源、实质职责、正式回报和可迁移成果。';
 else text='在共同市场「'+common.join('、')+'」中，现有公司判断更倾向 '+(a.grade>b.grade?left:right)+'；业务、职责、硬条件和回报仍须逐项核对。';
 target.append(el('p','institution-comparison-result',text));
 const grid=el('div','institution-compare-grid');grid.append(institutionProfileCard(left,true),institutionProfileCard(right,true));target.append(grid);
}
function renderInstitutionResults(){
 if(!researchAssessment||!$('institution-results'))return;
 const query=$('institution-search').value.trim().toLowerCase(),grade=$('institution-grade').value,route=$('institution-route').value;
 const names=[...new Set([...researchAssessment.values()].map(a=>a.company||'机构未知'))];
 const filtered=names.filter(name=>{
  const p=researchProfile(name),jobs=institutionJobs(name);
  return (!grade||(grade==='pending'?p.grade<2:String(p.grade)===grade))&&
   (!route||jobs.some(a=>careerDirection(a.j)===route))&&
   (!query||[name,...p.markets,p.reason,p.business].join(' ').toLowerCase().includes(query));
 }).sort((a,b)=>researchProfile(b).grade-researchProfile(a).grade||institutionJobs(b).length-institutionJobs(a).length||a.localeCompare(b,'zh-CN'));
 $('institution-result-count').textContent=`${filtered.length} / ${names.length} 个当前机构 · 按公司档位分组，跨市场不作总排名`;
 $('institution-results').replaceChildren(...filtered.map(name=>institutionProfileCard(name)));
 if(!filtered.length)$('institution-results').append(el('p','notice','没有符合筛选的机构。可清除名称或放宽方向。'));
}
function renderInstitutionResearch(assessment){
 if(!assessment||!$('research'))return;researchAssessment=assessment;
 const names=[...new Set([...assessment.values()].map(a=>a.company||'机构未知'))].sort((a,b)=>a.localeCompare(b,'zh-CN'));
 const sig=INSTITUTION_RESEARCH.revision+JSON.stringify([...assessment.values()].map(a=>[a.j.id,a.company,a.companyValue.grade]));
 if(researchSignature===sig)return;researchSignature=sig;
 const target=$('research');target.replaceChildren();
 const heading=el('div','page-heading');heading.append(el('div'));
 heading.firstChild.append(el('h2','','先比较公司，再决定看什么岗位'),el('p','muted','覆盖全部当前机构。事实、作者观点与分析判断分开，未知保留，不制造全金融总榜。'));
 const back=el('button','','返回岗位');back.onclick=()=>setView('jobs');heading.append(back);target.append(heading);
 const counts=el('div','institution-metrics');counts.setAttribute('aria-label','机构研究覆盖');
 for(const [value,label]of [[names.length,'当前机构'],[names.filter(n=>researchProfile(n).grade>=2).length,'有范围的公司判断'],[names.filter(n=>researchProfile(n).grade<2).length,'比较依据仍待补'],[INSTITUTION_RESEARCH.sources.length,'来源记录']]){
  const item=el('div');item.append(el('strong','',value),el('span','',label));counts.append(item)
 }
 target.append(counts,el('p','institution-boundary','公司含金量优先，业务含金量其次，再核实际工作与可投条件。奖项不加档；总规模、实习日薪不推算正式待遇。资料建档不等于研究完成。'));
 const compare=el('section','institution-compare-section');compare.setAttribute('aria-labelledby','institution-compare-title');
 const title=el('h3','','直接比较两家');title.id='institution-compare-title';compare.append(title);
 const controls=el('div','institution-compare-controls');
 for(const [id,label]of [['institution-left','第一家机构'],['institution-right','第二家机构']]){
  const wrap=el('label','',label),select=el('select');select.id=id;select.append(new Option('选择机构',''));
  for(const name of names)select.append(new Option(name,name));select.onchange=renderInstitutionComparison;wrap.append(select);controls.append(wrap)
 }
 compare.append(controls);const result=el('div');result.id='institution-comparison';compare.append(result);target.append(compare);
 const filters=el('div','institution-filters');
 const searchLabel=el('label','','搜索机构或业务'),search=el('input');search.id='institution-search';search.type='search';search.placeholder='机构、资产线、目标市场…';searchLabel.append(search);
 const gradeLabel=el('label','','研究状态'),grade=el('select');grade.id='institution-grade';
 for(const [value,label]of [['','全部状态'],['3','主流平台（限所列市场）'],['2','专业平台（限所列市场）'],['pending','比较依据待补']])grade.append(new Option(label,value));gradeLabel.append(grade);
 const routeLabel=el('label','','职业方向'),route=el('select');route.id='institution-route';route.append(new Option('全部职业方向',''));
 for(const [key,label]of Object.entries(careerDirections))route.append(new Option(label,key));routeLabel.append(route);
 const reset=el('button','','清除筛选');reset.onclick=()=>{search.value=grade.value=route.value='';renderInstitutionResults()};
 filters.append(searchLabel,gradeLabel,routeLabel,reset);target.append(filters);
 search.value=researchSelected;search.oninput=grade.onchange=route.onchange=renderInstitutionResults;
 const count=el('p','muted');count.id='institution-result-count';count.setAttribute('role','status');count.setAttribute('aria-live','polite');
 const results=el('div','institution-results');results.id='institution-results';target.append(count,results);
 const opinions=el('section','institution-perspectives');opinions.append(el('h3','','不同人的观点，如何进入这套判断'),el('p','muted','观点不是排名证据。相同采访、转载与同一机构材料不冒充多份独立共识。'));
 for(const p of INSTITUTION_RESEARCH.perspectives){const d=el('details','institution-perspective');d.dataset.perspective=p.id;d.append(el('summary','',p.name+' · '+p.title),el('p','',p.idea),el('p','','采用方式：'+p.application),el('p','muted','适用边界：'+p.limits),researchSource(p.source_id));opinions.append(d)}
 const boundary=el('details','institution-perspective');boundary.append(el('summary','','已读范围与尚缺资料'),...INSTITUTION_RESEARCH.limitations.map(x=>el('p','muted',x)),el('p','muted','研究版本 '+INSTITUTION_RESEARCH.revision+' · 核验 '+INSTITUTION_RESEARCH.reviewed_at));opinions.append(boundary);target.append(opinions);
 renderInstitutionComparison();renderInstitutionResults();
}

const companyReviews=INSTITUTION_RESEARCH.employers.filter(p=>p.grade>=2);
function assessCompany(company){
 const review=institutionProfiles.get(company);
 if(review)return {...review,label:companyValueLabels[review.grade]};
 const facts=institutionEvidence.filter(e=>e.company===company&&!e.metric);
 return {company,grade:facts.length?1:0,label:companyValueLabels[facts.length?1:0],markets:[],
  reason:facts.length?'已有机构业务出处，但尚无足够证据判断在目标招聘市场的认可度。':'公司主体或招聘市场认可度尚未独立核验。',
  limit:'待核验不等于差公司；也不能只因岗位方向对口、名字像大机构或标题写了投资，就进入首推。',
  url:facts[0]?.url,asOf:facts[0]?.asOf,checked:facts[0]?.checked,kind:facts[0]?'业务来源，非认可度证明':'待核',judgment:false};
}
function companyEvidence(a){
 const v=a.companyValue,box=el('div','company-evidence');
 box.append(el('p','',v.reason),el('p','muted','适用招聘市场：'+(v.markets.join('、')||'待核验')));
 if(v.url)box.append(link(v.kind+' · '+(v.checked?'核验 ':'')+v.asOf,v.url));
 box.append(el('p','muted',v.limit));const compare=el('button','','比较这家机构');compare.onclick=()=>openInstitutionResearch(a.company);box.append(compare);
 return box;
}
const careerResearchRoutes={
 buy:{title:'买方投研与资配',focus:'公司：识别真实管理人及招聘主体。业务：主动权益、固收、多资产、保险与主权公开市场分别核。岗位：模型、组合建议、归因及对PM的实际支持。',
  receiving:'公开市场研究招聘重视可迁移的投研经历；GIC上海要求买方或卖方研究经验，也会考虑PE经历，不能只按券商名字筛。',
  url:'https://careers.gic.com.sg/job/Shanghai-Associate,-China-Equities/1368705866/',source:'GIC上海公开市场招聘 · 2026-11-17核验',limit:'该样本为有经验的正式岗，非当前实习或录用概率证明。'},
 quant:{title:'量化与交易',focus:'公司：核实管理人、策略类型与真实雇佣主体。业务：量化研究、衍生品、期货研究和执行分开。岗位：策略研究/回测/组合贡献，区别工程、数据和后台。',
  receiving:'宽德官方岗位将量化研究、工程与其他工作分列。金融方向相近不能抵消C++、数学、建模等硬要求。',
  url:'https://www.wizardquant.com/career',source:'宽德官方招聘 · 2026-11-17核验',limit:'职位设置不证明同届薪酬、实习留用或所有策略实力。'},
 investing:{title:'一级与产业投资',focus:'公司：独立PE/VC、CVC、产业基金、家办分开。业务：阶段、行业、基金及退出证据。岗位：投资判断、估值、尽调、投委材料，区别募资和材料整理。',
  receiving:'联想创投的财务与战略双目标说明CVC不能和纯财务基金直接同榜；平台的产业价值与通用买方跳板需分别判断。',
  url:'https://capital.lenovo.com/news/detail/id/797/s/3.html',source:'联想创投业务定位 · 2023-04-06',limit:'历史定位材料，不推断当下基金回报、可投性或留用。'},
 equity:{title:'股权投行与并购',focus:'公司：综合投行与精品FA的客户及交易市场。业务：IPO/ECM、M&A分开，核验已完成项目。岗位：估值建模、交易判断和执行工作分开。',
  receiving:'GIC直投招聘会明确要求top-tier投行或PE经验，并要求财务模型、尽调和投资备忘录；公司品牌和做过什么要一起核对。',
  url:'https://careers.gic.com.sg/job/New-York-Associate,-Private-Equity,-Direct-Investments-Group-(Summer-2027-Start)/1362873466/',source:'GIC直投正式岗 · 2026-11-17核验',limit:'纽约有经验岗位仅说明接收方标准，薪酬及要求不能照搬京沪实习。'},
 debt:{title:'债券承销与结构融资',focus:'公司：核实投行主体和客户市场。业务：DCM、ABS、REITs分别比较。岗位：信用/结构分析与申报、簿记、底稿执行分开。',
  receiving:'官方业务入口及真实项目用于确定做哪类融资；承销体量可辅助观察业务位置，不能自动生成公司档位或等同买方固收研究。',
  url:'https://www.htzq.com.cn/what-we-do/institutional-services/ib',source:'华泰联合官方业务 · 2026-11-13核验',limit:'承销量、排名及项目参与均不等于正式岗固定薪酬或留用HC。'},
 strategy:{title:'战略与咨询',focus:'公司：咨询品牌、实际办公室，或产业公司品牌。业务：战略/商业尽调与执行运营分开。岗位：可解释的商业判断与建议，不能见咨询二字就纳入首推。',
  receiving:'麦肯锡汽车BA同时体现行业背景和实际职责门槛；主流品牌不能代替岗位适配。公司战略与咨询项目经历也不能直接等同金融投资。',
  url:'https://www.mckinsey.com/careers/search-jobs/jobs/businessanalyst-automotive-109741',source:'麦肯锡官方岗位 · 2026-11-17核验',limit:'样本包含京沪深及有经验要求，不证明当前实习开放或待遇。'},
 sell:{title:'券商研究',focus:'公司：卖方招聘与买方接收市场的品牌识别。业务：行业/宏观/策略/海外分开。岗位：独立分析、模型与报告，区别整理、排版或机构销售。',
  receiving:'公开职业访谈展示过中金研究到买方的路径，但个案不等于概率；是否值得去仍取决于公司回报、实际研究产出与可比较的替代机会。',
  url:'https://www.saif.sjtu.edu.cn/show-70-1509.html',source:'上海高金职业访谈 · 2021-08-13',limit:'历史个案不代表当前市场、薪酬或留用；团队奖项不参与公司档位判断。'},
 other:{title:'相邻与其他',focus:'评级、信托标品、银行专业投研、普通银行和销售分别管理。先确定目标路线与雇佣主体，再判断是否能产生可迁移分析成果。',
  receiving:'复旦职业讲座按职业、行业、平台与工作模式一起分析，不能用一个金融总榜替代职业选择。',
  url:'https://econ.fudan.edu.cn/info/1672/17026.htm',source:'复旦职业讲座 · 2019-11-19',limit:'仅作方法校准，不作为机构实时排名。银行专业岗保持独立待确认开关。'}
};
function renderCompanyCoverage(target,assessment,scoped){
 const rows=[...assessment.values()], groups=new Map();
 for(const a of rows){const key=a.company||'机构未知';if(!groups.has(key))groups.set(key,[]);groups.get(key).push(a);}
 const ordered=[...groups].sort((a,b)=>b[1][0].companyValue.grade-a[1][0].companyValue.grade||b[1].length-a[1].length||a[0].localeCompare(b[0],'zh-CN'));
 const signature=JSON.stringify(rows.map(a=>[a.j.id,a.company,a.companyValue.grade,a.platform.grade,a.choice.label]));
 if(target.dataset.signature===signature)return;target.dataset.signature=signature;
 const unknown=rows.filter(a=>a.companyValue.grade<2).length;
 const summary=el('summary','',`机构比较依据与覆盖 · ${groups.size} 个机构 · ${unknown} 条岗位认可度待证`);
 const content=el('div','company-method-content');
 content.append(el('h3','','先比较公司，再比较业务和职责'),el('p','','档位是有范围的分析判断，不是全金融总榜。主流平台、专业平台、主体已核和认可待核分别展示；未知保留，不能冒充差公司或优质公司。'),
  el('ol','comparison-order'));
 const order=content.lastElementChild;
 for(const text of ['公司含金量：目标招聘方能否识别这段履历；核对法律主体、办公室和接收市场。母子公司不自动继承。','业务含金量：同业务、同资产、同阶段比较实际产品、项目和投资工作。奖项不加分，规模与名次只作旁证。','实际工作：模型、研究判断、交易/投委参与与材料支持分开；品牌不能弥补纯支持职责。','可投与回报：条件冲突先拦；未知保持未知。同届同城同团队正式薪酬、留用原话独立核验，实习日薪不能外推。'])order.append(el('li','',text));
 const routes=el('div','company-route-grid');
 for(const r of Object.values(careerResearchRoutes)){
  const d=el('details','company-route');d.append(el('summary','',r.title),el('p','',r.focus),el('p','',r.receiving),link(r.source,r.url),el('p','muted',r.limit));routes.append(d);
 }
 content.append(routes,el('p','research-limit','研究边界：陈思炜历史观点仅作方法参考；小红书受登录/访问限制的内容未当成已核验证据。没有研究完所有市场的声明，也不使用网传薪资填空。'));
 const grid=el('div','company-coverage-table');
 table(grid,['机构 / 岗位数','公司判断与适用市场','当前业务与职责','依据及改变判断的条件'],ordered.map(([name,list])=>{
  const a=list[0],v=a.companyValue,title=el('div'),reason=el('div'),business=el('div'),proof=el('div');
  title.append(el('strong','',name),el('p','muted',list.length+' 条 · '+[...new Set(list.map(x=>careerDirections[careerDirection(x.j)]))].join('、')));
  reason.append(el('strong','',v.label),el('p','',v.reason),el('p','muted',v.markets.join('、')||'目标招聘市场待核'));
  business.append(el('p','', [...new Set(list.map(x=>x.platform.scope.label+'：'+x.platform.label))].join('；')),
   el('p','muted','实质分析/决策职责 '+list.filter(x=>x.career.decisionWork).length+' 条；公司品牌不替代职责证据。'));
  if(v.url)proof.append(link(v.kind+' · '+(v.checked?'核验 ':'')+v.asOf,v.url));
  proof.append(el('p','muted',v.limit),el('p','','改变判断：'+(v.grade<2?'补齐真实主体、目标招聘方认可及同业务项目证据后重评。':'出现同主体、同业务的招聘接收证据、职责或正式岗回报变化时重评。')));
  return [title,reason,business,proof];
 }));
 content.append(grid);target.replaceChildren(summary,content);
}

const exactHireSignal=/(?:进入|参加|直通|衔接)(?:本公司|本部门|本团队)?(?:正式)?(?:校招|秋招)(?:面试|考核|绿色通道|流程)|(?:发放|给予|获得)(?:全职|正式)(?:录用通知|offer)|(?:通过|经)(?:实习|留用|转正)?(?:考核|答辩)[^，。；]{0,12}(?:可转正|转为正式员工|予以留用|正式录用)/i;
const positiveHireSignal=/有留用|留用机会|留用答辩|可留用|予以留用|可转正|转正机会|转正留用|(?:可|优先)(?:进入|参加)(?:正式)?(?:校招|秋招)|直通(?:校招|秋招)|(?:校招|秋招)(?:优先|绿色通道)/;
const noHireSignal=/(?:暂)?不(?:提供|考虑|涉及|设|安排|予以)[^。；]{0,12}(?:留用|转正|正式录用)|无(?:留用|转正|正式录用)|不属于正式校招|不等于正式录用/;
const uncertainHireSignal=/不(?:保证|承诺|作为|代表|等于)[^。；]{0,16}(?:留用|转正|录用|offer)|未(?:承诺|公布)[^。；]{0,16}(?:留用|转正|录用)/i;
const formalPayLine=/^(?:【|\[)?(?:正式(?:岗(?:位)?|员工)|校招(?:全职|正式)岗(?:位)?)(?:固定薪酬|基本工资|底薪|基本薪酬)(?:】|\])?\s*[:：]?\s*(?:人民币\s*)?(?:￥|¥)?\d+(?:\.\d+)?(?:\s*(?:至|[-~—–])\s*\d+(?:\.\d+)?)?\s*(?:万?元\s*(?:[/／]\s*[月年]|每[月年])|[kK万]\s*[/／]\s*[月年])(?=$|[，,。；;\s（(])/;
// Only actual duties can earn credit for work that supports an investment or business decision.
const careerWork={
 buy:['投资分析与组合研究',/投资价值分析|投资建议|(?:个股|公司)估值|组合(?:构建|优化|归因)|(?:信用|发债)主体(?:研究|分析)|信用评估|基金(?:研究|评价|筛选)|管理人(?:尽调|研究)|资产配置(?:研究|模型|方案|建议)|(?:资产配置|多元资产|多资产)[^。；]{0,28}(?:专题研究|研究报告)|绩效归因/],
 quant:['因子、模型与策略研究',/(?:因子|信号|策略)[^。；，]{0,12}(?:构建|研发|开发|挖掘|建模|回测|检验|优化)|(?:构建|研发|开发|挖掘|回测|检验|优化)[^。；，]{0,20}(?:因子|信号|策略|定价模型|风控模型|风险模型)|统计套利|衍生品定价|波动率(?:曲面|建模)|指数(?:编制方案|调样规则)|(?:组合|策略)绩效归因/],
 investing:['项目判断与投资尽调',/投委会(?:材料|报告|汇报)|投资(?:决策|备忘录|建议)|投资(?:机会|标的|价值)(?:评估|判断|分析)|(?:推荐|判断|评估)[^。；]{0,12}(?:项目|投资)机会|投资(?:可行性|回报)分析|[^底]尽调报告|(?:财务|估值|投资)建模|(?:核算|测算|分析)[^。；]{0,12}(?:投资回报|投资价值|项目可行性)/],
 equity:['并购、估值与融资方案',/财务建模|估值(?:分析|建模)|(?:预测|建立|搭建)[^。；]{0,20}(?:财务模型|估值模型)|交易结构(?:设计|分析)|价值评估|并购(?:方案|分析|模型|尽调)|(?:开展|编制|撰写|完成)[^。；]{0,16}(?:财务尽调|尽调报告|融资方案)/],
 debt:['发行人分析与融资设计',/发行(?:人|主体)(?:的)?(?:信用|财务|偿债)(?:分析|研究|测算)|偿债(?:能力|测算)|增信(?:方案|设计)|现金流(?:测算|模型)|融资方案(?:的)?(?:设计|制定|拟定|测算)|(?:设计|制定|拟定|测算)[^。；]{0,16}(?:融资方案|融资结构|偿债安排)|发行定价(?:分析|测算)|信用风险评估/],
 strategy:['战略机会或经营决策分析',/商业尽调|商业可行性(?:分析|评估)|(?:制定|提出)[^。；]{0,24}(?:战略|策略|经营)建议|(?:评估|判断|测算)[^。；]{0,24}(?:市场进入|战略机会|商业机会|商业模式|经营成效|增长空间)|(?:方案|战略)可行性|(?:分析|撰写|形成|产出)[^。；]{0,24}(?:战略建议|决策建议)/],
 sell:['行业覆盖与投资价值分析',/投资价值分析|盈利预测|(?:搭建|更新|完善|构建)[^。；]{0,22}(?:财务|估值|盈利预测)模型|(?:行业|公司|个股)深度(?:研究|分析|报告)|(?:撰写|完成|产出)[^。；]{0,22}深度(?:研究)?报告/],
 other:['相邻方向',/$a/]
};
const careerLimits={
 buy:'岗位写了研究参与，未见配置、组合或明确投资分析分工',
 quant:'未见因子、策略回测、定价或指数规则研究；不能按量化策略岗排',
 investing:'未见标的评估、投资判断、建模或独立尽调产出',
 equity:'未见估值建模、交易结构或实质财务尽调分工',
 debt:'未见明确的信用分析、偿债测算或融资方案分工',
 strategy:'未见需要形成决策建议、评估商业机会或做可行性分析的分工',
 sell:'未见深度报告、盈利预测或投资价值分析分工',
 other:'相邻方向，留作备选'
};

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

function careerReturn(j,data,company,opening,lines,analysisLines,sales,multipleRoles){
 const backup=(data.profile.career_preferences?.backup_employers||[]).some(name=>toEmployer(name)===company);
 const pathway=careerPathway(j,opening,multipleRoles);
 const direction=careerDirection(j),[route,pattern]=careerWork[direction];
 const clauses=lines.flatMap(line=>line.split(/[，,、]\s*(?=(?:负责|完成|协助|支持|参与|撰写|开展|收集|整理|准备|构建|搭建|评估|形成|分析|拟定|设计))/));
 // A requirement, promotional description or exposure-only clause does not establish assigned work.
 const evidence=(!sales&&!multipleRoles?clauses:[]).filter(line=>pattern.test(line)&&!financeSupport.test(line)&&
  !/^(?:学习|了解|接触|观摩|熟悉)|(?:整理|收集|归档|汇总)[^。；]{0,10}(?:现有|历史|历年)?(?:投资建议|尽调报告|融资方案)|(?:报告|模型)(?:中的)?(?:部分章节|格式调整)/.test(line));
 const strong=evidence.find(line=>workOwnership.test(line))||evidence[0];
 const quote=strong||analysisLines[0];
 const limit=careerLimits[direction];
 return {backup,pathway,evidence:quote||null,route:strong?route:direction==='quant'&&/指数/.test([j.title,j.team].join(' '))?
  '指数产品研究（策略分工待核）':'下一跳待核',decisionWork:Boolean(strong),owned:Boolean(strong&&workOwnership.test(strong)),
  depth:strong?2:quote?1:0,limit,compensation:careerPay(j,opening,multipleRoles)};
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

function financeStudyGate(requirements,profile){
 const stage=profile.education?.find(education=>/^研[一二三]$/.test(education.year||''))?.year;
 for(const quote of requirements){
  const required=quote.match(/(?:^|[，,；;。]|(?:要求|仅限|限招|限|须为|必须为)\s*)(研[一二三])\s*(?:硕士)?(?:在读|学生)(?=$|[，,；;。\s、（(])/);
  if(!required||preferredCondition.test(quote)||/博[士一二三]|本科|均可|应届|或者|或为/.test(quote))continue;
  const mentions=[...new Set(quote.match(/研[一二三]/g)||[])];
  if(mentions.length===1)return {quote,required:required[1],stage,state:stage?(stage===required[1]?'满足':'冲突'):'未知'};
 }
 return null;
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
 const companyValue=assessCompany(company);
  const platform=assessPlatform(j,company,duties,now),businessProofs=platform.proofs;
 const institution=businessProofs[0],businessStrength=platform.grade;
 const opening=pickOpening(j,now),place=pickLocation(j,data.profile,requirements);
 const titleTeam=j.title.match(/研究所\s*[|｜·]?[\s]*([^，,。()（）]{1,16}(?:团队|小组))/)?.[1];
 const namedTeam=titleTeam||(!/水晶球|新财富/.test(j.team||'')?j.team:null);
 const teamProof=namedTeam?(opening.official?'官方 JD 载明 '+namedTeam:'招聘原帖载明 '+namedTeam):'具体团队待核';
 const mentoring=(j.original||'').split(/\r?\n/).find(line=>teamMentoring.test(line)&&!pickRequirements.test(line));
 const conditions=j.matching?.eligibility?.conditions||[];
 const conflicts=conditions.filter(c=>c.state==='冲突');
 const study=financeStudyGate(requirements,data.profile);
 if(study?.state==='冲突')conflicts.push({name:'在读年级',reason:'JD 要求'+study.required+'在读，已确认画像为'+study.stage,quote:study.quote});
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
 const checks=[!opening.internship&&'招聘类型待核',study?.state==='未知'&&'仅限'+study.required+'在读',unknownCohort&&shortCohort+'待核',!place.known&&!place.outside&&'实习地点待核',
  place.remoteOnly&&data.profile.remote==null&&'远程安排待核',gap,technical&&english&&'JD 英语门槛待核',schedule.summary,schedule.unknown].filter(Boolean);
 const workExperience=pickFullTimeRequirement(requirements);
  const fullTime=workExperience||/博士后|社会招聘|全职招聘/.test(j.title)&&!/实习/.test(j.title);
 const bankGate=j.bank_gate&&data.profile.bank_specialist!==true;
 const career=careerReturn(j,data,company,opening,lines,analysisLines,sales,multipleRoles);
 const roleGate=!opening.internship?'核对招聘类型是否为实习':!place.known?'实习地点待核':!namedTeam?'岗位归属团队待核':
  unknownCohort?shortCohort+'待核':study?.state==='未知'?'JD 的在读年级门槛待核':
  missing.has('requirements')||!requirements.length?'JD 未披露可核对的任职要求':'';
 const choice=opening.closed?{label:opening.closed,level:0,note:'以 JD 的截止时间或关闭状态为准'}:
  conflicts.length||place.outside||fullTime||j.excluded_reason?{label:'明显不符',level:0,note:conflicts.length?
   conflicts.map(c=>c.name+' '+c.reason).join('；'):place.outside?'JD 地点超出当前实习范围':fullTime?(workExperience?'原文要求多年工作经历':'原文为社会或全职招聘'):j.excluded_reason}:
  bankGate?{label:'待核专业岗',level:2,note:'银行专业岗待确认是否考虑'}:
  career.backup?{label:'备选',level:2,note:'按你的职业回报偏好降为备选；具体正式薪酬和留用未核实'}:
  !j.company||missing.has('company')||missing.has('role')?{label:'资料待补',level:1,note:'机构或具体岗位待核'}:
  multipleRoles?{label:'先核条件',level:3,note:'同一原文包含多岗，先核对各岗位职责'}:
  !career.depth&&!depth||missing.has('duties')?{label:'资料待补',level:1,note:'JD 中尚无可确认的岗位职责'}:
  sales||!career.decisionWork?{label:'备选',level:2,note:sales?'销售或包含明确销售职责':career.limit}:
  !opening.current?{label:'旧线索',level:2,note:'近期没有核实在招，留在岗位列表'}:
  companyValue.grade<2?{label:'机构待核',level:3,note:companyValue.reason}:
   businessStrength<2?{label:'业务待核',level:3,note:platform.note}:
  roleGate?{label:'先核条件',level:3,note:roleGate}:
  !opening.open?{label:'先核开放',level:4,tier:'verify',note:'岗位工作有证据，待确认是否仍招'}:
  career.pathway.rank===-1?{label:'先核条件',level:4,tier:'verify',note:'官方 JD 写明无正式岗通道，按实习产出衡量'}:
  specialist||place.remoteOnly&&data.profile.remote==null?{label:'值得冲刺',level:4,tier:'verify',note:gap||'确认可接受的远程安排'}:
  {label:'优先评估',level:5,tier:'recommend',note:'官方在招；有实际分析产出，相关业务线为'+platform.label};
 const due=Number(opening.open&&opening.internship&&opening.deadline>=now&&opening.deadline-now<=3*86400000);
 return {j,company,companyValue,namedTeam,choice,type,nature,work,secondary,mixed,depth,fit,direct,transferable,platform,institution,businessStrength,businessProofs,teamProof,mentoring,career,
  opening,place,checks,schedule,cohort:unknownCohort?cohort:null,
  skills:unprovenSkill?[...new Set([technical,english].filter(Boolean))]:[],conflicts,due};
}

function compareCareerValue(a,b){
 // With the role gates applied, prefer a stronger evidenced platform over a marginal difference in JD wording.
 return b.companyValue.grade-a.companyValue.grade||b.platform.grade-a.platform.grade||b.career.depth-a.career.depth||
  Number(b.career.pathway.rank===2)-Number(a.career.pathway.rank===2)||
  Number(a.career.pathway.rank===-1)-Number(b.career.pathway.rank===-1)||
  Number(b.career.owned)-Number(a.career.owned)||
  Number(Boolean(b.direct.length))-Number(Boolean(a.direct.length))||
  Number(Boolean(b.transferable.length))-Number(Boolean(a.transferable.length));
}

function compareFinance(a,b){
 return b.choice.level-a.choice.level||Number(a.career.backup)-Number(b.career.backup)||
   Number(b.opening.open&&b.opening.internship)-Number(a.opening.open&&a.opening.internship)||
   compareCareerValue(a,b)||Number(b.opening.current)-Number(a.opening.current)||
  b.due-a.due||
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
 return a.opening.closed||(a.opening.current?'近期收录 · 在招未核':a.opening.seen?'旧线索 · 在招未核':'时间及在招待核');
}

function workQuote(a){
 const evidence=a.work.find(item=>item.owned)||a.work[0];
 return a.career.decisionWork?a.career.evidence:a.choice.level===2&&a.mixed?
  a.secondary[0]||evidence?.quote:evidence?.quote||a.secondary[0];
}

function priorityWork(a){
 const quote=workQuote(a);
 const evidence=quote?.replace(/\s+/g,' ').trim();
 return evidence?evidence.slice(0,112)+(evidence.length>112?'…':''):a.nature;
}

const financeChoices=['优先评估','先核开放','值得冲刺','先核条件','机构待核','业务待核','备选','旧线索','待核专业岗','资料待补','明显不符','已截止','已关闭或过期'];
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

const careerPeerCriteria={
 buy:'先对齐资产和策略。权益、固收、FOF 分开看，优先核对对应产品、投资分工及组合产出，集团总规模不横比。',
 quant:'区分因子策略、衍生品定价和指数产品。看模型、回测或规则由谁负责；指数服务不代表自营交易能力。',
 investing:'按投资阶段、行业和基金性质看已投或退出案例；做标的判断、尽调和投委会材料，比搜项目线索更接近决策。',
 equity:'IPO／再融资和并购重组分开。看同类成交记录、估值建模、交易结构和执行分工。',
 debt:'信用债、ABS 和 REITs 分开。看同类主承销或项目、信用分析、偿债测算及结构设计。',
 strategy:'区分公司内部战略、外部咨询和执行支持。看实际业务决策、交付内容和负责边界，集团营收不替代团队证据。',
 sell:'同行业组比较覆盖深度、盈利预测和报告产出；研究所奖项、银行或投行业绩不替代岗位证据。',
 other:'评级、信托研究及后台支持业务不同，各自核对岗位产出与职业路径，保留为相邻备选。'
};
const careerPeerState=new Map();
let careerPeerDirection='';

function peerMetric(a,b){
 if(a.company===b.company||careerDirection(a.j)!==careerDirection(b.j))return null;
 for(const left of a.businessProofs){
  const m=left.metric;
  if(!m||!Number.isFinite(m.value))continue;
  const other=b.businessProofs.find(e=>e.metric&&Number.isFinite(e.metric.value)&&
   ['key','period','scope','unit'].every(k=>e.metric[k]===m[k]));
  if(other)return {metric:m,right:other.metric,matched:a.platform.scope.key===m.appliesTo&&b.platform.scope.key===m.appliesTo};
 }
 return null;
}

function platformComparison(a,b,benchmark){
 const [x,y]=[a.companyValue,b.companyValue];
 if(a.company===b.company)return '同一公司；公司判断相同，继续比较实际业务、团队与职责。';
 if(a.career.route!==b.career.route)return '接收市场不同：分别看公司在各自招聘市场的认可度，不能混成全金融总榜。';
 if(x.grade<2||y.grade<2)return '至少一方的公司认可度仍待核验；不能因方向对口或单项承销数字领先就进入首推。';
 if(x.grade!==y.grade){const stronger=x.grade>y.grade?a:b;return '公司层面先看 '+stronger.company+'（'+stronger.companyValue.label+'）。这是有范围的分析判断；具体业务、职责或正式岗回报证据可以改变选择。';}
 if(a.platform.scope.key!==b.platform.scope.key)return '公司判断同档，但业务线不同；各自对照目标招聘方，先确定要走的业务。';
 if(a.platform.grade!==b.platform.grade){const stronger=a.platform.grade>b.platform.grade?a:b;return '公司判断同档，'+stronger.company+'对应业务的证据更充分。仍需看实际职责；证据少不等于公司差。';}
 return '公司及业务判断暂在同档，优先看职责与真实职业回报。'+(benchmark?.matched?'同口径数字仅作旁证，不直接定胜负。':'当前没有足够证据强行排出名次。');
}
function platformRow(a){
 const line=el('div','career-platform company-business-role');
 for(const [label,value,grade]of [['公司',a.companyValue.label,a.companyValue.grade],['业务',a.platform.label,a.platform.grade],['职责',a.career.decisionWork?'有分析产出':a.career.depth?'偏支持 / 待核':'待核验',a.career.decisionWork?2:0]]){
  const item=el('div','value-pillar');item.append(el('span','value-label',label),el('strong','',value));item.dataset.valueGrade=grade;line.append(item);
 }
 line.title=a.companyValue.reason+' '+a.platform.scope.label+'：'+a.platform.note;
 return line;
}

function peerAdvice(a,b){
 const eligible=x=>Boolean(x.choice.tier);
 if(!eligible(a)&&!eligible(b))return '两条都先留在岗位库。各自卡在哪一项，见下方。';
 const name=x=>a.company===b.company?x.j.title:x.company;
 if(a.choice.tier!==b.choice.tier){
  const winner=a.choice.tier==='recommend'||(eligible(a)&&!eligible(b))?a:b;
  return (winner.choice.tier==='recommend'?'先看 ':'优先核实 ')+name(winner)+'。'+winner.choice.note+'。';
 }
 if(a.j.family!==b.j.family||a.career.route!==b.career.route){
  return '岗位方向或产出不同。分别核对业务和职业路径，暂不给机构排一个总名次。';
 }
 const tests=[
  [a.companyValue.grade,b.companyValue.grade,'公司在对应招聘市场的认可度更明确'],
  [a.platform.grade,b.platform.grade,'该业务线平台证据更强'],
  [a.career.depth,b.career.depth,'JD 有更直接的决策产出'],
  [a.career.pathway.rank===2,b.career.pathway.rank===2,'有明确的正式岗考核或招聘通道'],
  [a.career.pathway.rank!==-1,b.career.pathway.rank!==-1,'另一条已明确无正式岗通道'],
  [a.career.owned,b.career.owned,'JD 明确写出负责的工作'],
  [Boolean(a.direct.length),Boolean(b.direct.length),'已有经历可直接对应岗位任务']
 ];
 const difference=tests.find(([x,y])=>x!==y);
 return difference?'先看 '+name(difference[0]>difference[1]?a:b)+'：'+difference[2]+'。':'现有证据不足以拉开差距；按具体团队、正式岗通道及个人门槛取舍。';
}

function renderCareerPeer(target,group,focus=false){
 const {key,rows}=group;
 const eligible=rows.slice().sort(compareFinance);
 const byId=new Map(eligible.map(a=>[a.j.id,a]));
 const saved=careerPeerState.get(key)||[];
 const left=byId.get(saved[0])||eligible[0];
 const right=byId.get(saved[1])||eligible.find(a=>peerMetric(left,a)?.matched)||
  eligible.find(a=>a.company!==left.company&&a.platform.scope.key===left.platform.scope.key&&a.platform.grade>0)||
  eligible.find(a=>peerMetric(left,a))||
  eligible.find(a=>a.company!==left.company&&a.j.family===left.j.family)||
  eligible.find(a=>a.company!==left.company)||eligible[1];
 const header=el('div','career-peer-heading'),heading=el('h3','','同行比较 · '+careerDirections[key]);
 heading.tabIndex=-1;
 const close=el('button','career-filter','收起比较');
 close.onclick=()=>{
  careerPeerDirection=''; target.replaceChildren(); target.hidden=true;
  target.previousElementSibling?.querySelector(`[data-career-direction="${key}"] .career-compare-toggle`)?.focus();
 };
 header.append(heading,close);
 const controls=el('div','career-peer-grid'),comparison=el('div','career-peer-result');
 const selects=[left,right].map((a,i)=>{
  const label=el('label','career-peer-select');
  label.append(el('span','',i?'岗位 B':'岗位 A'));
  const select=el('select');
  eligible.forEach(b=>{
   const item=el('option','',[b.company||'机构待核',b.place.where,b.j.title].join(' · '));
   item.value=b.j.id;select.append(item);
  });
  select.value=a?.j.id||'';
  label.append(select);controls.append(label);
  return select;
 });
 const refresh=()=>{
  const pair=selects.map(s=>byId.get(s.value));
  careerPeerState.set(key,selects.map(s=>s.value));
  if(!pair[1]||pair[0].j.id===pair[1].j.id){
   comparison.replaceChildren(el('p','career-empty','请选两条不同岗位，可以选同一机构的不同团队。'));
   return;
  }
  const metric=peerMetric(...pair);
  const verdict=el('div','career-peer-verdict');
  const takeaway=(label,message)=>{const p=el('p');p.append(el('strong','',label),message);return p;};
  verdict.append(takeaway('机构怎么比',platformComparison(...pair,metric)),takeaway('岗位先看谁',peerAdvice(...pair)));
  verdict.setAttribute('role','status');
  const benchmark=el('p','career-peer-method');
  if(metric){
   const {metric:m,right:n}=metric;
   const digits=v=>v.toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2});
   benchmark.append(metric.matched?'同类业务对比 · ':'窄口径参考，不判通用业务强弱 · ',link(m.period+' · '+m.scope,m.url),'（'+m.asOf+'）：',
    pair[0].company+' '+digits(m.value)+' '+m.unit+'；'+pair[1].company+' '+digits(n.value)+' '+n.unit+'。'+m.limitation);
  }else benchmark.textContent='没有两家同口径的可比数字；以下列出各自查到的证据。';
  const grid=el('div','career-peer-grid');
  pair.forEach((a,i)=>{
   const panel=el('section','career-peer-card'),job=el('button','career-job',a.j.title);
   job.onclick=()=>showDetail(a.j);
   panel.append(el('h4','',(i?'B':'A')+' · '+(a.company||'机构待核')),job,
    el('p','career-employer',[a.namedTeam||'团队待核',a.place.where,priorityOpening(a)].join(' · ')),
    ReadingQueue.sourceRow(a.j.sources||[],PRODUCT));
   const facts=el('dl','career-peer-facts');
   const row=(term,...values)=>{const note=el('dd');note.append(...values);facts.append(el('dt','',term),note)};
   row('公司含金量',companyEvidence(a));
    row('业务与职责',platformRow(a),el('p','career-check',a.platform.scope.label+' · '+a.platform.note));
   if(a.businessProofs.length){
    const proofs=el('ul','career-peer-sources');
    for(const e of a.businessProofs){
     const item=el('li');item.append(link(e.label,e.url),'（'+(e.checked?'核验 ':'')+e.asOf+'） · '+e.scope);proofs.append(item);
    }
    row('机构业务',proofs);
   }else row('机构业务','暂无可对应这条业务线的可核实成果');
   row('实习职责',priorityWork(a)+(a.career.decisionWork?'':('。'+a.career.limit)));
   row('正式岗回报',a.career.compensation.quote||a.career.compensation.text,'；'+a.career.pathway.text);
   row('优先级',a.choice.label+' · '+priorityNext(a));
    row('何时改变判断','补到同主体、同业务的招聘接收证据、实质职责、正式岗回报或硬条件变化时重评；未核验项不按满足处理。');
   panel.append(facts);grid.append(panel);
  });
  comparison.replaceChildren(verdict,benchmark,grid);
 };
 selects.forEach(s=>s.addEventListener('change',refresh));
 target.replaceChildren(header,el('p','career-peer-method',careerPeerCriteria[key]),controls,comparison);
 target.hidden=false;refresh();
 if(focus){heading.focus({preventScroll:true});target.scrollIntoView({block:'nearest'});}
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
  const ranked=rows.filter(a=>a.choice.tier&&!feedback[a.j.id]?.applied).sort(compareFinance);
  const seenReposts=new Set();
  const distinct=ranked.filter(a=>{
   const key=shortlistRepostKey(a);
   if(!key)return true;
   if(seenReposts.has(key))return false;
   seenReposts.add(key);return true;
  });
  return {key,rows,count:rows.length,recommended:distinct.filter(a=>a.choice.tier==='recommend'),watch:distinct.filter(a=>a.choice.tier==='verify')};
 });
 const itemsFor=rows=>rows.slice(0,2).map(a=>[
  a.j.id,a.j.title,a.company,a.namedTeam,a.place.where,priorityOpening(a),a.career.evidence,priorityNext(a),a.career.pathway.text,
  a.institution?.asOf,a.companyValue.grade,a.platform.grade,a.platform.scope.key,(a.j.sources||[]).map(source=>ReadingQueue.sourceLabel(source,PRODUCT))]);
 const signature=JSON.stringify([selected,groups.map(({key,count,recommended,watch})=>[
  key,count,recommended.length,watch.length,itemsFor(recommended),itemsFor(watch)])]);
 const totals=groups.reduce((out,g)=>({recommended:out.recommended+g.recommended.length,watch:out.watch+g.watch.length}),{recommended:0,watch:0});
 const peer=$('career-peer');
 const active=groups.find(g=>g.key===careerPeerDirection&&g.rows.length>=2);
 const peerSignature=active?JSON.stringify(active.rows.map(a=>[a.j.id,a.j.title,a.company,a.namedTeam,a.place.where,a.choice.label,
  priorityNext(a),priorityOpening(a),priorityWork(a),a.companyValue.grade,a.platform.grade,a.platform.scope.label,a.businessProofs.map(e=>[e.url,e.asOf,e.scope]),a.career.pathway.text,a.career.compensation.quote])):'';
 if(peer.dataset.signature!==peerSignature){
  peer.dataset.signature=peerSignature;
  if(active)renderCareerPeer(peer,active);
  else{peer.hidden=true;peer.replaceChildren()}
 }
 if(target.dataset.signature===signature)return totals;
 target.dataset.signature=signature;
 const entryFor=a=>{
  const entry=el('div','career-entry'),title=el('button','career-job',a.j.title);
  title.dataset.careerJob=a.j.id;entry.dataset.careerTier=a.choice.tier;
  title.onclick=()=>showDetail(a.j);
  const proof=a.career.evidence.replace(/\s+/g,' ');
  entry.append(el('p','career-employer',[a.company,a.namedTeam,a.place.where].filter(Boolean).join(' · ')),title,
   platformRow(a),el('p','career-opening',priorityOpening(a)),ReadingQueue.sourceRow(a.j.sources||[],PRODUCT),
   el('p','career-duty',proof.slice(0,110)+(proof.length>110?'…':'')));
  if(a.institution){
   const business=el('p','career-business');
   business.append('业务证据：',link(a.institution.label,a.institution.url),' · '+a.institution.asOf);
   entry.append(business);
  }
  entry.append(el('p','career-check',priorityNext(a)));
  if(a.career.pathway.rank!==0)entry.append(el('p','career-check',a.career.pathway.text));
  return entry;
 };
 target.replaceChildren(...groups.map(group=>{
  const {key,count,recommended,watch}=group;
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
  if(recommended.length) section.append(entryFor(recommended[0]));
  else section.append(el('p','career-empty','暂无首推'));
  if(recommended.length>1){
   const more=el('details','career-more');
   more.append(el('summary','','同方向另一条首推 · 共 '+recommended.length+' 条'),entryFor(recommended[1]));
   section.append(more);
  }
  if(watch.length){
   const pending=el('details','career-more career-watch');
   pending.append(el('summary','','值得核实 · '+watch.length+' 条'),...watch.slice(0,2).map(entryFor));
   section.append(pending);
  }
  if(count>=2){
   const compare=el('button','career-compare-toggle','比较公司和岗位');
   compare.setAttribute('aria-controls','career-peer');
   compare.onclick=()=>{careerPeerDirection=key;peer.dataset.signature='';renderCareerShortlist(target,assessment,scoped);
    peer.querySelector('h3').focus({preventScroll:true});peer.scrollIntoView({block:'nearest'});};
   section.append(compare);
  }
  return section;
 }));
 return totals;
}

function renderPriorityPanel(assessment,scoped,directional){
 if(!assessment){$('personal-picks')?.remove();return}
 let panel=$('personal-picks');
 if(!panel){
  panel=el('section','personal-picks');
  panel.id='personal-picks';
  panel.setAttribute('aria-label','评估优先级筛选');
  const peer=el('section','career-peer');peer.id='career-peer';peer.hidden=true;
  panel.append(el('div','priority-summary'),el('p','career-pay-note'),el('div','career-shortlist'),peer,el('div','priority-filters'));
  const filters=panel.lastElementChild;
  for(const state of ['',...financeChoices]){
   const b=el('button','priority-filter');
   b.dataset.priorityFilter=state;
   b.append(el('span','',state||'全部评估'),el('span','n'));
   b.onclick=()=>{$('bucket').value=state;render()};
   filters.append(b);
  }
  const research=el('button','institution-open','比较机构与业务 · 查看资料依据');research.onclick=()=>openInstitutionResearch();panel.append(research);
  const coverage=el('details','company-comparison-method');panel.append(coverage);
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
 const {recommended,watch}=renderCareerShortlist(panel.querySelector('.career-shortlist'),assessment,scoped);
 const summary=[scoped.length+' 条已评估',recommended+' 条首推',watch+' 条值得核实'];
 if(pool!=='all')summary.push(DATA.pools[pool]);
 if($('period').value!=='all')summary.push($('period').selectedOptions[0].text);
 panel.querySelector('.priority-summary').textContent=summary.join(' · ');
  const payCount=scoped.filter(j=>assessment.get(j.id).career.compensation.quote).length;
 panel.querySelector('.career-pay-note').textContent='先比较公司认可度，再看业务和实际职责。认可待核的公司不进首推；奖项、承销量、实习日薪不能代替职业回报。'+(payCount?
  '同团队、同届的正式岗固定薪酬有 '+payCount+' 条可核对，见岗位详情。':'同团队、同届的正式岗薪酬暂未核实。');
 for(const button of panel.querySelectorAll('[data-priority-filter]')){
  const key=button.dataset.priorityFilter,count=key?(counts.get(key)||0):directional.length;
  const selected=$('bucket').value===key;
  button.setAttribute('aria-pressed',selected);
  button.hidden=Boolean(key&&!count&&!selected);
  button.lastElementChild.textContent=count;
 }
 renderCompanyCoverage(panel.querySelector('.company-comparison-method'),assessment,scoped);
 renderInstitutionResearch(assessment);
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
 const assessment=financeAssessments();
 const q=$('query').value.trim().toLowerCase(),focus=$('focus').value,period=$('period').value;
 ReadingQueue.mountClues($('jobs'),PRODUCT?.reading_queue,'finance',DATA.jobs,PRODUCT);
 ReadingQueue.decisions($('decision-entry'),PRODUCT?.reading_queue,DATA.jobs.filter(j=>!feedback[j.id]?.ignored),PRODUCT?.image_issues,(key,stage)=>{
  if(key==='pending'||key==='gaps'){
   if(key==='gaps'&&PRODUCT?.reading_queue?.local_login){location.assign(PRODUCT.reading_queue.local_login);return}
   setView('unread');ReadingQueue.show($('reading-panel'),stage);return
  }
  pool='all';
   for(const id of fields)$(id).value=({period:'week',sort:defaultSort(),focus:key}[id]||'');
   setView('jobs');render();$('count').focus({preventScroll:true});$('count').scrollIntoView({block:'start'});
  },{board:DATA,activeKey:period==='week'?focus:'',isOpen:j=>matchesFocus(j,'open',assessment?.get(j.id))});
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
 const focusLabel=decisionFocus.has(focus)?$('focus').selectedOptions[0]?.textContent:'';
 $('count').replaceChildren(el('strong','',rows.length+' 条'),document.createTextNode(' · '+(focusLabel||careerDirections[direction]||(pool==='all'?'金融四池':DATA.pools[pool]))));
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
  ...[...new Set(workQuotes)].map(quote=>el('blockquote','quote',quote)),
  ...(!a.career.decisionWork&&a.career.limit?[el('p','muted',a.career.limit)]:[]));
 add('正式岗与下一跳',el('p','priority-lead',a.career.compensation.text),
   ...(a.career.compensation.quote?[el('blockquote','quote',a.career.compensation.quote)]:[]),
   el('p','',a.career.pathway.text),
   ...(a.career.pathway.quote?[el('blockquote','quote',a.career.pathway.quote)]:[]),
   ...(a.career.compensation.url||a.career.pathway.rank===2&&a.career.pathway.url?
    [link('核对官方招聘原文',a.career.compensation.url||a.career.pathway.url)]:[]),
   el('p','muted',(a.career.evidence?'可积累到的方向：':'')+a.career.route),
   ...(a.career.backup?[el('p','muted','按你的职业回报偏好放在备选。')]:[]));
 add('公司含金量',el('p','priority-lead',a.companyValue.label+' · 分析判断'),companyEvidence(a));
  const business=[platformRow(a),el('p','priority-lead',a.platform.note),el('p','muted',a.teamProof)];
 if(a.institution)for(const e of a.businessProofs){business.push(link(e.label+' · '+(e.checked?'核验于 ':'')+e.asOf,e.url),el('p','muted',e.scope));}
 else business.push(el('p','muted','该业务线的产品、项目或团队成果暂无可核对出处。'));
 if(a.mentoring)business.push(el('blockquote','quote',a.mentoring));
 add('团队与业务',...business);
 const fits=a.fit.slice(0,2).map(f=>el('p','',f.level+' · '+f.experience+'。'+f.note+'。'));
 add('经历与缺口',...(fits.length?fits:[el('p','muted',priorityOwner()?'已确认经历中暂无直接对应的职责。':'共享页面按访客条件未知展示；请自行核对经历与硬条件。')]));
 const opening=priorityOpening(a)+(a.opening.open?' · '+date(a.j.last_verified_at):'');
 const quotes=[a.cohort,...a.skills,...a.conflicts.map(c=>c.quote),...a.schedule.quotes].filter(Boolean);
 add('下一步核对',el('p','priority-lead',priorityNext(a)),el('p','muted',opening),
  ...[...new Set(quotes)].map(quote=>el('blockquote','quote',quote)));
 section.append(rows);
 return section;
}

function showDetail(j,open=true){activeJob=j.id;const d=$('detail-content');d.replaceChildren();const assessment=financeAssessments().get(j.id);const h=el('div','detail-intro');h.append(el('p','company',companyLabel(j,assessment)),el('h2','',j.title));h.lastChild.id='detail-title';h.append(ReadingQueue.sourceRow(j.sources,PRODUCT),assessment?priorityBadge(assessment):el('span','badge warning',j.bucket));if(!assessment)h.append(el('p','detail-why',j.why),el('p','notice',barrier(j)));d.append(h);if(assessment)d.append(renderFinancePriority(assessment));
 const apply=el('div','apply-box');apply.append(el('h3','','投递方式'));if(j.application_url)apply.append(link('打开投递入口 ↗',j.application_url));for(const email of j.emails){const row=el('div','email-row');row.append(el('span','',email));const b=el('button','','复制邮箱');b.onclick=async()=>{try{await navigator.clipboard.writeText(email);b.textContent='已复制 ✓';toast('投递邮箱已复制')}catch{toast('复制失败，请选中邮箱复制')}};row.append(b);apply.append(row)}if(!j.application_url&&!j.emails.length)apply.append(el('p','muted','投递方式尚未取得，请查看原文来源。'));if(j.application_note)apply.append(el('p','hint',j.application_note));const acts=el('div','cardactions');acts.append(feedbackButton(j,'saved','收藏'),feedbackButton(j,'applied','标记已投递'),feedbackButton(j,'ignored','忽略'));apply.append(acts);
 const facts=el('div','facts detail-facts');for(const[k,v]of[['地点',assessment?assessment.place.where:j.cities.join(' / ')],['类型',j.internship_type],['出勤',assessment?assessment.schedule.attendance:j.days],['时长',assessment?assessment.schedule.duration:j.months],['补贴',j.pay],['截止',j.deadline],['远程',j.remote_arrangement],['到岗',j.start],['状态',assessment?priorityOpening(assessment):j.opening_status]])fact(facts,k,v);d.append(facts);
 const jd=el('details','jd');jd.open=!assessment;jd.append(el('summary','',isCardExcerpt(j)?'卡片已知信息':'原始 JD'),el('pre','',j.original));d.append(jd,apply);const grid=el('div','detailgrid'),a=el('div'),b=el('div');a.append(el('h3','','① 职业方向'),el('p','',j.matching.direction.reason),el('div','quote',unknown(j.matching.direction.quote)),el('h3','','② 当前竞争力'));for(const x of j.matching.competitiveness.evidence)a.append(el('p','',x.experience+'：'+x.note),el('div','quote',x.quote));if(!j.matching.competitiveness.evidence.length)a.append(el('p','','尚无明确经历证据。'));a.append(el('h3','','主要缺口'));for(const x of j.matching.competitiveness.gaps)a.append(el('p','',x.mandatory?'要求需补证':'偏好 / 加分，非硬门槛'),el('div','quote',x.quote));if(!j.matching.competitiveness.gaps.length)a.append(el('p','','JD 未提供可进一步核对的技能要求。'));table(b,['条件','状态','JD 原句 / 解释'],j.matching.eligibility.conditions.map(x=>[x.name,x.state,(x.quote||'JD 未写明')+'；'+x.reason]));b.prepend(el('h3','','③ 可投条件'));b.append(el('h3','','④ 机会质量'),el('p','',j.matching.quality.note),el('p','','职责性质：'+j.work_nature),el('div','quote','留用原话：'+unknown(j.conversion_quote)));grid.append(a,b);
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
 const priorPriority=$('sort').querySelector('[value="priority"]'),owner=true;
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
   if(decisionFocus.has(restoreParams.get('focus')))desired.period='week';
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
 const queue=PRODUCT?.reading_queue,backlog=ReadingQueue.weekQueue(queue);ReadingQueue.mount($('reading-panel'),queue,PRODUCT?.image_issues||[]);$('unread-count').textContent=backlog?.total??'';
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

let checkingBackground=false;setInterval(async()=>{if(document.hidden||updating||checkingBackground)return;checkingBackground=true;try{const r=await fetch('./data/status.json',{cache:'no-store'});if(r.ok){const status=await r.json();renderRuntime(status);const published=status.published_at||status.finished_at;if(published&&(!DATA||Date.parse(published)>Date.parse(DATA.generated_at)))await load();}}catch{}finally{checkingBackground=false}},60000);
