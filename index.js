const form = document.getElementById('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');


form.addEventListener ('submit', e => {
    e.preventDefault();

    let firstName = fname.value.trim();
    let lastName = lname.value.trim();
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();

    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (firstName === ""){
        errorFunction (fname, "First Name cannot be empty");
    } else{
        successFunction(fname)
    }
    if (lastName === ""){
        errorFunction (lname, "Last Name cannot be empty")
    } else{
        successFunction(lname)
    }
    if (emailValue === ""){
        errorFunction (email, "Email cannot be empty")
    } else if(!emailValue.match(regex)){
        errorFunction (email, "Lokks like not an email")
    }
    else{
        successFunction(email)
    }
    if (passwordValue === ""){
        errorFunction (password, "Password cannot be empty")
    } else{
        successFunction(password)
    }
})

function errorFunction (req, message){
    const formControl = req.parentElement;
    const span = formControl.querySelector('span')
    span.innerText = message
    req.className += 'error'
    span.className += 'error-text'

    if (req !== email){
        req.value = ' '
    } else{
        req.style.color = "hsl(0, 100%, 74%)"
    }
}




