import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsapp from "./components/FloatingWhatsapp";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
// import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import MyNeoLife from "./pages/MyNeoLife";
// import SuccessPage from "./pages/SuccessPage";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./admin/AdminLoginPage";
import AdminDashboardPage from "./admin/AdminDashboardPage";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        {/* <Route path="/product/:id" element={<ProductPage />} /> */}

        {/* Protected routes */}
        <Route
          path="/checkout/:id"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myneolife"
          element={
            <ProtectedRoute>
              <MyNeoLife />
            </ProtectedRoute>
          }
        />


        {/* Uncomment and protect these routes if you use them */}
        {/*
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <SuccessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
      <Footer />
      <FloatingWhatsapp />
    </Router>
  );
}

export default App;





// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import SignupPage from "./pages/SignupPage";
// import LoginPage from "./pages/LoginPage";
// import HomePage from "./pages/HomePage";
// import ProductListPage from "./pages/ProductListPage";
// // import ProductPage from "./pages/ProductPage";
// import CheckoutPage from "./pages/CheckoutPage";
// // import SuccessPage from "./pages/SuccessPage";
// // import AboutPage from "./pages/AboutPage";
// // import ContactPage from "./pages/ContactPage";
// // import AdminLoginPage from "./admin/AdminLoginPage";
// // import AdminDashboardPage from "./admin/AdminDashboardPage";

// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/login" element={<LoginPage />} />

//         {/* Protected routes */}
//         <Route
//           path="/products"
//           element={
//             <ProtectedRoute>
//               <ProductListPage />
//             </ProtectedRoute>
//           }
//         />
//         {/* <Route
//           path="/product/:id"
//           element={
//             <ProtectedRoute>
//               <ProductPage />
//             </ProtectedRoute>
//           }
//         /> */}
//         <Route
//           path="/checkout/:id"
//           element={
//             <ProtectedRoute>
//               <CheckoutPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* Uncomment and protect these routes if you use them */}
//         {/*
//         <Route
//           path="/success"
//           element={
//             <ProtectedRoute>
//               <SuccessPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/about"
//           element={
//             <ProtectedRoute>
//               <AboutPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/contact"
//           element={
//             <ProtectedRoute>
//               <ContactPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/admin" element={<AdminLoginPage />} />
//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute>
//               <AdminDashboardPage />
//             </ProtectedRoute>
//           }
//         /> 
//         */}
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;
