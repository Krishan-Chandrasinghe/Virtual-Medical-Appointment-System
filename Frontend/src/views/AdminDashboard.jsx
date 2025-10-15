import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import api from '../api/apiConfig'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

function AdminDashboard() {
    const [todayCount, setTodayCount] = useState(0);
    const [appointments, setAppointments] = useState([]);
    const [centreStatus, setCentreStatus] = useState({
        isCentreOpen: false,
        isDoctorAvailable: false,
        currentAppointmentNo: 0
    });

    async function getAdminDashbordData() {
        try {
            const resp = await api.get('/admins/getAdminDashboardData');
            setTodayCount(resp.data.totalAppointments);
            setAppointments(resp.data.appointments);
            setCentreStatus(resp.data.centreStatus);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setCentreStatus((prevStatus) => ({
            ...prevStatus,
            [name]: type === 'number' ? Number(value) : (value === 'true' ? true : value === 'false' ? false : value)
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await api.patch('/admins/centreStatusUpdate', centreStatus);
            window.alert(resp.data.message);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAdminDashbordData();

        const socket = io('http://localhost:5000');
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
            <div className="flex items-center justify-center bg-gray-100 ">
                <h1 className="text-2xl sm:text-4xl text-center font-bold text-[#3a1031] mt-5">Online Appointment System</h1>
            </div>

            {/* Status Section */}
            <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-100 py-10 px-4 lg:px-0">
                <div className='flex flex-col lg:flex-row items-center lg:items-start justify-around gap-8 w-full max-w-7xl'>

                    <form className="space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
                        <div className='px-4 py-6 bg-[#fff5fd] rounded-lg border border-[#d6c1d2] flex flex-col gap-2 shadow-lg'>
                            <div className={`border-b-2 mb-2 ${centreStatus.isCentreOpen ? 'border-green-500' : 'border-red-500'} `}>
                                <h3 className={`font-bold text-lg text-center ${centreStatus.isCentreOpen ? 'text-green-500' : 'text-red-500'}`}>{centreStatus.isCentreOpen ? 'Open' : 'Closed'}</h3>
                            </div>
                            <div>
                                <label htmlFor="isCentreOpen" className='text-sm font-bold text-[#3a1031]'>Centre Status: <span className='text-red-500 font-bold'>*</span> </label>
                                <select
                                    name="isCentreOpen"
                                    id="isCentreOpen"
                                    value={centreStatus.isCentreOpen}
                                    onChange={handleChange}
                                    className='block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-0.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6'
                                >
                                    <option value='true'>Open</option>
                                    <option value='false'>Closed</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="isDoctorAvailable" className='text-sm font-bold text-[#3a1031]'>Doctor Status: <span className='text-red-500 font-bold'>*</span> </label>
                                <select
                                    name="isDoctorAvailable"
                                    id="isDoctorAvailable"
                                    value={centreStatus.isDoctorAvailable}
                                    onChange={handleChange}
                                    className='block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-0.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6'
                                >
                                    <option value='true'>Available</option>
                                    <option value='false'>Not Available</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="currentAppointmentNo" className='text-sm font-bold text-[#3a1031]'>Current Appointment No: <span className='text-red-500 font-bold'>*</span> </label>
                                <input
                                    id="currentAppointmentNo"
                                    name="currentAppointmentNo"
                                    type="number"
                                    className="block w-full rounded-md border-0 focus:outline-0 bg-white/75 py-0.5 px-2 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6"
                                    value={centreStatus.currentAppointmentNo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="totalAppointments" className='text-sm font-bold text-[#3a1031]'>Total Appointments: <span className='text-red-500 font-bold'>*</span> </label>
                                <input
                                    id="totalAppointments"
                                    name="totalAppointments"
                                    type="number"
                                    disabled
                                    className="block w-full rounded-md border-0 focus:outline-0 bg-white/75 py-0.5 px-2 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6"
                                    value={todayCount}
                                />
                            </div>
                            <button type="submit" className="flex w-full cursor-pointer justify-center rounded-md bg-[#3A1031] px-2 py-0.5 mt-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#3a1031c0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A1031]">
                                Change Status
                            </button>
                        </div>
                    </form>

                    {/* All Appointments Table Section */}
                    <div className='flex flex-col items-start justify-start w-full lg:w-3/4 h-auto max-h-96 px-4 py-6 lg:px-10 lg:py-12 shadow-md bg-white rounded-lg overflow-y-auto'>
                        <h2 className='text-2xl font-bold mb-4'>All Appointments</h2>
                        <div className="overflow-x-auto w-full">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">#</th>
                                        <th className="py-2 px-4 border-b text-left">Name</th>
                                        <th className="py-2 px-4 border-b text-left">Reg. Number</th>
                                        <th className="py-2 px-4 border-b text-left">Appointment No</th>
                                        <th className="py-2 px-4 border-b text-left min-w-[120px]">Appointment Date</th>
                                        <th className="py-2 px-4 border-b text-left min-w-[150px]">Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appointment, index) => (
                                        <tr key={appointment._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                            <td className="py-2 px-4 border-b">{index + 1}</td>
                                            <td className="py-2 px-4 border-b whitespace-nowrap">{appointment.name}</td>
                                            <td className="py-2 px-4 border-b whitespace-nowrap">{appointment.regNumber}</td>
                                            <td className="py-2 px-4 border-b">{appointment.appointNo}</td>
                                            <td className="py-2 px-4 border-b whitespace-nowrap">{new Date(appointment.appointDate).toLocaleDateString()}</td>
                                            <td className="py-2 px-4 border-b whitespace-nowrap">{new Date(appointment.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
        </>
    )
}

export default AdminDashboard