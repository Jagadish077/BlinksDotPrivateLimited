const bar = document.querySelector('.bar');

const toggle = () => {

    const nav = document.querySelectorAll('.nav-bar');

    nav.forEach(element => {
        element.classList.toggle('content')
    });
}

bar.addEventListener('click', toggle);


// chart
