var map;
var infowindow,
    website_link;
var service;
var latitu = document.getElementById('lat').value;
var longitu = document.getElementById('long').value;
console.log(latitu);
console.log(longitu);

var place_address = '',
    place_name = '',
    place_rating = '',
    place_type = '',
    open_now = '',
    phone_num = '',
    url_site = '',
    isDivExist = 0;

var getAddress = (address, callback) => {
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json' + '?address=' + encodeURIComponent(address),
        json: true
    }, (error, response, body) => {
        if (error) {
            console.log('Can not connect to google maps');
        } else if (body.status === 'ZERO_RESULTS') {
            console.log('Can not find requested address');
        } else if (body.status === 'OK') {
            console.log(`Your requested venue: ${address}`);
            console.log(`Address: ${body.results[0].formatted_address}`);
            console.log(`Type: ${body.results[0].types[0]}`);
        }
    });
};

function initMap() {
    var pyrmont = { lat: latitu, lng: longitu };

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });
    var request = {
        location: pyrmont,
        radius: 500,
        type: ['restaurant']
    }
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        place_address = place.vicinity,
            place_name = place.name,
            place_rating = place.rating,
            place_type = String(place.types).split(",")[0],
            open_now = place.opening_hours.open_now;
        var request = {
            reference: place.reference
        };
        service.getDetails(request, function(details, status) {
            phone_num = details.formatted_phone_number,
                url_site = details.website;
        });

        infowindow.setContent(place.name + "<br><br>" + `<button onclick="myFunction()">SELECT</button>`);
        infowindow.open(map, this);
        // website_link = 
        (place.name)
        // addtodiv(place)
    });
}

function isItOpen(par) {
    if (par) {
        return 'open';
    } else {
>>>>>>> origin/dev
        return 'closed';
    }
}

function myFunction() {
    if (isDivExist != 0) {
        document.getElementById('order_div').innerHTML = place_name;
        document.getElementById('rating_div').innerHTML = "Rating: " + place_rating;
        document.getElementById('add_div').innerHTML = "Address: " + place_address;
        document.getElementById('type_div').innerHTML = "Type: " + place_type;
        document.getElementById('open_div').innerHTML = "Open/Closed: " + isItOpen(open_now);
        document.getElementById('phone_div').innerHTML = "Number: " + phone_num;
        document.getElementById('site_div').innerHTML = "Website: " + url_site;
    } else {
        var nameDiv = document.createElement("div"),
            ratingDiv = document.createElement("div"),
            addDiv = document.createElement("div"),
            typeDiv = document.createElement("div"),
            openDiv = document.createElement("div"),
            phonediv = document.createElement("div"),
            sitediv = document.createElement("div");

        nameDiv.id = 'order_div';
        ratingDiv.id = "rating_div";
        addDiv.id = "add_div";
        typeDiv.id = "type_div";
        openDiv.id = "open_div";
        phonediv.id = "phone_div";
        sitediv.id = "site_div";
        // nameDiv.innerHTML = place_name + '<br>' +place_rating+ '<br>' +place_address+ '<br>' +place_type+ '<br>' +price_level+ '<br>' +open_now;
        nameDiv.innerHTML = place_name;
        ratingDiv.innerHTML = "Rating: " + place_rating;
        addDiv.innerHTML = "Address: " + place_address;
        typeDiv.innerHTML = "Type: " + place_type;
        openDiv.innerHTML = "Open/Closed: " + isItOpen(open_now);
        phonediv.innerHTML = "Number: " + phone_num;
        sitediv.innerHTML = "Website: " + url_site;

        ratingDiv.style.font = "20px sans-serif";
        addDiv.style.font = "20px sans-serif";
        typeDiv.style.font = "20px sans-serif";
        openDiv.style.font = "20px sans-serif";
        phonediv.style.font = "20px sans-serif";
        sitediv.style.font = "20px sans-serif";

        document.getElementById('explanation').appendChild(nameDiv);
        document.getElementById('explanation').appendChild(ratingDiv);
        document.getElementById('explanation').appendChild(addDiv);
        document.getElementById('explanation').appendChild(typeDiv);
        document.getElementById('explanation').appendChild(openDiv);
        document.getElementById('explanation').appendChild(phonediv);
        document.getElementById('explanation').appendChild(sitediv);
        document.getElementById('submit').style.display = 'block';
        isDivExist = 1;
        ratecolor = ratingcolor();
        ratingDiv.style.color = ratecolor;
    }

        ratingDiv.style.font = "20px sans-serif";
        addDiv.style.font = "20px sans-serif";
        typeDiv.style.font = "20px sans-serif";
        openDiv.style.font = "20px sans-serif";
        phonediv.style.font = "20px sans-serif";
        sitediv.style.font = "20px sans-serif";

        document.getElementById('explanation').appendChild(nameDiv);
        document.getElementById('explanation').appendChild(ratingDiv);
        document.getElementById('explanation').appendChild(addDiv);
        document.getElementById('explanation').appendChild(typeDiv);
        document.getElementById('explanation').appendChild(openDiv);
        document.getElementById('explanation').appendChild(phonediv);
        document.getElementById('explanation').appendChild(sitediv);
        document.getElementById('submit').style.display = 'block';
        isDivExist = 1;
        ratecolor = ratingcolor();
        ratingDiv.style.color = ratecolor;
    }
}

function ratingcolor() {
    mycolor = "red";
    console.log(place_rating);
    if (place_rating >= 2.5) {
        mycolor = "#ffcc00";
    }
    if (place_rating >= 3.5) {
        mycolor = "Lime";
    }
    return mycolor;
}

function addtodiv(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    var newDiv = document.createElement("div");
    var newContent = document.createTextNode(place.name);
    newDiv.appendChild(newContent);
    document.getElementById('explanation').appendChild(newDiv);
}

function location_confirmation() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/location_confirmation", true);
    xmlhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            window.location = "/weather";
        }
    }
    xmlhttp.send(`address=${place_address}`);
}

//-------------------------------------interactions---------------------------------

document.getElementById('submit').addEventListener('click', () => {
    location_confirmation();
});
window.onload = initMap;

// function addClassCheck(element){
//     if(element.checked){
//         element.classList.add("radcheckbox");
//     }else{
//         element.classList.remove("radcheckbox");
//     }
//     if(document.getElementsByClassName("radcheckbox").length>1){
//       alert("Please select only one check box");
//         element.checked=false;
//         element.classList.remove("radcheckbox");
//     }


