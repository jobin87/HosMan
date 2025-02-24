import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Chip,
    Box,
  } from "@mui/material";
  import { Delete, Visibility } from "@mui/icons-material";
  
  const payments = [
    { id: "PAY123", patient: "John Doe", amount: "$200", method: "Credit Card", status: "Paid" },
    { id: "PAY124", patient: "Jane Smith", amount: "$150", method: "Cash", status: "Pending" },
    { id: "PAY125", patient: "Alice Brown", amount: "$500", method: "UPI", status: "Failed" },
  ];
  
  export default function PaymentList() {
    return (
      <Box sx={{ mt:16 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Payment List 
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {["Payment ID", "Patient Name", "Amount", "Method", "Status", "Actions"].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      border: "1px solid #ddd",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
  
            <TableBody>
              {payments.map((payment, index) => (
                <TableRow key={index}>
                  {[
                    payment.id,
                    payment.patient,
                    payment.amount,
                    payment.method,
                  ].map((val, idx) => (
                    <TableCell key={idx} sx={{ border: "1px solid #ddd", textAlign: "center" }}>
                      {val}
                    </TableCell>
                  ))}
  
                  {/* Status Column */}
                  <TableCell sx={{ border: "1px solid #ddd", textAlign: "center" }}>
                    <Chip
                      label={payment.status}
                      color={
                        payment.status === "Paid"
                          ? "success"
                          : payment.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    />
                  </TableCell>
  
                  {/* Actions Column */}
                  <TableCell sx={{ border: "1px solid #ddd", textAlign: "center" }}>
                    <IconButton color="primary">
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton color="error">
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
  