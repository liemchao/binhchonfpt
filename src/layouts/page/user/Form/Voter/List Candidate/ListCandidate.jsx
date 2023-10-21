// import { filter } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import {
  Grid,
  OutlinedInput,
  Container,
  TextField,
  Paper,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Select from "components/Control/Select";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetQuestByIdCampaign } from "context/redux/action/action";
import QuestionPopUp from "components/Popup/create/QuestionPopUp";
import MultipleInteractionCard from "components/Cards/CardCandidate";
import Page from "components/Layout/Page";
import Favorite from "@mui/icons-material/Favorite";

import CardLike from "components/Cards/CardLike";
import { CustomizedToast } from "components/toast/ToastCustom";
import { URL_API } from "config/axios/Url/URL";
import API from "config/axios/API/API";
import { useCallback } from "react";
import QRPopUp from "components/Popup/create/QRPopUp";
import { NavigationPopup } from "components/Popup/updatePopup/UpdateGroup";
import { getGroupId } from "context/redux/action/action";
import CandateDetail from "layouts/page/user/Candidate/DetailCandidate";
import { getScorebyStage } from "context/redux/action/action";
import FeedbackBubble from "components/Popup/create/FeedblackPopup";
import jwt_decode from "jwt-decode";
import { CheckVoter } from "context/redux/action/action";
import IconButton from "@mui/joy/IconButton";
import ScrollToTopButton from "./scollpage";
import { CheckFeedback } from "context/redux/action/action";
import PolicyIcon from "@mui/icons-material/Policy";
import Policy from "components/Popup/add/Policy";
import axios from "axios";
import { useTheme, useMediaQuery } from "@mui/material";

