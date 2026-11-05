'use strict';
window.RadarPublication={update(s){
 const box=document.getElementById('publication-status');if(!box)return;
 const at=new Date(s.snapshot_at),collected=new Date(s.collected_at||''),age=Date.now()-at.getTime(),sourceAge=Date.now()-collected.getTime(),stale=!Number.isFinite(age)||age>3600000||!Number.isFinite(sourceAge)||sourceAge>3600000;
 const label=Number.isFinite(at.getTime())?at.toLocaleString('zh-CN',{hour12:false}):'时间未知';
 box.replaceChildren();const strong=document.createElement('strong');strong.textContent=stale?'最近成功快照 · 可能已过时':'固定共享站 · 自动保存';
 const span=document.createElement('span');span.textContent='快照生成 '+label+' · 消息采集 '+(Number.isFinite(collected.getTime())?collected.toLocaleString('zh-CN',{hour12:false}):'时间未知')+'。约每 15 分钟发布；电脑离线时保留已有结果。';
 box.append(strong,span);box.classList.toggle('stale',stale);
 for(const id of ['status','runtime']){const el=document.getElementById(id);if(el)el.textContent=stale?'快照或消息采集已超过 1 小时 / 时间未知，请核对原文':s.source_status==='failed'?'最近采集失败 · 已保留成功结果':'只读共享 · 新消息和未读内容由后台自动整理';}
}};
