// API Key 67de529aa001459ea43bcd7d7b459var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
let search;
let startYear;
let endYear;
let resultsArr = [];
let numOfResults;
let todaysDate;

function getTodayDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    todaysDate = dd.toString() + mm.toString() + yyyy.toString()
} 

$("#searchButton").on("click", function (event) {
    event.preventDefault();
    search = $("#searchterm").val();
    if ($("#startYear").val() === "") {
        startYear = 11111111
    }

    if ($("#endYear").val() === "") {
        getTodayDate()
        endYear = todaysDate;
    }
    numOfResults = $("#numberrecords").val();
    
    if (numOfResults === ""){
        numOfResults = 10;
    }


    console.log(search)

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    url += '?' + $.param({
        'api-key': "67de529aa001459ea43bcd7d7b459309",
        'q': search,
        'begin_date': startYear,
        'end_date': endYear,
    });

    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (result) {
        console.log(result);
        console.log(numOfResults)

        for (i = 0; i < numOfResults; i++) {
            resultsArr.push(result);
            console.log(result.response.docs[i].headline.main)
            let headlineLink = $("<a>").attr("href", result.response.docs[i].web_url).text(result.response.docs[i].headline.main).attr("class", "links")
            $("#results").append(headlineLink)
        }

    }).fail(function (err) {
        throw err;
    });

});