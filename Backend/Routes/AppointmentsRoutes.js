import express from 'express';
import {
    deleteAppointment,
    getAllAppointments,
    getAppointment,
    getNextAppointmentData,
    getTotalAppointments,
    makeAppointment,
    updateAppointment
} from '../Controllers/AppointmentsController.js';
import requestAuth from '../Middlewares/requestAuth.js';

const router = express.Router();

// router.use(requestAuth);

router.post('/', makeAppointment);

router.get('/', getAllAppointments);

router.get('/nextAppointData', getNextAppointmentData);

router.get('/:_id', getAppointment);

router.patch('/:_id', updateAppointment);

router.delete('/:_id', deleteAppointment);

export default router;