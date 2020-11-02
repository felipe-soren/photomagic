import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import ItemsCarousel from "react-items-carousel";
import { ThumbUpAlt, ThumbDownAlt } from "@material-ui/icons";
import api from "../../api";

import { Container, CustomWebcam, RoundedIconButton } from "./styles";

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

function Photo({ navigate, setUrl }) {
  const [photo, setPhoto] = React.useState();
  const [activeItemIndex, setActiveItemIndex] = React.useState(0);
  const [activeOverlay, setActiveOverlay] = React.useState(
    "https://photomagic-store.s3.us-east-2.amazonaws.com/assets/11111.png"
  );
  const [loading, setLoading] = React.useState(false);

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1280,
      height: 1280,
    });
    setPhoto(imageSrc);
  }, [webcamRef]);

  const upload = async () => {
    const blob = await fetch(photo).then((res) => res.blob());

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("url", blob, "test.jpg");
      formData.append("overlay", activeOverlay);

      const { data } = await api.post("image", formData);

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
        {photo ? (
          <img src={photo} alt="" />
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
      </div>
      {!photo && (
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

          <Button
            variant="contained"
            color="secondary"
            onClick={capture}
            style={{ marginTop: 40 }}
          >
            CAPTURAR
          </Button>
        </>
      )}
      {photo && (
        <div className="options-container">
          <h1>FICOU DEMAIS</h1>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <div className="options">
              <div className="option">
                <RoundedIconButton onClick={upload}>
                  <ThumbUpAlt />
                </RoundedIconButton>
                <h1>GOSTEI</h1>
              </div>
              <div className="option">
                <RoundedIconButton onClick={() => setPhoto(null)}>
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

export default Photo;
