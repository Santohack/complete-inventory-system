import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import AdminRoute from "./AdminRoutes";
import OrderDetails from "./scenes/order/orderDetails/orderDetails";
import EditTeam from "./scenes/team/editTeam";
import OrderList from "./scenes/order/orderList/orderList";
import AllProductList from "./scenes/products/productList";
import EditProduct from "./scenes/products/editProduct";
import LoginScreen from "./scenes/login";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/form" element={<Form />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="" element={<AdminRoute />}>
             
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/order/orderList" element={<OrderList />} />
              <Route path="/edit-user/:id" element={<EditTeam />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route path="/products" element={<AllProductList />} />
              <Route path="/invoices" element={<Invoices />} />
         
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
