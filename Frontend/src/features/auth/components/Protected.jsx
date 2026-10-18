import {useAuth} from "../hooks/useAuth";
import {Navigate} from "react-router";
import LoadingScreen from "../../../components/LoadingScreen";


const Protected = ({children}) => {
    const {user, loading} = useAuth();

    if(loading){
        return <LoadingScreen message="Checking your account..." />
    }

    if(!user){
        return <Navigate to={"/login"} />
    }

    return children;
}

export default Protected;