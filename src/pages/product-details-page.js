import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../App";
import useProductDetails from "../hooks/useProductDetails";
import { actionTypes } from "../store/reducer";
import CardSkeleton from "../components/product/cardSkeleton";
const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  function back() {
    navigate(-1);
  }

  const { data: product, loading } = useProductDetails(id);
  const { dispatch } = useContext(AppContext);

  function addToCard() {
    dispatch({ action: actionTypes.ADD_TO_CART, payload: product });
  }

  const { image, name, price } = product || {};
  return loading ? (
    <Box sx={{ margin: "50px auto", width: "250px" }}>
      <CardSkeleton />
    </Box>
  ) : (
    <Box sx={{ padding: "50px" }}>
      <Card sx={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
        <CardMedia
          sx={{ objectFit: "contain" }}
          component="img"
          height="320"
          image={image}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
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
    </Box>
  );
};

export default ProductDetailsPage;
