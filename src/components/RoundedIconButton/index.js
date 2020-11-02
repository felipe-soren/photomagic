import React from "react";

import { Container, RoundedButton } from "./styles";

function RoundedIconButton(props) {
  const { children, label } = props;

  return (
    <Container>
      <RoundedButton {...props}>{children}</RoundedButton>
      {label && <h1>{label}</h1>}
    </Container>
  );
}

export default RoundedIconButton;
