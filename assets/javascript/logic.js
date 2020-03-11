// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCktDAR_iqVZ9hIpNSBr8gHfJnJHUjBAE4",
    authDomain: "fir-project-1-56629.firebaseapp.com",
    databaseURL: "https://fir-project-1-56629.firebaseio.com",
    projectId: "fir-project-1-56629",
    storageBucket: "fir-project-1-56629.appspot.com",
    messagingSenderId: "97412334911",
    appId: "1:97412334911:web:869fb2458712730398bf8a"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-button").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    //console.log(trainName);  

    var trainDestination = $("#train-destination-input").val().trim();
    //console.log(trainDestination);

    var trainTime = moment($("#train-time-input").val().trim(),"HH:mm").subtract(10,"years").format("X");
    //console.log(trainTime);

    var trainFrequency = $("#train-frequency-input").val().trim();
    //console.log(trainFrequency);

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    }

    database.ref().push(newTrain);

    alert("Train successfully added.");

    //console.log(newTrain);

    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#train-time-input").val("");
    $("#train-frequency-input").val("");

    return false;

});

database.ref().on("child_added", function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var time = snapshot.val().time;
    var frequency = snapshot.val().frequency;

    var remainder = moment().diff(moment.unix(time), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    var uid = snapshot.key;


    var trainRow = $("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"<button class='remove-button'>&times;</button></td></tr>");

    trainRow.attr("data-id", uid);
    trainRow.attr("id", uid);

    $("#train-table > tBody").append(trainRow);

    
})

//deleting data
$(document).on('click', '.remove-button', function() {
    var newTrainID = $(this).parent().parent().attr('data-id');
    var deleteTrain = firebase.database().ref(newTrainID);
    deleteTrain.remove();
    $(this).closest('tr').empty();
})

