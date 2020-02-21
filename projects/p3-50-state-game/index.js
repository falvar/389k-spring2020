// This is a subset of the states.
// Use this to actually run the game
// (assume this is the full set of states.
// This will make it easier to test.
var states = ["Idaho", "South Dakota", "Hawaii", "Alaska", "Alabama", "New York"];

// These are all the states. It maps the state name to the number which you'll
// want to use in your API call.
var abvMap = {
    "Alabama": "01",
    "Alaska": "02",
    "Arizona": "04",
    "Arkansas": "05",
    "California": "06",
    "Colorado": "08",
    "Connecticut": "09",
    "Delaware": "10",
    "District Of Columbia": "11",
    "Florida": "12",
    "Georgia": "13",
    "Hawaii": "15",
    "Idaho": "16",
    "Illinois": "17",
    "Indiana": "18",
    "Iowa": "19",
    "Kansas": "20",
    "Kentucky": "21",
    "Louisiana": "22",
    "Maine": "23",
    "Maryland": "24",
    "Massachusetts": "25",
    "Michigan": "26",
    "Minnesota": "27",
    "Mississippi": "28",
    "Missouri": "29",
    "Montana": "30",
    "Nebraska": "31",
    "Nevada": "32",
    "New Hampshire": "33",
    "New Jersey": "34",
    "New Mexico": "35",
    "New York": "36",
    "North Carolina": "37",
    "North Dakota": "38",
    "Ohio": "39",
    "Oklahoma": "40",
    "Oregon": "41",
    "Pennsylvania": "42",
    "Rhode Island": "44",
    "South Carolina": "45",
    "South Dakota": "46",
    "Tennessee": "47",
    "Texas": "48",
    "Utah": "49",
    "Vermont": "50",
    "Virginia": "51",
    "Washington": "53",
    "West Virginia": "54",
    "Wisconsin": "55",
    "Wyoming": "56",
}

var count = 0;
var entered = [];

function startTimer(duration, display) {
    var timer = duration, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = ": " + seconds;
        if(count === 50){
            document.getElementById("results").innerHTML = "You got them all, you win!"
        }

        if(timer === 0){
            document.getElementById("statesIn").disabled = true;
            document.getElementById("results").innerHTML = "<h2>You got " + count + " out of 50 states</h2>";
            document.getElementById("missedStates").innerHTML = "<h2>You missed:</h2>";
            for (st in abvMap){
                if(! entered.includes(st)){
                    document.getElementById("missedStates").innerHTML += st + "<br>"
                }
            }
            
        }

        if (--timer < 0) {
            timer = 0;
        }
    }, 1000);
}

function checkInput() {
    var input = $("#statesIn").keyup(function () {
        var state = $(this).val();
        var capped = state.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
        if (capped in abvMap && !(entered.includes(capped))) {
            entered.push(capped);
            count ++;
            document.getElementById("enteredStates").innerHTML += capped + "<br>";
        }
    });


}

$("#start_button").on("click", function(){
    var timeLeft = 20,
        display = document.querySelector('#timer');
    startTimer(timeLeft, display);
    checkInput();
});

