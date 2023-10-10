import React, { useState } from "react";
import { Container, Typography, Grid, Box, Card, CardContent } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
const VotingRules = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleHideMore = () => {
    setShowMore(false);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: "transparent",
              position: "relative",
              border: "none",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#B83490",
                fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
              }}
            >
              Quy tắc bình chọn:
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#B83490",
                fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
              }}
            >
              1 sinh viên có 1 lần tham gia với 3 phiếu bình chọn.
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#B83490",
                fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
              }}
            >
              1 lượt bình chọn dành cho 1 giảng viên.
            </Typography>
            <Typography
              variant="h5"
              fontWeight="bold"
              fontStyle={"italic"}
              sx={{
                color: "#B83490",
                fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
              }}
            >
              Quy tắc tính điểm phụ thuộc vào giai đoạn học của sinh viên:
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{ backgroundColor: "transparent", position: "relative", border: "none" }}
            >
              <Grid
                item
                xs={4}
                sx={{ backgroundColor: "transparent", position: "relative", border: "none" }}
              >
                <Card
                  sx={{
                    backgroundColor: "transparent",
                    backgroundImage: `url("https://i.imgur.com/dqFqy9W.png")`,
                    backgroundSize: "100% 100%",
                    border: "none",
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      Giai đoạn
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      DỰ BỊ
                    </Typography>
                    <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Grid item>
                        <FavoriteIcon sx={{ color: "red", fontSize: 30 }} />
                      </Grid>
                      <Grid item>
                        <FavoriteIcon sx={{ color: "red", fontSize: 30 }} />
                      </Grid>
                      <Grid item>
                        <FavoriteIcon sx={{ color: "red", fontSize: 30 }} />
                      </Grid>
                    </Grid>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      3 giảng viên
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      nhóm môn chung
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4} sx={{ backgroundColor: "transparent" }}>
                <Card
                  sx={{
                    backgroundColor: "transparent",
                    backgroundImage: `url("https://i.imgur.com/dqFqy9W.png")`,
                    backgroundSize: "100% 100%",
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      Giai đoạn
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      CHUYÊN NGÀNH
                    </Typography>

                    <Typography
                      variant="body"
                      fontWeight="bold"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      (HK1-HK6)
                    </Typography>
                    <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Grid item>
                        <FavoriteIcon sx={{ color: "red", fontSize: 30 }} />
                      </Grid>
                    </Grid>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      1 giảng viên
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      nhóm môn chung
                    </Typography>
                    <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Grid item>
                        <FavoriteIcon sx={{ color: "red", fontSize: 30 }} />
                      </Grid>
                      <Grid item>
                        <FavoriteIcon sx={{ color: "red", fontSize: 30 }} />
                      </Grid>
                    </Grid>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      2 giảng viên
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      chuyên ngành
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card
                  sx={{
                    backgroundColor: "transparent",
                    backgroundImage: `url("https://i.imgur.com/dqFqy9W.png")`,
                    backgroundSize: "100% 100%",
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      Giai đoạn
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      CHUYÊN NGÀNH
                    </Typography>
                    <Typography
                      variant="body"
                      fontWeight="bold"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      (HK7-HK9)
                    </Typography>
                    <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Grid item>
                        <FavoriteIcon sx={{ color: "red", fontSize: 30 }} />
                      </Grid>
                      <Grid item>
                        <FavoriteIcon sx={{ color: "red", fontSize: 30 }} />
                      </Grid>
                      <Grid item>
                        <FavoriteIcon sx={{ color: "red", fontSize: 30 }} />
                      </Grid>
                    </Grid>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      3 giảng viên
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      chuyên ngành
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VotingRules;
