import { Box, Grid, Paper } from "@mui/material";
import { OnboardingContent } from "src/layouts/onboarding/main";
import AnimatedPC from "../pcwithdata";
import { BoardData } from "../board-data";
import { SmallBoardData } from "../small-board";
import { TopBoardData } from "../top-board";

export default function OnBoardingView() {
  return (
    <OnboardingContent>
       <Grid>
        <BoardData/>
       </Grid>
       <Grid>
        <BoardData/>
       </Grid>
    </OnboardingContent>
  );
}
