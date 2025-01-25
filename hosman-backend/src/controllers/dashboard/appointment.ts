import express, { Request, Response } from "express"


export const appointments= async(req:Request,res:Response):Promise<void>=>{
    try{
        const {department, doctor, patientName, appointmentTime, appointmentDate, payment} = req.body;
        if (!department || !doctor || !patientName || !appointmentTime || !appointmentDate || !payment) {
            res.status(400).json({ message: 'All fields are required' });
          }

          const newAppointment = {
            department,
            doctor,
            patientName,
            appointmentTime,
            appointmentDate,
            payment,
          };

          res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });

    }
    catch(error:any){
        res.status(500).json({message:" appointmentdata error: internal server error "})

    }

}