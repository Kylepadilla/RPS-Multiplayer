
var x = document.getElementById("weather");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
};

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude; 
};


var lat = this.coords.latitude
var long = this.coords.longitude;

console.log(lat);
console.log(long);
// displayMovieInfo function re-renders the HTML to display the appropriate content
function weatherDisplay() {
  var queryURL = "https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=en&lon=" + long + "&lat=" + lat;

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
  });
}
