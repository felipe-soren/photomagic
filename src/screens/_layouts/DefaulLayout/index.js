import React from "react";

import { CustomCard, Container } from "./styles";

function DefaulLayout({ children }) {
  return (
    <Container>
      <CustomCard>{children}</CustomCard>
    </Container>
  );
}

export default DefaulLayout;
