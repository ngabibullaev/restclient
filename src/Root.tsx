import "./Styles/Header.css";
import { Header } from "./Components/Header";
import { Home } from "./Components/Home";
import { Route, Routes } from "react-router-dom";
import { Baket } from "./Basket/Baket";
import { Buy } from "./Buy/Buy";
import { TwoPizzas } from "./Buy/TwoPizzas";
import { Footer } from "./Components/Footer";
import { Review } from "./Components/Review";
import { useLocation } from "react-router-dom";
import App from "./App";
import ScrollToTopButton from "./Components/ScrollToTopButton";

export const Root = () => {
  const location = useLocation();

  return (
    <>
      {/* Проверяем, не является ли текущий путь равным "/" */}
      {location.pathname !== "/" && <Header />}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/basket" element={<Baket />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/two" element={<TwoPizzas />} />
        <Route path="/review" element={<Review />} />
      </Routes>
      {/* Проверяем, не является ли текущий путь равным "/" */}
      {location.pathname !== "/" && <Footer />}
      <ScrollToTopButton/>
    </>
  );
};