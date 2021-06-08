
var btns = document.getElementsByClassName('project-btn');
var sections = document.getElementsByClassName('project-section');

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

function smoothScrollTo(element, event) {
 
  setActiveBtn(event);

  window.scrollTo({
    'behavior': 'smooth',
    'top': element.offsetTop
  });

}
// add listeners for aside clicks
for(var i = 0;i < btns.length && i < sections.length;i++ ){
  let btnTemp = btns[i];
  let sectionTemp = sections[i];
  btnTemp.addEventListener('click', function (event) {
    smoothScrollTo(sectionTemp, event);
  });
}
 
// change links on aside when scrolling
function scrollListener(){
  
  if(window.scrollY < sections[0].offsetTop + sections[0].scrollHeight){
      setActiveBtnScroll(btns[0]);     
  }
  else if(window.scrollY < sections[1].offsetTop + sections[1].scrollHeight){
    setActiveBtnScroll(btns[1]);    
  }
  else if(window.scrollY < sections[2].offsetTop + sections[2].scrollHeight){
    setActiveBtnScroll(btns[2]);    
  } 
  else if( window.scrollY < sections[3].offsetTop + sections[3].scrollHeight
        && !(window.innerHeight + window.scrollY >= document.body.offsetHeight)){
    setActiveBtnScroll(btns[3]);
  }
  //bottom of page 
  else{
    setActiveBtnScroll(btns[4]);
  }
} 

window.addEventListener('scroll',scrollListener);

