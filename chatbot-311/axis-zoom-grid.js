window.onload = function()
{    wp = new function() {

var b = document.querySelector('#Reset');

function random(number) {
  return Math.floor(Math.random()*(number+1));
}

function cChange() {
        var randomColor = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    document.body.style.backgroundColor = randomColor;
}    
b.addEventListener('click', cChange);

//img variable instantiation with querySelector
var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.low-bar');
btn = document.querySelector('#toggle');
var overlay = document.querySelector('.overlay');
 
//svg variable instantiation    
var axisDiv = document.getElementById("sv");
var width = parseInt(d3.select('#sv').style('width'), 10);
var height = parseInt(d3.select('#sv').style('height'), 10);

var svg = d3.select(axisDiv)
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + width + " " + height);

    var zoom = d3.zoom()
    .scaleExtent([1, 40])
    .translateExtent([[-100, -100], [width + 90, height + 100]])
    .on("zoom", zoomed);

    var x = d3.scaleLinear()
    .domain([-1, width + 1])
    .range([-1, width + 1]);

    var y = d3.scaleLinear()
    .domain([-1, height + 1])
    .range([-1, height + 1]);

    var xAxis = d3.axisBottom(x)
    .ticks((width + 2) / (height + 2) * 10)
    .tickSize(height)
    .tickPadding(8 - height);

    var yAxis = d3.axisRight(y)
    .ticks(10)
    .tickSize(width)
    .tickPadding(8 - width);

    var view = svg.append("rect")
    .attr("class", "view")
    .attr("x", 0.5)
    .attr("y", 0.5)
    .attr("width", width - 1)
    .attr("height", height - 1);

    var gX = svg.append("g")
    .attr("class", "axis axis--x")
    .call(xAxis);

    var gY = svg.append("g")
    .attr("class", "axis axis--y")
    .call(yAxis);

function displayImage(imgSrc) {
  displayedImage.setAttribute('src', imgSrc);
}

for(var i = 1; i <= 3; i++) {
  var newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/pic' + i + '.jpg');
  thumbBar.appendChild(newImage);
  newImage.onclick = function(e) {
    var imgSrc = e.target.getAttribute('src');
    displayImage(imgSrc);
  }
}
btn.onclick = function() {
  var btnClass = btn.getAttribute('class'); 
  if(btnClass === 'dark') {
    btn.setAttribute('class','light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class','dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
}
// implements variable "zoom" 
svg.call(zoom);    

d3.select("#Reset")
    .on("click", resetted);
d3.select("#sv")
    .on("dblclick", resetted);

// EventListener "resize" dynamically called based on user action
document.getElementById("#sv").addEventListener("scroll", zoomed);
document.getElementById("#sv").addEventListener("mouseout", resetted );    

function zoomed() {
    view.attr("transform", d3.event.transform);
    gX.call(xAxis.scale(d3.event.transform.rescaleX(x)) );
    gY.call(yAxis.scale(d3.event.transform.rescaleY(y)) );
    }
function resetted() {
    svg.transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity );
    }
} 

}
