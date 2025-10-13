import { useEffect, useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import UniLogo from '../assets/UniLogo.webp'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import api from '../api/apiConfig'

function AppointmentBook() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [appointDate, setAppointDate] = useState("");
    const [appointNo, setAppointNo] = useState("");
    const { user } = useAuthContext();

    useEffect(() => {
        async function getDate() {
            try {
                const resp = await api.get('/appointments/nextAppointData');
                setAppointDate(resp.data.appointDate);
                setAppointNo(resp.data.appointNo);
            } catch (error) {
                console.error("Error getting date!", error);
            }
        }
        getDate();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await api.post('/appointments/', {
                name: user.firstName,
                regNumber: user.regNumber,
                appointNo,
                appointDate: appointDate.split('T')[0],
            }, { withCredentials: true });

            setMessage(resp.data.message);

            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);

        } catch (error) {
            setMessage(error?.response?.data?.error || 'Couldn\'t make an appointment!');
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
            console.error("Couldn't make an appointment. ", error);
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
                <div className='max-w-[500px] border-2 shadow-xl py-6 p-8 rounded-lg sm:mx-auto sm:w-full sm:max-w-sm'>
                    <div className="text-[#3a1031] p-1 rounded-full hover:bg-red-500 hover:text-white border-2 flex items-center justify-center w-7 h-7 font-bold absolute top-2 right-5"><Link to={'/'} >X</Link></div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-20 w-auto" src={UniLogo} alt="Your Company" />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#3a1031]">Make an Appointment</h2>
                    </div>


                    <table className='mt-10'>
                        <tbody>
                            <tr className='border-b-2'>
                                <td>Name : &nbsp;</td>
                                <td className='pl-2'>{user.firstName}</td>
                            </tr>
                            <tr className='border-b-2'>
                                <td>Registration Number : &nbsp;</td>
                                <td className='pl-2'>{user.regNumber}</td>
                            </tr>
                            <tr className='border-b-2'>
                                <td>Appointment Number : &nbsp;</td>
                                <td className='pl-2'>{appointNo}</td>
                            </tr>
                            <tr>
                                <td>Appointment Date : &nbsp;</td>
                                <td className='pl-2'>{appointDate.split('T')[0]}</td>
                            </tr>
                        </tbody>
                    </table>
                    {!message &&
                        <div className='flex flex-col gap-2 mt-5'>
                            <button type="submit" onClick={handleSubmit} className='bg-[#3a1031] border-[#3a1031] border-2 cursor-pointer text-center hover:bg-[#6b1d5c] text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300'>Confirm</button>
                            <button type="submit" onClick={() => navigate("/dashboard")} className='border-[#3a1031] border-2 cursor-pointer text-center hover:bg-[#6b1d5b23] text-[#3a1031] px-4 py-2 rounded-md text-sm font-medium transition duration-300'>Cancel</button>
                        </div>
                    }
                    {message && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-5">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default AppointmentBook