export default function ListCandidate() {
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [Link, setLink] = useState(window.location.href);
  const [IdCanidate, setIdCanidate] = useState();
  const { id } = useParams();
  const [OpenDiaLog, SetOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const [isopen, setIsopen] = useState(true);
  const [hasopen, setHasopen] = useState(false);
  const token = localStorage.getItem("token");

  const decode = jwt_decode(token);
  const [open, setopen] = useState(false);
  const [name, setName] = useState();
  const [idCandi, setCandi] = useState();
  const [scores, setScores] = useState();
  const [url, setUrl] = useState();
  const [showMore, setShowMore] = useState(false);
  const [process, setProcess] = useState("Tất cả");
  const [process1, setProcess1] = useState("Tất cả");
  const [seacrchResult, setseacrchResulst] = useState([]);
  const [title, setTitle] = useState("");
  const candidatesPerPage = 6;
  const [OpenArlert, setOpenArlert] = useState(false);
  const [namegroup, setNameGroup] = useState();
  const [isVoted, setisVoted] = useState(false);
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [submitTime, setStartTime] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const idCampainStore = "6097a517-11ad-4105-b26a-0e93bea2cb43";
  const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(["box-shadow", "width"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    "&.Mui-focused": { width: 320, boxShadow: "0.7 rem" },
  }));

  const fetchData = async (token, setCandidates) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(
        `https://votingsystemfpt-001-site1.htempurl.com/api/v1/candidates/stage/6097a517-11ad-4105-b26a-0e93bea2cb43/user/${
          decode.Username || decode.userId
        }?page=${currentPage}&byName=${title}&gsg=${process}&special=${process1}&isvoted=${isVoted}`,
        config
      );
      setCandidates(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDataWrapper = async () => {
      await fetchData(token, setCandidates);
    };

    fetchDataWrapper();
  }, [isVoted, process1, process, title, currentPage, token]);

  useEffect(() => {
    fetchData(token, setCandidates);
  }, [candidates, dispatch]);

  useEffect(() => {
    fetchData(token, setCandidates);
  }, []);

  useEffect(() => {
    const callAPI = async () => {
      await dispatch(getGroupId(idCampainStore, token));
    };
    callAPI();
  }, [dispatch, token]);

  const handleGetQR = useCallback((id) => {
    setopen(true);
    setLink(window.location.href + "/stage/" + id);
  }, []);

  const listGroup = useSelector((state) => {
    return state.listGroup;
  });

  const getGroupOption = () => {
    const GroupOption = [
      {
        id: "false",
        title: "Tất cả",
        choose: true,
      },
    ];
    for (var i = 0; i < listGroup.length; i++) {
      if (listGroup[i].isVoter === false) {
        GroupOption.push({
          id: listGroup[i].name,
          title: listGroup[i].name,
        });
      }
    }
    return GroupOption;
  };

  const getOptions = () => [
    {
      id: "Tất cả",
      title: "Tất cả",
    },
    {
      id: "Bộ môn Chính trị",
      title: "Bộ môn Chính trị",
      nametitle: "Khối ngành giảng viên",
    },
    {
      id: "Khối ngành Ngôn ngữ và Mỹ thuật",
      title: "Khối ngành Ngôn ngữ và Mỹ thuật",
      nametitle: "Khối ngành giảng viên",
    },
    {
      id: "Khối ngành Quản trị doanh nghiệp",
      title: "Khối ngành Quản trị doanh nghiệp",
      nametitle: "Khối ngành giảng viên",
    },
    {
      id: "Khối ngành Kỹ thuật và Bộ môn Toán",
      title: "Khối ngành Kỹ thuật và Bộ môn Toán",
      nametitle: "Khối ngành giảng viên",
    },
  ];
  const getOption2 = () => [
    {
      id: "false",
      title: "Tất cả",
    },
    {
      id: "true",
      title: "Đã bình chọn",
      nametitle: "Trạng thái ứng cử viên",
    },
  ];

  const getOptions1 = () => [
    {
      id: "Tất cả",
      title: "Tất cả",
    },

    {
      id: "Bộ môn Âm nhạc Truyền thống",
      title: "Bộ môn Âm nhạc truyền thống",
      nametitle: "Ngành học của sinh viên",
    },
    {
      id: "Bộ môn Giáo dục thể chất",
      title: "Bộ môn Giáo dục thể chất",
      nametitle: "Ngành học của sinh viên",
    },
    {
      id: "Bộ môn Khởi nghiệp",
      title: "Bộ môn Khởi nghiệp",
      nametitle: "Ngành học của sinh viên",
    },
    {
      id: "Bộ môn Kỹ năng mềm",
      title: "Bộ môn Kỹ năng mềm",
      nametitle: "Ngành học của sinh viên",
    },
    {
      id: "Bộ môn Tiếng Anh dự bị",
      title: "Bộ môn Tiếng Anh dự bị",
      nametitle: "Ngành học của sinh viên",
    },
  ];

  const listIdArray = useSelector((state) => {
    return state.listIdArray;
  });

  const idCampaign = useSelector((state) => {
    return state.idCampaign;
  });

  useEffect(() => {
    const callAPIgetList = async () => {
      if (listIdArray !== null) {
        dispatch(CheckVoter(decode.Username, idCampainStore, token));
      }
    };
    callAPIgetList();
  }, []);

  const checkvoter = useSelector((state) => {
    return state.checkvoter;
  });

  useEffect(() => {
    setIsopen(checkvoter);
  }, [checkvoter]);

  const handleClickOpen = useCallback(
    (idCandi) => {
      navigate(`stage/${idCandi}`);
    },
    [idCandi]
  );

  // const hanldeGetQuestion = async (token, idCandidate) => {
  //   await dispatch(handleGetQuestByIdCampaign(liststageScore.formId, token));
  //   setIdCanidate(idCandidate);
  //   SetOpenPopUp(true);
  // };

  const handleVotingLike = async (token, idcandidate) => {
    const data = {
      userId: decode.Username || decode.userId,
      candidateId: idcandidate,
      stageId: id,
    };
    try {
      const req = await API("POST", URL_API + `/api/v1/votes/like`, data, token);
      if (req) {
        CustomizedToast({
          message: `${req.data?.message}`,
          type: "SUCCESS",
        });
        await dispatch(getScorebyStage(id, decode.Username || decode.userId, token));
      }
    } catch (error) {
      if (error.response.data.statusCode === 404) {
        CustomizedToast({
          message: `${error.response.data.message}`,
          type: "ERROR",
        });
      } else if (error.response.data.statusCode === 400) {
        CustomizedToast({
          message: `${error.response.data.message}`,
          type: "ERROR",
        });
      } else {
        CustomizedToast({
          message: "Thao tác quá nhanh. Vui lòng thực hiện lại",
          type: "ERROR",
        });
      }
    }
  };
  const handleSelect1Change = (e) => {
    setProcess(e.target.value);
    setProcess1(null);
  };
  const handleSelect2Change = (e) => {
    setProcess1(e.target.value);
    setProcess(null);
  };

  const hanldeUnvote = async (token, idcandidate) => {
    const data = {
      userId: decode.Username || decode.userId,
      candidateId: idcandidate,
      stageId: id,
    };
    try {
      const req = await API("POST", URL_API + `/api/v1/votes/unlike`, data, token);
      if (req) {
        CustomizedToast({
          message: `${req.data?.message}`,
          type: "SUCCESS",
        });
        await dispatch(getScorebyStage(id, decode.Username || decode.userId, token));
      }
    } catch (error) {
      if (error.response.data.statusCode === 404) {
        CustomizedToast({
          message: `${error.response.data.message}`,
          type: "ERROR",
        });
      } else if (error.response.data.statusCode === 400) {
        CustomizedToast({
          message: `${error.response.data.message}`,
          type: "ERROR",
        });
      } else {
        CustomizedToast({
          message: "Thao tác quá nhanh. Vui lòng thực hiện lại",
          type: "ERROR",
        });
      }
    }
  };

  const handlePolicyClick = () => {
    SetOpenDialog(true);
  };

  const totalPages = Math.ceil(candidates.totalPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // const getCurrentCandidates = () => {
  //   const startIndex = (currentPage - 1) * candidatesPerPage;
  //   const endIndex = startIndex + candidatesPerPage;
  //   return seacrchResult?.slice(startIndex, endIndex);
  // };

  return (
    <Page
      title="Candidate"
      sx={{
        backgroundImage:
          "url(https://res.cloudinary.com/dxevluwyr/image/upload/v1694155547/BackGround_xhgdfp.png)",
        backgroundColor: "transparent",

        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item mt={isMobile ? "-1.4rem" : "0"} xs={12}>
            <Paper>
              {candidates.campaignName === "Chiến dịch bình chọn giảng viên FPT 2023" ? (
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    fontSize: "30px",
                    color: "#B83490",
                    fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
                  }}
                >
                  Inspiring Instructor Awards 2023
                </Typography>
              ) : (
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    fontSize: isMobile ? "20px" : "40px",
                    color: "#B83490",
                    fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
                  }}
                >
                  {candidates.campaignName}
                  <Tooltip
                    title="Thể lệ bình chọn"
                    sx={{
                      marginLeft: "10px",
                      color: "#B83490",
                      fontSize: "70px",
                    }}
                  >
                    <IconButton
                      sx={{
                        marginLeft: "10px",
                        color: "#B83490",
                        fontSize: "70px",
                      }}
                      color="primary"
                      onClick={handlePolicyClick}
                    >
                      <PolicyIcon />
                    </IconButton>
                  </Tooltip>
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            marginTop: isMobile ? "0px" : "1%",
          }}
        >
          {candidates.votesRemaining?.groupNameOfVoter === "Giai đoạn chuyên ngành (HK1-HK6)" ? (
            <Grid container sx={{ display: "flex", flexWrap: isMobile ? "wrap" : "nowrap" }}>
              <Grid
                sx={{ marginTop: isMobile ? "10px" : "0px" }}
                item
                xs={isMobile ? 7 : 12}
                sm={6}
                md={3}
                lg={3}
              >
                <Select
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: isMobile ? "2.5rem" : "2.5rem",
                  }}
                  name="groupid"
                  required
                  defaultValue="Tất cả"
                  label={"Giảng viên nhóm môn chung"}
                  onChange={handleSelect1Change}
                  options={getOptions1()}
                />
              </Grid>
              <Grid
                sx={{ marginTop: isMobile ? "10px" : "0px" }}
                item
                ml={isMobile ? 2 : -1}
                xs={isMobile ? 4 : 12}
                sm={6}
                md={1}
                lg={1.5}
              >
                <Box>
                  <TextField
                    size="small"
                    sx={{ padding: isMobile ? "1px" : "0px" }}
                    variant="outlined"
                    label="Nhóm môn chung"
                    value={candidates?.votesRemaining?.voteBM + "/" + candidates?.limitVoteOfStage}
                    InputProps={{
                      startAdornment: (
                        <div
                          style={{
                            color: "#D44FAC",
                            marginTop: "2px",
                          }}
                        >
                          <Favorite />
                        </div>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid
                sx={{
                  marginTop: isMobile ? "2px" : "0px",

                  width: isMobile ? "190px" : "200px",
                }}
                item
                ml={isMobile ? 0 : 3}
                sm={6}
                md={3}
                lg={isMobile ? 1 : 2}
              >
                <TextField
                  size="small"
                  inputProps={{ "aria-label": "search candidate" }}
                  id="outlined-basic"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  label="Tìm kiếm theo tên"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                sx={{
                  marginTop: isMobile ? "10px" : "0px",
                }}
                ml={isMobile ? 0 : 3}
                xs={isMobile ? 7 : 12}
                sm={6}
                md={3}
                lg={2.5}
              >
                <Select
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: isMobile ? "2.5rem" : "2.5rem",
                  }}
                  name="groupid"
                  required
                  defaultValue="Tất cả"
                  label={"Giảng viên chuyên ngành"}
                  height="10rem"
                  onChange={handleSelect2Change}
                  options={getOptions()}
                />
              </Grid>
              <Grid
                sx={{ marginTop: isMobile ? "10px" : "0px" }}
                item
                ml={isMobile ? 2 : -1}
                xs={isMobile ? 4 : 12}
                sm={6}
                md={2}
                lg={1.2}
              >
                <Box>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Chuyên ngành"
                    value={candidates?.votesRemaining?.voteAM + "/" + candidates?.limitVoteOfStage}
                    InputProps={{
                      startAdornment: (
                        <div style={{ color: "#D44FAC", marginTop: "2px" }}>
                          <Favorite />
                        </div>
                      ),
                    }}
                  />
                </Box>
              </Grid>

              <Grid
                sx={{ marginTop: isMobile ? "10px" : "0px" }}
                item
                xs={isMobile ? 6 : 12}
                ml={isMobile ? 0 : 3}
                sm={6}
                md={2}
                lg={1}
              >
                <Select
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: isMobile ? "2.5rem" : "2.5rem",
                  }}
                  name="isvoted"
                  required
                  defaultValue="Tất cả"
                  label="Trạng thái"
                  onChange={(e) => {
                    setisVoted(e.target.value);
                  }}
                  options={getOption2()}
                />
              </Grid>
            </Grid>
          ) : candidates.votesRemaining?.groupNameOfVoter === "Giai đoạn chuyên ngành (HK7-HK9)" ? (
            <Grid container sx={{ display: "flex", flexWrap: isMobile ? "wrap" : "nowrap" }}>
              <Grid
                item
                sx={{ marginTop: isMobile ? "10px" : "0px" }}
                ml={isMobile ? 0 : 0}
                xs={isMobile ? 7 : 12}
                sm={6}
                md={3}
                lg={4}
              >
                <Select
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: isMobile ? "2.5rem" : "2.5rem",
                  }}
                  name="groupid"
                  required
                  defaultValue="Tất cả"
                  label={"Giảng viên chuyên ngành"}
                  height="10rem"
                  onChange={handleSelect2Change}
                  options={getOptions()}
                />
              </Grid>
              <Grid
                sx={{ marginTop: isMobile ? "10px" : "0px" }}
                item
                ml={isMobile ? 2 : 1}
                xs={isMobile ? 4 : 12}
                sm={6}
                md={2}
                lg={3}
              >
                <Box>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Chuyên ngành"
                    value={candidates?.votesRemaining?.voteAM + "/" + candidates?.limitVoteOfStage}
                    InputProps={{
                      startAdornment: (
                        <div style={{ color: "#D44FAC", marginTop: "2px" }}>
                          <Favorite />
                        </div>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid
                sx={{ marginTop: isMobile ? "10px" : "0px" }}
                item
                ml={isMobile ? 0 : 14}
                sm={6}
                md={2}
                lg={isMobile ? 1 : 2}
              >
                <TextField
                  size="small"
                  inputProps={{ "aria-label": "search candidate" }}
                  id="outlined-basic"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  label="Tìm kiếm theo tên"
                  variant="outlined"
                />
              </Grid>

              <Grid
                sx={{ marginTop: isMobile ? "10px" : "0px" }}
                item
                xs={isMobile ? 6 : 12}
                ml={isMobile ? 0 : 2}
                sm={6}
                md={2}
                lg={1.5}
              >
                <Select
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: isMobile ? "2.5rem" : "2.5rem",
                  }}
                  name="isvoted"
                  required
                  defaultValue="Tất cả"
                  label="Trạng thái"
                  onChange={(e) => {
                    setisVoted(e.target.value);
                  }}
                  options={getOption2()}
                />
              </Grid>
            </Grid>
          ) : candidates?.votesRemaining?.groupNameOfVoter === "Giai đoạn dự bị" ? (
            <Grid container sx={{ display: "flex", flexWrap: isMobile ? "wrap" : "nowrap" }}>
              <Grid
                item
                sx={{ marginTop: isMobile ? "10px" : "0px" }}
                ml={isMobile ? 0 : 0}
                xs={isMobile ? 7 : 12}
                sm={6}
                md={3}
                lg={4}
              >
                <Select
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: isMobile ? "2.5rem" : "2.5rem",
                  }}
                  name="groupid"
                  required
                  defaultValue="Tất cả"
                  label={"Giảng viên nhóm môn chung"}
                  height="10rem"
                  onChange={handleSelect1Change}
                  options={getOptions1()}
                />
              </Grid>
              <Grid
                sx={{ marginTop: isMobile ? "10px" : "0px" }}
                item
                ml={isMobile ? 2 : 1}
                xs={isMobile ? 4 : 12}
                sm={6}
                md={2}
                lg={3}
              >
                <Box>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Nhóm môn chung"
                    value={candidates?.votesRemaining?.voteBM + "/" + candidates?.limitVoteOfStage}
                    InputProps={{
                      startAdornment: (
                        <div style={{ color: "#D44FAC", marginTop: "2px" }}>
                          <Favorite />
                        </div>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid
                sx={{ marginTop: isMobile ? "10px" : "0px" }}
                item
                ml={isMobile ? 0 : 14}
                sm={6}
                md={2}
                lg={isMobile ? 1 : 2}
              >
                <TextField
                  size="small"
                  inputProps={{ "aria-label": "search candidate" }}
                  id="outlined-basic"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  label="Tìm kiếm theo tên"
                  variant="outlined"
                />
              </Grid>

              <Grid
                sx={{ marginTop: isMobile ? "10px" : "0px" }}
                item
                xs={isMobile ? 6 : 12}
                ml={isMobile ? 0 : 2}
                sm={6}
                md={2}
                lg={1.5}
              >
                <Select
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: isMobile ? "2.5rem" : "2.5rem",
                  }}
                  name="isvoted"
                  required
                  defaultValue="Tất cả"
                  label="Trạng thái"
                  onChange={(e) => {
                    setisVoted(e.target.value);
                  }}
                  options={getOption2()}
                />
              </Grid>
            </Grid>
          ) : (
            <>
              <Select
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: { xs: "100%", md: "21rem" },
                  margin: { xs: "1rem 0 0", md: 0 },
                }}
                name="groupid"
                required
                defaultValue="Tất cả"
                label={"Nhóm ứng cử viên"}
                height="10rem"
                onChange={(e) => {
                  setProcess(e.target.value);
                }}
                options={getGroupOption()}
              />
              <Box
                component="form"
                sx={{
                  display: "flex",
                  "& > :not(style)": {
                    m: { xs: 2, md: 2 },
                    height: "3.3rem",
                    width: { xs: "100%", md: "24ch" },
                  },
                }}
              >
                <TextField
                  variant="outlined"
                  label="Số phiếu hiện có"
                  value={
                    candidates?.votesRemaining?.voteRemaining + "/" + candidates?.limitVoteOfStage
                  }
                  InputProps={{
                    startAdornment: (
                      <div style={{ color: "#D44FAC", marginTop: "2px" }}>
                        <Favorite />
                      </div>
                    ),
                  }}
                />
              </Box>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  justifyItems: "flex-end",
                  "& > :not(style)": { m: { xs: 1, md: 2 }, width: { xs: "100%", md: "24ch" } },
                }}
              >
                <TextField
                  inputProps={{ "aria-label": "search candidate" }}
                  id="outlined-basic"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  label="Tìm kiếm theo tên"
                  variant="outlined"
                />
              </Box>
            </>
          )}
        </Box>
        {candidates.formId ? (
          <></>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              ml: isMobile ? "-0.7rem" : "-0.3rem",
            }}
          >
            <Grid container spacing={3} mt={-2} bottom={1} sx={{ gap: "6rem" }}>
              {candidates.candidate?.map((card, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <CardLike
                    id={card?.candidateId}
                    handleClick={() => {
                      handleClickOpen(card?.candidateId);
                    }}
                    description={card?.description}
                    isVoted={card?.isVoted}
                    score={card?.stageScore}
                    groupName={card?.groupName}
                    image={card?.avatarUrl}
                    name={card?.fullName}
                    onClickLike={() => {
                      handleVotingLike(token, card.candidateId);
                    }}
                    onClickShare={() => {
                      handleGetQR(card?.candidateId);
                    }}
                    onClickUnVote={() => {
                      hanldeUnvote(token, card?.candidateId);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
          color="secondary"
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
        <ScrollToTopButton />
        {candidates?.votesRemaining?.voteRemaining === 0 && candidates?.feedBacked === false ? (
          <FeedbackBubble
            open={true}
            // setOpen={true}
            id={listIdArray ? listIdArray?.campaignId : idCampaign?.campaignId}
          />
        ) : (
          <></>
        )}
      </Container>
      {/* <QuestionPopUp
        SetOpenPopUp={SetOpenPopUp}
        OpenPopUp={OpenPopUp}
        IdCanidate={IdCanidate}
        IdStage={candidates?.stageId}
      /> */}
      {isopen ? (
        <></>
      ) : (
        <>
          <NavigationPopup
            SetisOpen={() => {
              setIsopen(true);
            }}
            id="6097a517-11ad-4105-b26a-0e93bea2cb43"
            IdStage="6097a517-11ad-4105-b26a-0e93bea2cb43"
          />
        </>
      )}
      <CandateDetail
        OpenPopUp={hasopen}
        SetOpenPopUp={setHasopen}
        name={name}
        image={url}
        idform={candidates?.formId}
        idStage={id}
        idCandi={idCandi}
        score={scores}
        namegroup={namegroup}
      />
      {/* <Policy OpenAlret={OpenArlert} SetOpenAlret={setOpenArlert} /> */}
      <QRPopUp OpenPopUp={open} SetOpenPopUp={setopen} link={Link} />
      <Policy OpenAlret={OpenDiaLog} SetOpenAlret={SetOpenDialog}></Policy>
    </Page>
  );
}
