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
  'Usage: <br> Enter 1 - Navigate to Projects, 2 - Navigate to GitHub, ' +
  '3 - Contact Information:';

  // message for typing characters one by one.
  var terminalMessageTyping = './welcome.sh <br>' +  
  'Welcome to my page! On here you will find my recent projects & resume. '+
  'Feel free to contact me anytime! <br>' +
  'Usage: <br> Enter 1 - Navigate to Projects, 2 - Navigate to GitHub, ' +
  '3 - Contact Information:';

var typeSpeed = 30;
async function type(){

document.getElementById('hidden-input-field').disabled = true;

  var i = 0
  
  

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
    
    await new Promise(r => setTimeout(r, typeSpeed));

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
    
    }
    // only need to remove flashing block character if we start typing.
    else if(!toggle){
      document.getElementsByClassName('terminal-typing')[0].innerHTML = tempString.substr(0,tempString.length -1);;
    }
  }
    
  
  
function typeCommands(){
  // add text to current terminal
  stopFlashing = true;
  document.getElementsByClassName('terminal-typing')[0].innerHTML = terminalMessage + 
  document.getElementById('hidden-input-field').value;
  stopFlashing = false;
  toggle = false;
  clearTimeout(timeout);
  flashingCommand();

}
// transform email contact to actual email.
async function emailTransform(){
var emailTxt = 'x.f.kernchen@gmail.com';
//first remove uneeded chars
var slowerTypeSpeed = typeSpeed + 30;
await new Promise(r => setTimeout(r, slowerTypeSpeed + 100));
document.getElementById('email-contact').innerHTML = 'mail';
await new Promise(r => setTimeout(r, slowerTypeSpeed + 400));
document.getElementById('email-contact').innerHTML = 'mai';
await new Promise(r => setTimeout(r, slowerTypeSpeed+ 400));
document.getElementById('email-contact').innerHTML = 'ma';
//type remaining email
  for(i = 0;i < emailTxt.length;i++){
      document.getElementById('email-contact').innerHTML += emailTxt.charAt(i);
      await new Promise(r => setTimeout(r, slowerTypeSpeed));
    }
    
    
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
    stopFlashing = true;
    var inputTxt = document.getElementById('hidden-input-field').value;
    //3 maybe download resume?? TODO
    switch(inputTxt){
      case '1':
        document.getElementsByClassName('terminal-typing')[0].innerHTML += '<br> Sending to Projects...';
        await new Promise(r => setTimeout(r, 500));
        window.location = 'projects.html';        
        break;
      case '2':
        document.getElementsByClassName('terminal-typing')[0].innerHTML += '<br> Sending to GitHub...';
        await new Promise(r => setTimeout(r, 500));
        window.location = 'https://github.com/maxkernchen'; 
        break;
      default:
        document.getElementsByClassName('terminal-typing')[0].innerHTML += '<br> Invalid Input!';
        await new Promise(r => setTimeout(r, 1000));
  }

    //reset message and input
    document.getElementsByClassName('terminal-typing')[0].innerHTML = terminalMessage;
    document.getElementById('hidden-input-field').value = '';
    document.getElementById('hidden-input-field').focus();
    document.getElementById('hidden-input-field').select();
  
    // flash cursor again
    stopFlashing = false;
    toggle = false;
    clearTimeout(timeout);
    flashingCommand();
}
});

// put focus back in input field when clicking on div for terminal
document.getElementsByClassName('terminal')[0]
        .addEventListener('click', function (event) {
          document.getElementById('hidden-input-field').focus();
          document.getElementById('hidden-input-field').select();
        });

// email contact element clicked, change to actual email.
document.getElementById('email-contact')
        .addEventListener('click', function (event) {
          emailTransform();
        });