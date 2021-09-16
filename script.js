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
    internCSS = document.styleSheets[1];

    //Listeners
    document.querySelectorAll('input').forEach(eleminput => {eleminput.addEventListener('change',()=>{Transpose(eleminput)})});//At the changement of an input value, execute Transpose
    document.querySelectorAll('.inputReset').forEach(cross => { cross.addEventListener('click',() => { //At the click on every input reset cross, reset previus input
        cross.previousSibling.value=null;
        Transpose(cross.previousSibling);
    })});

};

/* Functions */


//Transposes data entered on the template
/*param :
 - element : current input element 
*/
function Transpose(element){
    
    var parentElement = element.parentElement.parentElement;
    var signElement = document.querySelector("#sign_"+parentElement.id.substring(6)); //Get the corresponding template element of the current input

    if (signElement == null) {return;} //Pass if element noexistent in 

    //Different execution according to the input type
    switch(element.type){
        
        //Change the HTML syntaxe
        case "text" :

            //Hide if empty or show it
            if (element.value == '') {signElement.hidden = 1;}
            else {signElement.hidden = 0;}

            //Put link if necessery
            switch(parentElement.id){
                case "input_website":
                    signElement.innerHTML = '<a href="https://'+element.value+'">'+element.value+'</a>';
                    break;

                case "input_email":
                    signElement.innerHTML = '<a href="mailto:'+element.value+'">'+element.value+'</a>';
                    break;
                
                case "input_phoneMobile","input_phoneOffice":
                    signElement.innerHTML = '<a href="tel:'+element.value+'">'+element.value+'</a>';
                    break;

                default :
                    signElement.innerHTML = element.value; //Transpose text
            }
            break;

        //Upload image
        case "file" :

            //Verifies that an image is selected and show it
            if(element.files.length==0){ 
                signElement.hidden = 1;                    
            }else{
                signElement.hidden = 0;
                
                //Upload image in base64
                const img = signElement; //In a constant because readAsDataURL is asynchrone function.
                const reader = new FileReader();
                const file = element.files[0];
                reader.readAsDataURL(file);
                reader.onload = function(e) {img.src = reader.result;}; //Show the img at the end of the loading because readAsDataURL function is asynchrone
            }
            
            break;
        
        //Change intern CSS color values
        case "color":
            internCSS.cssRules[0].style.color = primaColor.value;
            internCSS.cssRules[0].style.borderColor = primaColor.value;
            internCSS.cssRules[1].style.color = secondColor.value;
            break;
    }
}