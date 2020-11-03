var bars1 = document.querySelector('.bars');

bars1.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation();
    var navs1 = document.querySelector('.home-links-main');
        navs1.classList.toggle('content')
});

var logbtn = document.querySelector('.btn')

logbtn.addEventListener('click', (e) => {
    
    var inputlists = document.querySelectorAll('#input')
    inputlists.forEach(ele => {
        if(ele.value === "") {
            e.preventDefault()
            ele.classList.add('logerr')
        }else {
            ele.classList.remove('logerr')
        }
    })
})
