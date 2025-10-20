import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import api from '../api/apiConfig'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useAuthContext } from '../hooks/useAuthContext'

import { FaUserDoctor } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { FaShopLock } from "react-icons/fa6";
import { FaBan } from "react-icons/fa6";

function Dashboard() {
    const [todayCount, setTodayCount] = useState(0);
    const [userAppointment, setUserAppointment] = useState({
        name: '',
        regNumber: '',
        appointNo: '',
        appointDate: '',
        createdAt: ''
    });
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
            setUserAppointment(resp.data.userAppointment);
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
        <div className='min-h-screen bg-gray-100 flex flex-col justify-between'>
            <NavBar />
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center bg-gray-100 py-10 px-4">
                    <h1 className="text-3xl sm:text-4xl text-center font-bold text-[#3a1031] my-2">Online Appointment System</h1>
                    {!userAppointment &&
                        <div className='flex flex-col items-center gap-4'>
                            <h3 className="text-xl text-center font-bold text-[#3a1031]">Make an Appointment</h3>
                            <Link to='/appointment' className="bg-[#3a1031] cursor-pointer text-center hover:bg-[#6b1d5c] text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
                                Book an Appointment
                            </Link>
                        </div>
                    }
                    {userAppointment &&
                        <div className='flex flex-col items-center justify-start w-full lg:w-3/4 h-auto max-h-96 px-4 py-6 shadow-md bg-white rounded-lg overflow-y-auto mt-4'>
                            <h2 className='text-2xl font-bold mb-4'>Your Appointment </h2>
                            <div className="overflow-x-auto w-full">
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b text-left">Appointment No</th>
                                            <th className="py-2 px-4 border-b text-left">Name</th>
                                            <th className="py-2 px-4 border-b text-left">Reg. Number</th>
                                            <th className="py-2 px-4 border-b text-left min-w-[120px]">Appointment Date</th>
                                            <th className="py-2 px-4 border-b text-left min-w-[150px]">Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='bg-gray-100'>
                                            <td className="py-2 px-4 border-b">{userAppointment.appointNo}</td>
                                            <td className="py-2 px-4 border-b whitespace-nowrap">{userAppointment.name}</td>
                                            <td className="py-2 px-4 border-b whitespace-nowrap">{userAppointment.regNumber}</td>
                                            <td className="py-2 px-4 border-b whitespace-nowrap">{new Date(userAppointment.appointDate).toLocaleDateString()}</td>
                                            <td className="py-2 px-4 border-b whitespace-nowrap">{new Date(userAppointment.createdAt).toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
            </div>

            {/* Status Section */}
            <div className="flex items-center justify-center bg-gray-100 py-10 px-4">
                <div className='flex flex-col md:flex-row items-stretch justify-center gap-4 w-full max-w-4xl'>
                    <div className='flex flex-row gap-2 md:gap-5 items-center justify-around w-full md:w-72 px-5 py-5 shadow-md bg-white rounded-lg mb-4 md:mb-0'>
                        <div className='p-2 flex flex-col items-center justify-center'>
                            {centreStatus.isCentreOpen ? <FaShop size={40} color='green' /> : <FaShopLock size={40} color='red' />}
                            <h2 className='text-lg sm:text-xl font-semibold'>{centreStatus.isCentreOpen ? 'Open' : 'Closed'}</h2>
                        </div>
                        <div className='p-2 flex flex-col items-center justify-center'>
                            {centreStatus.isDoctorAvailable ? <FaUserDoctor size={40} color='green' /> : <FaUserDoctor size={40} color='red' />}
                            <h2 className='text-lg sm:text-xl text-center font-semibold'>{centreStatus.isDoctorAvailable ? 'Available' : 'Not Available'}</h2>
                        </div>
                    </div>
                    <div className='flex flex-රදඅ items-start justify-center px-5 py-5 shadow-md bg-white rounded-lg'>
                        <div className='p-2 flex flex-col items-center justify-center'>
                            <h3 className='text-3xl font-bold'>{userAppointment ? userAppointment.appointNo : <FaBan size={35} color='red'/>}</h3>
                            <h3 className='text-md text-center sm:text-lg'>Your Appointment</h3>
                        </div>
                        <div className='p-2 flex flex-col items-center justify-center'>
                            <h3 className='text-3xl font-bold'>{centreStatus.currentAppointmentNo}</h3>
                            <h3 className='text-md text-center sm:text-lg'>Current Appointment</h3>
                        </div>
                        <div className='p-2 flex flex-col items-center justify-center'>
                            <h3 className='text-3xl font-bold'>{todayCount}</h3>
                            <h3 className='text-md text-center sm:text-lg'>Total Appointments</h3>
                        </div>
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
        </div>
    )
}

export default Dashboard