import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import { Box, Button } from "@mui/material";

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

export default function AdminCard({
  query,
  updateStatus,
  updateSolution,
  updateDelete,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [solution, setSolution] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const open = Boolean(anchorEl);

  const _id = query._id;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    setStatus(e.target.value);
    updateStatus(e, _id);
  };

  const date = new Date(query.createdAt);
  const formattedDate = date.toLocaleString();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUpdateSolution = (e) => {
    e.preventDefault();
    updateSolution(_id, solution);
  };

  const handleUpdateDelete = () => {
    const isDeleted = true;
    updateDelete(_id, isDeleted);
  };

  const options = ["in_progress", "resolved"];
  return (
    <Card className="mb-5">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        }
        action={
          <div>
            <Button
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              className=""
              onClick={handleClick}
            >
              <span>Update Status</span>
            </Button>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={(e, _id) => handleClose(e, _id)}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: 48 * 4.5,
                    width: "20ch",
                  },
                },
              }}
            >
              {options.map((option) => (
                <Button key={option} value={option} onClick={handleClose}>
                  {option}
                </Button>
              ))}
            </Menu>
          </div>
        }
        title={query.name + " - " + query.email}
        subheader={formattedDate}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <Box className="w-full flex justify-end pr-3">
        <Button onClick={handleUpdateDelete}>Delete</Button>
      </Box>
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
        <Typography variant="body2" sx={{ color: "red" }}>
          {query.isDeleted ? "Deleted" : ""}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {query.isLiked && (
          <IconButton aria-label="add to favorites">
            <FavoriteIcon className="text-red-500" />
          </IconButton>
        )}
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
          <Typography
            sx={{ marginBottom: 2 }}
            className="bg-gray-100 p-4 rounded-lg"
          >
            Query -
          </Typography>
          <Typography
            sx={{ marginBottom: 2 }}
            className="bg-red-50 p-4 rounded-lg"
          >
            {query.message}
          </Typography>
          {query.solution !== "" && (
            <>
              <Typography
                sx={{ marginBottom: 2 }}
                className="bg-gray-100 p-4 rounded-lg"
              >
                Previous Solution -
              </Typography>
              <Typography
                sx={{ marginBottom: 2 }}
                className="bg-green-50 p-4 rounded-lg"
              >
                {query.solution}
              </Typography>
            </>
          )}
          <Typography sx={{ marginBottom: 2 }}>Give Solution - </Typography>
          <form onSubmit={(e) => handleUpdateSolution(e)}>
            <textarea
              name="text"
              id="text"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="w-full border-2 p-2"
            ></textarea>
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
}
