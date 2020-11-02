import styled from "styled-components";
import { IconButton } from "@material-ui/core";

export const RoundedButton = styled(IconButton)`
  border-radius: 50%;
  width: 70px;
  height: 70px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 14px;
  }
`;
