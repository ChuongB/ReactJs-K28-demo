import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductDetails from "../hooks/useProductDetails";

const ProductDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  function back() {
    navigate(-1);
  }

  function addToCard() {
    //TODO
  }
  const product = useProductDetails(params.id);

  const { image, title, price } = product;
  return (
    <Card sx={{ maxWidth: 600, margin: "auto", padding: "50px" }}>
      <CardMedia component="img" height="240" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
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
        <Button size="small" onClick={() => back()}>
          Back
        </Button>
        <Button size="small" onClick={() => addToCard()}>
          Add to card
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductDetailsPage;
