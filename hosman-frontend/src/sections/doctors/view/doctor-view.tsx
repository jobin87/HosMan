import { Box } from "@mui/material";
import DoctorList from "../doctors-list";
import { DashboardContent } from "src/layouts/dashboard";

export default function doctorListView() {
  return (
    <DashboardContent>
        <DoctorList/>

    </DashboardContent>
  )
}
