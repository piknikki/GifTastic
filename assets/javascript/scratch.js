

//   //     SCRATCH     //  //



var topics = [
    "hangry", "pancakes", "shook", "idk", "starwars", "sparkle", "hitchhikersguide", "winning", "rude", "princessbride", "hitchhikersguide",
    "sloth", "nerd", "random", "sneks", "idontcare", "nope"
];

function btnMaker() {
    for (let i =0; i < topics.length; i++) {
        var topicBtn = $('<a href="#" class="topic-button" ></a>');
        topicBtn.attr("alt", topics[i]);
        topicBtn.text(topics[i]);
        $(".button-row").append(topicBtn);
    }
}

btnMaker();