import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, ...props }) => {
  const navigate = useNavigate();

  function handleSelect(id) {
    navigate(`/product/${id}`);
  }
  const { id, image, title, price } = product;
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardMedia component="img" height="240" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <Typography gutterBottom variant="span" sx={{fontWeight:"bolder", paddingTop:"10px"}} component="div">
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
