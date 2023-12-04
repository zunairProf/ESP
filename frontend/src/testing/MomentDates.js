import React, { useState } from 'react';
import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';

const DateSelectionComponent = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    // Example: Format dates as MM/DD/YYYY
    const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD') : '';
    const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DD') : '';

    // Example: Calculate the difference in days between startDate and endDate
    const daysDifference = startDate && endDate ? moment(endDate).diff(moment(startDate), 'days') : null;

    return (
        <div>
            <div>
                <label>Start Date:</label>
                <input
                    type="date"
                    value={startDate ? moment(startDate).format('YYYY-MM-DD') : ''}
                    onChange={(e) => handleStartDateChange(moment(e.target.value))}
                />
            </div>
            <div>
                <label>End Date:</label>
                <input
                    type="date"
                    value={endDate ? moment(endDate).format('YYYY-MM-DD') : ''}
                    onChange={(e) => handleEndDateChange(moment(e.target.value))}
                />
            </div>
            {startDate && endDate && (
                <div>
                    <p>Formatted Start Date: {formattedStartDate}</p>
                    <p>Formatted End Date: {formattedEndDate}</p>
                    <p>Days difference: {daysDifference} days</p>
                </div>
            )}
        </div>
    );
};

export default DateSelectionComponent;
