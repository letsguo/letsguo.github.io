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


// main.js

var svg; // Declare the svg variable outside the functions for global access

function calculatePayoff() {
  // Get input values
  var annualIncome = parseFloat(document.getElementById("annualIncome").value);
  var loanAmount = parseFloat(document.getElementById("loanAmount").value);

  // Validate input
  if (isNaN(annualIncome) || isNaN(loanAmount)) {
    alert("Please enter valid numeric values.");
    return;
  }

  // Convert annual income to monthly income
  var monthlyIncome = annualIncome / 12;

  // Monthly payment calculation with interest
  var monthlyInterestRate = 0.1 / 12; // Convert yearly interest rate to monthly
  var monthlyPayment = (monthlyIncome * 0.1) * (1 - Math.pow(1 + monthlyInterestRate, -12)) / monthlyInterestRate + (loanAmount * monthlyInterestRate);

  // Calculate the number of months to pay off the loan
  var monthsToPayOff = Math.ceil(loanAmount / monthlyPayment);

  // Update chart
  updateChart(loanAmount, monthlyPayment, monthsToPayOff);
}

function updateChart(initialLoanAmount, monthlyPayment, monthsToPayOff) {
  // Clear previous chart elements
  d3.select("#chart-container svg").remove();

  // Set up chart dimensions
  var margin = { top: 20, right: 20, bottom: 30, left: 50 };
  var width = 600 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  // Create SVG element with margin
  svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", "80%")
    .attr("height", "80%")
    .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create x-axis
  var xScale = d3.scaleLinear()
    .domain([0, monthsToPayOff])
    .range([0, width]);

  var xAxis = d3.axisBottom(xScale)
    .ticks(monthsToPayOff);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("line") // Apply styles to the axis lines
    .style("stroke-width", 2)
    .style("stroke", "black");

  // Create y-axis
  var yScale = d3.scaleLinear()
    .domain([0, initialLoanAmount])
    .range([height, 0]);

  var yAxis = d3.axisLeft(yScale);

  svg.append("g")
    .call(yAxis)
    .selectAll("line") // Apply styles to the axis lines
    .style("stroke-width", 2)
    .style("stroke", "black");

  // Draw the line representing the remaining loan amount over time
  var line = d3.line()
    .x(function (d, i) { return xScale(i); })
    .y(function (d) { return yScale(d); });

  var remainingLoanAmounts = calculateRemainingLoanAmounts(initialLoanAmount, monthlyPayment, monthsToPayOff);
  svg.append("path")
    .data([remainingLoanAmounts])
    .attr("class", "line")
    .attr("d", line)
    .style("stroke", "blue")
    .style("stroke-width", 2)
    .style("fill", "none");
}

function calculateRemainingLoanAmounts(initialLoanAmount, monthlyPayment, monthsToPayOff) {
  var remainingLoanAmounts = [];
  var remainingAmount = initialLoanAmount;

  for (var i = 0; i <= monthsToPayOff; i++) {
    remainingLoanAmounts.push(remainingAmount);
    remainingAmount -= monthlyPayment;
    if (remainingAmount < 0) {
      remainingAmount = 0;
    }
  }

  return remainingLoanAmounts;
}
