import { Box, Grid} from "@mui/material";
// import { BoardData } from "../board-data";
import { BoardData } from "../board-data";
import AnimatedPC from "../pcwithdata";

export default function OnBoardingView() {
  return (
    <Box sx={{
      bgcolor:"cadetblue",
      height:"100vh"
    }}>
      <Grid sx={{
        
      }}>

      <AnimatedPC/>
      </Grid>

    </Box>
  );
}
