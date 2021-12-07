
import { useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';

import ErrorIcon from '@mui/icons-material/Error';
import { Box } from "@mui/system";
const ImageLoader = (props) => {
  const [state, setState] = useState("loading");

  useEffect(() => {
    if (!props.src) {
      setState("error");
      return;
    }
    fetch(props.src)
      .then(({ ok }) => {
        if (ok) {
          setState("ready");
        } else {
          setState("error");
        }
      })
      .catch((e) => {
        console.error(e);
        setState("error");
      });
  }, [props.src]);

  const boxStyle = {
    width: "100%",
    height: "100%",
    border: 2,
    borderRadius: "8px",
    textAlign: "center",
    display: "flex",
  };

  const LoadingImage = () => {
    return (
      <Box className={props.className} sx={{ ...boxStyle, ...props.style }}>
        <CircularProgress />
      </Box>
    );
  };

  const ReadyImage = () => {
    return (
      <img className={props.className} style={{ ...boxStyle, ...props.style }} src={props.src} />
    );
  };
  const ErrorImage = () => {
    return (
      <Box className={props.className} sx={{ boxStyle, ...props.style }}>
        <ErrorIcon sx={{ display: "block", margin: "auto" }} />
      </Box>
    );
  };

  const renderImage = (state) => {
    switch (state) {
      case "ready":
        return <ReadyImage />;
      case "error":
        return <ErrorImage />;
    }

    return <LoadingImage />;
  };

  return <>{renderImage(state)}</>;
};

export default ImageLoader