import {myAxios, privateAxios} from "../config/cloud";

export const getRooms = () => {
    return myAxios.get("/rooms")
        .then((response) =>
            response.data.data
        );
}

export const getRoomById = (roomId) => {
    return myAxios.get("/room/" + roomId)
        .then(response => response.data.data);
}


export const getRoomBookingStatus = (roomId) => {
    return myAxios.get('/booking-status/' + roomId)
        .then(resposne => resposne.data.data[0]);
}

export const postRoomData = (formData, userId) => {
    return privateAxios.post(`/add-room/user/${userId}`, formData)
        .then(response => response.data);
}

export const deleteRoomFromBookedList = (roomId, startDate, endDate) => {
    console.log(roomId, startDate, endDate);
    return privateAxios.delete(`/delete/booked-room/${roomId}/${startDate}/${endDate}`)
        .then(response => response.data);
}

export const getRoomReservedDates = (roomId) => {
    return myAxios.get(`/rooms/dates/${roomId}`)
        .then(response => response.data.data);
}

export const getRoomDates = (roomId) => {
    return myAxios.get(`/list/room/date/${roomId}`)
        .then(response => response.data.data);
}