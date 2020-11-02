import styled from "styled-components";
import Webcam from "react-webcam";
import { IconButton } from "@material-ui/core";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  h1 {
    margin-top: 30px;
    font-size: 14px;
  }

  .options-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;

    .option {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 109px;

      h1 {
        margin-top: 0;
      }
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: #fff;
    text-align: center;
  }

  img {
    height: 100%;
  }
`;

export const Preview = styled(Webcam)`
  background: #2f3240;
  width: 275px;
  height: 275px;
  border-radius: 14px;
  margin-top: 100px;
`;

export const RoundedIconButton = styled(IconButton)`
  border-radius: 50%;
  width: 70px;
  height: 70px;
`;
