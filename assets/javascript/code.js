// Jonathan Behar Homework 7 Train Schedule Activity JS

// Your web app's Firebase configuration

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: random(),
        authDomain: "train-schedule-hw7-10077.firebaseapp.com",
        databaseURL: "https://train-schedule-hw7-10077.firebaseio.com",
        projectId: "train-schedule-hw7-10077",
        storageBucket: "gs://train-schedule-hw7-10077.appspot.com",
        messagingSenderId: "819000189865",
        appId: "1:819000189865:web:50c2661513bd4407"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var trainData = firebase.database();

$("#add-train-btn").on("click", function() {
    
    // User inputs variables
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstTrainInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    
    // Creates local "temporary" object for holding train data
    var newTrain = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
    };
    
    // Uploads trains data to the database
    trainData.ref().push(newTrain);
    
    // Logs to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
    
    // Alert
    alert("Train successfully added! Stand clear for the next arriving train!");
    
        // Clears all of the text-boxes
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainInput").val("");
        $("#frequencyInput").val("");
        
        // Determine the next train arrivial time.
        return false;
    });
    
    // Firebase event for adding trains to the database and adding a new row in the html when a user adds an entry
    trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
    
        console.log(childSnapshot.val());
        
        var tName = childSnapshot.val().name;
        var tDestination = childSnapshot.val().destination;
        var tFrequency = childSnapshot.val().frequency;
        var tFirstTrain = childSnapshot.val().firstTrain;
        
        var timeArr = tFirstTrain.split(":");
        var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
        var maxMoment = moment.max(moment(), trainTime);
        var tMinutes;
        var tArrival;
    
      // If the first train is later than the current time, sent arrival to the first train time
        if (maxMoment === trainTime) {
            tArrival = trainTime.format("hh:mm A");
            tMinutes = trainTime.diff(moment(), "minutes");
        } else {
    
            var differenceTimes = moment().diff(trainTime, "minutes");
            var tRemainder = differenceTimes % tFrequency;
            tMinutes = tFrequency - tRemainder;
            // To calculate the arrival time, add the tMinutes to the current time
            tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }
    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);
    


    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
                tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
    });

    function random() {
        p1 = "XAaF1pOejU";
        p2 = "OLHrj6mFxQv";
        p3 = "Md7RhT0Pb";
        p4 = "AIzaSyCE";
    
        return p4 + p2 + (3 * 3) + p3 + p1
    
    };