const mongoose = require('mongoose');

const roomDetail = new mongoose.Schema({
    wifi_facility: String,
    water_facility: String,
    washing_facility: String,
    total_rooms: String,
    room_id: String,
    room_type: String,
});

const room_detail = mongoose.model('esp_room_detail', roomDetail);
module.exports = room_detail;
