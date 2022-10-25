import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../redux/product/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/product/productSlice";
const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function back() {
    navigate(-1);
  }

  function addToCard() {
    dispatch(addToCart(product));
  }

  const { data: product } = useGetProductDetailsQuery(id);

  const { image, title, price } = product || {};
  return (
    product && (
      <Box sx={{ padding: "50px" }}>
        <Card sx={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
          <CardMedia
            sx={{ objectFit: "contain" }}
            component="img"
            height="320"
            image={image}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
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
      </Box>
    )
  );
};

export default ProductDetailsPage;
