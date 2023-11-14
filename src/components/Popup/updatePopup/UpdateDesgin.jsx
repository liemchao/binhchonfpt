import { Dialog, DialogContent, DialogTitle, Grid, Paper, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "components/Control/Select";
import Input from "components/Control/Input";
import PageHeader from "components/Layout/PageHeader";
import Iconify from "assets/theme/components/icon/Iconify";
import { Authen } from "context/authenToken/AuthenToken";
import { useContext } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { CustomizedToast } from "components/toast/ToastCustom";
import { URL_API } from "config/axios/Url/URL";
import API from "config/axios/API/API";
import { getGroupId } from "context/redux/action/action";
import { getCandidatebyId } from "context/redux/action/action";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import { handleGetCandidateByIdCampaign } from "context/redux/action/action";
import TextArea from "components/Control/TextArea";
const schema = yup.object().shape({});
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function UpdateDesign(props) {
  const dispatch = useDispatch();
  const { token } = useContext(Authen);
  const { OpenDesign, SetOpenDesign, id } = props;
  const [imageBackgroud, setImageBackgroud] = useState([]);
  const [logo, setLogo] = useState([]);
  const [input1, setInput1] = useState([]);
  const [input2, setInput2] = useState([]);
  const [input3, setInput3] = useState([]);
  const [input4, setInput4] = useState([]);

  const [display, setDisplay] = useState();

  const [loading, setLoading] = useState(true);
  const formData = new FormData();
  const handleClose = () => {
    SetOpenDesign(false);
  };
  const decode = jwt_decode(token);

  function _treat_BackGroud(e) {
    const { files } = e.target;
    const selecteds = [...[...files]];
    const image = URL.createObjectURL(selecteds[0]);
    formik.setFieldValue("Backgroud", selecteds[0]);
    // formData.append("File1", selecteds[0]);
    setImageBackgroud([image]);
  }

  function _treat_Logo(e) {
    const { files } = e.target;
    const selecteds = [...[...files]];
    const image = URL.createObjectURL(selecteds[0]);
    formik.setFieldValue("Logo", selecteds[0]);
    setLogo([image]);
  }

  function _treat1(e) {
    const { files } = e.target;
    let images = [];
    const selecteds = [...[...files]];
    formik.setFieldValue("ImageFile1", e.target.files[0]);
    return (
      selecteds.forEach((i) => images.push(URL.createObjectURL(i))),
      formData.append("File", selecteds),
      setInput1(images)
    );
  }

  function _treat2(e) {
    const { files } = e.target;
    let images = [];
    const selecteds = [...[...files]];
    formik.setFieldValue("ImageFile2", e.target.files[0]);
    selecteds.forEach((i) => images.push(URL.createObjectURL(i))), setInput2(images);
  }

  function _treat3(e) {
    const { files } = e.target;
    let images = [];
    const selecteds = [...[...files]];
    formik.setFieldValue("ImageFile3", e.target.files[0]);
    return (
      selecteds.forEach((i) => images.push(URL.createObjectURL(i))),
      // formData.append("File", selecteds),
      setInput3(images)
    );
  }

  function _treat4(e) {
    const { files } = e.target;
    let images = [];
    const selecteds = [...[...files]];
    formik.setFieldValue("ImageFile4", e.target.files[0]);
    return (
      selecteds.forEach((i) => images.push(URL.createObjectURL(i))),
      // formData.append("File", selecteds),
      setInput4(images)
    );
  }

  useEffect(() => {
    const getAPIdata = async () => {
      try {
        setLoading(true);

        await Promise.all([
          dispatch(getCandidatebyId(id, token)),
          dispatch(getGroupId(idCampaign, token)),
        ]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getAPIdata();
  }, [dispatch, id, token]);

  const object = useSelector((state) => {
    return state.candidateonedetail;
  });

  const listGroup = useSelector((state) => {
    return state.listGroup;
  });

 

  const getGroupOption = () => {
    const GroupOption = [];
    for (var i = 0; i < listGroup.length; i++) {
      if (listGroup[i].isVoter === false) {
        GroupOption.push({
          id: listGroup[i].groupId,
          title: listGroup[i].name,
        });
      }
    }
    return GroupOption;
  };

  React.useEffect(() => {
    API("GET", URL_API + `/api/v1/candidates/${id}`, null, token)
      .then((res) => {
        formik.setFieldValue("FullName", res.data.data.fullName);
        formik.setFieldValue("Description", res.data.data.description);
        setDisplay(res.data.data.groupId);
      })
      .catch((error) => {});
  }, [id]);

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      FullName: object.FullName,
      Description: object.description,
      GroupId: object.groupId,
      Backgroud: null,
      Logo: null,
      ImageFile1: null,
      ImageFile2: null,
      ImageFile3: null,
      ImageFile4: null,
    },

    onSubmit: async (values) => {
      formData.append("FullName", formik.values.FullName);
      formData.append("Description", formik.values.Description);
      formData.append("GroupId", display);
      formData.append("Backgroud", formik.values.Backgroud);
      formData.append("Logo", formik.values.Logo);
      formData.append("ImageFile1", formik.values.ImageFile1);
      formData.append("ImageFile2", formik.values.ImageFile2);
      formData.append("ImageFile3", formik.values.ImageFile3);
      formData.append("ImageFile4", formik.values.ImageFile4);

      try {
        const req = await API(
          "PUT",
          URL_API + `/api/v1/candidates/${object.candidateId}`,
          formData,
          token
        );
        if (req) {
          CustomizedToast({
            message: "Chỉnh sửa thông tin thành công",
            type: "SUCCESS",
          });
          handleClose();
          await dispatch(handleGetCandidateByIdCampaign(token, id));
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
    },
  });

  if (!object || loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Paper>
        <Dialog maxWidth="md" open={OpenDesign} onClose={handleClose}>
          <DialogTitle>
            <PageHeader
              title="Chỉnh sửa thông tin trang chủ"
              subTitle="Cập nhật thông tin và thiết kế trang chủ"
              icon={getIcon("akar-icons:edit")}
            />
          </DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  m: 1,
                  display: "flex",
                  justifyContent: "center",
                  boxShadow: 12,
                  paddingLeft: "7%",
                  maxWidth: "xl",
                }}
              >
                <Box
                  sx={{ float: "left", width: "60%", flexGrow: 1, mt: "2rem" }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                      <Input
                        required
                        variant="outlined"
                        name="FullName"
                        label="Màu chữ"
                        values={formik.values.FullName}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        required
                        variant="outlined"
                        name="Description"
                        label="Thời gian mở cổng bình chọn"
                        values={formik.values.Description}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Input
                        required
                        variant="outlined"
                        name="Description"
                        label="Thời gian đóng cổng bình chọn"
                        values={formik.values.Description}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Input
                        required
                        variant="outlined"
                        name="Description"
                        label="Thời gian công bố top 10"
                        values={formik.values.Description}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        required
                        variant="outlined"
                        name="Description"
                        label="Thời gian vinh danh top 10"
                        values={formik.values.Description}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextArea
                        required
                        columns={12}
                        width="85%"
                        row={6}
                        maxRows={6}
                        multiline
                        label="Mô tả 1"
                        variant="outlined"
                        values={formik.values.Description}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextArea
                        columns={12}
                        width="85%"
                        row={6}
                        maxRows={6}
                        multiline
                        variant="outlined"
                        label="Mô tả 2"
                        values={formik.values.Description}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextArea
                        columns={12}
                        width="85%"
                        row={6}
                        maxRows={6}
                        multiline
                        variant="outlined"
                        required
                        label="Mô tả 3"
                        name="description"
                        values={formik.values.Description}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextArea
                        columns={12}
                        width="85%"
                        row={6}
                        maxRows={6}
                        multiline
                        variant="outlined"
                        label="Mô tả 4"
                        values={formik.values.Description}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>

                    <Box width="200px" marginTop={"10%"} ml={"5rem"} mb={"2rem"}>
                      <ButtonLangding
                        variant="contained"
                        type="submit"
                        nameButton="Cập nhật"
                        bgColor="#FFA500"
                        hovercolor="#F7941D"
                      />
                    </Box>
                  </Grid>
                </Box>
                <Box sx={{ display: "grid" }}>
                  <Box sx={{ float: "left", width: "50%", mt: "2rem" }}>
                    <label>
                      <input
                        accept="image/*"
                        id="0"
                        type="file"
                        multiple
                        onChange={_treat_BackGroud}
                        style={{ display: "none" }}
                      />
                      <ButtonLangding
                        id="0"
                        width="8rem"
                        variant="contained"
                        component="span"
                        nameButton="Ảnh nền"
                      ></ButtonLangding>

                      <Box
                        id="0"
                        sx={{
                          height: 100,
                          width: 100,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                          marginTop: "10%",
                          marginLeft: "11%",
                          border: "2px solid #000", // Thêm đường viền
                          borderRadius: "50%", // Chuyển thành hình tròn
                          overflow: "hidden", // Ẩn phần nằm ngoài hình tròn
                        }}
                      >
                        {imageBackgroud !== null ? (
                          <img
                            src={imageBackgroud}
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        ) : (
                          <img
                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        )}
                      </Box>
                    </label>
                  </Box>
                  <Box sx={{ float: "left", width: "50%", mt: "2rem" }}>
                    <label>
                      <input
                        accept="image/*"
                        id="1"
                        type="file"
                        onChange={_treat2}
                        style={{ display: "none" }}
                      />
                      <ButtonLangding
                        id="1"
                        width="9rem"
                        variant="contained"
                        component="span"
                        nameButton="Ảnh logo 2"
                      ></ButtonLangding>

                      <Box
                        id="1"
                        sx={{
                          height: 100,
                          width: 100,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                          marginTop: "10%",
                          marginLeft: "11%",
                          border: "2px solid #000", // Thêm đường viền
                          borderRadius: "50%", // Chuyển thành hình tròn
                          overflow: "hidden", // Ẩn phần nằm ngoài hình tròn
                        }}
                      >
                        {input2 !== null ? (
                          <img
                            src={input2}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        ) : (
                          <img
                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        )}
                      </Box>
                    </label>
                  </Box>
                </Box>
                <Box sx={{ display: "grid", marginLeft: "1%" }}>
                  <Box sx={{ float: "left", width: "50%", mt: "2rem" }}>
                    <label>
                      <input
                        accept="image/*"
                        id="1"
                        multiple
                        type="file"
                        onChange={_treat_Logo}
                        style={{ display: "none" }}
                      />
                      <ButtonLangding
                        width="9rem"
                        variant="contained"
                        component="span"
                        nameButton="Ảnh icon"
                      ></ButtonLangding>

                      <Box
                        sx={{
                          height: 100,
                          width: 100,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                          marginTop: "10%",
                          marginLeft: "11%",
                          border: "2px solid #000", // Thêm đường viền
                          borderRadius: "50%", // Chuyển thành hình tròn
                          overflow: "hidden", // Ẩn phần nằm ngoài hình tròn
                        }}
                      >
                        {logo !== null ? (
                          <img
                            src={logo}
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        ) : (
                          <img
                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        )}
                      </Box>
                    </label>
                  </Box>
                  <Box sx={{ float: "left", width: "50%", mt: "2rem" }}>
                    <label>
                      <input
                        accept="image/*"
                        id="contained-button-file4"
                        multiple
                        type="file"
                        onChange={_treat3}
                        style={{ display: "none" }}
                      />
                      <ButtonLangding
                        width="9rem"
                        variant="contained"
                        component="span"
                        nameButton="Ảnh logo 3"
                      ></ButtonLangding>

                      <Box
                        sx={{
                          height: 100,
                          width: 100,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                          marginTop: "10%",
                          marginLeft: "11%",
                          border: "2px solid #000", // Thêm đường viền
                          borderRadius: "50%", // Chuyển thành hình tròn
                          overflow: "hidden", // Ẩn phần nằm ngoài hình tròn
                        }}
                      >
                        {input3 !== null ? (
                          <img
                            src={input3}
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        ) : (
                          <img
                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        )}
                      </Box>
                    </label>
                  </Box>
                </Box>
                <Box sx={{ display: "grid", marginLeft: "1%" }}>
                  <Box sx={{ float: "left", width: "50%", mt: "2rem" }}>
                    <label>
                      <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={_treat1}
                        style={{ display: "none" }}
                      />
                      <ButtonLangding
                        width="9rem"
                        variant="contained"
                        component="span"
                        nameButton="Ảnh logo 1"
                      ></ButtonLangding>

                      <Box
                        sx={{
                          height: 100,
                          width: 100,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                          marginTop: "10%",
                          marginLeft: "11%",
                          border: "2px solid #000", // Thêm đường viền
                          borderRadius: "50%", // Chuyển thành hình tròn
                          overflow: "hidden", // Ẩn phần nằm ngoài hình tròn
                        }}
                      >
                        {input1 !== null ? (
                          <img
                            src={input1}
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        ) : (
                          <img
                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        )}
                      </Box>
                    </label>
                  </Box>
                  <Box sx={{ float: "left", width: "50%", mt: "2rem" }}>
                    <label>
                      <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={_treat4}
                        style={{ display: "none" }}
                      />
                      <ButtonLangding
                        width="9rem"
                        variant="contained"
                        component="span"
                        nameButton="Ảnh logo 4"
                      ></ButtonLangding>

                      <Box
                        sx={{
                          height: 100,
                          width: 100,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                          marginTop: "10%",
                          marginLeft: "11%",
                          border: "2px solid #000", // Thêm đường viền
                          borderRadius: "50%", // Chuyển thành hình tròn
                          overflow: "hidden", // Ẩn phần nằm ngoài hình tròn
                        }}
                      >
                        {input4 !== null ? (
                          <img
                            src={input4}
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        ) : (
                          <img
                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        )}
                      </Box>
                    </label>
                  </Box>
                </Box>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      </Paper>
    );
  }
}
