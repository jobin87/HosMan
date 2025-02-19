import { Typography } from "@mui/material";
import { useUser } from "src/hooks/use-user";

export const SecondGrid = () => {
  const { username } = useUser();

  return (
    <Typography variant="h6" sx={{ fontWeight: "bold" ,height:"200px"}}>
    </Typography>
  );
};
