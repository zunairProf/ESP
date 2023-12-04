import {myAxios} from "../config/cloud";


export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data != null) {
        return true;
    } else {
        return false;
    }
};
export const loginUser = (loginDetail) => {
    return myAxios
        .post("/login", loginDetail)
        .then((response) => response.data);
};

export const doLogin = (data, next) => {
    const secretPass = "XkhZG4fW2t2W";
    // const data1 = CryptoJS.AES.encrypt(JSON.stringify(data), secretPass).toString();
    localStorage.setItem("data", JSON.stringify(data));
    next();
};

export const doLogout = (next) => {
    localStorage.removeItem("data");
    next();
};

export const getUserDetail = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data"));
    } else {
        return undefined;
    }
}

export const getUserListForAdmin = () => {
    return myAxios.get('/booked-rooms')
        .then(response => response.data.bookedRooms);
}

export const isAdmin = () => {
    const data = localStorage.getItem("data");
    if (data != null) {
        if (JSON.parse(localStorage.getItem("data")).data.userRole === 'ADMIN') {
            return true;
        }
    }
    return false;
}

export const getToken = () => {
    // const secretPass = "XkhZG4fW2t2W";
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).data.token;
        // const bytes = CryptoJS.AES.decrypt(data, secretPass);
        // const decode_data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // return decode_data.token;
    } else {
        return null;
    }
};

export const SignUp = (userData) => {
    console.log(userData);
    return myAxios
        .post('/create-user', userData)
        .then(response => response.data);
}