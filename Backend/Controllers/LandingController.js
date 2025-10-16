import AppointmentsModel from "../Models/AppointmentsModel.js";
import CentreStatusModel from "../Models/CentreStatusModel.js";

const getLandingData = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const totalAppointments = await AppointmentsModel.countDocuments({
            appointDate: {
                $gte: today,
                $lt: tomorrow
            }
        });
        const centreStatus = await CentreStatusModel.findById('CENTRE_STATUS_CONFIG');

        res.status(200).json({
            centreStatus,
            totalAppointments,
            message: 'Landing page data fetching success.'
        })

    } catch (error) {
        console.error("Get Landing page data error ", error);
    }
}

export { getLandingData }