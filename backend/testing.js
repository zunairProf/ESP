function isEndDateGreaterThanStartDate(startDate, endDate) {
    // Convert the date strings to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Compare the dates
    return endDateObj > startDateObj;
}

// Example usage:
const startDate = "2023-11-15"; // Replace this with your start date
const endDate = "2023-11-30"; // Replace this with your end date

if (isEndDateGreaterThanStartDate(startDate, endDate)) {
    console.log("End date is greater than start date");
} else {
    console.log("End date must be greater than start date");
}