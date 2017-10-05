var $quoteTag = $("#quote");
var $tweetTag = $("#tweet");
var quoteArray = [];

function fetchQuotes(){
  $.getJSON(
    "https://en.wikiquote.org/w/api.php?action=query&prop=extracts&format=json&exsectionformat=plain&titles=Mahatma_Gandhi&callback=?",
    function (data, textStatus, jqXHR) {
      html = $(data["query"]["pages"]["471"]["extract"]);
      parseQuotes();
      newQuote();
    })
  .fail(function() {
    alert("Request failed to load quotes.  Please refresh the page or contact the author if the problem keeps occurring.");
  });
}

// credit to https://github.com/natetyler/wikiquotes-api/blob/master/wikiquote-api.js#L107
// parses WikiQuotes pulling <li> elements that do not have <li> child element
// pushes <b> elements if present into quoteArray otherwise pushes the text
function parseQuotes() {
  if (html !== "" || html !== null || html !== undefined) {
    var $list = html.find("li:not(li li)");
    $list.each(function() {
      $(this).children().remove(":not(b)");
      var $bolds = $(this).find("b");

      if($bolds.length > 0) {
        quoteArray.push($bolds.html());
      } else {
        quoteArray.push($(this).html());
      }
    });
  }
}

function newQuote(){
  var randomNumber = Math.floor(Math.random() * quoteArray.length) - 1;
  var currentQuote = quoteArray[randomNumber];

  $quoteTag.fadeOut("slow", function(){
    $(this).text(currentQuote).fadeIn("slow");
  });

  $tweetTag.attr({
    href: "https://twitter.com/intent/tweet?text=" + currentQuote + " - Mahatma Gandhi &hashtags=MahatmaGandhiQuotes,FCC"
  });
}

$(document).ready(function(){
  fetchQuotes();

  $("#quotebutton").click(function(){
    newQuote();
  })
})
