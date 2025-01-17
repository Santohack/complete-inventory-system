import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Header from "../../components/Header";
import{toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery ,useDeleteUserMutation} from "../../slices/userApiSlice";
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { data: users, isLoading ,refetch} = useGetUsersQuery();
  const [deleteUser,{isLoading:isDeleting,error}] = useDeleteUserMutation();
  const handleRemoveClick = async(id) => {
    if(window.confirm("Are you sure you want to remove this user?")) {
      try {
        
        await deleteUser(id);
        refetch();  
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || error?.error);
        
      }
    }
  }
  const handleEditClick = (id) => {
    navigate(`/edit-user/${id}`);
    console.log(id);
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
    field: "email",
    headerName: "Email",
   
    flex: 1,
  },
  {
    field: "isAdmin",
    headerName: "Admin",
    type: "number",
    flex: 1,
    renderCell: ({ value }) => (value ? (<CheckCircleOutlineIcon color="success" />) : (<CloseIcon color="error" />)), 
  
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
      <Header title="Team" subtitle="Managing the Team Members"  />
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
        {isLoading || isDeleting ? 'Loading' : null}
        {users?.length > 0 ? (
          <DataGrid checkboxSelection rows={users} columns={columns} getRowId={(row) => row._id} />
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Team;