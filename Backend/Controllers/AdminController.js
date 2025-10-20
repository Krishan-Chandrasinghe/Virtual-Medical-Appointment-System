import CentreStatusModel from "../Models/CentreStatusModel.js";
import AppointmentsModel from "../Models/AppointmentsModel.js"

export const updateCentreStatus = async (req, res) => {
    const {
        isCentreOpen,
        isDoctorAvailable,
        currentAppointmentNo
    } = req.body;

    try {
        const resp = await CentreStatusModel.findByIdAndUpdate(
            { _id: 'CENTRE_STATUS_CONFIG' },
            { isCentreOpen, isDoctorAvailable, currentAppointmentNo },
            { new: true, upsert: true }
        );

        if (resp) {
            req.io.emit('centreStatusUpdated', { isCentreOpen, isDoctorAvailable, currentAppointmentNo });
            res.status(200).json({ message: "Centre status updated successfully." });
        } else {
            res.status(404).json({ message: "Centre status document not found." });
        }
    } catch (error) {
        console.error("Update centre status failed. ", error);
    }
}

export const getAdminDashboardData = async (req, res) => {
    try {
        const centreStatus = await CentreStatusModel.findById('CENTRE_STATUS_CONFIG');
        const appointments = await AppointmentsModel.find({});

        res.status(200).json({ centreStatus, appointments, message: 'Admin dashbord data fetching success.' })

    } catch (error) {
        res.status(500).json({ message: "Error getting Admin Dashbord Data." });
        console.error("Error getting Admin Dashbord Data.");
    }
}