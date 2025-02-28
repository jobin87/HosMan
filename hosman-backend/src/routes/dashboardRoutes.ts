import express from 'express';
import { appointments, getAppointments } from '../controllers/dashboard/appointment';
import { getPatient, PatientAdded } from '../controllers/dashboard/patients';
import { deleteAllTreatments, deleteTreatmentById, getTreatment, treatementAdded, updateTreatment } from '../controllers/dashboard/treatment';
import { AddReports, AssignWorkers, getReports } from '../controllers/dashboard/report';
import {  getRoomsAndCategories, AddroomsAndCategories } from '../controllers/dashboard/roles';
import { addStaff, getStaff, } from '../controllers/dashboard/staff';

export const dashboardRoutes = express.Router()

//staff data
dashboardRoutes.post('/addStaff',addStaff);
dashboardRoutes.get('/getStaff',getStaff);

//appointment
dashboardRoutes.post('/addappointment',appointments)
dashboardRoutes.get('/getAppointments',getAppointments);

// patient
dashboardRoutes.post('/addPatient',PatientAdded);
dashboardRoutes.get('/getPatient',getPatient);

//treatment
dashboardRoutes.post('/addTreatment',treatementAdded);
dashboardRoutes.get('/getTreatment/:id?',getTreatment);
dashboardRoutes.delete('/deleteTreatmentById/:id',deleteTreatmentById);
dashboardRoutes.delete('/deleteAllTreatments',deleteAllTreatments);
dashboardRoutes.patch('/updateTreatmentById/:treatmentId',updateTreatment);

//report
dashboardRoutes.post('/report/addReportList',AddReports);
dashboardRoutes.get('/report/getReport/:id?',getReports);
dashboardRoutes.patch('/report/assignWorkers',AssignWorkers);


//roomsAndCategories
dashboardRoutes.post('/roles/addRoomsAndCategory',AddroomsAndCategories);
dashboardRoutes.get('/roles/getRoomsAndCategory',getRoomsAndCategories);





