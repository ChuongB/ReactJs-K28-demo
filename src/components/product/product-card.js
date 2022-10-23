import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, ...props }) => {
  const navigate = useNavigate();
  function handleSelect(id) {
    navigate(`/product/${id}`);
  }

  const { id, image, title, price, description } = product;
  return (
    <Card sx={{ maxWidth: 600, padding: "20px" }}>
      <CardMedia component="img" height="280" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography
          gutterBottom
          variant="span"
          sx={{ fontWeight: "bolder", paddingTop: "10px" }}
          component="div"
        >
          ${price}.00
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" onClick={() => handleSelect(id)}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
