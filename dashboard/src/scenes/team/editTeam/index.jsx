import { Box, Button, Container, TextField, Select, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetUsersDetailsQuery,
    useUpdateUserMutation} from "../../../slices/userApiSlice";
import Header from "../../../components/Header";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const EditTeam = () => {
    const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const[admin,setAdmin] = React.useState(false);
  const { id : userId} = useParams();

 const { data: user, isLoading: isLoadingUser, error: errorUser,refetch } = useGetUsersDetailsQuery(userId);
 const [updateUser, { isLoading: isLoadingUpdate, error: errorUpdate ,error}] = useUpdateUserMutation();
  console.log(user,'product');
  useEffect(() => {
    if(user){
        setName(user.name);
        setEmail(user.email);
        setAdmin(user.isAdmin);
        
    }else{
        refetch();
    
    }
  }, [ user,refetch]);
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {userId, name, email,isAdmin:admin};
    await updateUser(data);
    if(!error){
        navigate('/team');
        toast.success("Team Updated");
    }else{
        toast.error(error?.data?.message || error?.error);
        console.log(errorUpdate);
    }
    
  };
 
  return (
    <Container>
      <Box m="px">
        <Button sx={{ mb: "20px" }} variant="contained" onClick={() => navigate(-1)}>Back</Button>
        <Header title="Edit Team" subtitle="Edit Team Details" />
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              name="Name"
              helperText="Enter Team Name"
              sx={{ gridColumn: "span 4" }}
            />
            
              

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="enail"
              helperText="Enter Team Email"
              sx={{ gridColumn: "span 4" }}
            />
          <Select
              fullWidth
              variant="filled"
              label="Admin"
              onChange={(e) => setAdmin(e.target.value)}
              value={admin}
              name="admin"
              sx={{ gridColumn: "span 4" }}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
           
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EditTeam;
