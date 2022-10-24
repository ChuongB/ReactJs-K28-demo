import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { decrementCartItem, incrementCartItem } from "../../redux/product/productSlice";
import { useState } from "react";
const imageStyle = {
  width: "100px",
  height: "80px",
};
const Cart = ({ cart, ...props }) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);
  const dispatch = useDispatch();
  function increment(item) {
    dispatch(incrementCartItem(item));
  }
  function decrement(i) {
    if (i.quantity === 1) {
      setItem(i);
      handleClickOpen();
    } else {
      dispatch(decrementCartItem(i));
    }
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = () => {
    setOpen(false);
    dispatch(decrementCartItem(item));
  };

  function renderListCart() {
    return cart.map((c) => {
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
              <Box display="flex" gap="20px" padding="10px 0" alignItems="center">
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
          <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Confirm remove item"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Are you sure you want to remove this item from your cart?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={handleRemove} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      );
    });
  }
  const emptyCartUrl = "https://www.kindpng.com/picc/m/174-1749396_empty-cart-your-cart-is-empty-hd-png.png";
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
        {cart.length ? renderListCart() : <img style={{ width: "300px", margin: "50px auto" }} alt="no item in cart" src={emptyCartUrl} />}
      </Box>
      {getTotal() > 0 && (
        <Typography variant="h6" color="text.primary" sx={{ textAlign: "end", paddingTop: "20px" }}>
          Total: ${getTotal()}.00
        </Typography>
      )}
    </Box>
  );
};
export default Cart;
