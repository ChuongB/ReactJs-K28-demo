import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import {
  decrementCartItem,
  incrementCartItem,
} from "../../redux/product/productSlice";
const imageStyle = {
  width: "100px",
  height: "80px",
};
const Cart = ({ cart, ...props }) => {
  const dispatch = useDispatch();
  function increment(item) {
    dispatch(incrementCartItem(item));
  }
  function decrement(item) {
    dispatch(decrementCartItem(item));
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }
  function renderListCart() {
    return (
      cart &&
      cart.map((c) => {
        console.log(c);
        const { id, name, image, quantity, price } = c;
        return (
          <Card
            key={id}
            sx={{
              padding: "20px",
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <img src={image} alt={name} loading="lazy" style={imageStyle} />
            <CardContent>
              <Box>
                <Typography variant="body2" color="text.primary">
                  {name}, ${price}.00
                </Typography>
                <Box
                  display="flex"
                  gap="20px"
                  padding="10px 0"
                  alignItems="center"
                >
                  <ButtonGroup>
                    <Button
                      aria-label="reduce"
                      onClick={() => {
                        decrement(c);
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </Button>
                    <Button
                      aria-label="increase"
                      onClick={() => {
                        increment(c);
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                  </ButtonGroup>
                  <Typography variant="body2" color="text.primary" text="bold">
                    {quantity}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })
    );
  }
  return (
    <Box
      sx={{
        width: "600px",
        margin: "auto",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        {renderListCart()}
      </Box>
      {getTotal() && (
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ textAlign: "end", paddingTop: "20px" }}
        >
          Total: ${getTotal()}.00
        </Typography>
      )}
    </Box>
  );
};
export default Cart;
