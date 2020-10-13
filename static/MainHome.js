var bars1 = document.querySelector('.bars');

// var toggle1 = () => {

    
// }

bars1.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation();
    var navs1 = document.querySelector('.home-links-main');
    console.log("clicked")
        navs1.classList.toggle('content')
});
