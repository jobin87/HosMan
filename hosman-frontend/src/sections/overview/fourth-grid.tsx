import { Typography } from "@mui/material";
import { useUser } from "src/hooks/use-user";

export const FourthGrid = () => {
  const { username } = useUser();

  return (
    <Typography variant="h6" sx={{ fontWeight: "bold", height:"200px" }}>
      Hello, welcome back <span  style={{ color: "red", fontWeight: "bold" }}>
      {username}
        </span>
    </Typography>
  );
};
