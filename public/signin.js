//------------------------variable-------------------------------------

//------------------------------function-----------------------
function login_submit(validity){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/login_input", true);
	xmlhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = () => {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			if(xmlhttp.responseText == "invalid"){
				swal("Invalid Username or Password", {icon: "error"});
				document.getElementById('passInput').value = '';
			}
			else if(xmlhttp.responseText == "valid"){
				swal('Login Successful', {icon: "success"}).then ((value) => {
                    if (value == true) {
                        window.location = '/';
                    };
                });
			}
		}
	}
	xmlhttp.send(`id_input=${document.getElementById("idInput").value}&pass_input=${document.getElementById("passInput").value}&validity=${validity}`);
}

//-----------------------------interaction----------------------
document.getElementById("loginBut").addEventListener("click",()=>{
	login_submit(1);
});
document.getElementById('idInput').addEventListener('keydown',(ev)=>{
	if(ev.keyCode == 13){
		login_submit(1);
	}
});
document.getElementById('passInput').addEventListener('keydown',(ev)=>{
	if(ev.keyCode == 13){
		login_submit(1);
	}
});

document.getElementById('register').addEventListener("click",()=>{
    window.location="/register";
});
document.getElementById('forget').addEventListener("click",()=>{
    swal("Did you forget your Password or Username?", {icon: "info"}).then(() => {
        window.location="/findid";
    })
});

//logo links back to home
document.getElementById("logo").addEventListener("click",()=>{
	window.location = "/";
});