import {  Card } from "@mui/material"
import { primary } from "src/theme/core"
import Spline from '@splinetool/react-spline';

interface BoardDataProps {
    position: "left" | "right";
  }

export const BoardData =({ position }: BoardDataProps) => {
    return  (
        <Card sx={{
            bgcolor: primary.main,
            height:"30vh",
            width:{
                xs:"auto",
                lg:"15vw"
            },
            ml: position === "left" ? { xs: "auto", lg: "19%" } : undefined,
            mr: position === "right" ? { xs: "auto", lg: "5%" } : undefined,
        }}>
            <h1>Board Data</h1>


            <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
              <Spline scene="/spline/my-scene.splinecode" />
            </div>

        </Card>
       
    )

}