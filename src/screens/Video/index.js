import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import ItemsCarousel from "react-items-carousel";
import { ThumbUpAlt, ThumbDownAlt } from "@material-ui/icons";
import api from "../../api";

import {
  Container,
  CustomWebcam,
  RoundedIconButton,
  ProgressBar,
} from "./styles";

const videoConstraints = {
  width: 275,
  height: 275,
  facingMode: "user",
};

const urls = [
  "https://photomagic-store.s3.us-east-2.amazonaws.com/assets/11111.png",
  "https://photomagic-store.s3.us-east-2.amazonaws.com/assets/637391865284584100.png",
  "https://photomagic-store.s3.us-east-2.amazonaws.com/assets/637391865288177834.png",
  "https://photomagic-store.s3.us-east-2.amazonaws.com/assets/637391865291927826.png",
];

function Video({ navigate, type, setUrl }) {
  const [activeItemIndex, setActiveItemIndex] = React.useState(0);
  const [activeOverlay, setActiveOverlay] = React.useState(
    "https://photomagic-store.s3.us-east-2.amazonaws.com/assets/11111.png"
  );
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [progress, setProgress] = React.useState(0);
  const [video, setVideo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!capturing) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [capturing]);

  const webcamRef = React.useRef(null);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    setProgress(0);
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  React.useEffect(() => {
    if (progress === 100) return handleStopCaptureClick();
  }, [progress]);

  React.useEffect(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      setVideo(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const upload = async () => {
    const blob = await fetch(video).then((res) => res.blob());

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("url", blob, "test.jpg");
      formData.append("overlay", activeOverlay);

      const { data } = await api.post(`${type}`, formData);

      setUrl(data.res);
      navigate("shareOptions");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="preview">
        {video ? (
          <video autoPlay src={video} alt="" loop />
        ) : (
          <CustomWebcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            screenshotQuality={1}
            ref={webcamRef}
            mirrored
          />
        )}
        <div className="overlay">
          <img src={activeOverlay} />
        </div>
        <div className="progress">
          {capturing && <ProgressBar value={progress} variant="determinate" />}
        </div>
      </div>
      {!video && (
        <>
          <h1>ESCOLHA UMA MOLDURA</h1>

          <div style={{ padding: `0 ${10}px`, width: 275, marginTop: 30 }}>
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={3}
              gutter={20}
              leftChevron={<button>{"<"}</button>}
              rightChevron={<button>{">"}</button>}
              outsideChevron
              chevronWidth={10}
            >
              {urls.map((img) => {
                return (
                  <div
                    style={{ height: 65, width: 65 }}
                    onClick={() => setActiveOverlay(img)}
                  >
                    <img
                      src={img}
                      alt="teste"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                );
              })}
            </ItemsCarousel>
          </div>

          {capturing ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleStopCaptureClick}
              style={{ marginTop: 40 }}
            >
              Encerrar
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleStartCaptureClick}
              style={{ marginTop: 40 }}
            >
              CAPTURAR
            </Button>
          )}
        </>
      )}
      {video && (
        <div className="options-container">
          <h1>FICOU DEMAIS</h1>
          {loading ? (
            <div
              className="loading-container"
              style={{ textAlign: "center", width: "100%" }}
            >
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div className="options">
              <div className="option">
                <RoundedIconButton onClick={upload}>
                  <ThumbUpAlt />
                </RoundedIconButton>
                <h1>GOSTEI</h1>
              </div>
              <div className="option">
                <RoundedIconButton
                  onClick={() => {
                    setVideo(null);
                    setRecordedChunks([]);
                  }}
                >
                  <ThumbDownAlt />
                </RoundedIconButton>
                <h1>QUERO REFAZER</h1>
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default Video;
