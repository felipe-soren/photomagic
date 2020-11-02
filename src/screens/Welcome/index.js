import React from "react";
import Button from "@material-ui/core/Button";

import { Container } from "./styles";

function Welcome({ navigate }) {
  return (
    <Container>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        onClick={() => navigate("optionScreen")}
      >
        Começar
      </Button>
    </Container>
  );
}

export default Welcome;
