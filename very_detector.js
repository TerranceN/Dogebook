// Since FB doesn't give a nice way to replace certain Wows with doge
//   this will programmatically find a wow, figure out its classes
//   (it seems to be the first two classes that matter), and make
//   a new CSS rule with those classes.
//
//   If this fucks up, everything might become doge, who knows.

$(function() {
  var foundWow = false;

  var makeCss = function(classes) {
    if (!foundWow) {
      foundWow = true;
      $("<style>i" + classes + " { background-position: 0 0 !important; background-image: url(http://i.imgur.com/XU48Fz4.png) !important; background-size: contain !important; transform: scale(1.3) !important; }</style>").appendTo( "head" )
    }
  }

  var genCssFromElem = function(elem) {
    var classes = "." + elem.attr('class').split(" ").slice(0, 2).join(".");
    makeCss(classes);
  }

  var detectWowImgs = function() {
    genCssFromElem($("*[aria-label*=\"Wow\"] i").first());
  }

  var detectWowStrings = function() {
    $("a.UFILikeLink").each(function() {
      if ($(this).text().toLowerCase().includes("wow")) {
        genCssFromElem($("i", this));
      }
    });
  };

  $("a.UFILikeLink").bind("DOMSubtreeModified", function() {
    if (!foundWow) {
      setTimeout(function() {
        detectWowStrings();
      }, 0);
    }
  });

  detectWowImgs();
  detectWowStrings();
});
