import React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { grey } from "@material-ui/core/colors";
import LinkIcon from '@material-ui/icons/Link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  TwitterShareButton,
} from "react-share";
import {
  FacebookIcon,
  HatenaIcon,
  LineIcon,
  TwitterIcon,
} from "react-share";

const Buttons = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& button": {
    display: "flex",
    marginLeft: "12px",
  }
});

const Circle = styled(Box)({
  height: "32px",
  width: "32px",
  borderRadius: "50%",
  backgroundColor: grey["600"],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  marginLeft: "12px",
});

const ShareButtons = props => {
  const { url, description } = props;
  return (
    <Buttons>
      <TwitterShareButton url={url} title={description}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={description}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LineShareButton url={url} title={description}>
        <LineIcon size={32} round />
      </LineShareButton>
      <HatenaShareButton url={url}>
        <HatenaIcon size={32} round />
      </HatenaShareButton>
      <Tooltip title="URLをコピー">
        <CopyToClipboard text={url}>
          <Circle>
            <LinkIcon style={{ color: "#fff" }} />
          </Circle>
        </CopyToClipboard>
      </Tooltip>
    </Buttons>
  );
};

export default ShareButtons;