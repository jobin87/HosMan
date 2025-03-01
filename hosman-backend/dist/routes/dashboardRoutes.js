"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const appointment_1 = require("../controllers/dashboard/appointment");
const patients_1 = require("../controllers/dashboard/patients");
const treatment_1 = require("../controllers/dashboard/treatment");
const report_1 = require("../controllers/dashboard/report");
const roles_1 = require("../controllers/dashboard/roles");
const staff_1 = require("../controllers/dashboard/staff");
exports.dashboardRoutes = express_1.default.Router();
//staff data
exports.dashboardRoutes.post('/addStaff', staff_1.addStaff);
exports.dashboardRoutes.get('/getStaff', staff_1.getStaff);
//appointment
exports.dashboardRoutes.post('/addappointment', appointment_1.appointments);
exports.dashboardRoutes.get('/getAppointments', appointment_1.getAppointments);
// patient
exports.dashboardRoutes.post('/addPatient', patients_1.PatientAdded);
exports.dashboardRoutes.get('/getPatient', patients_1.getPatient);
//treatment
exports.dashboardRoutes.post('/addTreatment', treatment_1.treatementAdded);
exports.dashboardRoutes.get('/getTreatment/:id?', treatment_1.getTreatment);
exports.dashboardRoutes.delete('/deleteTreatmentById/:id', treatment_1.deleteTreatmentById);
exports.dashboardRoutes.delete('/deleteAllTreatments', treatment_1.deleteAllTreatments);
exports.dashboardRoutes.patch('/updateTreatmentById/:treatmentId', treatment_1.updateTreatment);
//report
exports.dashboardRoutes.post('/report/addReportList', report_1.AddReports);
exports.dashboardRoutes.get('/report/getReport/:id?', report_1.getReports);
exports.dashboardRoutes.patch('/report/assignWorkers', report_1.AssignWorkers);
//roomsAndCategories
exports.dashboardRoutes.post('/roles/addRoomsAndCategory', roles_1.AddroomsAndCategories);
exports.dashboardRoutes.get('/roles/getRoomsAndCategory', roles_1.getRoomsAndCategories);
