import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    regNumber: { type: String, required: true, unique: true },
    appointNo: { type: String, required: true },
    appointDate: { type: Date, required: true },
    expireAt: {
    type: Date,
    default: function() {
      const expire = new Date(this.appointDate);
      expire.setDate(expire.getDate() + 1);
      expire.setHours(23, 59, 59, 999);
      return expire;
    }
  }
}, { timestamps: true });

usersSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });

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

usersSchema.statics.GenerateNextAppointmentData = async function () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaysCount = await this.countDocuments({
        appointDate: {
            $gte: today,
            $lt: tomorrow
        }
    });

    return {
        appointNo: todaysCount + 1,
        appointDate: new Date()
    };
}


export default mongoose.model('Appointments', usersSchema);