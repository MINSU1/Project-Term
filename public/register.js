var info = [];
var strInfo = "";
var username = document.getElementById("username");
//-----------------------------function----------------------
function errorTest(){
    if(parseInt(document.getElementById("day").value)>31 || parseInt(document.getElementById("year").value)>2010){
        alert("Wrong Brithday Input")
        return false;
    }else if (document.getElementById('username').value == ''){
        alert('Please fill out the form');
        return false;
    }else if (document.getElementById('password1').value == ''){
        alert('Please fill out the form');
        return false;
    }else if (document.getElementById('password2').value == ''){
        alert('Please fill out the form');
        return false;
    }else if (document.getElementById('first').value == ''){
        alert('Please fill out the form');
        return false;
    }else if (document.getElementById('last').value == ''){
        alert('Please fill out the form');
        return false;
    }else if (document.getElementById('address').value == ''){
        alert('Please fill out the form');
        return false;
    }else if (document.getElementById('city').value == ''){
        alert('Please fill out the form');
        return false;
    }else if (document.getElementById('zipcode').value == ''){
        alert('Please fill out the form');
        return false;
    }
    if(document.getElementById("password1").value != document.getElementById("password2").value){
        alert("These passwords don't match");
        return false;
    }
    if(username.value.indexOf(';') > -1){
        alert("You cannot use ';' for your username");
        return false;
    }
    if(username.value=="guest" || username.value=="Guest" ){
        alert("Username cannot be guest please use other")
        return false;
    }
    return true;
}
function login_submit(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/register_check", true);
    xmlhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            if(xmlhttp.responseText == "username invalid"){
                alert("Invalid username please use other username");
<<<<<<< HEAD
=======
            }else if(xmlhttp.responseText == "address invalid"){
                alert("Invalid address");
>>>>>>> 0ea407d2faa1f211ac5863b532387af15d094ec7
            }else if(xmlhttp.responseText == "valid"){
                console.log('login_submit valid');
                window.location ='/signin';
            }
        }
    }
    xmlhttp.send(`username=${document.getElementById("username").value}&password=${document.getElementById("password1").value}&address=${document.getElementById("address").value}&city=${document.getElementById("city").value}&zipcode=${document.getElementById("zipcode").value}`);
}
//------------------interaction-------------------------------
document.getElementById('submit').addEventListener('click',()=>{
    if(errorTest()){
        login_submit();
    }
});