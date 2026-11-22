
let lang='en';
function changeLang(next){
 lang=next==='de'?'de':'en';document.documentElement.lang=lang;document.documentElement.dir='ltr';
 for(const id of ['en','de','ar']){const article=document.getElementById(id);if(article)article.hidden=id!==lang;}
 const b=document.getElementById('caseLang');b.textContent=lang==='en'?'Deutsch':'English';b.lang=lang==='en'?'de':'en';b.setAttribute('aria-label',lang==='en'?'Switch to German':'Zu Englisch wechseln');
 document.querySelector('.brand').firstChild.textContent='Eslam Mosbah';
 const back=document.querySelector('.back-link');back.textContent=lang==='de'?'Alle Fallstudien':'All case studies';
 back.href=lang==='de'?'index.html?lang=de#work':'index.html#work';document.querySelector('.brand').href=lang==='de'?'index.html?lang=de':'index.html';
 document.getElementById('foot').textContent=lang==='de'?'Eslam Mosbah / Marketing-Portfolio':'Eslam Mosbah / Marketing portfolio';
 document.title=document.body.dataset[lang==='de'?'titleDe':'titleEn'];
 const u=new URL(location.href);if(lang==='de')u.searchParams.set('lang','de');else u.searchParams.delete('lang');history.replaceState(null,'',u.pathname+u.search+u.hash);
}
document.getElementById('caseLang').onclick=()=>changeLang(lang==='en'?'de':'en');changeLang(new URLSearchParams(location.search).get('lang'));
