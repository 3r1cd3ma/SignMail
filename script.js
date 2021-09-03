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
    document.querySelector('#confirm').addEventListener('click', Transpose); //Click on send button in the details form
    document.querySelectorAll('.inputReset').forEach(cross => { cross.addEventListener('click',() => {cross.previousSibling.value=null;})}); //At the click on every input reset cross, reset previus input
};

/* Functions */

///Transposes data entered on the template
function Transpose(){

    var signElement; //Template current element

    //Transpose every inputs to the corresponding element of the template
    form_details.querySelectorAll("input").forEach(element => {

        //Get the corresponding template element of the current input
        signElement = document.querySelector("#sign_"+element.id.substring(6));
        if (signElement == null) {return;} //Move to the next element if noexistent

        //Different execution according to the input type
        switch(element.type){
            
            //Change the HTML syntaxe
            case "text" :  

                //Hide if empty or show it
                if (element.value == '') {signElement.hidden = 1;
                }else{signElement.hidden = 0;}

                signElement.innerHTML = element.value; //Transpose text
                
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
    });
}