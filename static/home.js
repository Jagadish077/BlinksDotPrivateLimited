var logbtn = document.querySelector('#btn')
var passfield = document.querySelector('.password')
var logerr = document.querySelector('.errmessage');
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
    if(isNaN(passfield.value)) {
        e.preventDefault()
        passfield.classList.add('logerr')
        const errmessages = document.createElement('p');
        const location = document.querySelector('.err-mess')
        location.appendChild(errmessages)
        errmessages.innerHTML = "password should be numbers";
    }else{
        passfield.classList.remove('logerr')
    }
})
