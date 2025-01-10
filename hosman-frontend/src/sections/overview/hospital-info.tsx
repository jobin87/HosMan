import { Card,  CardMedia, CardProps,  Divider } from "@mui/material";
import { ChartLegends } from "src/components/chart";
import { CONFIG } from "src/config-global";

type Props = CardProps & {
  message: string;
};

export function HospitalInfo({ message, ...cardprops }: Props) {
  // Define chart options if missing
  const chartOptions = {
    colors: ['#FF6384', '#36A2EB', '#FFCE56']  // Example color palette
  };

  return (
    <Card {...cardprops}>
      {/* Image Section */}
      <CardMedia
        component="img"
        src={`${CONFIG.assetsDir}/images/heart-with-doctor.jpg`}
        alt="Heart with doctor"
        height="200"
        sx={{ objectFit: 'cover' }}
      />

      {/* Divider */}
      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* Chart Legends */}
      <ChartLegends
        labels={['Heart Treatment Listed in Top 3']}  // Corrected to array
        colors={chartOptions.colors}  // Now correctly defined
        sx={{ p: 3, justifyContent: 'center' }}
      />
    </Card>
  );
}
