const mongoose = require('mongoose');

const rooms = new mongoose.Schema({
    room_img_url: String,
    room_img_public_id: String,
    description: String,
    dimension: String,
    location: String,
    contact_no: String,
    user_id: String,
    additional_person_charges: String,
    charge_per_unit: String,
    wifi_facility: String,
    water_facility: String,
    washing_facility: String,
    total_rooms: String,
    room_type: String,
});

const room = mongoose.model('esp_rooms', rooms);
module.exports = room;
