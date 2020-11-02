import React from "react";
import { CameraAlt, Videocam, Gif } from "@material-ui/icons";
import placeholder from "../../assets/placeholder.png";

import { Preview, Container, RoundedIconButton } from "./styles";

const videoConstraints = {
  width: 275,
  height: 275,
  facingMode: "user",
};

function OptionScreen({ navigate, setType }) {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <Container>
      <Preview
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        screenshotQuality={1}
        mirrored
      />
      <h1>ESCOLHA UMA OPÇÃO</h1>

      <div className="options-container">
        <div className="option">
          <RoundedIconButton onClick={() => navigate("photo")}>
            <CameraAlt />
          </RoundedIconButton>
          <h1>FOTO</h1>
        </div>
        <div className="option">
          <RoundedIconButton
            onClick={() => {
              navigate("video");
              setType("video");
            }}
          >
            <Videocam />
          </RoundedIconButton>
          <h1>VIDEO</h1>
        </div>
        <div className="option">
          <RoundedIconButton
            onClick={() => {
              navigate("video");
              setType("gif");
            }}
          >
            <Gif />
          </RoundedIconButton>
          <h1>GIF</h1>
        </div>
      </div>
    </Container>
  );
}

export default OptionScreen;
