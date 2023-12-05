const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const jwt = require('jsonwebtoken');
// const db = require('./database');
const END_POINT = require('./globalContants');
const {errors} = require("formidable");
const ROOM = require("./schemas/rooms");
const ROOM_DETAIL = require("./schemas/room_detail");
const ROOM_PRICE = require("./schemas/room_price");
const BOOKED_ROOMS = require("./schemas/booked_rooms");
const USER = require("./schemas/user");
const mongoose = require("mongoose");

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dyhuht5kj",
    api_key: "637927817868136",
    api_secret: "SHWcKEFwziwWJxupOTKU8BZ7U7k",
});

// Configure Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// JWT Secret Key
const secretKey = 'r0omB0ok!';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
        return res.status(401).json({status: false, error: 'Unauthorized: Token missing'});
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({status: false, error: 'Unauthorized: Token expired or invalid'});
        }

        req.user = decoded;
        next();
    });
};

// ADD ROOM POST API
router.post(END_POINT.ADD_ROOM, verifyToken, upload.single('image'), async (req, res) => {
    console.log(new Date(), "===== Post request received =====");

    try {
        const file = req.file;
        const userId = req.params.userId;

        const {
            description, dimensions, location, contact_no, additional_person_charges,
            charge_per_unit, wifi_facility, water_facility, washing_facility,
            total_rooms, room_type
        } = req.body;

        if (!file) {
            return res.status(400).json({message: 'No file uploaded'});
        }

        // Check if required data is provided
        if (!description || !dimensions || !location || !contact_no) {
            return res.status(400).json({status: false, error: 'Enter the required data'});
        }

        // const {
        //     secure_url: imageUrl,
        //     public_id: publicId
        // } = await cloudinary.uploader.upload(file.path, {resource_type: 'auto'});

        const {imageUrl, publicId} = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: 'auto'}, (error, result) => {
                if (error) {
                    // console.error(new Date(), 'Error uploading file to Cloudinary:', error);
                    reject(error);
                } else {
                    // console.log('File uploaded successfully to Cloudinary:', result);
                    const imageUrl = result.secure_url;
                    const publicId = result.public_id;
                    resolve({imageUrl, publicId});
                }
            }).end(file.buffer);
        });

        console.log("===== Room image successfully uploaded to cloud ===== ");

        const room = new ROOM({
            room_img_url: imageUrl,
            room_img_public_id: publicId,
            description: description,
            dimensions: dimensions,
            location: location,
            user_id: userId,
            contact_no: contact_no,
            additional_person_charges: additional_person_charges,
            charge_per_unit: charge_per_unit,
            wifi_facility: wifi_facility,
            water_facility: water_facility,
            washing_facility: washing_facility,
            total_rooms: total_rooms,
            room_type: room_type
        });

        const savedRoom = await room.save();

        console.log("Room added with id: ", savedRoom._id);

        // const roomDetail = new ROOM_DETAIL({
        //     wifi_facility: wifi_facility,
        //     water_facility: water_facility,
        //     washing_facility: washing_facility,
        //     total_rooms: total_rooms,
        //     room_id: savedRoom._id,
        //     room_type: room_type
        // });
        //
        // const savedRoomDetail = await roomDetail.save();

        console.log("Room record added successfully");

        res.status(200).json({status: true, imageUrl, publicId});

        console.log("===== Room record saved in the database ===== ");

    } catch (error) {
        console.log("===== Exception ===== ");
        console.error(error);
        res.status(500).send("Error writing data to MongoDB");
        console.log("===== Send error response =====");
    }
});

// GET ROOM POST DETAIL API
router.get(END_POINT.GET_ROOMS, async (req, res) => {

    const roomDetail = req.query.roomdetail;
    console.log(roomDetail);
    console.log(new Date(), ' Get Room Detail Request =====');

    try {
        const allRooms = await ROOM.find();
        res.status(200).json({status: true, data: allRooms});
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({error: 'Internal server error'});
    }

});

