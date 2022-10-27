import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
const Cart = ({ cart, ...props }) => {
  function getToTal() {
    return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }
  function handleDecrementItem(item) {}

  function handleIncrementItem(item) {}
  function renderListCart() {
    return cart.map((item) => {
      const { id, name, quantity, price, image } = item;
      return (
        <Card key={id} sx={{ marginBottom: "30px" }}>
          <CardContent sx={{ display: "flex", gap: "20px" }}>
            <img src={image} alt={name} style={{ width: "100px" }} />
            <Box>
              <Typography variant="p">
                {name}, ${price}.00
              </Typography>
              <Box
                display="flex"
                gap="20px"
                alignItems="center"
                paddingTop="20px"
              >
                <ButtonGroup>
                  <Button
                    aria-label="reduce"
                    onClick={() => {
                      handleDecrementItem(item);
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      handleIncrementItem(item);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
                <Typography variant="span">{quantity}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      );
    });
  }

  return (
    <Box
      sx={{
        width: "800px",
        margin: " 50px auto",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <Box gap="30px" alignItems="center" flexDirection="column" width="100%">
        {" "}
        {renderListCart()}
      </Box>
      <Typography variant="h6" textAlign="end">
        Total: {"  "} ${getToTal()}.00
      </Typography>
    </Box>
  );
};

export default Cart;
