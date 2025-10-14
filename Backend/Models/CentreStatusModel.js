import mongoose from "mongoose";

const CentreStatusSchema = new mongoose.Schema({
    _id: { type: String, required:true, default: 'CENTRE_STATUS_CONFIG' },
    isDoctorAvailable: { type: Boolean, default: false },
    isCentreOpen: { type: Boolean, default: false },
    currentAppointmentNo: { type: Number, default: 0 }
},{timestamps:true});

const CentreStatusModel = mongoose.model('CentreStatus', CentreStatusSchema);

export default CentreStatusModel;