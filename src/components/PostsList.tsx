import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SinglePost from "./SinglePost";
import { getPostsData, clearErrorMsg, IPost } from "./posts/postSlice";
import Loader from "./common/loader/Loader";
import MessageSnackbar from "./common/snackbar/Snackbar";
import { hideSnackbar, showSnackbar } from "./common/snackbar/snackbarSlice";
import { RootState, AppDispatch } from "../store";

const PostsList: React.FC = () => {
  const { postsArr, loader, postsDataErrorMsg } = useSelector(
    (state: RootState) => state.posts
  );
  const { open } = useSelector((state: RootState) => state.messageSnackbar);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchNewPosts();
  }, []);

  const fetchNewPosts = async () => {
    const response = await dispatch(getPostsData());
    console.log(response);
    if (response?.meta?.requestStatus === "rejected") {
      dispatch(
        showSnackbar({ message: "Error in fetching.", showDuration: 6000 })
      );
    }
  };

  const handleSnackbarClose = (reason?: string) => {
    if (reason === "clickaway") return;
    dispatch(hideSnackbar());
    dispatch(clearErrorMsg());
  };

  return loader ? (
    <Loader />
  ) : (
    <>
      <MessageSnackbar
        message={postsDataErrorMsg}
        onCloseHandle={handleSnackbarClose}
        open={open}
        hideAfter={15000}
      />

      {postsArr.length === 0 ? (
        <p>No Posts Found</p>
      ) : (
        postsArr?.map((eachPost: IPost) => (
          <SinglePost key={eachPost?._id} eachPost={eachPost} />
        ))
      )}
    </>
  );
};

export default PostsList;
