/* Variables */
var form_details; //DOM element of the details form
var signDOM;
var internCSS;

/* Initialisation */
window.onload = function(){

    //Get elements after load
    form_details = document.querySelector("#details");
    signDOM = document.querySelector("#emailSign");
    internCSS = document.styleSheets[1];

    document.querySelectorAll('input').forEach(eleminput => {
        eleminput.addEventListener('change',()=>{Transpose(eleminput)}) //Add on change listener for execute Transpose function
        Transpose(eleminput); //Execute transpose for the browser cache management with inputs save
    });

    document.querySelectorAll('.inputReset').forEach(cross => { cross.addEventListener('click',() => { //At the click on every input reset cross, reset previus input
        cross.previousSibling.value=null;
        Transpose(cross.previousSibling);
    })});

    document.querySelector('#btn_copy').addEventListener('click',CopySignature); //At the click on the copy button

};

/* Functions */


//Transposes data entered on the template
/*param :
 - element : current input element 
*/
function Transpose(element){
    
    var parentElement = element.parentElement.parentElement;
    var signElement = document.querySelector("#sign_"+parentElement.id.substring(6)); //Get the corresponding template element of the current input

    if(element.type!='color' & signElement==null){return} //Verifies exist

    switch(true){
        case parentElement.classList.contains("sm-sn"): //Social networks
            if (element.value == '') {signElement.parentElement.hidden = 1;}
            else {signElement.parentElement.hidden = 0;}

            signElement.href=element.value;
            break;

        //Change the HTML syntaxe
        case parentElement.classList.contains("sm-txt") :

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
                
                case "input_phoneMobile":
                case "input_phoneOffice":
                    signElement.innerHTML = '<a href="tel:'+element.value+'">'+element.value+'</a>';
                    break;

                default :
                    signElement.innerHTML = element.value; //Transpose text
            }
            break;

        //Upload image
        case parentElement.classList.contains("sm-img") :
            //Verifies that an image is selected and show it
            if(element.value == '') { //Hide it
                signElement.hidden = 1;
                signElement.parentElement.parentElement.nextElementSibling.hidden = 1;
            }                
            else{ //Show it
                signElement.hidden = 0;
                signElement.parentElement.parentElement.nextElementSibling.hidden = 0;
                signElement.src = element.value;//Upload image
            }
            
            break;
        
        //Change intern CSS color values
        case parentElement.classList.contains("sm-col") :
            switch (parentElement.id){
                case "primaColor" :
                    document.querySelectorAll(".primaColor").forEach(elem => {elem.style.color = element.value}); //Change font color of each element with primaColor Class
                    document.querySelectorAll(".primaBorder").forEach(elem => {elem.style.borderColor = element.value}); //Change border color of each element with primaBorder Class
                    break;
                case "secondColor" :
                    document.querySelectorAll(".secondColor").forEach(elem => {elem.style.color = element.value}); //Change font color of each element with secondColor Class
                    break;
            }
            break;
    }
}

/*
 * Copy the email signature in the clipboard
 */
function CopySignature(){
    var elem = document.querySelector('#emailSign'); //Get the div with email signature
    var range = document.createRange();
    var selection = window.getSelection();


    //Add the div in the selection
    range.selectNode(elem);
    selection.removeAllRanges();
    selection.addRange(range);
    
    //Write in the clipboard
    try{
        var result = document.execCommand('copy');
        if(result){alert("The signature has been copied");}
    }catch(err){
        alert(err);
    }
}