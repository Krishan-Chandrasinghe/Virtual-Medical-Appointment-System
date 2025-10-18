import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import api from '../api/apiConfig'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useAuthContext } from '../hooks/useAuthContext'

function Dashboard() {
    const [todayCount, setTodayCount] = useState(0);
    const [userAppointmentNo, setUserAppointmentNo] = useState(0);
    const [centreStatus, setCentreStatus] = useState({
        isCentreOpen: false,
        isDoctorAvailable: false,
        currentAppointmentNo: 0
    });

    const { user } = useAuthContext();

    async function getUserDashbordData() {
        try {
            const resp = await api.get(`/users/getUserDashbordData?regNumber=${user.regNumber}`);
            setTodayCount(resp.data.totalAppointments);
            setCentreStatus(resp.data.centreStatus);
            setUserAppointmentNo(resp.data.userAppointmentNo);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getUserDashbordData();

        const socket = io(import.meta.env.VITE_BACKEND_URL);
        console.log("Socket.IO: Connecting to server...");

        socket.on('centreStatusUpdated', (status) => {
            setCentreStatus(status);
        })

        return () => {
            console.log("Socket.IO: Disconecting a connection...");
            socket.disconnect();
        }
    }, []);
    return (
        <>
            <NavBar />
            {/* Hero Section */}
            <div className="flex items-center justify-center bg-gray-100 py-10 px-4">
                <div className='flex flex-col items-center gap-4'>
                    <h1 className="text-3xl sm:text-4xl text-center font-bold text-[#3a1031] mt-2">Online Appointment System</h1>
                    <h3 className="text-xl font-bold text-[#3a1031] mt-2">Make an Appointment</h3>
                    <Link to='/appointment' className="bg-[#3a1031] cursor-pointer text-center hover:bg-[#6b1d5c] text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
                        Book an Appointment
                    </Link>
                </div>
            </div>

            {/* Status Section */}
            <div className="flex items-center justify-center bg-gray-100 py-10 px-4">
                <div className='flex flex-col md:flex-row items-center justify-around gap-4 w-full max-w-4xl'>
                    <div className='flex flex-col items-center justify-center h-40 w-full md:w-72 px-10 py-12 shadow-md bg-white rounded-lg mb-4 md:mb-0'>
                        <h2>{centreStatus.isCentreOpen ? 'Open' : 'Closed'}</h2>
                        <h2>Doctor {centreStatus.isDoctorAvailable ? 'Available' : 'Not Available'}</h2>
                    </div>
                    <div className='flex flex-col items-start justify-center h-40 w-full md:w-72 px-10 py-12 shadow-md bg-white rounded-lg'>
                        <h3>Your Appointment No: {userAppointmentNo === 0 ? 'No Appointment' : userAppointmentNo}</h3>
                        <h3>Current Appointment No: {centreStatus.currentAppointmentNo}</h3>
                        <h3>Total Appointments: {todayCount}</h3>
                    </div>
                </div>
            </div>

            {/* Hours Section */}
            <div className="flex items-center justify-center bg-gray-100 py-10 px-4">
                <div className='w-full max-w-lg px-4 py-6 lg:px-10 lg:py-12 shadow-md bg-white rounded-lg'>
                    <div className="flex flex-col">
                        <div className='flex items-center justify-center px-4 py-2 text-xl font-bold'><h2>Consultation Hours</h2></div>
                        <div className='flex justify-center px-4 py-2'>
                            <table className="w-full">
                                <tbody>
                                    <tr className='border-b border-gray-200'>
                                        <td className='font-semibold whitespace-nowrap py-2'>Oral Helthcare :</td>
                                        <td className='text-right py-2'>02.00pm-04.00pm (Wednesday)</td>
                                    </tr>
                                    <tr className='border-b border-gray-200'>
                                        <td className='font-semibold whitespace-nowrap py-2'>Health Center :</td>
                                        <td className='text-right py-2'>08.30am-01.30pm</td>
                                    </tr>
                                    <tr className='border-b border-gray-200'>
                                        <td className='font-semibold whitespace-nowrap py-2'>Public Health Work :</td>
                                        <td className='text-right py-2'>02.00pm-04.00pm</td>
                                    </tr>
                                    <tr className='border-b border-gray-200'>
                                        <td className='font-semibold whitespace-nowrap py-2'>Officie Work :</td>
                                        <td className='text-right py-2'>02.00pm-04.00pm</td>
                                    </tr>
                                    <tr>
                                        <td className='font-semibold whitespace-nowrap py-2'>Emergencies :</td>
                                        <td className='text-right py-2'>08.30am-04.00pm</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Dashboard