import styles from "./OfficeSelections.module.css";
import { Box } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import { useEffect, useState } from "react";
import axios from "axios";

// Define the user interface for typing
interface User {
  id: number;
  name: string;
}

const OfficeSelections: React.FC = () => {
  const [officeIndex, setOfficeIndex] = useState<number>(10);
  const [users, setUsers] = useState<User[]>([]); // Users array of User type

  // Function to fetch users from API
  async function getUsers() {
    try {
      const response = await axios.get<User[]>(
        `https://jsonplaceholder.typicode.com/users`
      );
      setUsers(response.data);
    } catch (error) {
      console.log("error in data fetch", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box className={styles.selection} sx={{ minWidth: 220 }}>
      <span>Select Office</span>
      <NativeSelect
        defaultValue={officeIndex}
        onChange={(e) => setOfficeIndex(Number(e.target.value))}
        inputProps={{
          name: "officeName",
        }}
        sx={{ color: "inherit" }}
      >
        {users.map((singleUserData) => (
          <option value={singleUserData.id} key={singleUserData.id}>
            {singleUserData.name}
          </option>
        ))}
      </NativeSelect>
    </Box>
  );
};

export default OfficeSelections;
