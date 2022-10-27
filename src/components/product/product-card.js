import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { actionTypes } from "../../store/reducer";
const ProductCard = ({ product, ...props }) => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  function handleSelect(id) {
    navigate(`/product/${id}`);
  }
  function handleAddToCart() {
    dispatch({ type: actionTypes.ADD_TO_CART, payload: product });
  }

  const { id, image, name, price, description } = product;
  return (
    <Card sx={{ maxWidth: 600, padding: "20px" }}>
      <CardMedia component="img" height="280" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
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
        <Button size="small" onClick={() => handleSelect(id)}>
          Details
        </Button>
        <Button size="small" onClick={() => handleAddToCart()}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
