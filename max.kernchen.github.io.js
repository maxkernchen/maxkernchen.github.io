// utilities
var get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

//static message for inputs.
var terminalMessage = 'maxkernchen@maxkernchen.github.io:./welcome.sh <br>' +  
  'Welcome to my page! On here you will find my recent projects & resume. '+
  'Feel free to contact me anytime! <br> ' +
  'maxkernchen@maxkernchen.github.io:';

  // message for typing characters one by one.
  var terminalMessageTyping = './welcome.sh <br>' +  
  'Welcome to my page! On here you will find my recent projects & resume. '+
  'Feel free to contact me anytime! <br>' +
  'Usage: <br> 1 - Navigate to Projects, 2 - Navigate to GitHub,' +
  '3 - Contact Information';


async function type(){

document.getElementById('hidden-input-field').disabled = true;

  var i = 0
  
  var speed = 30;

 for(i;i < terminalMessageTyping.length;i++){
 
    // need to add full break tag at once otherwise it won't be interpreted.
    if(terminalMessageTyping.charAt(i) == '<')        
    {
      document.getElementsByClassName('terminal-typing')[0].innerHTML += terminalMessageTyping.slice(i,i+5);
      i+=4;
    }
    else
    {
      document.getElementsByClassName('terminal-typing')[0].innerHTML += terminalMessageTyping.charAt(i);
    }
    
    await new Promise(r => setTimeout(r, speed));

 }

  if(i>=terminalMessageTyping.length)
  {
   
    // allow inputs after typing has finished.
    document.getElementById('hidden-input-field').disabled = false;
    document.getElementById('hidden-input-field').focus();
    document.getElementById('hidden-input-field').select();
    flashingCommand();
    

  }
  
}

type();

var toggle = false;
var stopFlashing = false;
var timeout = 0;
 function flashingCommand () {
    if(!stopFlashing){
      var tempString = document.getElementsByClassName('terminal-typing')[0].innerHTML;
      if(toggle)
      {
        tempString = tempString.substr(0,tempString.length -1);
        document.getElementsByClassName('terminal-typing')[0].innerHTML = tempString;
      }
      else
      {
        document.getElementsByClassName('terminal-typing')[0].innerHTML += '█';
      }
      
      
      toggle = !toggle;
      timeout = setTimeout(flashingCommand, 500)
      console.log("500ms?")  
    }
    // only need to remove flashing block character if we start typing.
    else if(!toggle){
      document.getElementsByClassName('terminal-typing')[0].innerHTML = tempString.substr(0,tempString.length -1);;
    }
  }
    
  
  
function typeCommands(){
  // add text to current terminal
  stopFlashing = true;
  document.getElementsByClassName('terminal-typing')[0].innerHTML = terminalMessageTyping + document.getElementById('hidden-input-field').value;
  stopFlashing = false;
  toggle = false;
  clearTimeout(timeout);
  flashingCommand();

}




//in page scrolling for project page
var btns = getAll('.js-btn');
var sections = getAll('.js-section');

function setActiveLink(event) {
  // remove all active tab classes
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('selected');
  }

  event.target.classList.add('selected');
}

function smoothScrollTo(element, event) {
  setActiveLink(event);

  window.scrollTo({
    'behavior': 'smooth',
    'top': element.offsetTop,
    'left': 0
  });
}

if (btns.length && sections.length > 0) {
// for (var i = 0; i<btns.length; i++) {
//   btns[i].addEventListener('click', function(event) {
//     smoothScrollTo(sections[i], event);
//   });
// }
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

  // adding one more menu item for smooth scroll

  btns[4].addEventListener('click', function (event) {
    smoothScrollTo(sections[4], event);
  });
}

// fix menu to page-top once user starts scrolling
window.addEventListener('scroll', function () {
  var docNav = get('.doc__nav > ul');

  if( docNav) {
    if (window.pageYOffset > 63) {
      docNav.classList.add('fixed');
    } else {
      docNav.classList.remove('fixed');
    }
  }
});
var input = document.getElementById('hidden-input-field');
// check for enter command for terminal
input.addEventListener('keyup',  async function(event) {
 if (event.key == 'Enter') {
  var inputTxt = document.getElementById('hidden-input-field').value;
  if(inputTxt == '1'){
    document.getElementsByClassName('terminal-typing')[0].innerHTML += '<br> Sending to Projects...'
    await new Promise(r => setTimeout(r, speed));
    window.location = 'projects.html';
  }
  else{
    document.getElementsByClassName('terminal-typing')[0].innerHTML += '<br> Invalid Input! Usage '
  }
}
});

// put focus back in input field when clicking on div for terminal
document.getElementsByClassName('terminal')[0]
        .addEventListener('click', function (event) {
          document.getElementById('hidden-input-field').focus();
          document.getElementById('hidden-input-field').select();
        });