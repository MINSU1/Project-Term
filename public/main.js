/**
 * topButClass = shortcut for document.getElementsByClassName('top_but')
 * global variable address that store address information
 */
var topButClass = document.getElementsByClassName('nav-link');
var address = ''
var popup = document.getElementById('popup_display');
var popup_close = document.getElementById('popup_close');
var counter = 0;

//--------------------------------contact map-----------------------------------------------
/** 
 * initialize google map from the latitude and longitude
 */
 document.getElementById("main").addEventListener("click",()=>{
	window.location = "/";
});
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
		swal("Please enter address", {icon:"info"});
		return false;
	}else if(document.getElementById("city_input").value == ''){
        swal("Please enter city", {icon:"info"});
		return false;
	}else if(document.getElementById("zip_input").value == ''){
		swal("Please enter Postal Code", {icon:"info"});
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
				swal("Invalid address", "Please enter again", {icon:"error"});
			}else if(xmlhttp.responseText == "valid"){
				swal('Valid address',"Found the matching address!", {icon:"success"}).then(() => {
                    location.reload();
                });
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
        if (ev.target.id != 'review' && ev.target.id != 'career') {
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

/** go to /signin when login_submit button is clicked */
document.getElementById('login_submit').addEventListener('click',()=>{
	window.location ='/signin';
});

/** change address feature */
document.getElementById('re_address').addEventListener('click',()=>{
	address_check(0);
});

//Links to review page
document.getElementById('review').addEventListener('click',()=>{
	window.location="/review";
});

//Links to career page
document.getElementById('career').addEventListener('click',()=>{
	window.location="/career";
});

/** goto /location page when next_submit button is clicked */
document.getElementById('next_submit').addEventListener('click',()=>{
	document.getElementById('myForm').submit()
});


//Changes pop up news opacity when page loads
window.addEventListener('load', function() {
	popup.style.opacity = 1;
});

//----scroll down- faded---//
popup_close.addEventListener('click', function(){
	popup.style.opacity = -50;
	setTimeout(function(){
		popup.style.display = "none"
	}, 1500)
});

// //-----change the color of the box----
document.getElementById('address_submit').addEventListener("click",function(){
 	if(document.getElementById('address_input').value== ''){
 		document.getElementById('address_input').style.backgroundColor="rgb(246,220,220)";
 	}else{
 		document.getElementById('address_input').style.backgroundColor=" ";
 	}
 	if(document.getElementById('city_input').value == ''){
 		document.getElementById('city_input').style.backgroundColor = "rgb(246,220,220)";
 		}else{
 			document.getElementById('city_input').style.backgroundColor=" ";
 		}
 	if(document.getElementById('zip_input').value ==''){
 		document.getElementById('zip_input').style.backgroundColor="rgb(246,220,220)";
 	}else{ 		document.getElementById('zip_input').style.backgroundColor= " ";
 	}
})

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});
