import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth-context/AuthContext";
import { AdvertsProvider } from "./context/adverts-context/AdvertsContext";
import Header from "./components/header/Header";
import Home from "./pages/home-page/Home";
import Login from "./pages/login-page/Login";
import SignUp from "./pages/sign-up-page/SignUp";
import UserProfile from "./pages/user-profile/UserProfile";
import ProductAdvertPage from "./pages/product-advert-page/ProductAdvertPage";
import VehicleAdvertPage from "./pages/vehicle-advert-page/VehicleAdvertPage";
import UserAdvertsPage from "./pages/user-adverts-page/UserAdvertsPage";
import UserFavoriteAdvertsPage from "./pages/user-favorite-adverts-page/UserFavoriteAdvertsPage";
import AdvertDetailPage from "./pages/advert-detail-page/AdvertDetailPage";
import UserMessagesPage from "./pages/user-messages-page/UserMessagesPage";
import ConversationWindow from "./components/conversation-window/ConversationWindow";
import Footer from "./components/footer/Footer";
import AboutMe from "./pages/about-me/AboutMe";
function App() {
  return (
    <Router>
      <AuthProvider>
        <AdvertsProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/giris" element={<Login />} />
            <Route path="/kayit" element={<SignUp />} />
            <Route path="/profil" element={<UserProfile />} />
            <Route path="/esya-ilani-ekle" element={<ProductAdvertPage />} />
            <Route path="/arac-ilani-ekle" element={<VehicleAdvertPage />} />
            <Route path="/ilanlarim" element={<UserAdvertsPage />} />
            <Route
              path="/favori-ilanlarim"
              element={<UserFavoriteAdvertsPage />}
            />
            <Route path="/ilan/:advertId" element={<AdvertDetailPage />} />
            <Route path="/mesajlarim" element={<UserMessagesPage />} />
            <Route path="/mesaj-yaz/:username" element={<ConversationWindow />} />
            <Route path="/hakkimda" element={<AboutMe />} />
          </Routes>
          <Footer/>
        </AdvertsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
