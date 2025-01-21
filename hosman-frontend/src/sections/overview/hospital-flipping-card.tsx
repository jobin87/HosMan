import { Card, CardMedia, CardProps, Divider, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import { CONFIG } from "src/config-global";

type Props = CardProps & {
  nurseName: string;
  tasks: string[];
};

export function HospitalFlipping({ nurseName, tasks, ...cardprops }: Props) {
  return (
    <Card {...cardprops} sx={{ perspective: "1000px", overflow: "hidden" }}>
      <Box
        sx={{
          position: "relative",
          width: {
            xs: 380,
            lg: 280
          },
          height: {
            xs: 380,
            lg: 270
          },
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          "&:hover": {
            transform: "rotateY(180deg)"
          }
        }}
      >
        {/* Front Side (Image) */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden"
          }}
        >
          <CardMedia
            component="img"
            src={`${CONFIG.assetsDir}/images/doctor.jpg`}
            alt="Nurse"
            sx={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </Box>

        {/* Back Side (Tasks List) */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "primary.main",
            transform: "rotateY(180deg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            padding: 2,
            boxShadow: 8,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>{nurseName}'s Tasks</Typography>
          <List sx={{ width: "100%", maxHeight: "80%", overflowY: "auto" }}>
            {tasks.map((task, index) => (
              <ListItem key={index}>
                <ListItemText primary={`• ${task}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />
    </Card>
  );
}
