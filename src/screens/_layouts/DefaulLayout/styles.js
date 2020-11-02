import styled from "styled-components";
import Card from "@material-ui/core/Card";

export const CustomCard = styled(Card)`
  width: 100%;
  height: 100%;
  max-width: 405px;
  max-height: 720px;
  overflow: auto;
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
