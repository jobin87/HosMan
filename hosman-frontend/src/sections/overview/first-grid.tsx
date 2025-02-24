import { Typography, Box } from "@mui/material";
import { useUser } from "src/hooks/use-user";

export const FirstGrid = () => {
  const { username } = useUser();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1rem", md: "1rem" }, // Responsive font size
        }}
      >
        Hello, welcome back --{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>{username}</span>
      </Typography>
    </Box>
  );
};
