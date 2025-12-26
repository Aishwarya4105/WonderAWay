import { useNavigate } from "react-router-dom";

export default function ProfileDropdown({ close }) {
  const navigate = useNavigate();

  const go = (path) => {
    close();        // close dropdown first
    navigate(path);
  };

  return (
    <div className="dropdown">
      <button onClick={() => go("/login")}>Login</button>

      <hr />

      <button onClick={() => go("/register/user")}>
        Register as User
      </button>

      <button onClick={() => go("/register/agency")}>
        Register as Agency
      </button>
    </div>
  );
}