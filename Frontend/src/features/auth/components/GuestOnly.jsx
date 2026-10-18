import { Navigate } from "react-router";
import LoadingScreen from "../../../components/LoadingScreen";
import { useAuth } from "../hooks/useAuth";

const GuestOnly = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingScreen message="Checking your account..." />;
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestOnly;
