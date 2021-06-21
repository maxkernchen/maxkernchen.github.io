
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

  // some booleans if user indvidually clicks on contact info and then loads them again
  // via terminal or menu link.
  var contactEmailLoaded = false;
  var contactPhoneLoaded = false;
  var contactLinkedInLoaded = false;

  // type speeds for text transformations.
  var typeSpeed = 30;
  var slowerTypeSpeed = typeSpeed + 50;
   // use this wait time to let the user see the text transformation.
  var slowestTypeSpeed = slowerTypeSpeed + 100;


async function type(){
let i = 0;
document.getElementById('hidden-input-field').disabled = true;
 for(;i < terminalMessageTyping.length;i++){
 
    // need to add full break tag at once otherwise it won't be interpreted.
    if(terminalMessageTyping.charAt(i) == '<')        
    {
      document.getElementsByClassName('terminal-typing')[0].insertAdjacentHTML('beforeend',
      terminalMessageTyping.slice(i,i+5));
      i+=4;
    }
    else
    {
      document.getElementsByClassName('terminal-typing')[0].insertAdjacentHTML('beforeend',
      terminalMessageTyping.charAt(i));
    }
    
    await new Promise(r => setTimeout(r, typeSpeed));

 }

  if(i >= terminalMessageTyping.length)
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
        document.getElementsByClassName('terminal-typing')[0].insertAdjacentHTML('beforeend', '█');
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
async function emailTransform(event){
  if(!contactEmailLoaded){
    let emailTxt = 'x.f.kernchen@gmail.com';
    //first remove uneeded chars

    let emailElement = document.getElementById('email-contact');
    // replace with anchor for mailto link
    emailElement.innerHTML = 
    '<a id="email-anchor" class="contact--item" href="mailto:max.f.kernchen@gmail.com"></a>';
    let emailAnchor = document.getElementById('email-anchor');
    await new Promise(r => setTimeout(r, slowestTypeSpeed));
    emailAnchor.innerHTML = 'mail';
    await new Promise(r => setTimeout(r, slowestTypeSpeed));
    emailAnchor.innerHTML = 'mai';
    await new Promise(r => setTimeout(r, slowestTypeSpeed));
    emailAnchor.innerHTML = 'ma';
  //type remaining email
    for(let i = 0;i < emailTxt.length;i++){
        
        emailAnchor.insertAdjacentHTML('beforeend', emailTxt.charAt(i));
        await new Promise(r => setTimeout(r, slowerTypeSpeed));
      }
    
    
    emailElement.removeEventListener('click', emailTransform);
    contactEmailLoaded = true;
    return Promise.resolve('email contact transformed');
    
  }
}

// transform phone text to actual phone number
async function phoneTransform(){
  if(!contactPhoneLoaded){
    let phoneTxt = '4-728-6806';
    
  
    let phoneElement = document.getElementById('phone-contact')
    phoneElement.innerHTML = 
    '<a id="phone-anchor" class="contact--item" href="tel:7047286806"></a>';

    let phoneAnchor = document.getElementById('phone-anchor');
    await new Promise(r => setTimeout(r, slowestTypeSpeed));
    phoneAnchor.innerHTML = 'hone';
    await new Promise(r => setTimeout(r, slowestTypeSpeed));
    phoneAnchor.innerHTML = 'one';
    await new Promise(r => setTimeout(r, slowestTypeSpeed));
    phoneAnchor.innerHTML = 'oe';
    await new Promise(r => setTimeout(r, slowestTypeSpeed));
    phoneAnchor.innerHTML = '0';
    await new Promise(r => setTimeout(r, slowestTypeSpeed));
    phoneAnchor.innerHTML = '70';
    
    for(let i = 0;i < phoneTxt.length;i++){
        phoneAnchor.insertAdjacentHTML('beforeend', phoneTxt.charAt(i));
        await new Promise(r => setTimeout(r, slowerTypeSpeed));
      }
    // remove listener as we don't want be clickable again.
    phoneElement.removeEventListener('click',phoneTransform);
    contactPhoneLoaded = true;
   return Promise.resolve('phone contact transformed');
  }
}
// transform linkedin text to full linkedin page.
async function linkedinTransform(){
  if(!contactLinkedInLoaded){
    let linkedinTxt = '.com/in/maxkernchen/'
    

    let linkedinElement = document.getElementById('linkedin-contact')
    linkedinElement.innerHTML = 
    '<a id="linkedin-anchor" class="contact--item"'+
    'href="https://www.linkedin.com/in/maxkernchen/"></a>'; 
    // dont need to remove any text here just adding.
    let linkedinAnchor = document.getElementById('linkedin-anchor');
    linkedinAnchor.innerHTML = 'linkedin';
    

    for(let i = 0;i < linkedinTxt.length;i++){
      linkedinAnchor.insertAdjacentHTML('beforeend', linkedinTxt.charAt(i));
        await new Promise(r => setTimeout(r, slowerTypeSpeed));
      }
      
      linkedinElement.removeEventListener('click',linkedinTransform);
      contactLinkedInLoaded = true;
      return Promise.resolve('linkedin contact transformed');
  }
}




function smoothScrollToEle(element) {

  window.scrollTo({
    'behavior': 'smooth',
    'top': element.offsetTop,
    'left': 0
  });
}


//helper method to reset the terminal after user input
function resetTerminalAfterInput(){
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

var input = document.getElementById('hidden-input-field');
// check for enter command for terminal
input.addEventListener('keyup',  async function(event) {
 if (event.key == 'Enter') {
    stopFlashing = true;
    let inputTxt = document.getElementById('hidden-input-field').value;
    // boolean for not calling reset terminal if we are waiting on a promise to complete.
    let inPromise = false;
    //3 maybe download resume?? TODO
    switch(inputTxt){
      case '1':
        document.getElementsByClassName('terminal-typing')[0].insertAdjacentHTML('beforeend', '<br> Sending to Projects...');
        await new Promise(r => setTimeout(r, 500));
        window.location = 'projects.html';        
        break;
      case '2':
        document.getElementsByClassName('terminal-typing')[0].insertAdjacentHTML('beforeend', '<br> Sending to GitHub...');
        await new Promise(r => setTimeout(r, 500));
        window.location = 'https://github.com/maxkernchen'; 
        break;
      case '3':
        // check to see if we already loaded all 3 contact elements
        if(contactPhoneLoaded && contactEmailLoaded && contactLinkedInLoaded){
          document.getElementsByClassName('terminal-typing')[0].insertAdjacentHTML('beforeend', '<br> Contact Information Already Loaded!');
          await new Promise(r => setTimeout(r, 1000));
        }
        else{
          inPromise = true;
          document.getElementsByClassName('terminal-typing')[0].insertAdjacentHTML('beforeend', '<br> Loading Contact Information...');
          let promise = new Promise(function(resolve, reject) {
            resolve(transformAllContactInfo());
          }).then(function(result) {
            console.log(result + 'in term input');
            resetTerminalAfterInput();
          });
        }
        break;
      default:
        document.getElementsByClassName('terminal-typing')[0].insertAdjacentHTML('beforeend', '<br> Invalid Input!');
        await new Promise(r => setTimeout(r, 1000));
  }
  // dont reset if we are waiting for promises to finish.
  if(!inPromise){
    resetTerminalAfterInput();
  }
 }
});

  // use a promise to wait for each function to finish before calling the next
  // transform all 3 contacts sequentially 
   async function transformAllContactInfo(){
     smoothScrollToEle(document.getElementById('container--contact'));
    return new Promise(function(resolve, reject) {
      resolve(emailTransform());    
    }).then(function(result) {
      //console.log(result);
      return phoneTransform(); 
    }).then(function(result){
     // console.log(result);
      return linkedinTransform();
    }).then(function(result){
     // console.log(result);
      return Promise.resolve('transformed all contacts');
    });
   
  }


  function toggleMenu(){
      let menuList = document.getElementById('menu-list');
      menuList.classList.toggle('showing');   
  }

// put focus back in input field when clicking on div for terminal
document.getElementsByClassName('terminal')[0]
        .addEventListener('click', function (event) {
          document.getElementById('hidden-input-field').focus();
          document.getElementById('hidden-input-field').select();
        });

// email contact element clicked, change to actual email.
document.getElementById('email-contact').addEventListener('click', emailTransform);
// phone contact element clicked, change to actual phone number.
document.getElementById('phone-contact').addEventListener('click', phoneTransform);
// linkedin contact element clicked, change to full linkedin page.
document.getElementById('linkedin-contact').addEventListener('click', linkedinTransform);
// menu item for contact info, will smooth scroll and activate methods to transform contact info
document.getElementById('contact-menu').addEventListener('click', transformAllContactInfo);
// call function to add/remove classes for collapsed menu
document.getElementById('collapsed-menu').addEventListener('click', toggleMenu);
// when window is resized to > 800 we want to remove the showing class if it still exists
// otherwise menu will still be opened when sized down to mobile view
window.addEventListener('resize', function(event){
   if(window.innerWidth > 1080){
   document.getElementById('menu-list').classList.remove('showing');
   }
});