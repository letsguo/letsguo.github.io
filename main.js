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
  var annualIncome = parseFloat(document.getElementById("annualIncome").value);
  var loanAmount = parseFloat(document.getElementById("loanAmount").value);

  if (isNaN(annualIncome) || isNaN(loanAmount)) {
    alert("Please enter valid numeric values.");
    return;
  }

  var monthlyIncome = annualIncome / 12;

  var monthlyInterestRate = 0.06 / 12;
  var monthlyPayment = (monthlyIncome * 0.1) * (1 - Math.pow(1 + monthlyInterestRate, -12)) / monthlyInterestRate + (loanAmount * monthlyInterestRate);

  var monthsToPayOff = Math.ceil(loanAmount / monthlyPayment);

  updateChart(loanAmount, monthlyPayment, monthsToPayOff);
}

function updateChart(initialLoanAmount, monthlyPayment, monthsToPayOff) {
  d3.select("#chart-container svg").remove();

  var margin = { top: 20, right: 20, bottom: 50, left: 100 };
  var width = 600 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", "70%")
    .attr("height", "70%")
    .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xScale = d3.scaleLinear()
    .domain([0,Math.min(monthsToPayOff, 26)])
    .range([0, width]);

  var xAxis = d3.axisBottom(xScale)
  .ticks(Math.min(monthsToPayOff, 26));

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("line")
    .style("stroke-width", 2)
    .style("stroke", "black");

  var yScale = d3.scaleLinear()
    .domain([0, initialLoanAmount])
    .range([height, 0]);

  var yAxis = d3.axisLeft(yScale);

  svg.append("g")
    .call(yAxis)
    .selectAll("line")
    .style("stroke-width", 2)
    .style("stroke", "black");

  svg.append("text")
    .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 15) + ")") // Adjust the 30 based on your preference
    .style("text-anchor", "middle")
    .text("Months");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "2em")  // Increase the distance from the left edge
    .style("text-anchor", "middle")
    .text("Dollars left");


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

    if (i >= 25) {
      remainingAmount = 0;
      remainingLoanAmounts.push(remainingAmount);
      break
    }

    if (remainingAmount < 0) {
      remainingAmount = 0;
      remainingLoanAmounts.push(remainingAmount);
      break
    }
  }

  return remainingLoanAmounts;
}
