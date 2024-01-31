import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Header from "../../../components/Header";
import { tokens } from "../../../theme";

import { useGetAllOrdersQuery } from "../../../slices/ordersApiSlice";
const OrderList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: orders, isLoading } = useGetAllOrdersQuery();
  const history = useNavigate();
  const columns = [
    { field: "_id", 
    headerName: "ID",
    flex: 1,
   },
    {
      field: "user.name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.user?.name || '',
    },
    {
      field: "createdAt",
      headerName: "Date",
      type: "date",
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: "Total",
      flex: 1,
    },
    {
      field: "isPaid",
      headerName: "Paid",
      flex: 1,
      renderCell: ({ value }) => (value ? (<CheckCircleOutlineIcon color="success" />) : (<CloseIcon color="error" />)), 
    },
    {
      field: "isDelivered",
      headerName: "Delivered",
      flex: 1,
      renderCell: ({ value }) => (value ? (<CheckCircleOutlineIcon color="success" />) : (<CloseIcon color="error" />)),
    },
    {
      field: "details",
      headerName: "Details",
      flex: 1,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDetailsClick(row._id)}
        >
          Details
        </Button>
      ),
    },
  ];

  const handleDetailsClick = (orderId) => {
    // Handle the click event and navigate to the detail page
    history(`/order/${orderId}`);
  };
  
console.log(orders);
  return (
    <Box m="20px">
      <Header title="Order List" subtitle="Managing the list of orders" />
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
        {orders?.length > 0 ? (
          <DataGrid checkboxSelection rows={orders} columns={columns} getRowId={(row) => row._id} />
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};



export default OrderList;
