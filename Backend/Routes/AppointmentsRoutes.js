import express from 'express';
import {
    deleteAppointment,
    getAllAppointments,
    getAppointment,
    getDate,
    makeAppointment,
    updateAppointment
} from '../Controllers/AppointmentsController.js';

const router = express.Router();

router.post('/', makeAppointment);

router.get('/', getAllAppointments);

router.get('/getDate', getDate);

router.get('/:_id', getAppointment);

router.patch('/:_id', updateAppointment);

router.delete('/:_id', deleteAppointment);

export default router;