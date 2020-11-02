import React from "react";
import Welcome from "./screens/Welcome";
import OptionScreen from "./screens/OptionScreen";
import DefaulLayout from "./screens/_layouts/DefaulLayout";
import Photo from "./screens/Photo";
import ShareOptions from "./screens/ShareOptions";
import Video from "./screens/Video";

import CreateGlobalStyle from "./styles/global";

function App() {
  const [screen, setScreen] = React.useState("shareOptions");
  const [url, setUrl] = React.useState(null);
  const [type, setType] = React.useState(null);

  const screens = {
    initial: <Welcome navigate={setScreen} />,
    optionScreen: <OptionScreen navigate={setScreen} setType={setType} />,
    photo: <Photo navigate={setScreen} setUrl={setUrl} />,
    shareOptions: <ShareOptions navigate={setScreen} url={url} />,
    video: <Video navigate={setScreen} setUrl={setUrl} type={type} />,
  };

  return (
    <>
      <CreateGlobalStyle />
      <DefaulLayout>{screens[screen]}</DefaulLayout>
    </>
  );
}

export default App;
