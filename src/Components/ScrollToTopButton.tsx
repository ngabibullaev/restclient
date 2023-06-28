import { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "../Styles/ScrollToTopButton.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Проверяем положение скролла окна браузера, чтобы определить видимость кнопки
  const handleScroll = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(top > 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Обработчик клика на кнопке
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`scroll-to-top-button ${isVisible ? "visible" : ""}`}
      onClick={handleClick}
    >
      <FaArrowCircleUp />
    </div>
  );
};

export default ScrollToTopButton;