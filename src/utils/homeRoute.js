export default function handleRoute(role) {
    if (role === "associate") {
        return "/";
    } else if (role === "coop") {
        return "/coop";
    } else {
        return "/admin";
    }
}
