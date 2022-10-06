const navList = document.querySelector('.nav__list'),
burger = document.querySelector('.header__burger'),
userimg = document.querySelector('.userimg'), 
userForm = document.querySelector('.UserBlock__Form'),
body = document.querySelector('body');
let flag = 0;
//last active menu
//1 - login
//2 - burgermenu
//3 - userinfo

userimg.addEventListener('click', ()=>{
    if(flag === 2){
       toggleBurger();
    }
    else if(flag === 1){
        flag = 0;
        body.classList.remove('activeted');
        toggleLoginForm();
        return;
    }
    body.classList.add('activeted');
    flag = 1;
    toggleLoginForm();
});
window.addEventListener('resize', ()=>{
    if(window.screen.width > 1000 ){
        if(burger.classList.contains('activeted') ){
            body.classList.remove('activeted');
            burger.classList.remove('activeted');
            navList.classList.remove('activeted');
            flag = 0;
        }
      
    }
})
burger.addEventListener('click', ()=>{
    if(flag === 1){
       toggleLoginForm();
    }
    else if(flag === 3 ){
        toggleUserInfo();
    }
    else if(flag === 2){
        toggleBurger();
        body.classList.remove('activeted');
        flag = 0;
        return;
        
    }
    body.classList.add('activeted');
    flag = 2;
    toggleBurger();
  
});