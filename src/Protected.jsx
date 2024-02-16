import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, children }) => {
    console.log("nav", isLoggedIn)
    if (!isLoggedIn) {
        console.log("nav2", isLoggedIn)
        return <Navigate to="/signin" replace />;
    }
    return children;
};
export default Protected;