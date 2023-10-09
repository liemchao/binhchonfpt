import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import { useState } from "react";
import { useEffect } from "react";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import dayjs from "dayjs";
import { Description } from "@mui/icons-material";

export default function UserCard(props) {
  const {
    title,
    process,
    totalCandidate,
    url,
    creater,
    onClickJoin,
    onClickShare,
    dayEnd,
    startTime,
    visibilityCandidate,
    admin,
    onClickViewDetail,
    onClickDelete,
    onClickUnDe,
    publishTheResult,
    status,
    onClickResult,
    description,
  } = props;
  const [isButtonDisabled, setIsButtonDisabled] = useState(
    process === "Chưa bắt đầu" || process === "Đã kết thúc"
  );
  useEffect(() => {
    setIsButtonDisabled(process === "Chưa bắt đầu" || process === "Đã kết thúc");
  }, [process]);
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
        mt: "1%",
        backgroundColor: "transparent",
        border: "none",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "block",
          width: "1px",
          left: "500px",
          top: "-24px",
          bottom: "-24px",
          "@media (max-width: 500px)": {
            left: "unset",
            right: "0",
            top: "4px",
            bottom: "unset",
            "&::before": {
              content: '""',
              width: "1px",
              height: "calc(100% - 8px)",
              position: "absolute",
              right: "0.5rem",
              color: "text.tertiary",
              fontSize: "sm",
              fontWeight: "lg",
            },
          },
          "&::after": {
            top: "4px",
            // content: '"horizontal"',
            display: "block",
            position: "absolute",
            left: "0.5rem",
            color: "white",
            fontSize: "sm",
            fontWeight: "lg",
          },
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          backgroundImage:
            "url(https://res.cloudinary.com/dxevluwyr/image/upload/v1694155547/BackGround_xhgdfp.png)",

          backgroundSize: "cover",
          backgroundColor: "transparent",
          border: "none",
          width: "100%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          overflow: "auto",
          resize: "horizontal",
        }}
      >
        <AspectRatio
          ratio="1"
          maxHeight={210}
          backgroundColor="transparent"
          sx={{ minWidth: 200, flex: 1, borderRadius: "10px", marginTop: "2%" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
            borderRadius={"50px"}
          >
            <img
              src={url}
              srcSet={url}
              loading="lazy"
              alt=""
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </AspectRatio>
        <CardContent>
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: "40px",
              color: "#B83490",
              fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
            }}
          >
            {title}
          </Typography>
          {/* <Typography level="body1" fontWeight="lg" textColor="text.tertiary">
            {creater}
          </Typography> */}
          <Sheet
            sx={{
              backgroundColor: "transparent",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",

              "& > div": { flex: 1.2 },
            }}
          >
            <div>
              <Typography level="body3" fontWeight="lg"></Typography>
              {visibilityCandidate ? (
                <Typography></Typography>
              ) : (
                <Typography>{description}</Typography>
              )}
            </div>

            <div
              style={{
                marginRight: "40%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ flex: 5, marginRight: "10px" }}>
                <Typography sx={{ whiteSpace: "nowrap" }} fontWeight="lg">
                  Thời gian bắt đầu
                </Typography>
                <Typography fontWeight="lg">15/10/2023</Typography>
              </div>
              <div style={{ flex: 5, marginRight: "20px", width: "100%" }}>
                <Typography sx={{ whiteSpace: "nowrap" }} fontWeight="lg">
                  Thời gian kết thúc
                </Typography>
                <Typography fontWeight="lg"> 29/10/2023</Typography>
              </div>
              <div style={{ flex: 5, marginRight: "20px" }}>
                <Typography sx={{ whiteSpace: "nowrap" }} fontWeight="lg">
                  Trạng thái
                </Typography>
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    color:
                      process === "Chưa diễn ra"
                        ? "black"
                        : process === "Đang diễn ra"
                        ? "green"
                        : "black",
                  }}
                  fontWeight="lg"
                >
                  {process}
                </Typography>
              </div>
            </div>
          </Sheet>
          <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
            {admin === false ? (
              <Box sx={{ display: "flex", gap: 2, marginTop: 6 }}>
                <ButtonLangding
                  nameButton="Xem"
                  height={"3.5  rem"}
                  width={"16rem"}
                  bgColor="#FFA500"
                  hovercolor="#F7941D"
                  onClick={onClickViewDetail}
                  borderRadius={"50px"}
                />
                {status ? (
                  <ButtonLangding
                    nameButton="Xoá"
                    bgColor="#FFA500"
                    height={"3.5rem"}
                    width={"16rem"}
                    hovercolor="#F7941D"
                    onClick={onClickDelete}
                    borderRadius={"50px"}
                  />
                ) : (
                  <ButtonLangding
                    nameButton="Khôi phục"
                    bgColor="#FFA500"
                    height={"3.5rem"}
                    width={"16rem"}
                    hovercolor="#F7941D"
                    onClick={onClickUnDe}
                    borderRadius={"50px"}
                  />
                )}
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 5, marginTop: "1%" }}>
                <ButtonLangding
                  height={"3.5rem"}
                  width={"16rem"}
                  nameButton="Chia sẻ"
                  bgColor={isButtonDisabled ? "#CCCCCC" : "#FFA500"}
                  hovercolor={isButtonDisabled ? "#CCCCCC" : "#F7941D"}
                  onClick={onClickShare}
                  disabled={isButtonDisabled}
                  borderRadius={"50px"}
                />
                {publishTheResult && process === "Đã kết thúc" ? (
                  <ButtonLangding
                    nameButton="Kết quả"
                    height={"3.5rem"}
                    width={"16rem"}
                    bgColor={"#FFA500"}
                    hovercolor={"#F7941D"}
                    onClick={onClickResult}
                    borderRadius={"50px"}
                  />
                ) : (
                  <ButtonLangding
                    nameButton="Tham gia"
                    height={"3.5rem"}
                    width={"16rem"}
                    bgColor={isButtonDisabled ? "#CCCCCC" : "#FFA500"}
                    hovercolor={isButtonDisabled ? "#CCCCCC" : "#F7941D"}
                    onClick={onClickJoin}
                    disabled={isButtonDisabled}
                    borderRadius={"50px"}
                  />
                )}
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
