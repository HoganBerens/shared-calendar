import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <main className="auth-main">
      <h1>Auth Page</h1>
      {toggle ? (
        <div className="auth-wrapper">
          <SignUpForm setUser={setUser} />{" "}
          <button className="auth-button" onClick={handleToggle}>
            Login
          </button>
        </div>
      ) : (
        <div className="auth-wrapper">
          <LoginForm setUser={setUser} />
          <button className="auth-button" onClick={handleToggle}>
            SignUp
          </button>
        </div>
      )}
    </main>
  );
}
