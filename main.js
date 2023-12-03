// main.js


/* factors

How much you took out each year (or in total if it's direct subsidized loan?
How much money you make for the next 25 years? Stretch goal would be to make it variable
How much you pay off each year minimum (10%) altho you

*/

// Parameters: age
// 
/*
Direct subsidized loan
4.99% for direct subsidized and unsubsidized loans for undergraduates
6 months after graduation you do not need to pay



Direct unsubsidized loan
interest accrues during all periods
6.54% 


Income based repayment
Your monthly payments will be 10% to 15% of your discretionary income.
If you haven’t paid your loan off in 20 or 25 years, your remaining balance will be forgiven.
Whether you qualify to pay 10% or 15% of your income, and win forgiveness after 20 years or 25, depends on the year you first borrowed.
Those who first took out federal loans after July 1, 2014 qualify for the more generous terms: payments at 10% of income and forgiveness after 20 years.
*/


// Sample data for four lines
var data1 = [10, 30, 20, 40, 30];
var data2 = [5, 25, 15, 35, 25];
var data3 = [15, 35, 25, 45, 35];
var data4 = [20, 40, 30, 50, 40];

// Set up chart dimensions
var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = 600 - margin.left - margin.right; // Adjust the width
var height = 400 - margin.top - margin.bottom; // Adjust the height

// Create SVG element with margin
var svg = d3.select("#chart-container")
  .append("svg")
  .attr("width", "60%") // Use 100% of the container width
  .attr("height", "60%") // Use 100% of the container height
  .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
  .attr("preserveAspectRatio", "xMidYMid meet") // Center the SVG content
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // Apply the margin

// Create x-axis
var xScale = d3.scaleLinear()
  .domain([0, data1.length - 1])
  .range([0, width]);

var xAxis = d3.axisBottom(xScale)
  .ticks(data1.length); // Adjust the number of ticks

svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("line") // Apply styles to the axis lines
  .style("stroke-width", 2)
  .style("stroke", "black");

// Create y-axis
var yScale = d3.scaleLinear()
  .domain([0, d3.max([...data1, ...data2, ...data3, ...data4])])
  .range([height, 0]);

var yAxis = d3.axisLeft(yScale);

svg.append("g")
  .call(yAxis)
  .selectAll("line") // Apply styles to the axis lines
  .style("stroke-width", 2)
  .style("stroke", "black");

// Create lines
function createLine(data, color) {
  var line = d3.line()
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d); });

  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", line)
    .style("stroke", color)
    .style("stroke-width", 2)
    .style("fill", "none");
}

// Call the function to create lines
createLine(data1, "red");
createLine(data2, "green");
createLine(data3, "blue");
createLine(data4, "purple");