// GET ROOM POST DETAIL BY ID API
router.get(END_POINT.GET_ROOM_BY_ID, async (req, res) => {
    // const roomId = req.params.roomId;

    const roomId = req.params.roomId;

    try {
        const roomDetail = await ROOM.findById(roomId);

        if (!roomDetail) {
            return res.status(404).json({error: 'Room not found'});
        }

        res.status(200).json({status: true, data: roomDetail});
    } catch (error) {
        console.error('Error fetching room details:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});


// GET ROOM POST DETAIL BY USER API
router.get(END_POINT.GET_USER_ROOMS, async (req, res) => {
    // Fetch all rooms from the database
    const userId = req.params.userId;

    try {
        const roomDetail = await ROOM.find({user_id: userId});

        if (!roomDetail) {
            return res.status(404).json({error: 'Room not found'});
        }

        res.status(200).json({status: true, data: roomDetail});
    } catch (error) {
        console.error('Error fetching room details:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// DELETE ROOM POST BY USER API
router.delete(END_POINT.DELETE_USER_ROOM, verifyToken, async (req, res) => {
    const roomId = req.params.roomId;
    const userId = req.params.userId;

    // delete data from cloudinary
    cloudinary.uploader.destroy(roomId, (error, result) => {
        if (error) {
            console.error('Error deleting image: ', error);
        } else {
            console.log('Image deleted successfully: ', result);
        }
    });

    // Perform the delete operation in the database
    try {
        const result = await ROOM.deleteOne({room_img_public_id: roomId, user_id: userId});

        if (result.deletedCount === 0) {
            // No rooms were deleted, meaning the room with the given ID and user ID was not found
            return res.status(404).json({error: 'Room not found'});
        }

        res.json({success: true, message: 'Room deleted successfully'});
    } catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// UPDATE ROOM POST BY USER API
router.put(END_POINT.UPDATE_USER_ROOM, verifyToken, upload.single('image'), async (req, res) => {
    // Parameters
    const file = req.file;
    const roomId = req.params.roomId;
    const userId = req.params.userId;
    let imageUrl, publicId;

    const {
        description, dimensions, location, contact_no, additional_person_charges,
        charge_per_unit, wifi_facility, water_facility, washing_facility,
        total_rooms, room_type
    } = req.body;

    try {
        // Find the current room record
        const currentRoom = await ROOM.findOne({_id: roomId, user_id: userId});

        if (!currentRoom) {
            return res.status(404).json({status: false, data: 'No record found'});
        }

        // Get existing image details
        imageUrl = currentRoom.room_img_url;
        publicId = currentRoom.room_img_public_id;

        // If a new file is provided, update image on Cloudinary
        if (file) {
            // Delete existing image from Cloudinary
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    console.error('Error deleting image:', error);
                } else {
                    console.log('Image deleted successfully:', result);
                }
            });

            // Upload new image to Cloudinary
            const uploadResult = await cloudinary.uploader.upload_stream({resource_type: 'auto'}, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    imageUrl = result.secure_url;
                    publicId = result.public_id;
                }
            }).end(file.buffer);
        }

        console.log('Room image successfully uploaded to Cloudinary');

        // Update room
        const updatedRoom = await ROOM.findOneAndUpdate(
            {_id: roomId, user_id: userId},
            {
                room_img_url: imageUrl,
                room_img_public_id: publicId,
                description,
                dimensions,
                location,
                contact_no,
                additional_person_charges,
                charge_per_unit,
                wifi_facility,
                water_facility,
                washing_facility,
                total_rooms,
                room_type,
            },
            {new: true}
        );

        // Update room details
        // const updatedRoomDetail = await RoomDetail.findOneAndUpdate(
        //     {room_id: roomId},
        //     {
        //         wifi_facility,
        //         water_facility,
        //         washing_facility,
        //         total_rooms,
        //         room_type,
        //     },
        //     {new: true}
        // );

        console.log('Room updated with id:', roomId);
        res.status(200).json({success: true, data: 'Record updated successfully!'});
    } catch (error) {
        console.error('Error updating room:', error);
        res.status(500).json({error: 'Error updating room'});
    }
});


router.post('/upload', upload.array('images', 5), async (req, res) => {

    console.log(new Date(), " Post request receieved");
    const images = req.files;

    const imageUrls = [];

    try {
        for (const image of images) {
            // Upload to Cloudinary
            const {imageUrl, publicId} = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({resource_type: 'auto'}, (error, result) => {
                    if (error) {
                        // console.error(new Date(), 'Error uploading file to Cloudinary:', error);
                        reject(error);
                    } else {
                        // console.log('File uploaded successfully to Cloudinary:', result);
                        const imageUrl = result.secure_url;
                        const publicId = result.public_id;
                        resolve({imageUrl, publicId});
                    }
                }).end(image.buffer);
            });

            console.log("Image uploaded: ", imageUrl);
        }

        res.json({success: true, imageUrls});
    } catch (error) {
        console.error('Error uploading and saving images:', error);
        res.status(500).json({success: false, error: 'Internal Server Error'});
    }
});

router.post(END_POINT.CALCULATE_ROOM_RATE, verifyToken, async (req, res) => {

    console.log(new Date(), "Calculate room rate");

    // Assuming the request body contains 'startDate' and 'endDate' in the format 'YYYY-MM-DD'
    const {startDate, endDate} = req.body;
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    const currentDate = new Date(startDate);
    const toDate = new Date(endDate);

    if (toDate < currentDate) {
        return res.json({status: false, data: 'start date is greater than end date'});
    } else {

        if (!startDate || !endDate) {
            res.status(401).json({status: false, data: 'startDate and endDate are required!'});
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        console.log(numberOfDays);
        let query;

        // Build the Mongoose query based on the number of days
        if (numberOfDays > 0 && numberOfDays <= 7) {
            query = 7;
            const roomPriceDetail = await ROOM_PRICE.findOne({days: numberOfDays});
        } else if (numberOfDays > 7 && numberOfDays <= 30) {
            query = 30;
        } else if (numberOfDays > 30 && numberOfDays <= 90) {
            query = 90;
        } else if (numberOfDays > 90 && numberOfDays <= 180) {
            query = 180;
        } else if (numberOfDays > 180) {
            query = 180;
        }

        console.log("Query:", query);
        const roomPriceDetail = await ROOM_PRICE.findOne({days: query});
        if (!roomPriceDetail) {
            return res.status(404).json({error: 'Room price detail not found'});
        }

        const response = {
            roomId: "",
            rent_per_day: "",
            days: "",
            number_of_days: "",
            rent: "",
            discount: "",
            amount_after_discount: ""

        };
        const originalAmount = roomPriceDetail.rent * numberOfDays;
        const discountPercentage = roomPriceDetail.discount;
        const discountAmount = (originalAmount * discountPercentage) / 100;
        const amountAfterDiscount = originalAmount - discountAmount;

        response.roomId = roomPriceDetail._id;
        response.rent_per_day = roomPriceDetail.rent;
        response.days = roomPriceDetail.days;
        response.number_of_days = numberOfDays;
        response.rent = originalAmount;
        response.discount = discountPercentage;
        response.amount_after_discount = originalAmount;


        res.status(200).json({status: true, data: response});
    }
});

router.post(END_POINT.BOOK_ROOM, async (req, res) => {

    const {userId, roomId, days, discount, totalAmount, startDate, endDate} = req.body;

    if (!userId || !roomId || !days || !totalAmount) {
        return res.status(400).json({status: false, error: 'Room is not booked!'});
    }

    try {
        const overlappingBooking = await BOOKED_ROOMS.findOne({
            room_id: roomId,
            $or: [
                {
                    start_date: {$lte: endDate},
                    end_date: {$gte: startDate}
                },
                {
                    start_date: {$gte: startDate},
                    end_date: {$lte: endDate}
                }
            ]
        });

        if (overlappingBooking) {
            return res.status(400).json({status: false, data: 'Room already booked for the selected dates'});
        }

        const foundUser = await USER.findById(userId);

        if (!foundUser) {
            console.error('User not found');
            return res.status(400).json({status: false, error: 'User not found!'});
        }

        let foundUsername = foundUser.name;

        const foundRoom = await ROOM.findById(roomId);

        if (!foundRoom) {
            console.error('Room not found');
            return res.status(400).json({status: false, error: 'Room not found!'});
        }

        let foundRoomType = foundRoom.room_type;

        // Display the username in the console
        console.log('Username:', foundUsername);
        // Display the room type in the console
        console.log('Room Type:', foundRoomType);

        // Create a new BookedRoom instance
        const bookedRoom = new BOOKED_ROOMS({
            user_name: foundUsername,
            user_id: userId,
            room_type: foundRoomType,
            room_id: roomId,
            days: days,
            total_amount: totalAmount,
            discount: discount,
            payment_status: "0",
            start_date: startDate,
            end_date: endDate,
        });

        // Save the bookedRoom instance to the database
        const savedBooking = await bookedRoom.save();

        res.status(200).json({status: true, data: savedBooking});
    } catch (error) {
        console.error('Error saving booked room:', error);
        res.status(500).json({status: false, data: 'Error saving booked room'});
    }
});

router.get(END_POINT.CHECK_IS_ROOM_BOOKED, async (req, res) => {
    const roomId = req.params.roomId;

    try {
        // Count the number of booked rooms with the specified room_id
        const bookingCount = await BOOKED_ROOMS.countDocuments({room_id: roomId});

        // Determine the status based on the count
        const status = (bookingCount > 0) ? 'Booked' : 'Available';

        res.status(200).json({status: true, data: {Status: status}});
    } catch (error) {
        console.error('Error checking booking status:', error);
        res.status(500).json({status: false, data: 'Error checking booking status'});
    }
});


router.delete(END_POINT.DELETE_ROOM_FROM_BOOKED_ROOM, verifyToken, async (req, res) => {

    const roomId = req.params.roomId;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    console.log('RoomId: ' + roomId);

    if (!roomId) {
        return res.status(400).json({status: false, data: 'roomId is required!'});
    }

    try {
        // Find and delete the booked room with the specified room_id, start_date, and end_date
        const result = await BOOKED_ROOMS.deleteOne({room_id: roomId, start_date: startDate, end_date: endDate});

        if (result.deletedCount === 0) {
            return res.status(404).json({status: false, data: 'Record not found or already deleted'});
        }

        res.status(200).json({status: true, data: result});
    } catch (error) {
        console.error('Error deleting booked room:', error);
        res.status(500).json({status: false, data: 'Error deleting booked room'});
    }
})

router.get(END_POINT.GET_ROOM_RESERVED_DATES, async (req, res) => {

    console.log(new Date(), 'Get room reserved dates');

    const roomId = req.params.roomId;
    console.log("roomId: " + roomId);

    try {
        // Find the oldest and latest dates for the specified room_id
        const result = await BOOKED_ROOMS.aggregate([
            {$match: {room_id: roomId}},
            {
                $group: {
                    _id: null,
                    oldest_date: {$min: "$start_date"},
                    latest_date: {$max: "$end_date"}
                }
            }
        ]);

        const dates = result[0];
        if (!dates || !dates.oldest_date) {
            return res.status(200).json({status: false, data: 'Record not found!'});
        }

        res.status(200).json({status: true, data: dates});
    } catch (error) {
        console.error('Error getting reserved dates:', error);
        res.status(500).json({status: false, data: 'Error getting reserved dates'});
    }

});

router.get(END_POINT.GET_LIST_OF_ROOM_DATE, async (req, res) => {

    console.log(new Date(), 'Get list of reserved room dates');

    const roomId = req.params.roomId;
    console.log("roomId: " + roomId);

    try {
        // Find all documents matching the specified room_id
        const result = await BOOKED_ROOMS.find({room_id: roomId}, {start_date: 1, end_date: 1, _id: 0});

        if (!result || result.length === 0) {
            return res.status(200).json({status: false, data: []});
        }

        const formattedDatesArray = result.map(item => {
            const {start_date, end_date} = formatDates(item.start_date, item.end_date);
            return {start_date, end_date};
        });

        console.log(formattedDatesArray)

        res.status(200).json({status: true, data: formattedDatesArray});
    } catch (error) {
        console.error('Error getting reserved room dates:', error);
        res.status(500).json({status: false, data: 'Error getting reserved room dates'});
    }

});

function formatDates(startDate, endDate) {
    const start_date = new Date(startDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    const end_date = new Date(endDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    return {start_date, end_date};
}

module.exports = router;