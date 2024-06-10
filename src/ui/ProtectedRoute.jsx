import React, { useEffect } from "react";
import useUser from "../features/authentication/useUser";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  // 1. Load atuthenticated user
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // 3. If there is NO authorized user, redirect to /login page
  // we cannot call navigate in the top level of the component, that's why we are using it in useEffect
  // also we cannot call useEffect after condition checking for if(isLoading), so we place that spinner check down
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );
  // 2. While loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a user, render the app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
