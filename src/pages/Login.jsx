import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useState } from "react";
import SignupForm from "../features/authentication/SignupForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const ChangeLink = styled.span`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Login to your account</Heading>
      {isLogin ? <LoginForm /> : <SignupForm />}
      {isLogin ? (
        <p>
          Don't have an account?{" "}
          <ChangeLink onClick={() => setIsLogin(false)}>
            Register here
          </ChangeLink>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <ChangeLink onClick={() => setIsLogin(true)}>Login here</ChangeLink>
        </p>
      )}
    </LoginLayout>
  );
}

export default Login;
