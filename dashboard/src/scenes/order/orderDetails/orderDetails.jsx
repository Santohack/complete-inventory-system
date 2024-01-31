import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrdersQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
} from "../../../slices/ordersApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import AlertInfo from "../../../components/alert";
import Spinner from "../../../components/spinner";
import { useDeliverOrderMutation } from "../../../slices/ordersApiSlice";
const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  const { data: order, error, refetch, isLoading } = useGetOrdersQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { userInfo } = useSelector((state) => state.auth);
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const {
    data: paypal,
    error: paypalError,
    isLoading: paypalLoading,
  } = useGetPaypalClientIdQuery();
  useEffect(() => {
    if (!paypalError && !paypalLoading && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal?.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [dispatch, paypal, paypalDispatch, order, paypalError, paypalLoading]);
  console.log("order", order);
  const onApprovetest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Order is paid");
  };
  const onApprove = async (data, actions) => {
    return actions.order?.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    });
  };
  const onError = (err) => {
    toast.error(err?.data?.message || err?.error);
  };
  if (isLoading || !order) {
    return <Spinner />;
  }

  // Check if there's an error fetching the order
  if (error) {
    return (
      <AlertInfo variant={"error"}>
        {error?.data.message || error?.error}
      </AlertInfo>
    );
  }
  const createOrder = async (data, actions) => {
    if (!order || !order.totalPrice) {
      // Handle the case where order or totalPrice is undefined
      console.error("Order or totalPrice is undefined");
      return null; // or handle it in a way that makes sense for your application
    }

    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order is delivered");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <div>
      <Box m="25px"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
          fontSize: "16px", // Adjust the font size here
        }}}
      >
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <AlertInfo variant={"error"}>
            {error?.data.message || error?.error}
          </AlertInfo>
        ) : (
          <div>
            <h1>OrderId: {order._id}</h1>
          </div>
        )}

        <Grid container>
          <Grid item md={8}>
            <h1>Shipping</h1>
            <p>
              <strong>Name: </strong>
              {order?.user?.name}
            </p>
            <p>
              <strong>Email: </strong>
              {order?.user?.email}
            </p>
            <p>
              <strong>Address: </strong>
              {order?.shippingAddress?.address}, {order?.shippingAddress?.city},{" "}
              {order?.shippingAddress?.postalCode},{" "}
              {order?.shippingAddress?.country}
            </p>
            {order?.isDelivered ? (
              <AlertInfo variant={"success"}>
                Delivered at: {order?.deliveredAt}
              </AlertInfo>
            ) : (
              <AlertInfo variant={"error"}>Not Delivered</AlertInfo>
            )}
            <h1> Payment Method</h1>

            <p>
              <strong>Method: </strong>
              {order?.paymentMethod}
            </p>
            {order?.isPaid ? (
              <AlertInfo variant={"success"}>Paid at: {order.paidAt}</AlertInfo>
            ) : (
              <AlertInfo variant={"error"}>Not Paid</AlertInfo>
            )}

            <h1>Order Items</h1>
            {order?.orderItems.map((item, index) => (
              <div key={index}>
                <div key={index}>
                  {/* Individual Order Item */}
                  <List>
                    <ListItem>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          borderRadius: "15px",
                          width: "131px",
                          marginRight: "10px",
                        }}
                      />
                      <ListItemText sx={{ marginLeft: "5px" }}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </ListItemText>
                      <ListItemText>
                        {item.qty} x $ {item.price} = ${item.qty * item.price}
                      </ListItemText>
                    </ListItem>
                  </List>
                  <Divider sx={{ width: "100%", margin: "10px 0" }} />
                </div>
              </div>
            ))}
          </Grid>
          <Grid item md={4}>
            <Card sx={{ maxWidth: 345, margin: "2px 70px" }}>
              <h2 style={{ textAlign: "center" }}>Order Summary</h2>
              <Box mx={2}>
                <CardActions>
                  <Typography>Items</Typography>
                  <Typography>${order?.itemPrice}</Typography>
                </CardActions>
                <CardActions>
                  <Typography>Shipping</Typography>
                  <Typography>${order?.shippingPrice}</Typography>
                </CardActions>
                <CardActions>
                  <Typography>Tax</Typography>
                  <Typography>${order?.taxPrice}</Typography>
                </CardActions>
                <CardActions>
                  <Typography>Total</Typography>
                  <Typography>${order?.totalPrice}</Typography>
                </CardActions>
                <CardActions>
                  {!order?.isPaid && (
                    <Box>
                      {paypalLoading && <Spinner />}
                      {isPending ? (
                        <Spinner />
                      ) : (
                        <div>
                          <Button
                            sx={{ width: "100%", margin: "10px 0" }}
                            variant="contained"
                            onClick={onApprovetest}
                          >
                            Test Pay order
                          </Button>
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            />
                          </div>
                        </div>
                      )}
                    </Box>
                  )}
                </CardActions>
                <CardActions>
                  <Box>
                    {loadingDeliver && <Spinner />}
                    {userInfo &&
                      userInfo.isAdmin &&
                      order?.isPaid &&
                      !order?.isDelivered && (
                        <Button
                          sx={{ width: "100%", margin: "10px 0" }}
                          variant="contained"
                          onClick={deliverHandler}
                        >
                          Mark as Deliverd
                        </Button>
                      )}
                  </Box>
                </CardActions>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default OrderDetails;
