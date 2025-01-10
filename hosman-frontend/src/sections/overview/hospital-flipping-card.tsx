import { Card,  CardMedia, CardProps,  Divider, Typography } from "@mui/material";
import { ChartLegends } from "src/components/chart";
import { CONFIG } from "src/config-global";

type Props = CardProps & {
  message: string;
};

export function HospitalFlipping({ message, ...cardprops }: Props) {

  return (
    <Card {...cardprops}>
      {/* Image Section */}
      <CardMedia
        component="img"
        src={`${CONFIG.assetsDir}/images/doctor.jpg`}
        alt="Heart with doctor"
        sx={{ objectFit: 'cover', height:{
            xs:300,
            lg:265
        } }}
      />

      {/* Divider */}
      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  );
}
