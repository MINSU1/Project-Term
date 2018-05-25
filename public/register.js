var info = [];
var strInfo = "";
var username = document.getElementById("username"),
    qClass = document.getElementsByClassName('q');
//-----------------------------function----------------------
function errorTest(){
    for (var i = 0; i < qClass.length; i++){
        if (qClass[i].value == ""){
            swal("Please fill out the form", {icon:"info"});
            return false;
            break;
        }
    };
    
    if(document.getElementById("password1").value != document.getElementById("password2").value){
        swal("These passwords don't match", {icon:"error"});
        return false;
    };
    
    if(parseInt(document.getElementById("day").value)>31 || parseInt(document.getElementById("year").value)>2010){
        swal("Wrong Brithday Input", {icon: "error"});
        return false;
    };
    
    if(username.value.indexOf(';') > -1){
        swal("You cannot use ';' for your username", {icon:"error"});
        return false;
    };
    
    if(username.value=="guest" || username.value=="Guest" ){
        swal("Username cannot be guest please use other", {icon:"error"});
        return false;
    };
    
    return true;
}

function login_submit(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/register_check", true);
    xmlhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            if(xmlhttp.responseText == "username invalid"){
                swal("Invalid username please use other username", {icon:"error"});
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