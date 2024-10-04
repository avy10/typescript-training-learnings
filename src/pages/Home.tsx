import { FC } from "react";

import Container from "@mui/material/Container";

import CreatePost from "../components/CreatePost";
// import MultipleInputDialogBoxStates from "./test/MultipleInputDialogBoxStates";
// import MultipleInputDialogBoxFormData from "./test/MultipleInputDialogFormData";
import PostsList from "../components/PostsList";

const Home: FC = () => {
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
      {/* <MultipleInputDialogBoxStates /> */}
      {/* <MultipleInputDialogBoxFormData /> */}
      <PostsList />
    </Container>
  );
};

export default Home;
