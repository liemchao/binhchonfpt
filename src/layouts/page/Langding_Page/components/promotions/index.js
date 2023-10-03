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

export default function Promotions() {
  const containerRef = useRef();
  const [show, setShow] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <>
      <Box
        display="flex"
        mt={"5rem"}
        justifyContent="center"
        alignItems="center"
        style={{ width: "100%" }}
      >
        <img
          src={Logo1}
          alt="Logo"
          style={{ width: "31rem", marginRight: "9.2rem", height: "auto", marginLeft: "3%" }}
        />
        <MainCard
          style={{ width: "100%" }}
          id={campaigns.campaignId}
          creater={campaigns.userId}
          url={campaigns.imgUrl}
          title={campaigns.title}
          visibilityCandidate={campaigns.visibilityCandidate}
          totalCandidate={campaigns.totalCandidate}
          process={campaigns.process}
          dayEnd={dayjs(campaigns.endTime).format("DD-MM-YYYY HH:mm:ss")}
          startTime={dayjs(campaigns.startTime).format("DD-MM-YYYY HH:mm:ss")}
          onClickJoin={() => {
            handleCampaignStage(campaigns.campaignId, navigate);
          }}
        />
      </Box>
    </>
  );
}