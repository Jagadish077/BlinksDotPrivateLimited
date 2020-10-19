
    const form = document.querySelectorAll('.input');
    
    form.forEach(ele => {
        ele.addEventListener('click', (e) => {
            for (let index = 0; index < form.length; index++) {
                if(form[index].classList.contains('shadow')){
                    form[index].classList.remove('shadow')
                }
            }
            ele.classList.add('shadow')
            
    })
})
document.querySelector('.btn').addEventListener('click', (e) => {
    
    form.forEach(ele => {
        console.log(ele.id)
        if(ele.id.value === null || ele.value === "") {
            e.preventDefault()
            ele.classList.add('error')
        }else{
            ele.classList.remove('error')
        }
    })
})

