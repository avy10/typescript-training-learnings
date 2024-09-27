import { FC } from "react";

import Container from "@mui/material/Container";

import "./App.css";
import CreatePost from "./components/CreatePost";

const App: FC = () => {
  return (
    <Container
      maxWidth="md"
      className="app"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Facebook feed</h1>
      <CreatePost />
    </Container>
  );
};

export default App;
