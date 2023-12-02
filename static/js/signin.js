import { authenticationSubmit, togglePasswordView, displayServerErrorMessages, refreshTokenPageRedirection, clearForm, backendDomain } from "./module.js";



var signinPageLanguage = document.documentElement.lang;
var checkValidEmailOrPassword, verifyEmail, internalServerError;
switch (signinPageLanguage) {
    case "en":
        checkValidEmailOrPassword = "Please, check if you have correct email and password.";
        verifyEmail= "Please verify your email before sign in"
        internalServerError = "Internal server error, please try again later.";
        break;
    case "fr":
        checkValidEmailOrPassword = "Veuillez vérifier si votre adresse e-mail et votre mot de passe sont corrects.";
        verifyEmail = "Veuillez vérifier votre adresse e-mail avant de vous connecter";
        internalServerError = "Erreur interne du serveur, veuillez réessayer plus tard.";
        break;
    default:
        checkValidEmailOrPassword = "Please, check if you have correct email and password.";
        verifyEmail= "Please verify your email before sign in"
        internalServerError = "Internal server error, please try again later.";
}

// Protecting the page and redirecting the user to correct page depending on user status (signed in, or not signed in)
refreshTokenPageRedirection('./dashboard.html');

const signinForm = document.querySelector("#signin-form");

// Dynamically clears any server messages
clearForm(signinForm);

// Preventing default form submission, and fetch from the endpoint
authenticationSubmit(signinForm, fetchSignIn);

// Adding functioanlity to show password feature
const passwordIcon = document.querySelector("#show-password");
passwordIcon.addEventListener("click", () => {
    togglePasswordView("password", passwordIcon, "show-password-text");
});




// Calling backend API for sign in
async function fetchSignIn(signinData) {
  
    let apiUrl = `${backendDomain}/api/auth/signin`
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(signinData)
      });
      const data = await response.json();
      if(!response.ok){
        if(data.status == 401){
          displayServerErrorMessages('signin-form', checkValidEmailOrPassword);
        } else if(data.status == 403){
          displayServerErrorMessages('signin-form', verifyEmail);
        } else {
          displayServerErrorMessages('signin-form', `${data.status} + ${internalServerError}`)
        }
        throw data;

      } else {
        // If the user is successfully signed in, save user info in local storage
        localStorage.setItem('user', JSON.stringify(data));
        // and redirect the user to the dashboard page
        if(signinPageLanguage == 'en'){
          location.href = "./dashboard.html";
        } else {
          location.href = "./tableau.html";
        }
        
      }
  
    } catch (error) {
      console.error("Error fetching JSON data (Sign in):", error);
    }
  }