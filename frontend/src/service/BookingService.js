import {myAxios, privateAxios} from "../config/cloud";

export const CalculateTotalAmount = (roomId, userId, fromDate, toDate) => {
    console.log(fromDate);
    return privateAxios
        .post(`${roomId}/booking/${userId}`,
            {
                startDate: fromDate,
                endDate: toDate
            })
        .then(response => response.data);
}

export const BookRoom = (userId, roomId, amount, days, discount, fromDate, toDate) => {
    console.log(userId, roomId, amount, days, discount, fromDate, toDate);
    return myAxios.post('/room-payment',
        {
            userId: userId,
            roomId: roomId,
            days: days,
            totalAmount: amount,
            discount: discount,
            startDate: fromDate,
            endDate: toDate
        })
        .then(response => response.data);
}