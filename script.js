const requestLine = document.querySelector('.userBlock__request'),
form = document.querySelector('.UserBlock__Form'),
formbtn = document.querySelector('.formbtn');
[password,email] = [document.querySelector('#pas'),document.querySelector('#em')];

const quitBt = document.querySelector('.userInfo__quitBtn');

[userAvatar,
    userName,
    userEmail,
    userPassword,
    userBalance,
    userImage] =
[document.querySelector('.userAvatar'),
document.querySelector('.userInfo__name'),
document.querySelector('.userInfo__email'),
document.querySelector('.userInfo__password'),
document.querySelector('.userInfo__balance'),

document.querySelector('.userinfo__image')];

const userInfo = document.querySelector('.header__userInfo');


window.addEventListener('load',()=>{
    if(checkLocalStorage() === undefined){return};
    body.classList.add('activeted');
    const lastUser = JSON.parse(window.localStorage['user']);
    goUser(new Array(lastUser));
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    authorization(email.value,password.value);
});

quitBt.addEventListener('click', ()=>{
    clearInformation();
    toggleForm("closed");
});

userAvatar.addEventListener('click', ()=>{
    if(flag === 2){
        toggleBurger();
    }
    if(flag === 3) {
        body.classList.add('activeted');
        flag = 0;
        toggleUserInfo();
        return;
    }
    body.classList.remove('activeted');
  
    flag = 3;
   toggleUserInfo();
})


function authorization(email,password){
    fetch(`http://localhost:3000/usersData?email=${email}&password=${password}`)
    .then(response => response.json())
    .then(user => {
        goUser(user);
        setLocaleStorage(user);
    })
    .catch(err => showBadReq(err));
}
function showBadReq(text){
    requestLine.innerHTML = text;
    requestLine.classList.add('hidden');

    const timer = setTimeout(() =>{
        requestLine.classList.remove('hidden');
        clearTimeout(timer);
    },6000);
    

}
function goUser(array){
    if(!array.length){
        showBadReq("Login or password is incorrect");
        return;
    }
    flag = 3;
    setInformation(array);
    toggleForm("open");
    
}

function setInformation(array){
    const user = array[0];
    userName.innerHTML = 'name: ' + user.name;
    userEmail.innerHTML = 'email: ' +  user.email;
    userPassword.innerHTML = 'password: ' +  user.password;
    userBalance.innerHTML = user.balance;
    userAvatar.style.backgroundImage = `url(${user.avatar})`;
    userImage.style.backgroundImage = `url(${user.avatar})`;
}
function clearInformation(){
    localStorage.removeItem("user");
    userName.innerHTML = "";
    userEmail.innerHTML = "";
    userPassword.innerHTML = "";
    userBalance.innerHTML = "";
    userAvatar.style.backgroundImage = "";
    userImage.style.backgroundImage= ``;
}

function toggleForm(toggle){
    flag = 0;
    if(toggle === "open"){
        //show userinfo
        userimg.classList.add('hiddenBlock');
        userAvatar.classList.remove('hiddenBlock');
        form.classList.add('hiddenBlock');
         form.classList.remove('activeted');
        // userInfo.classList.add('activeted');
        userAvatar.classList.remove('hidenBlock');
        return;
    }
    //show login
    userimg.classList.remove('hiddenBlock');
    userAvatar.classList.remove('activeted');
    userAvatar.classList.add('hiddenBlock');
    form.classList.remove('hiddenBlock');
    // form.classList.add('activeted');
    userInfo.classList.remove('activeted');
    userAvatar.classList.add('hidenBlock');
    
}

function toggleLoginForm(){
    userForm.classList.toggle('activeted');
    userimg.classList.toggle('activeted');
}
function toggleBurger(){
    burger.classList.toggle('activeted');
    navList.classList.toggle('activeted');
}
function toggleUserInfo(){
    userInfo.classList.toggle('activeted');
    userAvatar.classList.toggle('activeted');
    body.classList.toggle('activeted');
}

function setLocaleStorage(array){
    const user = array[0];
    localStorage["user"] = JSON.stringify(user);
}
function clear(){
    localStorage.removeItem("user");
}
function checkLocalStorage(){
    return localStorage.getItem("user") ? localStorage["user"] : undefined;
}