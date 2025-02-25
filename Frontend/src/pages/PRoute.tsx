import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {Navigate, useLocation, useNavigate} from "react-router-dom"
import { removeToken, reset } from "../app/authSlice";
import { jwtDecode } from "jwt-decode";
interface Props {
  children?: ReactNode;
  allowedRoles?: string[];
  // any props that come into the component
}

const ProtectedRoute = ({ children,allowedRoles }: Props) => {
  const { isLogin, token } = useAppSelector((state) => state.auth);
  const jwtToken = localStorage.getItem("jwtToken");
  const isAuthenticatedTwo = jwtToken !== null;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!isLogin) {
        return false;
      }

      try {
        const decodedToken: any = jwtDecode(jwtToken!);
        // console.log(decodedToken)
        // Get the expiration time from the decoded token
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
        // console.log(expirationTime)
        // Get the current time
        const currentTime = Date.now();

        // Check if the token is expired
        const isTokenExpired = expirationTime < currentTime;
        // console.log(isTokenExpired)
        return !isTokenExpired;
      } catch (error) {
        // Handle invalid or expired token
        return false;
      }
    };

    const checkUserRole = () => {
      if (!allowedRoles || allowedRoles.length === 0) {
        // No allowed roles specified, allow access
        return true;
      }

      const decodedToken: any = jwtDecode(jwtToken!);
      // console.log(decodedToken)
      const userRoles = decodedToken.roles || []; // Adjust this based on your JWT structure
      // console.log(userRoles)
      // Check if the user has any allowed role
      return allowedRoles.some((role) => userRoles.includes(role));
    };

    const handleAuthentication = async () => {
      try {
        if (!isLogin || !checkTokenExpiration()) {
          dispatch(reset());
          dispatch(removeToken());
          navigate("/login", { replace: true });
        } else if (allowedRoles && allowedRoles.length > 0 && !(await checkUserRole())) {
          navigate("/unauthorized", { replace: true });
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Authentication error');
        navigate("/error", { replace: true });
      }
    };

    handleAuthentication();
  }, [dispatch, isLogin, jwtToken, navigate,allowedRoles]);

  return loading ? null : children; // to prevent route leak during loading
};

export default ProtectedRoute;
