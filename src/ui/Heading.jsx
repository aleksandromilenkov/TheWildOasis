/* eslint-disable-next-line */
import styled, { css } from "styled-components";

// this is creating a variables, must use the css function ! then you can include this prop in the styled.h1
// const test = css`
//   border-radius: ${num1 < num2 ? "50%" : "5%"};
// `;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1rem;
      font-weight: 600;
    `}
    background-color:yellow;
`;

export default Heading;
