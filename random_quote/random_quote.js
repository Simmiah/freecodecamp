function newQuote(response) {
  var quote = '"' + response.quoteText + '"';
  var author = response.quoteAuthor;
  var tweet = "https://twitter.com/intent/tweet?text=" + quote + " - " + author + "&hashtags=RandomQuote,FCC";
  document.getElementById("quote").innerHTML = quote;
  document.getElementById("author").innerHTML = author;
  document.getElementById("tweet").setAttribute('href', tweet)
}

function getQuote() {
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en",
    jsonp: "jsonp",
    dataType: "jsonp",
    success: function(response) {
      newQuote(response);
    }
  });
}

$(document).ready(function(){
  getQuote();

  $(".getQuote").click(function() {
    getQuote();
  });
});
