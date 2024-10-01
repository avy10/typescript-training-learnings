import { FC } from "react";

import Container from "@mui/material/Container";

import "./App.css";
import CreatePost from "./components/CreatePost";
import PostsList from "./components/PostsList";
// import MultipleInputDialogBox from "./test/MultipleInputDialogBox";

const App: FC = () => {
  return (
    <Container
      maxWidth="lg"
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
      <PostsList />
      {/* <MultipleInputDialogBox /> */}
    </Container>
  );
};

export default App;
