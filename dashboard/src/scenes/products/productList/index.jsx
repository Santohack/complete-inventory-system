import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useGetProductsQuery ,useDeleteProductMutation ,useCreateProductMutation} from "../../../slices/productApiSlice";
import { toast } from "react-toastify";
const AllProductList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data:products, isLoading ,refetch } = useGetProductsQuery();
  const history = useNavigate();
  const [createProduct ,{isLoading:isLoadingCreate}] = useCreateProductMutation();
  const [deleteProduct ,{isLoading:isLoadingDelete}] = useDeleteProductMutation();
  const handleEditClick = (productId) => {
    // Handle the click event and navigate to the edit page
    history(`/edit-product/${productId}`);
  };

  const handleRemoveClick = async (productId) => {
    // Handle the click event for removing the product
    // Implement your logic to remove the product
    if(window.confirm("Are you sure you want to remove this product?")) {
      try {
        await deleteProduct(productId);
        refetch();
        toast.success("Product removed successfully");
      }catch(error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
    console.log(`Remove product with ID: ${productId}`);
  };  
  const createProductHandler = async() => {
    if(window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      }
      catch(error) {
        console.log(error);
        toast.error(error?.data?.message || error?.error);
      }
    }
  }
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    type: "number",
    flex: 1,
  },
  {
    field: "brand",
    headerName: "Brand",
   
    flex: 1,
  },
  {
    field: "edit",
    headerName: "Edit",
    flex: 1,
    renderCell: ({ row }) => (
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<EditOutlinedIcon />}
        onClick={() => handleEditClick(row._id)}
      >
        Edit
      </Button>
    ),
  },
  {
    field: "remove",
    headerName: "Remove",
    flex: 1,
    renderCell: ({ row }) => (
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        startIcon={<DeleteOutlineOutlinedIcon />}
        onClick={() => handleRemoveClick(row._id)}
      >
        Remove
      </Button>
    ),
  },
];

  
  

  return (
    <Box m="20px">
      <Header title="Product List" subtitle="Managing the list of products" button={'Create Product'} hadleClick={ () => createProductHandler()} />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "16px", // Adjust the font size here
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {isLoadingCreate || isLoadingDelete ? 'Loading' : null}
        {products?.length > 0 ? (
          <DataGrid checkboxSelection rows={products} columns={columns} getRowId={(row) => row._id} />
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};



export default AllProductList;
