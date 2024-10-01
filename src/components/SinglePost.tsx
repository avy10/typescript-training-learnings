import { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { clearErrorMsg } from "./posts/postSlice";
import Box from "@mui/material/Box";
import ButtonMUI from "./common/button/ButtonMUI";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EditPostDialog from "./EditPostDialog";
import DeletePost from "./DeletePost";
interface ISinglePost {
  _id: string;
  content: string;
}
interface ISinglePostProps {
  eachPost: ISinglePost;
}
const SinglePost: FC<ISinglePostProps> = ({ eachPost }) => {
  const dispatch = useDispatch();

  const [editModal, setEditModal] = useState(false);
  const openEditModal = () => {
    setEditModal(true);
  };
  const closeEditModal = () => {
    setEditModal(false);
    dispatch(clearErrorMsg());
  };

  return (
    <Card sx={{ width: 350, marginTop: "7px" }} variant="outlined">
      <CardContent>
        <Box
          key={eachPost?._id}
          sx={{
            margin: "20px 0px",
          }}
        >
          <div>
            <p>{eachPost?.content}</p>
          </div>

          {editModal && (
            <EditPostDialog
              content={eachPost?.content}
              postID={eachPost?._id}
              openDialog={editModal}
              handleDialogClose={closeEditModal}
            />
          )}

          <div>
            <ButtonMUI
              btnText={"EDIT"}
              eventHandler={() => {
                openEditModal();
                openEditModal();
              }}
              btnSize="small"
            />
            <DeletePost postID={eachPost?._id} />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SinglePost;
