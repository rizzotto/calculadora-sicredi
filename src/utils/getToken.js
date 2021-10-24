import jwt from "jsonwebtoken";

export default function getToken() {
    const token = window.localStorage.getItem("token");
    return jwt.decode(token);
}
