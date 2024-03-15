import { useNavigate } from "react-router-dom";

export default function LogoutBtn() {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  return (
    <button className="btn btn-error" onClick={handleLogout}>
      Logout
    </button>
  );
}
