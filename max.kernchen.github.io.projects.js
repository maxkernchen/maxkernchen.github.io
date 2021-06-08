// utilities
var get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

var scrollEvent;

//in page scrolling for project page
var btns = getAll('.js-btn');
var sections = getAll('.js-section');

function setActiveBtn(event) {
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('selected');
  }
  event.target.classList.add('selected');
}
function setActiveBtnScroll(btn) {
  
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('selected');
  }
  btn.classList.add('selected');
}

async function smoothScrollTo(element, event) {
  // remove scroll listener while smooth scrolling 
  window.removeEventListener('scroll', scrollListener);
  setActiveBtn(event);

  window.scrollTo({
    'behavior': 'smooth',
    'top': element.offsetTop,
    'left': 0
  });
  // add listner back after waiting for scroll
  await new Promise(r => setTimeout(r, 500));
  window.addEventListener('scroll', scrollListener);
}


if (btns.length && sections.length > 0) {
 
    btns[0].addEventListener('click', function (event) {
      smoothScrollTo(sections[0], event);
    });
  
    btns[1].addEventListener('click', function (event) {
      smoothScrollTo(sections[1], event);
    });
  
    btns[2].addEventListener('click', function (event) {
      smoothScrollTo(sections[2], event);
    });
  
    btns[3].addEventListener('click', function (event) {
      smoothScrollTo(sections[3], event);
    });
  
    btns[4].addEventListener('click', function (event) {
      smoothScrollTo(sections[4], event);
    }); 
    window.addEventListener('scroll',scrollListener);
  
  }

  function scrollListener(){
      
    if( window.pageYOffset < btns[0].offsetTop){
        setActiveBtnScroll(btns[0]);
    }
    else if (window.pageYOffset < btns[1].offsetTop){
      setActiveBtnScroll(btns[1]);
    }
    else if(window.pageYOffset < btns[2].offsetTop){
      setActiveBtnScroll(btns[2]);
    }
    else if( window.pageYOffset < btns[3].offsetTo){
      setActiveBtnScroll(btns[3]);
      
    }

    
     
      

  }

