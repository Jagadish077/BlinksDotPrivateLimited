document.addEventListener('contextmenu',(e) => e.preventDefault())
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
        console.log
        if(ele.id.value === null || ele.value === "") {
            e.preventDefault()
            ele.classList.add('error')
        }else{
            ele.classList.remove('error')
        }
    })
})

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message');

document.querySelector('.btn').addEventListener('click', (e) => {
    if(firstname.value === "" || firstname.value.length < 3 || lastname.value === ""){
        e.preventDefault()
        firstname.classList.add('error')
    }else if(email.value === "" || email.value.length < 10){
        e.preventDefault()
        email.classList.add('error')
    }else if(isNaN(phone.value) || phone.value === "" ){
        e.preventDefault()
        phone.classList.add('error')
    }else if(message.value === "" || message.value.length <= 10){
        e.preventDefault()
        message.classList.add('error')
    }

})
const mess = document.querySelector('.error-message')
document.querySelector('.close').addEventListener('click', (e) => {
    e.preventDefault()
    mess.style.display = 'none'
   
})

setTimeout(() => {
    mess.style.display = 'none';

}, 4000)