const mongoose = require('mongoose');

const bookedRooms = new mongoose.Schema({
    user_name: String,
    user_id: String,
    room_type: String,
    room_id: String,
    days: String,
    total_amount: String,
    discount: String,
    payment_status: Number,
    start_date: String,
    end_date: String,
});

const booked_rooms = mongoose.model('esp_booked_rooms', bookedRooms);
module.exports = booked_rooms;

