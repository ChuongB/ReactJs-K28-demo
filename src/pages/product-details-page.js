import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const onBack = () => {
    navigate("/product");
  };
  useEffect(() => {
    async function fetchData() {
      const { id } = params;
      const url = `http://localhost:3004/products/${id}`;
      try {
        const res = await axios.get(url);
        if (res && res.data) {
          setProduct(res.data);
        }
      } catch (error) {
        console.warn(error);
      }
    }
    fetchData();
  }, []);

  const { image, title } = product;
  return (
    <Card sx={{ maxWidth: 600, margin: "auto", padding: "50px" }}>
      <CardMedia component="img" height="320" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onBack()}>
          Back
        </Button>
        <Button size="small">Add to card</Button>
      </CardActions>
    </Card>
  );
};

export default ProductDetailsPage;
