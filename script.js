/* Variables */
var form_details; //DOM element of the details form
var signDOM;
var primaColor; //Input element of primary color
var secondColor; //Input element of secondary color
var internCSS;

/* Initialisation */
window.onload = function(){

    //Get elements
    form_details = document.querySelector("#details");
    signDOM = document.querySelector("#emailSign");
    primaColor = document.querySelector("#primaColor");
    secondColor = document.querySelector("#secondColor");
    internCSS = document.styleSheets[1]

    //Listeners
    form_details.addEventListener('click', Transpose); //Click on send button in the details form
    primaColor.addEventListener('change',ChangeColors); //Change on the primary color input
    secondColor.addEventListener('change',ChangeColors); //Change on the secondary color input

    ChangeColors();
    Transpose();
};

/* Functions */

///Transposes data entered on the template
function Transpose(event){
    var inputsForm = form_details.querySelectorAll("input[type=text]");
    var signElement

    //Transpose every txt input to the corresponding element of th template
    inputsForm.forEach(element => {
        signElement = document.querySelector("#sign_"+element.getAttribute("id").substring(6));
        if (signElement !== null){ signElement.innerHTML = element.value; } //Verify if element exist on template
    });
}

///Change colors on the template
function ChangeColors(){
    internCSS.cssRules[0].style.color = primaColor.value;
    internCSS.cssRules[0].style.borderColor  = primaColor.value;
    internCSS.cssRules[1].style.color = secondColor.value;
}