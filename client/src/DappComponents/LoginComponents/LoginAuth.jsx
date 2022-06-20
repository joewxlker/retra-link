import { Navigate } from "react-router-dom";

const useWithAuth = (Component) => {

  const AuthRoute = () => {
    const isAuth = !!localStorage.getItem('address', 'username');
    const isBool = !!localStorage.getItem('bool')
    console.log(isBool)
    if (isAuth) {
      return <Component />;
    } else {
      return <Navigate to="/Login" />;
    }
  };
  
    return AuthRoute;
};
  
export default useWithAuth