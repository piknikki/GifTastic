var topics = [
    "pancakes", "shook", "idk", "sparkle", "hangry", "bamboozled", "princessbride",
    "sloth", "nerd", "snek", "nope"
];

function displayGifInfo() {
    var gifName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&limit=10&api_key=k7mMzn34ZnJ5AoF9R9XD1B8GrR4o6Bd4";
    var gifInfo = $("#gif-info");


    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {

        var results = response.data;
        // loop through the 10 responses, get rating, animated, still, and build an image tag
        for (let i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='gif-image'>");
            var rating = results[i].rating;
            var defaultAnimatedSrc = results[i].images.fixed_height.url; // animated url
            var staticSrc = results[i].images.fixed_height_still.url; // still url
            var showImage = $("<img>"); // create a new image tag
            var p = $("<p>").text("Rating: " + rating); // make new p element and fill with rating

            showImage.attr("src", staticSrc); // put the static image as the image src
            showImage.addClass("playGiphy");
            showImage.attr("data-state", "still"); // set attribute data state to still
            showImage.attr("data-still", staticSrc); // set attr data still to each item's still url
            showImage.attr("data-animate", defaultAnimatedSrc); // set attr data animate to each item's animated url
            gifDiv.append(p); // add p to the view
            gifDiv.append(showImage); // add src and attr info to the view
            gifInfo.prepend(gifDiv);

        }
    })
}

// click event handler
$("#add-gif").on("click", function(event) {
    event.preventDefault(); // keep html input from submitting also
    var gif = $("#user-input").val().trim(); // grab value of user input, trim white spaces
    topics.push(gif); // put user input into array of gifs
    $("#user-input").val('');  // empty out the input field
    btnMaker(); // call button maker to render the buttons for the user input
});


function btnMaker() {
    $("#buttons-view").empty();  // empty out the buttons so it can repopulate instead of doubling
    // make a button for every gif, including future gifs
    for (let i =0; i < topics.length; i++) {

        var topicBtn = $('<button class="gif">');
        topicBtn.attr("data-name", topics[i]);
        topicBtn.text(topics[i]);
        $("#buttons-view").append(topicBtn);
    }


}

// call render func
btnMaker();

// make on click for displaying the gifs
$(document).on("click", ".gif", displayGifInfo);
$(document).on("click", ".playGiphy", pausePlayGifs);

// function to change state
function pausePlayGifs() {
    console.log($(this).attr("data-state"));
    var state = $(this).attr("data-state"); // uses this and accesses the state
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate")); // if state still, click will change src to animate url
        $(this).attr("data-state", "animate") // if state still, click changes state to animate
    } else {
        $(this).attr("src", $(this).attr("data-still")); // this is the default
        $(this).attr("data-state", "still");
    }
}