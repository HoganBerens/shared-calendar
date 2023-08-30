import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <main>
      <h1>Auth Page</h1>
      {toggle ? (
        <div>
          <SignUpForm setUser={setUser} /> <button onClick={handleToggle}>Login</button>
        </div>
      ) : (
        <div>
          <LoginForm setUser={setUser} />
          <button onClick={handleToggle}>SignUp</button>
        </div>
      )}
    </main>
  );
}
