import { Box, Button, Container, TextField } from "@mui/material";
import React, { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetProductsDetailQuery, useUpdateProductMutation, useUploadsProductsMutation } from "../../../slices/productApiSlice";
import Header from "../../../components/Header";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const EditProduct = () => {
    const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [countInStock, setCountInStock] = React.useState("");
  const [image, setImage] = React.useState("");
  const { id : productId} = useParams();
  const { data: product, isLoading ,refetch,error} = useGetProductsDetailQuery(productId);
  const [updateProduct, { isLoading: isLoadingUpdate, error: errorUpdate }] = useUpdateProductMutation();
  const [uploadsProduct, { isLoading: isLoadingUploads, error: errorUploads }] = useUploadsProductsMutation();
  console.log(product,'product');
  useEffect(() => {
    if(product){
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setImage(product.image);
    }else{
        refetch();
    
    }
  }, [ product,refetch]);
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {productId, name, price, description, image ,category, brand, countInStock };
    await updateProduct(data);
    if(!errorUpdate){
        navigate('/products');
        toast.success("Product Updated");
    }else{
        toast.error(errorUpdate?.data?.message || errorUpdate?.error);
        console.log(errorUpdate);
    }
    
  };
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const data = await uploadsProduct(formData).unwrap();
        toast.success(data.message);
        
        // Assuming `setImage` is a state-setting function
        setImage(data.image);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    } else {
      toast.error("Please Select an Image");
    }
  };
  
  return (
    <Container>
      <Box m="px">
        <Button sx={{ mb: "20px" }} variant="contained" onClick={() => navigate(-1)}>Back</Button>
        <Header title="Edit Product" subtitle="Edit Product Details" />
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
              helperText="Enter Product Name"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              name="Price"
              helperText="Enter Product Price"
              sx={{ gridColumn: "span 2" }}
            />
               <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Image"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              name="image"
              helperText="Enter Product Image"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField

              fullWidth
              variant="filled"
              type="file"
              label="Upload image"
              onChange={handleUpload}
              name="image"
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Brand"
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              name="brand"
              helperText="Enter Product Brand"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Count In Stock"
              onChange={(e) => setCountInStock(e.target.value)}
              value={countInStock}
              name="countInStock"
              helperText="Enter Product Count In Stock"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              name="category"
              helperText="Enter Product Category"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              name="description"
              helperText="Enter Product description"
              sx={{ gridColumn: "span 4" }}
            />
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

export default EditProduct;
