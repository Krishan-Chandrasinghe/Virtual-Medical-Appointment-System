import mongoose from "mongoose";

const CentreStatusSchema = new mongoose.Schema({
    _id: { type: String, required: true, default: 'CENTRE_STATUS_CONFIG' },
    isDoctorAvailable: { type: Boolean },
    isCentreOpen: { type: Boolean },
    currentAppointmentNo: { type: Number }
}, { timestamps: true });

const CentreStatusModel = mongoose.model('CentreStatus', CentreStatusSchema);

export default CentreStatusModel;