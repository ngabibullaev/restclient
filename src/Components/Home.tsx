import "../Styles/Main.css";
import "../Styles/Section.css";
import "../Styles/Footer.css";
import "../Styles/Navbar.css";
import { Main } from "./Main";
import { Navbar } from "./Navbar";
import { Form } from "./Form";
import { Section } from "./Section";

export const Home = () => {
  return (
    <div style={{background: "#424649"}}>
      <Main />
      <Navbar />
      <Form />
      <Section />
    </div>
  );
};
