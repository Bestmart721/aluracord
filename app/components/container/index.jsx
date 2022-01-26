import { GlobalStyle } from "../../style";

export function Container({ children }) {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
}
