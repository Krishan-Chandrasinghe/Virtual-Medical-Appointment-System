import mongoose from "mongoose";
import AppointmentsModel from "../Models/AppointmentsModel.js";

export const makeAppointment = async (req, res) => {

    // Check if request body exists and has data
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "No data provided for makeing an appointment." });
    }

    const { name, regNumber, appointNo, appointDate } = req.body;

    try {
        const appointment = await AppointmentsModel.MakeAppointment({ name, regNumber, appointNo, appointDate });
        if (!appointment) throw new Error('Appointment was not booked');
        req.io.emit('appointmentAdded', appointment);
        res.status(200).json({ appointment, message: 'Appointment is added successfully.' });

    } catch (error) {
        res.status(400).json({ error: error.message, message: 'Appointment making failed!' });
    }
}

export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentsModel.find({});

        if (appointments.length === 0) return res.status(404).json({ message: "There is no any appointments." });

        res.status(200).json({ appointments, message: 'Appointments are fatched successfully.' });

    } catch (error) {
        res.status(400).json({ error: error.message, message: 'Appointments fetching failed!' });
    }
}

export const getAppointment = async (req, res) => {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
    }

    try {
        const appointment = await AppointmentsModel.findById(_id);

        if (!appointment) return res.status(404).json({ message: "There is no such appointment." });

        res.status(200).json({ appointment, message: 'Appointment is found.' });

    } catch (error) {
        res.status(400).json({ error: error.message, message: 'Appointment fetching failed!' });
    }
}

export const updateAppointment = async (req, res) => {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
    }

    // Check if request body exists and has data
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "No data provided for update" });
    }

    const { name, regNumber, appointNo, appointDate } = req.body;

    try {
        const appointment = await AppointmentsModel.findByIdAndUpdate(_id,
            { name, regNumber, appointNo, appointDate },
            { new: true }
        );
        if (!appointment) return res.status(404).json({ message: "Appointment not found." });
        res.status(200).json({ appointment, message: 'Appointment is updated successfully.' });

    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Appointment updating failed!' });
    }
}

export const deleteAppointment = async (req, res) => {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
    }

    try {
        const appointment = await AppointmentsModel.findByIdAndDelete(_id);

        if (!appointment) return res.status(404).json({ message: "Appointment not found." });

        res.status(200).json({ appointment, message: 'Appointment is deleted successfully.' });

    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Appointment deleting failed!' });
    }
}

export const getNextAppointmentData = async (req, res) => {
    const { appointNo, appointDate } = await AppointmentsModel.GenerateNextAppointmentData();

    res.status(200).json({ appointNo, appointDate, message: 'Next appointment data is fetched successfully.' });
}