import express from 'express';
import { DoctorsAdded, getDoctors } from '../controllers/dashboard/addDoctors';
import { appointments, getAppointments } from '../controllers/dashboard/appointment';
import { getPatient, PatientAdded } from '../controllers/dashboard/addPatients';

export const dashboardRoutes = express.Router()
dashboardRoutes.post('/addDoctor',DoctorsAdded);
dashboardRoutes.get('/getDoctor',getDoctors);

//
dashboardRoutes.post('/addappointment',appointments)
dashboardRoutes.get('/getAppointments',getAppointments);

//
dashboardRoutes.post('/addPatient',PatientAdded);
dashboardRoutes.get('/getPatient',getPatient);

