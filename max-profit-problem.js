//                      T   S   M

// Theatres -           5   2   1500
// Pubs -               4   1   1000
// Commercial Park -    10  3   3000

/*
Time - 7u
T:1 P:0 C:0 ---> (7-5)*15 = 30
T:0 P:1 C:0 ---> (7-4)*10 = 30

Time - 13u
T:2 P:0 C:0 ---> (13-5)*15 + ((13-5)-5)*15 = 165 --- MAX
T:0 P:3 C:0 ---> (13-4)*10 + ((13-4)-4)*10 + (((13-4)-4)-4)*10 = 90+50+10 = 150
T:0 P:0 C:1 ---> (13-10)*30 = 90
*/


/*
LOGIC - If time is given 13u, my choices are:
1. Building 2 theatres one by one. So first one will be ready after 5 days and have 8 days to earn money.
2nd one will be build after total 10 days and have 3 more days to earn.

So overall, I am looping through all three properties. And in each I am trying to build maximum properties.
And in remaining days, I am adding money made by each property.
*/

// Sample data
const properties = {
    "theatre": {
        time: 5,
        space: 2,
        earning: 1500
    },
    "pub": {
        time: 4,
        space: 1,
        earning: 1000
    },
    "commercialPark": {
        time: 10,
        space: 3,
        earning: 3000
    }
};

// Store profits made by each property
const profits = {};

function getMaxProfit(time) {

    // After building a property, time will decrease
    // So keeping a dynamic time here
    let dynTime;


    // Iterating over all properties
    for (let property in properties) {

        // Initially dynamic time is same as total tme for each property
        dynTime = time;

        // Initialize earnings of a specific property from 0
        profits[property] = { earnings: 0, num: 0, key: property[0].toUpperCase() };

        // Building max number of each property in the given time frame
        // Remaining time should be a positive value
        while (dynTime - properties[property].time > 0) {
            profits[property].num++;

            // Profit made by the current building will be
            // Remaining time multiplied by earning per day
            profits[property].earnings += (dynTime - properties[property].time) * properties[property].earning;

            // After building a property done, time will decrease
            dynTime -= properties[property].time;
        }
    }

    // Constructing Solution String
    let maxEarnings = 0, maxProperties = [];

    // Get the property making maximum profit
    // If multiple properties making same maximum profit
    // Then store them into array
    for (let profit in profits) {
        if (profits[profit].earnings > maxEarnings) {
            maxEarnings = profits[profit].earnings;
            maxProperties[0] = profit;
        }
        else if (profits[profit].earnings == maxEarnings)
            maxProperties.push(profit);
    }

    // Construct string with combination of property keys
    let solution = maxProperties.map(property => {
        const solObj = { T: 0, P: 0, C: 0 };
        solObj[profits[property].key] = profits[property].num;

        return solObj;
    });

    return solution;
}

console.log("7 --->", getMaxProfit(7));
console.log("8 --->", getMaxProfit(8));
console.log("13 --->", getMaxProfit(13));