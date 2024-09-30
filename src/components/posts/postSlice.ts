import axios, { AxiosError } from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjlmZWNjZTMzZmE0NTVlZjg5ODA4YSIsImlhdCI6MTcyNjc1MTA1MywiZXhwIjoxNzU4Mjg3MDUzfQ.ScXemniTQ91mqpZMdvz5pI_tmqrvL-Imy5OiWEQIQSk";
const PROJECT_ID = `lkkoqstnysf1`;

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
  handleAutoDialogClose: () => void;
}

interface ICreatePostResponse {
  status: string;
  message: string;
  data: IPost;
}

interface IEditPostArgs {
  postID: string;
  postContent: string;
}

interface IEditPostResponse {
  status: string;
  message: string;
  data: IPost;
}

interface IPostsState {
  postsArr: IPost[];
  loader: boolean;
  submitLoader: boolean;
  postsDataErrorMsg: string;
}
const postsInitialState: IPostsState = {
  postsArr: [],
  loader: false,
  submitLoader: false,
  postsDataErrorMsg: "",
};

export const getPostsData = createAsyncThunk<
  IPostsResponse,
  void,
  { rejectValue: AxiosError }
>("posts/getPosts", async (_, { rejectWithValue }) => {
  const host = `https://academics.newtonschool.co/api/v1/facebook/post`;
  try {
    const response = await axios.get<IPostsResponse>(host, {
      headers: {
        projectID: PROJECT_ID,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error as AxiosError);
  }
});

export const createANewPost = createAsyncThunk<
  ICreatePostResponse,
  ICreatePostArgs,
  { rejectValue: AxiosError }
>(
  "posts/createNewPost",
  async (
    { postContent, handleAutoDialogClose },
    { dispatch, rejectWithValue }
  ) => {
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
      console.log(response.data);
      if (response?.data?.status === "success" || response?.status === 201) {
        dispatch(getPostsData());
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  }
);

export const deletePost = createAsyncThunk<
  Post,
  string,
  { rejectValue: AxiosError }
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
  } catch (error) {
    return rejectWithValue(error as AxiosError);
  }
});

export const editPost = createAsyncThunk<
  IEditPostResponse,
  IEditPostArgs,
  { rejectValue: AxiosError }
>(
  "posts/editPost",
  async ({ postID, postContent }, { dispatch, rejectWithValue }) => {
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  }
);

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
          state.postsArr = Array.isArray(action.payload.data)
            ? action.payload.data
            : [];
          state.postsDataErrorMsg = "";
        }
      )
      .addCase(
        getPostsData.rejected,
        (state, action: PayloadAction<AxiosError | undefined>) => {
          const errorMessageFromServer =
            action.payload?.response?.data?.message;
          state.postsDataErrorMsg = errorMessageFromServer
            ? errorMessageFromServer
            : action.error.message;
          state.loader = false;
        }
      )
      .addCase(createANewPost.pending, (state) => {
        state.submitLoader = true;
      })
      .addCase(
        createANewPost.fulfilled,
        (state, action: PayloadAction<ICreatePostResponse>) => {
          state.submitLoader = false;
          action.meta.arg.handleAutoDialogClose();
          state.postsDataErrorMsg = "";
        }
      )
      .addCase(
        createANewPost.rejected,
        (state, action: PayloadAction<AxiosError | undefined>) => {
          state.submitLoader = false;
          state.postsDataErrorMsg = `Error in creating a new post: ${action.error.message}`;
        }
      )
      .addCase(deletePost.pending, (state) => {
        state.submitLoader = true;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.submitLoader = false;
        state.postsDataErrorMsg = "";
      })
      .addCase(
        deletePost.rejected,
        (state, action: PayloadAction<AxiosError | undefined>) => {
          state.submitLoader = false;
          state.postsDataErrorMsg = `Error in deleting the post: ${action.error.message}`;
        }
      )
      .addCase(editPost.pending, (state) => {
        state.submitLoader = true;
      })
      .addCase(
        editPost.fulfilled,
        (state, action: PayloadAction<IEditPostResponse>) => {
          state.submitLoader = false;
          state.postsDataErrorMsg = "";
        }
      )
      .addCase(
        editPost.rejected,
        (state, action: PayloadAction<AxiosError | undefined>) => {
          state.submitLoader = false;
          state.postsDataErrorMsg = `Error in editing the post: ${action.error.message}`;
        }
      );
  },
});

export const { clearErrorMsg } = postSlice.actions;
export default postSlice.reducer;
