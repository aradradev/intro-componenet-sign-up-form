// const form = document.getElementById('form');
// const fname = document.getElementById('fname');
// const lname = document.getElementById('lname');
// const email = document.getElementById('email');
// const password = document.getElementById('password');


// form.addEventListener ('submit', e => {
//     e.preventDefault();

//     let firstName = fname.value.trim();
//     let lastName = lname.value.trim();
//     let emailValue = email.value.trim();
//     let passwordValue = password.value.trim();

//     let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//     if (firstName === ""){
//         errorFunction (fname, "First Name cannot be empty");
//     } else{
//         successFunction(fname)
//     }
//     if (lastName === ""){
//         errorFunction (lname, "Last Name cannot be empty")
//     } else{
//         successFunction(lname)
//     }
//     if (emailValue === ""){
//         errorFunction (email, "Email cannot be empty")
//     } else if(!emailValue.match(regex)){
//         errorFunction (email, "Lokks like not an email")
//     }
//     else{
//         successFunction(email)
//     }
//     if (passwordValue === ""){
//         errorFunction (password, "Password cannot be empty")
//     } else{
//         successFunction(password)
//     }
// })

// function errorFunction (req, message){
//     const formControl = req.parentElement;
//     const span = formControl.querySelector('span')
//     span.innerText = message
//     req.className += 'error'
//     span.className += 'error-text'

//     if (req !== email){
//         req.value = ' '
//     } else{
//         req.style.color = "hsl(0, 100%, 74%)"
//     }
// }

const form = document.querySelector("form");
const inputs = form.querySelectorAll("input[aria-describedby]");
const alerts = form.querySelectorAll("p[aria-live]");

const preventNativeFormValidation = () => {
    form.setAttribute("novalidate", "");
  };
  
  document.addEventListener("DOMContentLoaded", preventNativeFormValidation);

  form.addEventListener("submit", validateForm);
  const validateForm = (event) => {
    clearAllAlerts();
    const isFormValid = checkAllInputs();
    if (!isFormValid) {
      event.preventDefault();
    }
  };

  const clearAllAlerts = () => {
    alerts.forEach((alert) => (alert.textContent = ""));
    inputs.forEach((input) => input.removeAttribute("aria-invalid"));
  };

  const checkAllInputs = () => {
    let isNameFilled = false;
    let isEmailFilled = false;
    let isEmailValid = false;
  
    inputs.forEach((input) => {
      const name = input.name;
      const value = input.value;
      switch (name) {
        case "name":
          isNameFilled = isInputFilled(input, value);
          break;
        case "email":
          isEmailFilled = isInputFilled(input, value);
          if (isEmailFilled) {
            isEmailValid = validateEmail(input, value);
          }
          break;
        default:
          console.error(`${name} input doesn't exist`);
      }
    });
  
    const areAllInputsValid = isNameFilled && isEmailFilled && isEmailValid;
    return areAllInputsValid;
  }

    const isInputFilled = (input, value) => {
        const isFilled = Boolean(value);
        if (isFilled === false) {
          handleAlert(input, `This ${input.name} input is required`);
        }
        return isFilled;
      };

      const handleAlert = (input, message) => {
        alerts.forEach((alert) => {
          const inputAlertID = input.getAttribute("aria-describedby");
          const alertID = alert.id;
          if (inputAlertID === alertID) {
            showAlertMessage({ input, alert, message });
          }
        });
      };
      const showAlertMessage = ({ input, alert, message }) => {
        alert.textContent = message;
        input.setAttribute("aria-invalid", "true");
      };

      const validateEmail = (input, email) => {
        const emailValidation =
          /^(?:[a-z0-9.]){2,30}@(?:[a-z0-9-]){2,30}\.(?:[a-z0-9]){2,3}(?:\.(?:[a-z0-9]){2,3})?$/;
        const isValid = emailValidation.test(email);
        if (!isValid) {
          handleAlert(input, "Please provide a valid email address");
        }
        return isValid;
      }



      