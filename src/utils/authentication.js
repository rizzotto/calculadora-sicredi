import jwt from "jsonwebtoken";
import moment from "moment";

export const isAuthenticated = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
        const decodedToken = jwt.decode(token);
        if (moment().isAfter(decodedToken.exp * 1000)) {
            window.localStorage.removeItem("token");
            return false;
        }
        return true;
    }
    return false;
};
