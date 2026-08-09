// ===== CallPro — Main JS =====

// Phone mask
function initPhoneMask(){
  document.querySelectorAll('input[data-type="phone"]').forEach(function(input){
    input.addEventListener('input',function(e){
      let val=e.target.value.replace(/\D/g,'');
      if(val.startsWith('8'))val='7'+val.slice(1);
      if(!val.startsWith('7')&&val.length>0)val='7'+val;
      val=val.substring(0,11);
      let formatted='+7';
      if(val.length>1)formatted+=' ('+val.substring(1,4);
      if(val.length>=4)formatted+=') '+val.substring(4,7);
      if(val.length>=7)formatted+='-'+val.substring(7,9);
      if(val.length>=9)formatted+='-'+val.substring(9,11);
      e.target.value=formatted;
    });
  });
}

// Form validation & submit
function validateForm(form){
  let valid=true;
  const name=form.querySelector('[data-type="name"]');
  const phone=form.querySelector('[data-type="phone"]');
  const consent=form.querySelector('[data-type="consent"]');

  if(name){
    if(!name.value.trim()||name.value.trim().length<2){
      name.classList.add('error');
      valid=false;
    }else name.classList.remove('error');
  }
  if(phone){
    const digits=phone.value.replace(/\D/g,'');
    if(digits.length!==11){
      phone.classList.add('error');
      valid=false;
    }else phone.classList.remove('error');
  }
  if(consent){
    if(!consent.checked){
      consent.parentElement.style.color='#dc2626';
      valid=false;
    }else consent.parentElement.style.color='';
  }
  return valid;
}

function saveLead(data){
  let leads=[];
  try{leads=JSON.parse(localStorage.getItem('callpro_leads')||'[]')}catch(e){}
  leads.push(data);
  localStorage.setItem('callpro_leads',JSON.stringify(leads));
}

document.querySelectorAll('form[data-form]').forEach(function(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!validateForm(form))return;
    const btn=form.querySelector('[type="submit"]');
    const orig=btn.textContent;
    btn.disabled=true;
    btn.textContent='Отправляем...';
    const data={
      name:(form.querySelector('[data-type="name"]')||{}).value||'',
      phone:(form.querySelector('[data-type="phone"]')||{}).value||'',
      company:(form.querySelector('[data-type="company"]')||{}).value||'',
      email:(form.querySelector('[data-type="email"]')||{}).value||'',
      message:(form.querySelector('[data-type="message"]')||{}).value||'',
      source:form.dataset.form,
      timestamp:new Date().toISOString()
    };
    setTimeout(function(){
      saveLead(data);
      window.location.href='/thank-you.html';
    },600);
  });
});

// Init
document.addEventListener('DOMContentLoaded',function(){
  initPhoneMask();

  // Burger
  const burger=document.querySelector('.burger');
  const mobileNav=document.querySelector('.mobile-nav');
  if(burger&&mobileNav){
    burger.addEventListener('click',function(){
      mobileNav.classList.toggle('open');
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(function(q){
    q.addEventListener('click',function(){
      const item=q.closest('.faq-item');
      const wasOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open')});
      if(!wasOpen)item.classList.add('open');
    });
  });

  // Scroll animations
  const observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting)entry.target.classList.add('visible');
    });
  },{threshold:0.1});
  document.querySelectorAll('[data-animate]').forEach(function(el){observer.observe(el)});

  // Cookie banner
  if(!localStorage.getItem('callpro_cookie_accepted')){
    const banner=document.querySelector('.cookie-banner');
    if(banner)banner.classList.add('show');
  }
  const cookieBtn=document.querySelector('.cookie-accept');
  if(cookieBtn){
    cookieBtn.addEventListener('click',function(){
      localStorage.setItem('callpro_cookie_accepted','1');
      document.querySelector('.cookie-banner').classList.remove('show');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      const href=a.getAttribute('href');
      if(href.length>1){
        const target=document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
        }
      }
    });
  });
});
