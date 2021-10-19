function display_custom_growth_chart(patient, el, chartType, data_points) {

    // START: Data points to draw the backgroud of the chart 
    // Get data to build chart's 'background lines' depending on chartType
    var data = data_points;

    var percentiles = {
        "lines": [
            { "tag": "SD0", "name": "3" },
            { "tag": "SD1neg", "name": "10" },
            { "tag": "SD2neg", "name": "25" },
            { "tag": "SD2", "name": "50" },
            { "tag": "SD1", "name": "75" },
            { "tag": "SD3", "name": "90" },
            { "tag": "SD3neg", "name": "97" }
        ]
    };
    // END: Data points to draw the backgroud of the chart 

    // START : Set chart title based on chartType
    var title = getChartTitle(chartType);

    // Save the last tuple so that I can label it
    lastTuples = [];

    // Boundaries for graph, based on growth chart bounds
    var yMax = 0; // weight, in kg
    var xMax = 0; // age, in months
    for (var i = 0; i < data.length; i++) {
        var lineData = data[i];
        var lastTuple = lineData[lineData.length - 1];
        lastTuples.push(lastTuple);
        xMax = Math.max(lastTuple[0], xMax);
        yMax = Math.max(lastTuple[1], yMax);
    }

    // Graph formatting, in pixels
    var width = 800;
    var height = 600;
    var padding = 50;
    var extraRightPadding = 80; // For line labels ... "severely malnourished" goes offscreen

    // START: X and Y Sacles
    // Graph scale; domain and range
    var yScale = d3.scale.linear()
        .domain(chartType == 'girls_head_circumference_for_age_0_to_24_months' ? [30, yMax] : [30, yMax])
        .range([height - padding, padding]);

    var xScale = d3.scale.linear()
        .domain([0, xMax])
        .range([padding, width - padding]);
    // END: X and Y Sacles

    // Line generating function
    var line = d3.svg.line()
        .interpolate("basis")
        .x(function (d, i) {
            return xScale(d[0]);
        })
        .y(function (d) {
            return yScale(d[1]);
        });

    // Area under the curve, for highlighting regions
    var area = d3.svg.area()
        .interpolate("basis")
        .x(line.x())
        .y1(line.y())
        .y0(yScale(0));

    // clear exiting growth chart svg .. allows to reset graph with new background
    d3.select(el).select(".growth_chart_main_svg").remove();

    var svg = d3.select(el).append("svg")
        .attr("width", width + extraRightPadding)
        .attr("height", height)
        .attr("class", "growth_chart_main_svg");

    // add a monocolor background
    var backgroundRect = svg.append("g");
    backgroundRect.append("rect")
        .attr("width", width + extraRightPadding)
        .attr("height", height)
        .attr("class", "backgroundRect");

    // Baseline growth curves
    var lines = svg.selectAll(".lines")
        .data(data)
        .enter();

    // add areaGirl class to show pink color
    lines.append("path")
        .attr("class", "areaGirl")
        .attr("d", area);

    // Add line to the background 
    lines.append("path")
        .attr("class", "line")
        .attr("d", line);

    // This is being used by tooltip function
    var linesToAxis = svg.append("g");

    // START: Draw line based on patient data
    // Add line for the patient's growth
    var linesP = svg.selectAll("pG")
        .data([patient])
        .attr("class", "pG")
        .enter();
    linesP.append("path")
        .attr("class", "pLine")
        .attr("d", line.interpolate("")); // interpolate("") removes the smoothing
    // EMD: Draw line based on patient data

    // Dots at each data point
    var dots = svg.selectAll(".dot")
        .data(patient)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .call(dotHandler(function (d, i) {
            return getTooltipText(d);
        }))
        // .on("mouseout", mouseoutDot)
        .attr("cx", function (d, i) {
            return xScale(d[0]);
        })
        .attr("cy", function (d, i) {
            return yScale(d[1]);
        })
        .attr("r", 3);

    // This creates axis
    // Add axis
    // TODO: Improve axis to have years and months, like http://www.who.int/childgrowth/standards/cht_wfa_boys_p_0_5.pdf
    // x-axis
    var xAxis = d3.svg.axis();
    xAxis.scale(xScale);
    xAxis.orient("bottom")
        .ticks(10);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 0 + "," + (height - padding) + ")")
        .call(xAxis);

    // y-axis
    var yAxis = d3.svg.axis();
    yAxis.scale(yScale);
    yAxis.orient("left")
        .ticks(10);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    // Show text on Y-axis
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (padding / 3) + "," + (height - padding) / 2 + ")rotate(-90)")
        .text("Weight (kg)");
    // END: AXIS GENERATOINS

    // START: SHOW PERCENTILE
    // Line labels (Normal, Malnourished, and Severely Malnourished)
    for (var i = 0; i < percentiles.lines.length; i++) {
        xOffset = xScale(lastTuples[i][0]);
        xOffset += 2; // a little space better graph and text
        yOffset = yScale(lastTuples[i][1]);
        yOffset += 4; // center text on line

        svg.append("text")
            .attr("class", "line-label")
            .attr("transform", "translate(" + xOffset + "," + yOffset + ")")
            // .attr("text-anchor", "middle")
            .text(percentiles.lines[i].name);
    }
    // END: SHOW PERCENTILE

    var tooltipOffset = padding + 10;
    var tooltipGroup = svg.append("g");

    var tooltipBackground = tooltipGroup.append("rect")
        // .attr("class","tooltip")
        .attr("x", tooltipOffset)
        .attr("y", tooltipOffset)
        .attr("width", 0)
        .attr("height", 0)
        .attr("class", "tooltipTextBackground")
    // .style("font-size","14px")
    // .style("background-color","gray")
    // .text("(Move mouse over a data point to see details)");
    // .text("");

    var tooltipText = tooltipGroup.append("text")
        // .attr("class","tooltip")
        .attr("x", tooltipOffset)
        .attr("y", tooltipOffset)
        .attr("class", "tooltipText")
        .style("font-size", "14px")
        // .style("background-color","gray")
        // .text("(Move mouse over a data point to see details)");
        .text("");

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 + (padding / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        // .style("text-decoration", "underline")
        .text(title);

    // Show text on X-axis
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (width / 2) + "," + (height - (padding / 3)) + ")")
        .text("Age (months)");

    // START: Dot handler
    function dotHandler(accessor) {
        return function (selection) {
            selection.on("mouseover", function (d, i) {
                // Select current dot, unselect others
                d3.selectAll("circle.dotSelected").attr("class", "dot");
                d3.select(this).attr("class", "dotSelected");

                // Update text using the accessor function
                var ttAccessor = accessor(d, i) || '';
                tooltipText.text(ttAccessor);

                // Update text background
                var dottedSegmentLength = 3;  // used below, too, for linesToAxis
                var tooltipHeightPadding = 5;
                var tooltipWidthPadding = 4;
                var bbox = svg.select(".tooltipText")[0][0].getBBox();
                svg.selectAll(".tooltipTextBackground")
                    .attr("width", bbox.width + tooltipWidthPadding * 2)
                    .attr("height", bbox.height + tooltipHeightPadding)
                    .attr("y", tooltipOffset - bbox.height)
                    .attr("x", tooltipOffset - tooltipWidthPadding);
                // .style("stroke-dasharray",
                //   dottedSegmentLength.toString()
                // );

                // create a rectangle that stretches to the axis, so it's easy to see if the axis is right..
                // Remove old
                linesToAxis.selectAll(".rect-to-axis")
                    .data([])
                    .exit().remove();

                // Add new
                var linesToAxisWidth = xScale(d[0]) - padding;
                var linesToAxisHeight = height - yScale(d[1]) - padding;
                var halfRectLength = linesToAxisWidth + linesToAxisHeight;
                halfRect = halfRectLength.toString();

                // Draw top and right sides of rectangle as dotted. Hide bottom and left sides
                var dottedSegments = Math.floor(halfRectLength / dottedSegmentLength);
                var nonDottedLength = halfRectLength * 2; // + (dottedSegments % dottedSegmentLength);

                var dashArrayStroke = [];

                for (var i = 0; i < dottedSegments; i++) {
                    dashArrayStroke.push(dottedSegmentLength);
                }
                // if even number, add extra filler segment to make sure 2nd half of rectangle is hidden
                if ((dottedSegments % 2) === 0) {
                    extraSegmentLength = halfRectLength - (dottedSegments * dottedSegmentLength);
                    dashArrayStroke.push(extraSegmentLength);
                    dashArrayStroke.push(nonDottedLength);
                } else {
                    // extraSegmentLength = halfRectLength - (dottedSegments*dottedSegmentLength);
                    dashArrayStroke.push(nonDottedLength);
                }

                linesToAxis.selectAll(".rect-to-axis")
                    .data([d])
                    .enter().append("rect")
                    .attr("class", "rect-to-axis")
                    .style("stroke-dasharray",
                        dashArrayStroke.toString()
                    )
                    .attr("x", padding)
                    .attr("y", yScale(d[1]))
                    .attr("width", linesToAxisWidth)
                    .attr("height", linesToAxisHeight);

            });
        };
    }
    // END: Dot handler

    // START: Tooltip function
    function getTooltipText(d) {
        var age_in_months = parseFloat(d[0]);
        var weight_in_kg = parseFloat(d[1]).toFixed(1);
        var textAge = 'Age: ' + getAgeText(age_in_months);

        var textweight = 'Weight: ' + weight_in_kg + 'kg';
        // change text based on chartType for tooltip
        // if (chartType == "hcfa_boys_0_to_5" || chartType == "hcfa_girls_0_to_5") {
        //     var textweight = 'Circumference: ' + weight_in_kg + 'cm';
        // }
        // else if (chartType == "lfa_girls_0_to_5" || chartType == "lfa_boys_0_to_5") {
        //     var textweight = 'Length: ' + weight_in_kg + 'cm';
        // }
        // else {
        //     var textweight = 'Weight: ' + weight_in_kg + 'kg';
        // }
        var text = textAge + '; ' + textweight;

        return text;
    }
    // END: Tooltip function

    // @param months - age in months (float)
    // @return - age (<years>y, <months>m) (string)

    function getAgeText(months) {
        var y = Math.floor(months / 12);
        var m = months - (y * 12);
        m = m.toFixed(1);

        if (y > 0) {
            return y + 'y, ' + m + 'm';
        } else {
            return m + 'm';
        }
    }

}


