const mongoose = require('mongoose');

const roomPriceSchema = new mongoose.Schema({
    days: String,
    rent: String,
    discount: String,
});

const RoomPrice = mongoose.model('esp_room_price', roomPriceSchema);

// Example data for multiple records
const roomPricesData = [
    {days: '7', rent: '3000', discount: '0'},
    {days: '30', rent: '2100', discount: '30'},
    {days: '90', rent: '1800', discount: '40'},
    {days: '180', rent: '1500', discount: '50'},
    // Add more records as needed
];

// Save multiple records
// RoomPrice.create(roomPricesData)
//     .then(roomPrices => {
//         console.log('Room prices saved successfully:', roomPrices);
//     })
//     .catch(err => {
//         console.error('Error saving room prices:', err);
//     });
module.exports = RoomPrice;

