const URL_ENDPOINT = {
    PORT: "4000",
    BASE_URL: "/api/room-book",
    LOGIN: "/login",
    SIGN_UP: "/create-user",
    FORGOT_PASSWORD: "/user/:userId/change-password",
    USERS: "/users",
    GET_BOOKED_ROOMS: "/booked-rooms",
    APPROVE_PAYMENT: "/payment-approve",
    ADD_ROOM: "/add-room/user/:userId",
    GET_ROOMS: "/rooms",
    GET_ROOM_BY_ID: "/room/:roomId",
    GET_USER_ROOMS: "/rooms/user/:userId",
    DELETE_USER_ROOM: "/room/:roomId/user/:userId",
    DELETE_ROOM_FROM_BOOKED_ROOM: '/delete/booked-room/:roomId/:startDate/:endDate',
    UPDATE_USER_ROOM: "/room/:roomId/user/:userId",
    CALCULATE_ROOM_RATE: "/:roomId/booking/:userId",
    BOOK_ROOM: "/room-payment",
    CHECK_IS_ROOM_BOOKED: "/booking-status/:roomId",
    GET_ROOM_RESERVED_DATES: '/rooms/dates/:roomId',
    GET_LIST_OF_ROOM_DATE: '/list/room/date/:roomId'
};

module.exports = URL_ENDPOINT;