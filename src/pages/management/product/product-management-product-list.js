import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import CreateProductDialog from "./create-product-dialog";

export default function ProductManagementProductList() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [pageSize, setPageSize] = useState(+searchParams.get("pageSize"));
  const [pageIndex, setPageIndex] = useState(+searchParams.get("pageIndex"));
  const [total, setToTal] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(pageSize, parseInt(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    const { value } = event.target;
    setPage(parseInt(value), 0);
  };

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

  function setPage(pageSize, pageIndex) {
    setPageSize(+pageSize);
    setPageIndex(+pageIndex);
    setSearchParams({ pageSize, pageIndex });
  }

  function handleEdit(id) {
    navigate(id);
  }

  function reloadProduct() {
    fetchProducts();
  }
  
  async function handleDelete(id) {
    const url = `http://localhost:3004/products/${id}`;

    try {
      setLoading(true);
      const res = await axios.delete(url);
      if (res && res.data) {
        toast.success("Delete product successfully");
        fetchProducts();
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!pageSize && !pageIndex) {
      setPage(10, 0);
    }

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function fetchProducts() {
    const url = `http://localhost:3004/products?_page=${pageIndex}&_limit=${pageSize}`;
    try {
      setLoading(true);
      const res = await axios.get(url);
      if (res && res.data) {
        setProducts(res.data);
        setToTal(+res.headers["x-total-count"]);
      }
    } finally {
      setLoading(false);
    }
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
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(product.id)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(product.id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CreateProductDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        reloadProduct={reloadProduct}
      />
    </Box>
  );
}
