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
  const [seacrchResult, setseacrchResulst] = useState([]);
  const [title, setTitle] = useState("");
  const candidatesPerPage = 6;
  const [OpenArlert, setOpenArlert] = useState(false);
  const [namegroup, setNameGroup] = useState();
  const [isVoted, setisVoted] = useState(false);
  const navigate = useNavigate();
  const [submitTime, setStartTime] = useState(new Date());

  const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(["box-shadow", "width"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    "&.Mui-focused": { width: 320, boxShadow: "0.7 rem" },
  }));
  const idCampainStore = localStorage.getItem("campaignId");
  useEffect(() => {
    const callAPI = async () => {
      await dispatch(getScorebyStage(id, decode.Username, token));
      await dispatch(getGroupId(idCampainStore, token));
      await dispatch(CheckFeedback(decode.Username, idCampainStore, token));
    };
    callAPI();
  }, [dispatch, id, idCampainStore]);

  const handleGetQR = useCallback((id) => {
    setopen(true);
    setLink(window.location.href + "/stage/" + id);
  }, []);

  const listGroup = useSelector((state) => {
    return state.listGroup;
  });
  const feedback = useSelector((state) => {
    return state.checkfeeback;
  });
  console.log(feedback);

  const getGroupOption = () => {
    const GroupOption = [
      {
        id: "Tất cả",
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
      id: "Khối ngành Kỹ thuật",
      title: "Khối ngành Kỹ thuật",
      nametitle: "Khối ngành giảng viên",
    },
    {
      id: "Khối ngành Ngôn ngữ và Đồ họa",
      title: "Khối ngành ngôn ngữ và Đồ họa",
      nametitle: "Khối ngành giảng viên",
    },
    { id: "Khối ngành Kinh tế", title: "Khối ngành Kinh tế", nametitle: "Khối ngành giảng viên" },
  ];
  const getOption2 = () => [
    {
      id: "Tất cả",
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
      id: "Bộ môn Toán",
      title: "Bộ môn Toán",
      nametitle: "Ngành học của sinh viên",
    },
    {
      id: "Bộ môn Kỹ năng mềm",
      title: "Bộ môn Kỹ năng mềm",
      nametitle: "Ngành học của sinh viên",
    },
    {
      id: "Bộ môn Giáo dục thể chất",
      title: "Bộ môn Giáo dục thể chất",
      nametitle: "Ngành học của sinh viên",
    },
    {
      id: "Bộ môn Âm nhạc Truyền thống",
      title: "Bộ môn Âm nhạc Truyền thống",
      nametitle: "Ngành học của sinh viên",
    },
    {
      id: "Bộ môn Tiếng Anh dự bị",
      title: "Bộ môn Tiếng Anh dự bị",
      nametitle: "Ngành học của sinh viên",
    },
  ];

  // const getGroupOption1 = () => {
  //   const GroupOption = [
  //     {
  //       id: "Tất cả",
  //       title: "Tất cả",
  //       choose: true,
  //     },
  //   ];
  //   for (var i = 0; i < listGroup.length; i++) {
  //     if (listGroup[i].isVoter === false) {
  //       GroupOption.push({
  //         id: listGroup[i].name,
  //         title: listGroup[i].name,
  //       });
  //     }
  //   }
  //   return GroupOption;
  // };

  const liststageScore = useSelector((state) => {
    return state.liststageScore;
  });

  const listIdArray = useSelector((state) => {
    return state.listIdArray;
  });

  const idCampaign = useSelector((state) => {
    return state.idCampaign;
  });

  useEffect(() => {
    if (!title) {
      if (process === "Tất cả") {
        setseacrchResulst(liststageScore.candidate);
      } else if (isVoted === "true") {
        setseacrchResulst(() => {
          return liststageScore.candidate.filter((candidate, index) => {
            return candidate.isVoted === true;
          });
        });
      } else if (process === "Khối ngành Kinh tế") {
        setseacrchResulst(() => {
          return liststageScore.candidate.filter((candidate, index) => {
            return (
              (candidate.groupName === "Bộ môn Phát triển khởi nghiệp" ||
                candidate.groupName === "Bộ môn Quản trị Truyền thông đa phương tiện" ||
                candidate.groupName === "Bộ môn Quản trị Du lịch và khách sạn" ||
                candidate.groupName === "Bộ môn Kinh tế") &&
              candidate.fullName.toLowerCase().includes(title.toLowerCase())
            );
          });
        });
      } else if (process === "Khối ngành Kỹ thuật") {
        setseacrchResulst(() => {
          return liststageScore.candidate.filter((candidate, index) => {
            return (
              (candidate.groupName === "Bộ môn Kỹ thuật phần mềm" ||
                candidate.groupName === "Bộ môn CF" ||
                candidate.groupName === "Bộ môn An toàn thông tin" ||
                candidate.groupName === "Bộ môn ITS") &&
              candidate.fullName.toLowerCase().includes(title.toLowerCase())
            );
          });
        });
      } else if (process === "Khối ngành Ngôn ngữ và Đồ họa") {
        setseacrchResulst(() => {
          return liststageScore.candidate.filter((candidate, index) => {
            return (
              (candidate.groupName === "Bộ môn Hoạt hình kỹ thuật số" ||
                candidate.groupName === "Bộ môn Tiếng Anh chuyên ngành" ||
                candidate.groupName === "Bộ môn Thiết kế đồ họa" ||
                candidate.groupName === "Bộ môn tiếng Nhật") &&
              candidate.fullName.toLowerCase().includes(title.toLowerCase())
            );
          });
        });
      } else {
        setseacrchResulst(() => {
          return liststageScore.candidate.filter((candidate, index) => {
            return candidate.groupName == process;
          });
        });
      }
    } else {
      if (process === "Tất cả") {
        setseacrchResulst(() => {
          return liststageScore.candidate.filter((candidate, index) => {
            return candidate.fullName.toLowerCase().includes(title.toLowerCase());
          });
        });
      } else if (process === "Khối ngành Kinh tế") {
        setseacrchResulst(() => {
          return liststageScore.candidate.filter((candidate, index) => {
            return (
              (candidate.groupName === "Bộ môn Phát triển khởi nghiệp" ||
                candidate.groupName === "Bộ môn Quản trị Truyền thông đa phương tiện" ||
                candidate.groupName === "Bộ môn Quản trị Du lịch và khách sạn" ||
                candidate.groupName === "Bộ môn Kinh tế") &&
              candidate.fullName.toLowerCase().includes(title.toLowerCase())
            );
          });
        });
      } else if (process === "Khối ngành Kỹ thuật") {
        setseacrchResulst(() => {
          return liststageScore.candidate.filter((candidate, index) => {
            return (
              (candidate.groupName === "Bộ môn Kỹ thuật phần mềm" ||
                candidate.groupName === "Bộ môn CF" ||
                candidate.groupName === "Bộ môn An toàn thông tin" ||
                candidate.groupName === "Bộ môn ITS") &&
              candidate.fullName.toLowerCase().includes(title.toLowerCase())
            );
          });
        });
      } else if (process === "Khối ngành Ngôn ngữ và Đồ họa") {
        setseacrchResulst(() => {
          return liststageScore.candidate.filter((candidate, index) => {
            return (
              (candidate.groupName === "Bộ môn Hoạt hình kỹ thuật số" ||
                candidate.groupName === "Bộmôn Tiếng Anh chuyên ngành" ||
                candidate.groupName === "Bộ môn Thiết kế đồ họa" ||
                candidate.groupName === "Bộ môn tiếng Nhật") &&
              candidate.fullName.toLowerCase().includes(title.toLowerCase())
            );
          });
        });
      } else {
        setseacrchResulst(() => {
          return liststageScore.candidate.filter((candidate, index) => {
            return (
              candidate.groupName == process &&
              candidate.fullName.toLowerCase().includes(title.toLowerCase())
            );
          });
        });
        // Xử lý cho trường hợp khác (process không khớp với bất kỳ khối ngành nào)
      }
    }
  }, [title, process, liststageScore, isVoted]);

  useEffect(() => {
    const callAPIgetList = async () => {
      if (listIdArray !== null) {
        dispatch(
          CheckVoter(decode.Username, listIdArray ? listIdArray?.campaignId : idCampainStore, token)
        );
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

  const hanldeGetQuestion = async (token, idCandidate) => {
    await dispatch(handleGetQuestByIdCampaign(liststageScore.formId, token));
    setIdCanidate(idCandidate);
    SetOpenPopUp(true);
  };

  const handleVotingLike = async (token, idcandidate) => {
    const data = {
      userId: decode.Username,
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
        await dispatch(getScorebyStage(id, decode.Username, token));
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
          message: "Lỗi mạng",
          type: "ERROR",
        });
      }
    }
  };

  const hanldeUnvote = async (token, idcandidate) => {
    const data = {
      sendingTime: submitTime,
      userId: decode.Username,
      candidateId: idcandidate,
      stageId: id,
      votingDetail: [
        {
          elementId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          createTime: submitTime,
        },
      ],
    };
    try {
      const req = await API("POST", URL_API + `/api/v1/votes`, data, token);
      if (req) {
        CustomizedToast({
          message: `${req.data?.message}`,
          type: "SUCCESS",
        });
        await dispatch(getScorebyStage(id, decode.Username, token));
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
          message: "Lỗi mạng",
          type: "ERROR",
        });
      }
    }
  };

  const handlePolicyClick = () => {
    SetOpenDialog(true);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(seacrchResult?.length / candidatesPerPage);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getCurrentCandidates = () => {
    const startIndex = (currentPage - 1) * candidatesPerPage;
    const endIndex = startIndex + candidatesPerPage;
    return seacrchResult?.slice(startIndex, endIndex);
  };
  const campaignId = listIdArray ? listIdArray?.campaignId : idCampaign?.campaignId;

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
          <Grid item xs={12}>
            <Paper>
              {liststageScore.campaignName === "Chiến dịch bình chọn giảng viên FPT 2023" ? (
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
                    fontSize: "40px",
                    color: "#B83490",
                    fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
                  }}
                >
                  {liststageScore.campaignName}
                  <Tooltip
                    title="Thể lệ chiến dịch"
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
          }}
        >
          {idCampainStore === "6097a517-11ad-4105-b26a-0e93bea2cb43" &&
          liststageScore?.votesRemaining?.groupNameOfVoter === "Kỳ chuyên ngành (HK1-HK6)" ? (
            <>
              <Select
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: { xs: "100%", md: "13rem" },
                  margin: { xs: "1rem 0 0", md: 0 },
                }}
                name="groupid"
                required
                defaultValue="Tất cả"
                label={"Nhóm giảng viên dạy cơ bản"}
                height="10rem"
                onChange={(e) => {
                  setProcess(e.target.value);
                }}
                options={getOptions1()}
              />

              <Box
                component="form"
                sx={{
                  display: "flex",
                  "& > :not(style)": {
                    m: { xs: 2, md: 2 },
                    height: "3.3rem",
                    width: { xs: "100%", md: "14ch" },
                  },
                }}
              >
                <TextField
                  variant="outlined"
                  label="Cơ bản"
                  value={
                    liststageScore?.votesRemaining?.voteBM + "/" + liststageScore?.limitVoteOfStage
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
                  justifyContent: { xs: "flex-start", md: "flex-start" },
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

              <Select
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: { xs: "100%", md: "13rem" },
                  margin: { xs: "1rem 0 0", md: 0 },
                }}
                name="groupid"
                required
                defaultValue="Tất cả"
                label={"Nhóm giảng viên chuyên ngành"}
                height="10rem"
                onChange={(e) => {
                  setProcess(e.target.value);
                }}
                options={getOptions()}
              />
              <Box
                component="form"
                sx={{
                  display: "flex",
                  "& > :not(style)": {
                    m: { xs: 2, md: 2 },
                    height: "3.3rem",
                    width: { xs: "100%", md: "14ch" },
                  },
                }}
              >
                <TextField
                  variant="outlined"
                  label="Chuyên ngành"
                  value={
                    liststageScore?.votesRemaining?.voteAM + "/" + liststageScore?.limitVoteOfStage
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
            </>
          ) : liststageScore?.votesRemaining?.groupNameOfVoter === "Kỳ chuyên ngành (HK7-HK9)" ? (
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
                label={"Nhóm giảng viên chuyên ngành"}
                height="10rem"
                onChange={(e) => {
                  setProcess(e.target.value);
                }}
                options={getOptions()}
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
                  label="Chuyên ngành"
                  value={
                    liststageScore?.votesRemaining?.voteAM + "/" + liststageScore?.limitVoteOfStage
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
                  "& > :not(style)": { m: { xs: 1, md: 2 }, width: { xs: "100%", md: "33ch" } },
                  justifyContent: { xs: "flex-start", md: "flex-start" },
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
          ) : liststageScore?.votesRemaining?.groupNameOfVoter === "Kỳ dự bị" ? (
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
                label={"Nhóm giảng viên cơ bản"}
                height="10rem"
                onChange={(e) => {
                  setProcess(e.target.value);
                }}
                options={getOptions1()}
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
                  label="Cơ bản"
                  value={
                    liststageScore?.votesRemaining?.voteBM + "/" + liststageScore?.limitVoteOfStage
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
                  justifyContent: { xs: "flex-start", md: "flex-start" },
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
                    liststageScore?.votesRemaining?.voteRemaining +
                    "/" +
                    liststageScore?.limitVoteOfStage
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
                  justifyContent: { xs: "flex-start", md: "flex-start" },
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
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: { xs: 2, md: 1 }, width: { xs: "100%", md: "20ch" } },
            }}
          >
            <Select
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              name="isvoted"
              required
              defaultValue="Tất cả"
              label="Trạng thái"
              height="8rem"
              onChange={(e) => {
                setisVoted(e.target.value);
              }}
              options={getOption2()}
            />
          </Box>
        </Box>
        {liststageScore.formId ? (
          <Box sx={{ display: "flex", justifyContent: "space-between", ml: "1rem" }}>
            <Grid container spacing={3} mt={-1} bottom={2} sx={{ gap: "6rem" }}>
              {getCurrentCandidates()?.map((card, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <MultipleInteractionCard
                    id={card.candidateId}
                    handleClick={() => {
                      handleClickOpen(card?.candidateId);
                    }}
                    groupName={card?.groupName}
                    isVoted={card?.isVoted}
                    score={card?.stageScore}
                    image={card?.avatarUrl}
                    name={card?.fullName}
                    onClickVote={() => {
                      hanldeGetQuestion(token, card?.candidateId);
                    }}
                    onClickUnVote={() => {
                      hanldeUnvote(token, card?.candidateId);
                    }}
                    onClickShare={() => {
                      handleGetQR(card?.candidateId);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "space-between", ml: "-0.3rem" }}>
            <Grid container spacing={3} mt={-4} bottom={1} sx={{ gap: "6rem" }}>
              {getCurrentCandidates()?.map((card, index) => (
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
        {liststageScore?.votesRemaining?.voteRemaining === 0 ? (
          <FeedbackBubble
            open={true}
            // setOpen={true}
            id={listIdArray ? listIdArray?.campaignId : idCampaign?.campaignId}
          />
        ) : (
          <></>
        )}
      </Container>
      <QuestionPopUp
        SetOpenPopUp={SetOpenPopUp}
        OpenPopUp={OpenPopUp}
        IdCanidate={IdCanidate}
        IdStage={liststageScore?.stageId}
      />
      {isopen ? (
        <></>
      ) : (
        <>
          <NavigationPopup
            SetisOpen={() => {
              setIsopen(true);
            }}
            id={listIdArray ? listIdArray?.campaignId : idCampaign?.campaignId}
            IdStage={liststageScore?.stageId}
          />
        </>
      )}
      <CandateDetail
        OpenPopUp={hasopen}
        SetOpenPopUp={setHasopen}
        name={name}
        image={url}
        idform={liststageScore?.formId}
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