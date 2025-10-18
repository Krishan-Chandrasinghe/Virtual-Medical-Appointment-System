import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import api from '../api/apiConfig'


function LandingPage() {
    const [todayCount, setTodayCount] = useState(0);
    const [centreStatus, setCentreStatus] = useState({
        isCentreOpen: false,
        isDoctorAvailable: false,
        currentAppointmentNo: 0
    });

    async function getLandingData() {
        try {
            const resp = await api.get('/landing/getLandingData');
            console.log(resp.data)
            setTodayCount(resp.data.totalAppointments);
            setCentreStatus(resp.data.centreStatus);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getLandingData();

        const socket = io(import.meta.env.VITE_BACKEND_URL);
        console.log("Socket.IO: Connecting to server...");

        socket.on('centreStatusUpdated', (status) => {
            setCentreStatus(status);
        });

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
                    {/* Adjusted h1 text size to be smaller on mobile (sm:text-4xl for tablet/desktop) */}
                    <h1 className="text-3xl sm:text-4xl text-center font-bold text-[#3a1031] mt-2">Online Appointment System</h1>
                    <h3 className="text-lg sm:text-xl font-bold text-[#3a1031] mt-2">Sign In to Make an Appointment</h3>
                    <Link to='/login' className="bg-[#3a1031] cursor-pointer text-center hover:bg-[#6b1d5c] text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
                        Sign in
                    </Link>
                </div>
            </div>

            {/* Status Section */}
            <div className="flex items-center justify-center bg-gray-100 py-10 px-4">
                <div className='flex flex-col md:flex-row items-center justify-around gap-4 w-full max-w-4xl'>
                    <div className='flex flex-col items-center justify-center h-40 w-full md:w-72 px-10 py-12 shadow-md bg-white rounded-lg mb-4 md:mb-0'>
                        <h2 className='text-lg sm:text-xl font-semibold'>{centreStatus.isCentreOpen ? 'Open' : 'Closed'}</h2>
                        <h2 className='text-lg sm:text-xl font-semibold'>Doctor {centreStatus.isDoctorAvailable ? 'Available' : 'Not Available'}</h2>
                    </div>
                    <div className='flex flex-col items-start justify-center h-40 w-full md:w-72 px-10 py-12 shadow-md bg-white rounded-lg'>
                        <h3 className='text-md sm:text-lg'>Current Appointment No: {centreStatus.currentAppointmentNo}</h3>
                        <h3 className='text-md sm:text-lg'>Total Appointments: {todayCount}</h3>
                    </div>
                </div>
            </div>

            {/* Hours Section */}
            <div className="flex items-center justify-center bg-gray-100 py-10 px-4">
                <div className='w-full max-w-lg px-4 py-8 sm:px-10 sm:py-12 shadow-md bg-white rounded-lg'>
                    <div className="flex flex-col">
                        <div className='flex items-center justify-center px-4 py-2 text-xl font-bold'>
                            <h2 className='text-xl sm:text-2xl'>Consultation Hours</h2>
                        </div>
                        <div className='flex justify-center px-4 py-2'>
                            <table className="w-full">
                                <tbody>
                                    <tr className='border-b border-gray-200'>
                                        <td className='py-1 text-sm sm:text-base whitespace-nowrap font-semibold'>Oral Helthcare :</td>
                                        <td className='py-1 text-sm sm:text-base text-right'>02.00pm-04.00pm (Wednesday)</td>
                                    </tr>
                                    <tr className='border-b border-gray-200'>
                                        <td className='py-1 text-sm sm:text-base whitespace-nowrap font-semibold'>Health Center :</td>
                                        <td className='py-1 text-sm sm:text-base text-right'>08.30am-01.30pm</td>
                                    </tr>
                                    <tr className='border-b border-gray-200'>
                                        <td className='py-1 text-sm sm:text-base whitespace-nowrap font-semibold'>Public Health Work :</td>
                                        <td className='py-1 text-sm sm:text-base text-right'>02.00pm-04.00pm</td>
                                    </tr>
                                    <tr className='border-b border-gray-200'>
                                        <td className='py-1 text-sm sm:text-base whitespace-nowrap font-semibold'>Officie Work :</td>
                                        <td className='py-1 text-sm sm:text-base text-right'>02.00pm-04.00pm</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 text-sm sm:text-base whitespace-nowrap font-semibold'>Emergencies :</td>
                                        <td className='py-1 text-sm sm:text-base text-right'>08.30am-04.00pm</td>
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

export default LandingPage