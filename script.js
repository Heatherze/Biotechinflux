

  // using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// Array of image URLs for each step
var images = [
  "images/scrolly1.gif",
  "images/scrolly2.gif",
  "images/scrolly3.gif",
  "images/scrolly4.gif"
];

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.75);
  step.style("height", stepH + "px");

  var figureHeight = window.innerHeight / 2;
  var figureMarginTop = (window.innerHeight - figureHeight) / 2;

  figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  console.log(response);
  // response = { element, direction, index }

  // Highlight the active step
  step.classed("is-active", function (d, i) {
    return i === response.index;
  });

  // Update image based on the step index
  figure.select("img").attr("src", images[response.index]);

  // Optional: update any text if needed
  figure.select("p").text(" ");
}

function init() {
  // Force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // Setup the scroller with options and event handlers
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.33,
      debug: false
    })
    .onStepEnter(handleStepEnter);
}

// Initialize
init();







