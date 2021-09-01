/* Variables */
var form_details; //DOM element of the details form
var signDOM

/* Initialisation */
window.onload = function(){

    //Get elements
    form_details = document.querySelector("#details");
    signDOM = document.querySelector("#emailSign");

    //Listeners
    form_details.addEventListener('click', Transpose);
};

/* Functions */

///Transposes input on the template
function Transpose(event){
    
    var inputsForm = form_details.querySelectorAll("input[type=text]");

    var signElement
    inputsForm.forEach(element => {

        signElement = document.querySelector("#sign_"+element.getAttribute("id").substring(6));
        if (signElement !== null){ 
            signElement.innerHTML = element.value;
            console.log("OK",element.getAttribute("id").substring(6))
        }else{
            console.log("NOK",element.getAttribute("id").substring(6))
        }
        
    });
}