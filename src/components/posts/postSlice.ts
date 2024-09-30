import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjlmZWNjZTMzZmE0NTVlZjg5ODA4YSIsImlhdCI6MTcyNjc1MTA1MywiZXhwIjoxNzU4Mjg3MDUzfQ.ScXemniTQ91mqpZMdvz5pI_tmqrvL-Imy5OiWEQIQSk";
const PROJECT_ID = `lkkoqstnysf1`;
// const PROJECT_ID = ``; // to simulate error in getPosts

export interface IPost {
  // I am only using these two
  _id: string;
  content: string;
}

interface IPostsResponse {
  status: string;
  results: number;
  data: IPost[];
}

interface ICreatePostArgs {
  postContent: string;
  handleDialogClose: () => void;
}

interface IMeta {
  arg: ICreatePostArgs;
  requestId: string;
  requestStatus: string;
}
interface IAction {
  meta: IMeta;
}

interface ICreatePostResponse {
  status: string;
  message: string;
  data: IPost;
  action: IAction;
}

export interface IEditPostArgs {
  postID: string;
  postContent: string;
}
interface IEditResData {
  message: string;
  status: string;
}
export interface IEditPostResponse {
  status: string;
  data: IEditResData;

  message: string;

  action: IAction;
}

export interface IRejectedValue {
  status: string;
  message: string;
}

interface IPostsState {
  postsList: IPost[];
  loader: boolean;
  submitLoader: boolean;
  postsDataErrorMsg: string;
}
const postsInitialState: IPostsState = {
  postsList: [],
  loader: false,
  submitLoader: false,
  postsDataErrorMsg: "",
};

export const getPostsData = createAsyncThunk<
  IPostsResponse,
  void,
  {
    rejectValue: IRejectedValue;
  }
>(
  "posts/getPosts",

  async (_, { rejectWithValue }) => {
    const host = `https://academics.newtonschool.co/api/v1/facebook/post`;
    try {
      const response = await axios.get<IPostsResponse>(host, {
        headers: {
          projectID: PROJECT_ID,
        },
      });
      return response.data;
    } catch (error: any) {
      // return rejectWithValue(error);
      return rejectWithValue(error.response ? error.response.data : null);
    }
  }
);

export const createANewPost = createAsyncThunk<
  ICreatePostResponse,
  ICreatePostArgs,
  {
    rejectValue: IRejectedValue;
  }
>("posts/createNewPost", async ({ postContent }, { rejectWithValue }) => {
  const host: string = `https://academics.newtonschool.co/api/v1/facebook/post`;
  try {
    const response = await axios.post<ICreatePostResponse>(
      host,
      {
        content: postContent,
      },
      {
        headers: {
          projectID: PROJECT_ID,
          Authorization: `Bearer ${JWT_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const returnValue: ICreatePostResponse = response.data;
    console.log(response.data);
    /* if (response?.data?.status === "success" || response?.status === 201) {
        dispatch(getPostsData());
      } */
    // return response.data;
    return returnValue;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const deletePost = createAsyncThunk<
  IPost,
  string,
  {
    rejectValue: IRejectedValue;
  }
>("posts/deletePost", async (postID, { rejectWithValue }) => {
  const host = `https://academics.newtonschool.co/api/v1/facebook/post/${postID}`;
  try {
    const response = await axios.delete<IPost>(host, {
      headers: {
        projectID: PROJECT_ID,
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const editPost = createAsyncThunk<
  IEditPostResponse,
  IEditPostArgs,
  {
    rejectValue: IRejectedValue;
  }
>("posts/editPost", async ({ postID, postContent }, { rejectWithValue }) => {
  const host = `https://academics.newtonschool.co/api/v1/facebook/post/${postID}`;
  const formData = new FormData();
  formData.append("title", "Edited Title");
  formData.append("content", postContent);

  try {
    const response = await axios.patch<IEditPostResponse>(host, formData, {
      headers: {
        projectID: PROJECT_ID,
        Authorization: `Bearer ${JWT_TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState: postsInitialState,
  reducers: {
    clearErrorMsg: (state) => {
      state.postsDataErrorMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsData.pending, (state) => {
        state.loader = true;
      })
      .addCase(
        getPostsData.fulfilled,
        (state, action: PayloadAction<IPostsResponse>) => {
          state.loader = false;
          state.postsList = Array.isArray(action.payload.data)
            ? action.payload.data
            : [];
          state.postsDataErrorMsg = "";
        }
      )
      .addCase(getPostsData.rejected, (state, action) => {
        console.log(action);
        /* const errorMessageFromServer = action.payload?.response?.data?.message;
        state.postsDataErrorMsg = errorMessageFromServer
          ? errorMessageFromServer
          : "Unknown error occured"; */
        /* state.postsDataErrorMsg =
          action.error.message || "Unknown Error occured";
        state.loader = false; */
        const errorMessageFromServer = action.payload?.message;
        state.postsDataErrorMsg = errorMessageFromServer
          ? errorMessageFromServer
          : "Unknown error occurred";
        state.loader = false;
      })
      .addCase(createANewPost.pending, (state) => {
        state.submitLoader = true;
      })
      .addCase(
        createANewPost.fulfilled,
        (state, action: PayloadAction<ICreatePostResponse>) => {
          console.log("action inside createPost fulfilled", action);
          state.submitLoader = false;
          // action.meta.arg.handleDialogClose();
          state.postsDataErrorMsg = "";
        }
      )
      .addCase(createANewPost.rejected, (state, action) => {
        state.submitLoader = false;
        state.postsDataErrorMsg = `Error in creating a new post: ${action.error.message}`;
      })
      .addCase(deletePost.pending, (state) => {
        state.submitLoader = true;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.submitLoader = false;
        state.postsDataErrorMsg = "";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.submitLoader = false;
        state.postsDataErrorMsg = `Error in deleting the post: ${action.error.message}`;
      })
      .addCase(editPost.pending, (state) => {
        state.submitLoader = true;
      })
      .addCase(editPost.fulfilled, (state) => {
        state.submitLoader = false;
        state.postsDataErrorMsg = "";
      })
      .addCase(editPost.rejected, (state, action) => {
        state.submitLoader = false;
        state.postsDataErrorMsg = `Error in editing the post: ${action.error.message}`;
      });
  },
});

export const { clearErrorMsg } = postSlice.actions;
export default postSlice.reducer;
