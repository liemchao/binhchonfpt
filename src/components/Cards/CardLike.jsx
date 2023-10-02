import React, { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CandateDetail from "layouts/page/user/Candidate/DetailCandidate";

export default function CardLike(props) {
  const MAX_DESCRIPTION_LENGTH = 50;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    name,
    image,
    description,
    onClickLike,
    onClickShare,
    handleClick,
    score,
    groupName,
    isVoted,
  } = props;

  const handleClick1 = () => {
    setShowFullDescription(true);
  };

  const truncateDescription = (text, length) => {
    if (!text) {
      return "";
    }

    if (text?.length <= length) {
      return text;
    }

    const truncatedText = text.slice(0, length);
    const lastSpaceIndex = truncatedText.lastIndexOf(" ");

    return truncatedText.slice(0, lastSpaceIndex) + "...";
  };

  const truncatedDescription = truncateDescription(description, MAX_DESCRIPTION_LENGTH);

  return (
    <>
      <Card variant="outlined" sx={{ width: 350 }}>
        <CardOverflow>
          <AspectRatio ratio="1">
            {image ? (
              <img
                style={{ display: "over", objectFit: "cover" }}
                src={image}
                alt="ảnh ứng cử viên"
                width="220%"
                height="220%"
                objectFit="cover"
              />
            ) : (
              <img
                src="https://st.quantrimang.com/photos/image/072015/22/avatar.jpg"
                alt="ẩn thay thế"
                width="220%"
                height="220%"
                objectFit="cover"
              />
            )}
          </AspectRatio>
          <IconButton
            aria-label="Like minimal photography"
            size="md"
            variant="solid"
            color="primary"
            onClick={onClickShare}
            sx={{
              position: "absolute",
              zIndex: 2,
              borderRadius: "50%",
              right: "1rem",
              bottom: 0,
              transform: "translateY(50%)",
              backgroundColor: "#D44FAC",
              "&:hover": {
                backgroundColor: "#D44FAC",
              },
            }}
          >
            <ShareIcon />
          </IconButton>

          <IconButton
            aria-label="Like minimal photography"
            size="md"
            variant="solid"
            onClick={onClickLike}
            sx={{
              backgroundColor: isVoted ? "#FFA500" : "#D44FAC",
              "&:hover": {
                backgroundColor: isVoted ? "#D44FAC" : "#F7941D",
              },
              position: "absolute",
              zIndex: 2,
              borderRadius: "50%",
              right: "4rem",
              bottom: 0,
              transform: "translateY(50%)",
            }}
            // disabled={isVoted}
          >
            <Favorite />
          </IconButton>
        </CardOverflow>
        <CardContent>
          <Typography
            level="h2"
            fontSize="md"
            sx={{
              color: "#B83490",
            }}
          >
            <Link onClick={handleClick} overlay underline="none" color="#B83490">
              {name}
            </Link>
          </Typography>
          <Typography sx={{ mt: 0.5 }}>
            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {groupName}
            </Typography>
          </Typography>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: "background.level1", mt: "-0.5rem" }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography level="body3" sx={{ fontWeight: "md", color: "#B83490" }}>
              {
                <IconButton info>
                  <Favorite sx={{ color: "#D44FAC" }} /> {score}
                </IconButton>
              }
            </Typography>
            <Divider orientation="vertical" />
            <Typography level="body" sx={{ mt: 0.2, fontWeight: "md", color: "#B83490" }}>
              {showFullDescription ? description : truncatedDescription}
              {!showFullDescription && description?.length > MAX_DESCRIPTION_LENGTH && (
                <>
                  <button sx={{ color: "#D44FAC" }} onClick={handleClick1}>
                    Xem thêm
                  </button>
                </>
              )}
            </Typography>
          </CardContent>
        </CardOverflow>
      </Card>
      <CandateDetail OpenPopUp={open} SetOpenPopUp={setOpen} />
    </>
  );
}
