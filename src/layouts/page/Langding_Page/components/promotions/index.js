import { Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { PromotionsContainer } from "../../styles/promotions";
import UserCard from "components/Cards/cardCampaign";
import { useDispatch, useSelector } from "react-redux";
import { callAPIgetListCampaigns } from "context/redux/action/action";
import { useContext } from "react";
import { Authen } from "context/authenToken/AuthenToken";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { callAPIgeCampaignsRepresentative } from "context/redux/action/action";
import { handleGetCampaignById } from "context/redux/action/action";
import MainCard from "components/Cards/cardCampaignMain";
import Logo1 from "assets/images/styled pink 2023.png";
import QRPopUp from "components/Popup/create/QRPopUp";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    marginTop: "5%",
  },
  image: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));
export default function Promotions() {
  const containerRef = useRef();
  const [Link, setLink] = useState(window.location.href);
  const classes = useStyles();
  const [show, setShow] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setopen] = useState(false);

  useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgeCampaignsRepresentative());
    };
    callAPI();
  }, [dispatch]);

  const campaigns = useSelector((state) => {
    return state.campaignOne;
  });
  const handleCampaignStage = useCallback(
    async (id, navigate) => {
      await dispatch(handleGetCampaignById(id, navigate));
    },
    [dispatch]
  );

  const handleGetQR = useCallback((id) => {
    setopen(true);
    setLink(
      window.location.href +
        "user" +
        "/campaign" +
        "/stage/" +
        "6097a517-11ad-4105-b26a-0e93bea2cb43"
    );
  }, []);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={5}>
          <img src={Logo1} alt="Logo" className={classes.image} />
        </Grid>
        <Grid item xs={12} md={7}>
          <MainCard
            id={campaigns.campaignId}
            creater={campaigns.userId}
            url={campaigns.imgUrl}
            title={campaigns.title}
            visibilityCandidate={campaigns.visibilityCandidate}
            totalCandidate={campaigns.totalCandidate}
            process={campaigns.process}
            dayEnd={dayjs(campaigns.endTime).format("DD-MM-YYYY HH:mm:ss")}
            startTime={dayjs(campaigns.startTime).format("DD-MM-YYYY HH:mm:ss")}
            onClickShare={() => {
              handleGetQR(campaigns.campaignId);
            }}
            onClickJoin={() => {
              handleCampaignStage(campaigns.campaignId, navigate);
            }}
          />
        </Grid>
      </Grid>
      <QRPopUp OpenPopUp={open} SetOpenPopUp={setopen} link={Link} />
    </>
  );
}
