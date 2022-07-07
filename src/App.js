import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/controller/ProtectedRoute";
import UnProtectedRoute from "./components/controller/UnProtectedRoute";
import Logout from "./components/Logout";
import Description from "./components/Dashboard/Description/";
import ManageRooms from "./components/Dashboard/Hotel/ManageRooms";
import { ToastContainer } from "react-toastify";
import ManageServices from "./components/Dashboard/Hotel/ManageServices";
import Account from "./components/Dashboard/Account";
import OrderList from "./components/Dashboard/Restaurant/OrderList";
import Facility from "./components/Facility";
import Cart from "./components/cart";
import Profile from "./components/Profile";
import ManageRestaurants from "./components/Dashboard/Admin/ManageRestaurants";
import ManageCoffeeShops from "./components/Dashboard/Admin/ManageCoffeeShops";
import ManagePayments from "./components/Dashboard/Admin/ManagePayments";
import Map from "./components/Map";
import ManageTransport from "./components/Dashboard/Admin/ManageTransport";
import Print from "./components/Print";
import ManageReports from "./components/Dashboard/Transport/ManageReports";
import ManageCustomers from "./components/Dashboard/Transport/ManageCustomers";
import PaymentReports from "./components/Dashboard/PaymentReports";
import ConfirmTransport from "./components/ConfirmTransport";
import Analytics from "./components/Dashboard/Analytics";
import Drivers from "./components/Dashboard/Transport/Drivers";
import ManageBranches from "./components/Dashboard/Admin/ManageBranches";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/:id" element={<Facility />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/map" element={<Map />} />
          <Route exact path="/confirmation" element={<ConfirmTransport />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            path="/signup"
            element={
              <UnProtectedRoute>
                <SignUp />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:tab"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/description"
            element={
              <ProtectedRoute>
                <Description />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paymentreport"
            element={
              <ProtectedRoute>
                <PaymentReports />
              </ProtectedRoute>
            }
          />
          {/* every logged in user */}
          <Route
            path="/print/:status/:id"
            element={
              <ProtectedRoute>
                <Print />
              </ProtectedRoute>
            }
          />
          {/* every logged in user */}
          {/* admin routes */}
          <Route
            path="/managerestaurants"
            element={
              <ProtectedRoute>
                <ManageRestaurants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/managebranches"
            element={
              <ProtectedRoute>
                <ManageBranches />
              </ProtectedRoute>
            }
          />
          <Route
            path="/managetransport"
            element={
              <ProtectedRoute>
                <ManageTransport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/managecoffeeshops"
            element={
              <ProtectedRoute>
                <ManageCoffeeShops />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <ManagePayments />
              </ProtectedRoute>
            }
          />
          {/* admin routes */}
          {/* hotel routes */}
          <Route
            path="/managerooms"
            element={
              <ProtectedRoute>
                <ManageRooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manageservices"
            element={
              <ProtectedRoute>
                <ManageServices />
              </ProtectedRoute>
            }
          />
          {/* //hotel routes */}
          {/* restaurant routes */}
          <Route
            path="/orderlist"
            element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/drivers"
            element={
              <ProtectedRoute>
                <Drivers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          {/* //restaurant routes */}

          {/*transport routes*/}
          <Route
            path="/managereports"
            element={
              <ProtectedRoute>
                <ManageReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/managecustomers"
            element={
              <ProtectedRoute>
                <ManageCustomers />
              </ProtectedRoute>
            }
          />
          {/*transport routes*/}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
