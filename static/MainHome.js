var bars1 = document.querySelector('.bars');

bars1.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation();
    var navs1 = document.querySelector('.home-links-main');
        navs1.classList.toggle('content')
});
