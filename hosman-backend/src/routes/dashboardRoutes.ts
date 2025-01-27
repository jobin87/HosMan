import express from 'express';
import { DoctorsAdded, getDoctors } from '../controllers/dashboard/addDoctors';
import { appointments, getAppointments } from '../controllers/dashboard/appointment';
import { getPatient, PatientAdded } from '../controllers/dashboard/addPatients';
import { getTreatment, treatementAdded } from '../controllers/dashboard/addTreatment';
import { deleteAllTreatments, deleteTreatmentById } from '../controllers/dashboard/delete/deleteTreatment';
import { updateTreatment } from '../controllers/dashboard/patch/treatmentPatch';

export const dashboardRoutes = express.Router()
dashboardRoutes.post('/addDoctor',DoctorsAdded);
dashboardRoutes.get('/getDoctor',getDoctors);

//
dashboardRoutes.post('/addappointment',appointments)
dashboardRoutes.get('/getAppointments',getAppointments);

//
dashboardRoutes.post('/addPatient',PatientAdded);
dashboardRoutes.get('/getPatient',getPatient);

//
dashboardRoutes.post('/addTreatment',treatementAdded);
dashboardRoutes.get('/getTreatment/:id?',getTreatment);
dashboardRoutes.delete('/deleteTreatmentById/:id',deleteTreatmentById);
dashboardRoutes.delete('/deleteAllTreatments',deleteAllTreatments);
dashboardRoutes.patch('/updateTreatmentById/:treatmentId',updateTreatment);




