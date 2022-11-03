import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useProduct from "../../../hooks/useProduct";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateProductDialog from "./create-product-dialog";
import { useState } from "react";

export default function ProductManagementProductList() {
  const { data: products, loading } = useProduct();
  const [openDialog, setOpenDialog] = useState(false);

  const displayColumn = [
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

  return loading ? (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <CircularProgress />
    </Box>
  ) : (
    <Box sx={{ padding: "20px", width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Product list</h3>
        <Box>
          <Button variant="contained" onClick={() => handleOpenDialog()}>
            Add Product
          </Button>
        </Box>
      </Box>

      <Box></Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {displayColumn.map((item, i) => (
                <TableCell key={i}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {row.name}
                </TableCell> */}
                <TableCell align="left">
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "50px" }}
                  />
                </TableCell>
                <TableCell align="left">{product.name}</TableCell>
                <TableCell align="left">{product.SKU}</TableCell>
                <TableCell align="left">{product.description}</TableCell>
                <TableCell align="left">{product.price}</TableCell>
                <TableCell align="left">
                  <Box sx={{ display: "flex" }}>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>

                    <IconButton color="error">
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateProductDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </Box>
  );
}
