import { FC } from "react";

import Container from "@mui/material/Container";

// import CreatePost from "../components/CreatePost";
import AppNavigation from "../components/swat-nav-vertical/AppNavigation";
// import MultipleInputDialogBoxStates from "./test/MultipleInputDialogBoxStates";
// import MultipleInputDialogBoxFormData from "./test/MultipleInputDialogFormData";

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
      <nav>
        <AppNavigation />
      </nav>
      {/* <h1>Facebook feed</h1> */}
      {/* <CreatePost /> */}
      {/* <MultipleInputDialogBoxStates /> */}
      {/* <MultipleInputDialogBoxFormData /> */}
      {/* <PostsList /> */}
    </Container>
  );
};

export default Home;
