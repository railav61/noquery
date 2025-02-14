import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function QueryCard({ liked, query, updateLike }) {
  const [expanded, setExpanded] = React.useState(false);

  const _id = query._id;
  const date = new Date(query.createdAt);
  const formattedDate = date.toLocaleString();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUpdateLike = () => {
    const isLiked = !liked;
    updateLike(_id, isLiked);
  };

  return (
    <Card className="mb-5 w-[100%]">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title={query.username + " - " + query.email}
        subheader={formattedDate}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Subject: {query.subject}
        </Typography>
        <Typography>
          Status :{" "}
          <span
            style={{
              color:
                query.status === "open"
                  ? "red"
                  : query.status === "in_progress"
                  ? "yellow"
                  : "green",
            }}
          >
            {query.status}
          </span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }} className="rounded-lg p-4">
            Query -
          </Typography>
          <Typography
            sx={{ marginBottom: 2 }}
            className="rounded-lg p-4 bg-red-100"
          >
            {query.message}
          </Typography>
          {query.status === "resolved" && (
            <>
              <Typography sx={{ marginBottom: 2 }} className="rounded-lg p-4">
                Solution -
              </Typography>
              <Typography
                sx={{ marginBottom: 2 }}
                className="flex flex-row justify-between bg-green-100 rounded-lg p-4 w-fit max-w-full h-fit"
              >
                <span className="break-words overflow-hidden">
                  {query.solution}
                </span>
              </Typography>
              <Box className="w-full flex justify-end">
                <IconButton
                  aria-label="add to favorites"
                  onClick={handleUpdateLike}
                >
                  <FavoriteIcon
                    className={`${liked ? "text-red-500" : "text-gray-400"}`}
                  />
                </IconButton>
              </Box>
            </>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
