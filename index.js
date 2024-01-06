// console.log("Yo");

/*
What events will your application need?
-<select> element (details here https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)
    -Do we need any event handling for map interactions? i dont think so.. but good to keep in mind

What APIs will you need and in what order?
-GeoLocation API
(grabs the users location)
-Leaflet
(pass the geolocation from the user and display the data as a map)
-Foursquare API
(mapping software that already exists and locations of where businesses exist)

How will you obtain the user's location?
-

How will you add the user's location to the map?
-We'll pass the right values from our Geolocation request to map the function we create
    we'll grab the coordinates and pass those in as an argument for our function

How will you get the selected location from the user?
-using event listeners on the <select> element in our html
    -research input events to see 

How will you add that information to the map?
-

*/

//step 1
let map;
let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
let marker;



function getCoords() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve([position.coords.latitude, position.coords.longitude]),
            error => reject(error)
        );
    });
}

function initMapWithUserLocation(coords) {
    if (!map) {
    map = L.map('map').setView(coords, 15);
    tiles.addTo(map);
    }

    if (!marker){
     marker = L.marker(coords).addTo(map)
        .bindPopup('Your Location')
        .openPopup();
    } else {
        marker.setLatLng(coords).bindPopup('Your Location').openPopup();
    }
}

function onLocationFound(e) {
    let radius = e.accuracy / 2;
    let coords = e.latlng;

    if (!marker) {
    initMapWithUserLocation(coords);
    } else {
    marker.setLatLng(coords).bindPopup("You are within " + radius + " meters from this point").openPopup();
    }
}



window.onload = async () => {
    try {
        const coords = await getCoords();
        const strCoords = `${coords[0]}, ${coords[1]}`;

        // Initialize the map with user's location but without adding a marker initially
        map = L.map('map').setView(coords, 15);
        tiles.addTo(map);

        map.locate({ setView: false, maxZoom: 16 }); // Set setView to false initially

        const selectElement = document.querySelector('#location-select');
        selectElement.addEventListener('change', async (event) => {
            const selection = event.target.value;
            console.log(selection, strCoords);

            // Continue with your functions for placeSearch, createMarkers, etc.
            // ...

        });
    } catch (error) {
        console.error("Error getting location.", error.message);
    }
    map.on('locationfound', onLocationFound);
}
//my redudant code is my curse
// map = L.map('map').setView([51.5, -0.09], 13);
// tiles.addTo(map);

