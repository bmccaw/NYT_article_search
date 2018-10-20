// API Key 67de529aa001459ea43bcd7d7b459var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
let search;
let startYear;
let endYear;
let resultsArr = [];
let numOfResults;

$("#searchButton").on("click", function (event) {
    event.preventDefault();
    search = $("#searchterm").val();
    startYear = $("#startYear").val() + "0101";
    endYear = $("#endYear").val() + "0101";
    numOfResults =$("#numberrecords").val();


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
        
        for(i=0; i<numOfResults; i++){
            resultsArr.push(result);
            console.log(result.response.docs[i].headline.main)
            let headlineLink = $("<a>").attr("href", result.response.docs[i].web_url).text(result.response.docs[i].headline.main).attr("class", "links")
            $("#results").append(headlineLink)
        }

    }).fail(function (err) {
        throw err;
    });

});