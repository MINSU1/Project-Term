var topButClass = document.getElementsByClassName('top_but');
var address = '';
var counter = 0;
var address = ''
var popup = document.getElementById('popup_display');
var popup_close = document.getElementById('popup_close')
//--------------------------------contact map-----------------------------------------------
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

// ------------------------------functions-------------------------------------------------
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

// ------------------------------interaction-------------------------------------------------
for (var ind = 0; ind < topButClass.length; ind++){
	document.getElementById(topButClass[ind].id).addEventListener('click',(ev)=>{
		document.getElementById('contact_display').style.display = 'none'
		document.getElementById('about_display').style.display = 'none'
		document.getElementById('main_display').style.display = 'none'
        document.getElementById('review_display').style.display = 'none'
		document.getElementById(ev.target.id + '_display').style.display='block';
	});
};

document.getElementById("address_submit").addEventListener("click",()=>{
	address = String(document.getElementById('address_input').value) +', '+ String(document.getElementById('city_input').value) +', '+ 'BC' + ', CA'
	if(address_no_empty()){
		address_check(1);
	}
});

// fix this
document.getElementById("address_input").addEventListener('keydown',(ev)=>{
	if(ev.keyCode == 13 && address_no_empty()){
		address_check(1);
	}
});
document.getElementById('login_submit').addEventListener('click',()=>{
	window.location ='/signin';
});

document.getElementById('re_address').addEventListener('click',()=>{
	address_check(0);
});
document.getElementById('next_submit').addEventListener('click',()=>{
	window.location="/location";
});

document.getElementById('reviewSub').addEventListener('click', function(){
    document.getElementById('endScreen').style.display = 'block';
    document.getElementById('review_info').style.display = 'none';
    counter = 1
});

for (var i = 0; i < document.getElementsByClassName('toRevPage').length; i++){
    document.getElementById(document.getElementsByClassName('toRevPage')[i].id).addEventListener('click', function(){
        document.getElementById('review_header').style.display = 'none';
        document.getElementById('endScreen').style.display = 'none';
        document.getElementById('review_info').style.display = 'none';
        document.getElementById('revPage').style.display = 'block';
})
};

document.getElementById('backBut').addEventListener('click', function(){
    document.getElementById('revPage').style.display = 'none';
    if (counter == 0){
        document.getElementById('review_header').style.display = 'block';
        document.getElementById('review_info').style.display = 'block';
    } else if (counter == 1){
        document.getElementById('review_header').style.display = 'block';
        document.getElementById('endScreen').style.display = 'block';
    }
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