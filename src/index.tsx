import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { BrowserRouter } from "react-router-dom";
import { Root } from "./Root";
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css";

// Компонент для отображения приложения
function AppWrapper() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Root />
      </Provider>
    </BrowserRouter>
  );
}

// Компонент для отображения сообщения о закрытии
function Closed() {
  return (
    <div style={{marginTop: "10em"}}>
      <h1 className="text-center mt-5 text-danger">В данный момент бы закрыты!</h1>
      <h4 className="mt-4 text-center">Наш рабочий график с 10:00 до 24:00</h4>
      <img className="mx-auto d-block" src="https://cdn0.iconfinder.com/data/icons/business-finance-v2-0/64/store-sign-closed-256.png" alt="" />
    </div>
  );
}

// Оберточный компонент
function TimeWrapper(): JSX.Element {
  const [isClosed, setIsClosed] = useState<boolean>(false);

  // Функция для проверки времени
  function checkTime() {
    const now = new Date();
    // Получаем текущее время по Москве
    const hours = now.getUTCHours() + 3;

    if (hours >= 10 && hours < 24) {
      setIsClosed(false);
    } else {
      setIsClosed(true);
    }
  }

  // Запускаем проверку времени при монтировании компонента
  useEffect(() => {
    checkTime();
  }, []);

  // Запускаем новую проверку каждые 5 минут
  useEffect(() => {
    const intervalId = setInterval(checkTime, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  });

  return isClosed ? <Closed /> : <AppWrapper />;
}

// Рендерим основной компонент
ReactDOM.render(
  <TimeWrapper />,
  document.getElementById("root")
);