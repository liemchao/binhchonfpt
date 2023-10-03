import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
} from "@mui/material";
import Select from "components/Control/Select";
import PageHeader from "components/Layout/PageHeader";
import Iconify from "assets/theme/components/icon/Iconify";
import { useDispatch, useSelector } from "react-redux";
import { getGroupId } from "context/redux/action/action";
import jwt_decode from "jwt-decode";
import { CustomizedToast } from "components/toast/ToastCustom";
import { URL_API } from "config/axios/Url/URL";
import API from "config/axios/API/API";
import { getScorebyStage } from "context/redux/action/action";
import Policy from "../add/Policy";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export function NavigationPopup(props) {
  const { SetisOpen, id, IdStage } = props;
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const [groupid, setGroupId] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [OpenDiaLog, SetOpenDialog] = useState(false);

  useEffect(() => {
    const callAPI = async () => {
      if (token !== null) {
        await dispatch(getGroupId(id, token));
      }
    };
    callAPI();
  }, [dispatch, token]);

  const listGroup = useSelector((state) => state.listGroup);

  const handleConfirm = async () => {
    SetOpenDialog(true);
    CustomizedToast({
      message: "Cập nhật nhóm thành công",
      type: "SUCCESS",
    });
    await dispatch(getScorebyStage(IdStage, decode.Username, token));
    onClose();
  };

  const getGroupOption1 = () => {
    const GroupOption = [];
    for (var i = 0; i < listGroup.length; i++) {
      if (listGroup[i].isVoter === true && listGroup[i].isStudentMajor === true) {
        GroupOption.push({
          id: listGroup[i].groupId,
          title: listGroup[i].name,
        });
      }
    }
    return GroupOption;
  };

  const getGroupOption = () => {
    const GroupOption = [];
    for (var i = 0; i < listGroup.length; i++) {
      if (listGroup[i].isVoter === true && listGroup[i].isStudentMajor === false) {
        GroupOption.push({
          id: listGroup[i].groupId,
          title: listGroup[i].name,
        });
      }
    }
    return GroupOption;
  };

  const handleChange1 = async (e) => {
    const a = listGroup.find((c) => c.groupId === e.target.value);
    setSelectedMajor(a.groupId);
    try {
      const req = await API(
        "PUT",
        URL_API + `/api/v1/users/${decode.Username}/group/${a.groupId}/campaign/${id}`,
        null,
        token
      );
      if (req) {
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

  const handleChange = async (e) => {
    const a = listGroup.find((c) => c.groupId === e.target.value);
    try {
      const req = await API(
        "PUT",
        URL_API + `/api/v1/users/${decode.Username}/group/${a.groupId}/campaign/${id}`,
        null,
        token
      );
      if (req) {
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

  const onClose = () => {
    SetisOpen(false);
  };

  return (
    <>
      <Dialog maxWidth="md" open={true}>
        <DialogTitle>
          <PageHeader
            title="Thông tin của bạn"
            subTitle="Vui lòng chọn thông tin chính xác"
            icon={getIcon("akar-icons:edit")}
          />
        </DialogTitle>
        {id === "6097a517-11ad-4105-b26a-0e93bea2cb43" ? (
          <DialogContent>
            <Grid item xs={12} mt={2} ml={3}>
              <Box
                sx={{
                  flexDirection: "row",
                }}
              >
                <Select
                  name="groupid"
                  required
                  label="Ngành học"
                  width="14rem"
                  height="10rem"
                  onChange={(e) => {
                    handleChange1(e);
                  }}
                  options={getGroupOption1()}
                />
              </Box>
            </Grid>
            <Grid item xs={12} mt={2} ml={3}>
              <Box
                sx={{
                  flexDirection: "row",
                }}
              >
                <Select
                  name="selectedGroup"
                  required
                  label="Giai đoạn học"
                  width="14rem"
                  height="10rem"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  options={getGroupOption()}
                  disabled={!selectedMajor}
                />
              </Box>
            </Grid>
          </DialogContent>
        ) : (
          <DialogContent>
            <Grid item xs={12} mt={2} ml={3}>
              <Box
                sx={{
                  flexDirection: "row",
                }}
              >
                <Select
                  name="selectedGroup"
                  required
                  label="Nhóm bình chọn"
                  width="14rem"
                  height="10rem"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  options={getGroupOption()}
                />
              </Box>
            </Grid>
          </DialogContent>
        )}

        <DialogActions>
          <Box display={"flex"} sx={{ justifyContent: "space-between", gap: "2rem", mr: "9rem" }}>
            <ButtonLangding
              height={"4rem"}
              width={"7rem"}
              onClick={onClose}
              nameButton="Hủy bỏ"
            ></ButtonLangding>
            <ButtonLangding
              height={"4rem"}
              bottom="2rem"
              onClick={handleConfirm}
              nameButton="Xác nhận"
            ></ButtonLangding>
          </Box>
        </DialogActions>
        <Box visibility="hidden" display={"flex"} sx={{}}>
          <ButtonLangding height={"1rem"} onClick={onClose} nameButton="Hủy bỏ"></ButtonLangding>
        </Box>
      </Dialog>
      <Policy OpenAlret={OpenDiaLog} SetOpenAlret={SetOpenDialog}></Policy>
    </>
  );
}