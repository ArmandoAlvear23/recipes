import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [cookies, _, removeCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    // Remove access_token cookie
    removeCookies("access_token");

    // Remove userID from local storage
    window.localStorage.removeItem("userID");

    // Navigate to the /auth page
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <>
          <Link to="/saved-recipes">Saved Recipes</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};
