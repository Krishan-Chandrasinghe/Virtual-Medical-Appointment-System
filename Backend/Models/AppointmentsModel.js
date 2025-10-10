import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    regNumber: { type: String, required: true, unique: true },
    appointNo: { type: String, required: true },
    appointDate: { type: Date, required: true }
}, { timestamps: true });


usersSchema.statics.MakeAppointment = async function (appointData) {
    const {
        name, regNumber, appointNo, appointDate
    } = appointData;

    const requiredFields = [
        'name', 'regNumber', 'appointNo', 'appointDate'
    ];

    for (const field of requiredFields) {
        if (!appointData[field]) {
            throw Error(`Field "${field}" is required!`);
        }
    }

    // Appointment date validation
    const newDate = new Date(appointDate);
    if (isNaN(newDate.getTime())) throw Error('Invalid appointment date!');
    if (newDate > new Date()) throw Error('Appointment date cannot be in the future!');

    // Check for existing appointment
    const existingRegNumber = await this.findOne({ regNumber });

    if (existingRegNumber) throw Error('You have already got an appointment for today. Please get one tommorrow!');


    // Create appointment
    const appointment = await this.create({
        name: name.trim(),
        regNumber: regNumber.trim().toUpperCase(),
        appointNo: Number(appointNo),
        appointDate: newDate
    });

    return appointment;
};


export default mongoose.model('Appointments', usersSchema);