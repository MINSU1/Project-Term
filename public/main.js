/**
 * topButClass = shortcut for document.getElementsByClassName('top_but')
 * global variable address that store address information
 */
var topButClass = document.getElementsByClassName('top_but');
var address = '';
var popup = document.getElementById('popup_display');
var popup_close = document.getElementById('popup_close');
var counter = 0;


console.log(`{{{reviews}}}`);
//--------------------------------contact map-----------------------------------------------
/** 
 * initialize google map from the latitude and longitude
 */
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 49.283387, lng: -123.115097 },
        zoom: 15
    });
    var messagebox = new google.maps.InfoWindow({ map: map });

    var marker = new google.maps.Marker({
          position: { lat: 49.283387, lng: -123.115097 },
          map: map,
          title: '2K!'
        });


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        }, ()=> {
            handleLocationError(true, messagebox, map.getCenter());
        });
    } else {
        handleLocationError(false, messagebox, map.getCenter());
    }
}

/** 
 * Check whether input field is empty or not 
 * @returns {boolean}
 */
function address_no_empty(){
	if(document.getElementById("address_input").value == ''){
		alert("Please enter address");
		return false;
	}else if(document.getElementById("city_input").value == ''){
		alert("Please enter city");
		return false;
	}else if(document.getElementById("zip_input").value == ''){
		alert("Please enter Postal Code");
		return false;
	}else{
		return true;
	}
}

/** 
 * communicating with server.js 
 * @param {integer} validity change address input field to address summary
 */
function address_check(validity){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/address_check", true);
	xmlhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = () => {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			if(xmlhttp.responseText == "invalid"){
				alert("invalid address.\nPlesae enter again");
			}
			else if(xmlhttp.responseText == "valid"){
				alert('Found the matching address!');
				location.reload();
			}else if(xmlhttp.responseText == "reload"){
				location.reload();
			}
		}
	}
	xmlhttp.send(`address=${address}&validity=${validity}`);
}

/** display the block associated with the clicked element */
for (var ind = 0; ind < topButClass.length; ind++){
	document.getElementById(topButClass[ind].id).addEventListener('click',(ev)=>{
        if (ev.target.id != 'review') {
		document.getElementById('contact_display').style.display = 'none'
		document.getElementById('about_display').style.display = 'none'
		document.getElementById('main_display').style.display = 'none'
		document.getElementById(ev.target.id + '_display').style.display='block';
        }
	});
};

/** when address_submit button is clicked, change global address variable and check if address input is empty */
document.getElementById("address_submit").addEventListener("click",()=>{
	address = String(document.getElementById('address_input').value) +', '+ String(document.getElementById('city_input').value) +', '+ 'BC' + ', CA'
	if(address_no_empty()){
		address_check(1);
	}
});

 /** when enter key is pressed on address_input, change global address variable and check if address input is empty  */
document.getElementById("address_input").addEventListener('keydown',(ev)=>{
	address = String(document.getElementById('address_input').value) +', '+ String(document.getElementById('city_input').value) +', '+ 'BC' + ', CA'
	if(ev.keyCode == 13 && address_no_empty()){
		address_check(1);
	}
});


document.getElementById("review").addEventListener("click", ()=>{
	window.location = "/review";
})

/** go to /signin when login_submit button is clicked */
document.getElementById('login_submit').addEventListener('click',()=>{
	window.location ='/signin';
});

/** change address feature */
document.getElementById('re_address').addEventListener('click',()=>{
	address_check(0);
});

document.getElementById('review').addEventListener('click',()=>{
	window.location="/review";
});

/** goto /location page when next_submit button is clicked */
document.getElementById('next_submit').addEventListener('click',()=>{
	window.location="/location";
});

window.addEventListener('load', function() {
	popup.style.opacity = 1;
});

popup_close.addEventListener('click', function(){

	popup.style.opacity = -50;
	setTimeout(function(){
		popup.style.display = "none"
	}, 1500)
});