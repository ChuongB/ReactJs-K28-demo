import Button from "@material-ui/core/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import CreateProductDialog from "./create-product-dialog";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ProductListManagementPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const displayedColumn = [
    "Image",
    "Name",
    "Sku",
    "Description",
    "Price",
    "Actions",
  ];
  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleReloadProducts() {
    loadProduct();
  }

  async function loadProduct() {
    setLoading(true);
    const url = "http://localhost:3004/products";

    try {
      const res = await axios.get(url);
      if (res && res.data) {
        setProducts(res.data);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProduct(id) {
    const url = `http://localhost:3004/products/${id}`;
    await axios.delete(url);
    toast.success("Delete product successful");
    //TOTO: reset list
    handleReloadProducts();
  }
  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <Box sx={{ padding: " 10px 20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2> Product List</h2>
        <Box>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleOpenDialog()}
          >
            Add product
          </Button>
        </Box>
      </Box>
      <Box>
        {loading ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", padding: "100px" }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {displayedColumn.map((column, i) => (
                    <TableCell align="left" key={i}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img
                        src={row.image}
                        alt={row.name}
                        style={{ width: "50px" }}
                      />
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.sku}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">
                      <Box sx={{ display: "flex" }}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => {
                            navigate(row.id);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDeleteProduct(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <CreateProductDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleReloadProducts={handleReloadProducts}
      />
    </Box>
  );
};

export default ProductListManagementPage;