function getChartTitle(chartType) {
    var title;
    switch (chartType) {
        case 'girls_head_circumference_for_age_0_to_24_months':
            title = 'Head Circumference G 0 to 24 months'
            break;

        case 'girls_head_circumference_for_age_24_to_72_months':
            title = 'Head Circumference G 24 to 72 months'
            break;

        case 'girls_weight_for_age_0_to_24_months':
            title = 'Weight G 0 to 24 months'
            break;

        case 'girls_weight_for_age_24_to_72_months':
            title = 'Weight G 24 to 72 months'
            break;

        case 'girls_weight_for_age_4_to_18_years':
            title = 'Weight G 4 1o 18 years'
            break;

        case 'girls_height_for_age_0_to_24_months':
            title = 'Height G 0 to 24 months'
            break;

        case 'girls_height_for_age_24_to_72_months':
            title = 'Height G 24 to 72 months'
            break;

        case 'girls_height_for_age_4_to_18_years':
            title = 'Height G 4 to 18 years'
            break;

        case 'girls_bmi_0_to_24_months':
            title = 'BMI G 0-24 months'
            break;

        case 'girls_bmi_24_to_72_months':
            title = 'BMI G 24 to 72 months'
            break;

        case 'girls_bmi_6_to_18_years':
            title = 'BMI G 6 to 18 years'
            break;

        default:
            break;
    }

    return title;
}