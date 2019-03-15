

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAQe46T7U_QlMf1BUwgWdYDVvgsq2CveP8",
    authDomain: "train-tracker-bd786.firebaseapp.com",
    databaseURL: "https://train-tracker-bd786.firebaseio.com",
    projectId: "train-tracker-bd786",
    storageBucket: "train-tracker-bd786.appspot.com",
    messagingSenderId: "140051433082"
  };

  firebase.initializeApp(config);

var database = firebase.database();

var trainName;
var dest;
var freq;
var firstTrain;


$("#add-employee-btn").on("click", function(event) {
    event.preventDefault()
    
     trainName = $("#train-name-input").val().trim();
     dest = $("#destination-input").val();
     freq = $("#frequency-input").val().trim();
     firstTrain = $("#firstTrain-input").val().trim()

    var trainTracker = {
        trainName: trainName,
        destination: dest,
        freq: freq,
        firstTrain: firstTrain
    };

    database.ref().push(trainTracker);

    database.ref().on("child_added", function(snapshot){
      var ss = snapshot.val();
    console.log(ss.trainName);
    console.log(ss.destination);
    console.log(ss.freq);
    console.log(ss.firstTrain);

    var frequency = parseInt(ss.freq);

    var firstTimeConverted = moment(ss.firstTrain, "HH:mm").subtract(1, "years");
    var trainTime = moment(firstTimeConverted).format("hh:mm");
    var sConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(sConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var minsAway = frequency - tRemainder;
    var nextTrain = moment().add(minsAway, "minutes");

    var userRow = $("<tr>").append(
      $("<td>").text(ss.trainName),
      $("<td>").text(ss.destination),
      $("<td>").text(ss.freq),
      $("<td>").text(moment(nextTrain, "HH:mm").format("hh:mm a")),
      $("<td>").text(minsAway + "mins away"),
    )

    $("#train-table > tbody").append(userRow);

    })
    // var tConverted = moment();
    // var currentTime = moment();
    // var diffTime = moment().diff(moment(firstTrain), "minutes");
    // var tRemainder = diffTime % freq;
    // var minsAway = freq - tRemainder;
    // var nextTrain = moment().add(minsAway, "minutes");


});

