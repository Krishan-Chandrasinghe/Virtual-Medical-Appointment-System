import CentreStatusModel from "../Models/CentreStatusModel.js";

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