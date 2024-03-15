import { useNavigate } from "react-router-dom";

export default function LoginBtn() {
  let navigate = useNavigate();

  const handleOnNavToLogin = () => {
    navigate("/login");
  };

  return (
    <button className="btn btn-ghost text-md" onClick={handleOnNavToLogin}>
      Login
    </button>
  );
}
