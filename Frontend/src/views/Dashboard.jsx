import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

function Dashboard() {
    return (
        <>
            <NavBar />
            {/* Hero Section */}
            <div className="flex items-center justify-center bg-gray-100 py-10">
                <div className='flex flex-col items-center gap-4'>
                    <h1 className="text-4xl font-bold text-[#3a1031] mt-2">Online Appointment System</h1>
                    <h3 className="text-xl font-bold text-[#3a1031] mt-2">Make an Appointment</h3>
                    <Link to='/appointment' className="bg-[#3a1031] cursor-pointer text-center hover:bg-[#6b1d5c] text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
                        Book an Appointment
                    </Link>
                </div>
            </div>

            {/* Status Section */}
            <div className="flex items-center justify-center bg-gray-100 py-10">
                <div className='flex items-center justify-around gap-4'>
                    <div className='flex flex-col items-center justify-center h-40 w-72 px-10 py-12 shadow-md bg-white rounded-lg'>
                        <h2>Open</h2>
                        <h2>Doctor Avalable</h2>
                    </div>
                    <div className='flex flex-col items-start justify-center h-40 w-72 px-10 py-12 shadow-md bg-white rounded-lg'>
                        <h3>Your Appointment No: </h3>
                        <h3>Current Appointment No: </h3>
                        <h3>Total Appointments: </h3>
                    </div>
                </div>
            </div>

            {/* Hours Section */}
            <div className="flex items-center justify-center bg-gray-100 py-10">
                <div className=' px-10 py-12 shadow-md bg-white rounded-lg'>
                    <div className="grid grid-cols-2 gap-1">
                        <div className='col-span-2 flex items-center justify-center px-10 py-2 text-xl font-bold'><h2>Consultation Hours</h2></div>
                        <div className='col-span-2 flex justify-center px-4 py-2'>
                            <table className="table-auto overflow-scroll">
                                <tbody>
                                    <tr>
                                        <td>Oral Helthcare : &nbsp;</td>
                                        <td>02.00pm-04.00pm	(Wednesday)</td>
                                    </tr>
                                    <tr>
                                        <td>Health Center : &nbsp;</td>
                                        <td>08.30am-01.30pm</td>
                                    </tr>
                                    <tr>
                                        <td>Public Health Work : &nbsp;</td>
                                        <td>02.00pm-04.00pm</td>
                                    </tr>
                                    <tr>
                                        <td>Officie Work : &nbsp;</td>
                                        <td>02.00pm-04.00pm</td>
                                    </tr>
                                    <tr>
                                        <td>Emergencies : &nbsp;</td>
                                        <td>08.30am-04.00pm</td>
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