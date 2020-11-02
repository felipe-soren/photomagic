import styled from "styled-components";
import Webcam from "react-webcam";
import { IconButton, LinearProgress } from "@material-ui/core";

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

  .preview {
    background: #2f3240;
    width: 275px;
    height: 275px;
    border-radius: 14px;
    margin-top: 100px;
    position: relative;

    .overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      color: #fff;
      text-align: center;
    }

    video,
    img {
      height: 275px;
      width: 275px;
    }

    video {
      transform: rotateY(180deg);
      -webkit-transform: rotateY(180deg);
      -moz-transform: rotateY(180deg);
    }
  }

  .options-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .options {
      margin-top: 30px;
      display: flex;
      width: 200px;
      justify-content: space-between;

      .option {
        text-align: center;
        h1 {
          margin: 5px;
        }
      }
    }
  }
`;

export const CustomWebcam = styled(Webcam)`
  width: 100%;
  height: 100%;
`;

export const RoundedIconButton = styled(IconButton)`
  border-radius: 50%;
  width: 70px;
  height: 70px;
`;

export const ProgressBar = styled(LinearProgress)`
  width: 100%;
`;
