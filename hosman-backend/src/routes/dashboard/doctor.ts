import express from 'express';
import { DoctorsAdded, getDoctors } from '../../controllers/dashboard/addDoctors';

export const doctorRoutes = express.Router()
doctorRoutes.post('/addDoctor',DoctorsAdded);
doctorRoutes.get('/getDoctor',getDoctors)