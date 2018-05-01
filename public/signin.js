/** 
 * communicating with server.js 
 * @param {integer} validity change address input field to address summary
 */
function login_submit(validity){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/login_input", true);
	xmlhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = () => {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			if(xmlhttp.responseText == "invalid"){
				alert("Invalid Username or Password");
				document.getElementById('passInput').value = '';
			}
			else if(xmlhttp.responseText == "valid"){
				alert('Login Successful');
				window.location = '/';
			}
		}
	}
	xmlhttp.send(`id_input=${document.getElementById("idInput").value}&pass_input=${document.getElementById("passInput").value}&validity=${validity}`);
}

/** if loginBut is clicked, run function login_submit(1) */
document.getElementById("loginBut").addEventListener("click",()=>{
	login_submit(1);
});
/** if user press Enter key, run function login_submit(1) */
document.getElementById('idInput').addEventListener('keydown',(ev)=>{
	if(ev.keyCode == 13){
		login_submit(1);
	}
});

/** if user press Enter key, run function login_submit(1) */
document.getElementById('passInput').addEventListener('keydown',(ev)=>{
	if(ev.keyCode == 13){
		login_submit(1);
	}
});

/** if register link is clicked, go to /register and server will give the page to the user */
document.getElementById('register').addEventListener("click",()=>{
    window.location="/register";
});

/** if forget link is clicked, go to /findid and server will give the page to the user */
document.getElementById('forget').addEventListener("click",()=>{
    window.location="/findid";
});