import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./router/AppRoutes.jsx";
import { fetchCurrentUser } from "./features/auth/authSlice.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // tries to read current user from backend using cookie
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;
