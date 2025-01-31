import express from 'express';
import { appointments, getAppointments } from '../controllers/dashboard/appointment';
import { getPatient, PatientAdded } from '../controllers/dashboard/patients';
import { deleteAllTreatments, deleteTreatmentById, getTreatment, treatementAdded, updateTreatment } from '../controllers/dashboard/treatment';
import { DoctorsAdded, getDoctors } from '../controllers/dashboard/doctors';
import { AddReports, getReports } from '../controllers/dashboard/report';
import { getRoomsAndCategories, roomsAndCategories } from '../controllers/dashboard/roles';

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

dashboardRoutes.post('/report/addReportList',AddReports);
dashboardRoutes.get('/report/getReport/:id?',getReports);


dashboardRoutes.post('/roles/addRoomsAndCategory',roomsAndCategories);
dashboardRoutes.get('/roles/getRoomsAndCategory',getRoomsAndCategories);




