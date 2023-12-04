import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {isAdmin} from "../service/userservice";

const PrivateRoutes = () => {
    return isAdmin() ? <Outlet/> : <Navigate to={"/"}/>
};
export default PrivateRoutes;
