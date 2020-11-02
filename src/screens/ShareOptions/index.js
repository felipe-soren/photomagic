import React from "react";
import RoundedIconButton from "../../components/RoundedIconButton";
import { FacebookShareButton } from "react-share";
import { Home, GetApp, WhatsApp, Facebook } from "@material-ui/icons";

import { Container } from "./styles";

function ShareOptions({ navigate, url }) {
  const handleDownload = React.useCallback(() => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.click();
    window.URL.revokeObjectURL(url);
  });

  const sendWpp = () => {
    window.open(`https://api.whatsapp.com/send?text=${url}`);
  };

  return (
    <Container>
      <div className="main-options">
        <RoundedIconButton
          label="FAZER DE NOVO"
          onClick={() => navigate("initial")}
        >
          <Home />
        </RoundedIconButton>
        <RoundedIconButton label="BAIXAR" onClick={handleDownload}>
          <GetApp />
        </RoundedIconButton>
      </div>
      <div className="share-options">
        <RoundedIconButton label="WHATSAPP" onClick={sendWpp}>
          <WhatsApp />
        </RoundedIconButton>
        <FacebookShareButton url={url} quote={"Feliz Natal"}>
          <RoundedIconButton label="FACEBOOK">
            <Facebook />
          </RoundedIconButton>
        </FacebookShareButton>
      </div>
    </Container>
  );
}

export default ShareOptions;
