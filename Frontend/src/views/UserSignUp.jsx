import { useState } from 'react'
import { Link } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';

function UserSignUp() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        phone: '',
        address: '',
        height: '',
        weight: '',
        drugAllergies: [],
        regNumber: '',
        email: '',
        password: ''
    });
    const { signUp, isLoading, message, error } = useSignUp();

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'number' ? (value === '' ? '' : Number(value))
                : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signUp(user);
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-4 lg:px-8">
                <div className="text-[#3a1031] p-1 rounded-full hover:bg-red-500 hover:text-white border-2 flex items-center justify-center w-7 h-7 font-bold absolute top-2 right-5"><Link to={'/'} >X</Link></div>
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-[#3a1031]">Sign in Here</h2>


                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-4" onSubmit={handleSubmit}>

                        {/* Personal Information */}
                        <div className='px-4 py-6 bg-[#fff5fd] rounded-lg border border-[#d6c1d2] flex flex-col gap-2'>
                            <div className='border-b-2 mb-2 border-[#3a1031]'>
                                <h3 className='text-[#3a1031] font-bold text-lg'>Personal Information</h3>
                            </div>
                            <div>
                                <label htmlFor="firstName" className='text-sm font-bold text-[#3a1031]'>First Name: <span className='text-red-500 font-bold'>*</span> </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder='First Name'
                                    required
                                    className="block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-1.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6"
                                    value={user.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className='text-sm font-bold text-[#3a1031]'>Last Name: <span className='text-red-500 font-bold'>*</span> </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder='Last Name'
                                    required
                                    className="block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-1.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6"
                                    value={user.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className='text-sm font-bold text-[#3a1031]'>Gender: <span className='text-red-500 font-bold'>*</span> </label>
                                <select
                                    name="gender"
                                    id="gender"
                                    value={user.gender}
                                    onChange={handleChange}
                                    className='block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-1.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6'
                                >
                                    <option value="" disabled>Select Option</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="dob" className='text-sm font-bold text-[#3a1031]'>Date of Birth: <span className='text-red-500 font-bold'>*</span> </label>
                                <input
                                    id="dob"
                                    name="dob"
                                    type="date"
                                    required
                                    className="block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-1.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6"
                                    value={user.dob}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className='text-sm font-bold text-[#3a1031]'>Phone Number: <span className='text-red-500 font-bold'>*</span> </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    placeholder='Eg:- 0712345678'
                                    required
                                    className="block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-1.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6"
                                    value={user.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className='text-sm font-bold text-[#3a1031]'>Address: <span className='text-red-500 font-bold'>*</span> </label>
                                <textarea
                                    name='address'
                                    id='address'
                                    value={user.address}
                                    onChange={handleChange}
                                    className='block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-1.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6'
                                ></textarea>
                            </div>
                        </div>

                        {/* Medical Information */}
                        <div className='px-4 py-6 bg-[#fff5fd] rounded-lg border border-[#d6c1d2] flex flex-col gap-2'>
                            <div className='border-b-2 mb-2 border-[#3a1031]'>
                                <h3 className='text-[#3a1031] font-bold text-lg'>Medical Information</h3>
                            </div>
                            <div>
                                <label htmlFor="height" className='text-sm font-bold text-[#3a1031]'>Height (cm): <span className='text-red-500 font-bold'>*</span> </label>
                                <input
                                    id="height"
                                    name="height"
                                    type="number"
                                    placeholder='Height in Centimeter'
                                    required
                                    className="block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-1.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6"
                                    value={user.height}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="weight" className='text-sm font-bold text-[#3a1031]'>Weight (Kg): <span className='text-red-500 font-bold'>*</span> </label>
                                <input
                                    id="weight"
                                    name="weight"
                                    type="number"
                                    placeholder='Weight in Kilogram'
                                    required
                                    className="block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-1.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6"
                                    value={user.weight}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="drugAllergies" className='text-sm font-bold text-[#3a1031]'>Drug Allergies (comma seperated):</label>
                                <input
                                    id="drugAllergies"
                                    name="drugAllergies"
                                    type="text"
                                    placeholder='Eg;- Penicillin, Aspirin, Albuprofen'
                                    className="block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-1.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6"
                                    value={user.drugAllergies}
                                    onChange={handleChange}
                                />
                                <h4 className='text-sm text-[#3a1031]'>List any drug allergies separated by commas.</h4>
                            </div>
                        </div>

                        {/* Account Information */}
                        <div className='px-4 py-6 bg-[#fff5fd] rounded-lg border border-[#d6c1d2] flex flex-col gap-2'>
                            <div className='border-b-2 mb-2 border-[#3a1031]'>
                                <h3 className='text-[#3a1031] font-bold text-lg'>Account Information</h3>
                            </div>
                            <div>
                                <label htmlFor="regNumber" className='text-sm font-bold text-[#3a1031]'>Registration Number: <span className='text-red-500 font-bold'>*</span> </label>
                                <input
                                    id="regNumber"
                                    name="regNumber"
                                    type="text"
                                    placeholder='Registration Number'
                                    required
                                    className="block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-1.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6"
                                    value={user.regNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className='text-sm font-bold text-[#3a1031]'>Email: <span className='text-red-500 font-bold'>*</span> </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder='Eg:- yourname@gmail.com'
                                    required
                                    className="block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-1.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className='text-sm font-bold text-[#3a1031]'>Password: <span className='text-red-500 font-bold'>*</span> </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='Password'
                                    required
                                    className="block w-full rounded-md border-0 focus:outline-0 bg-white/75 p-1.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-[#3a1031] sm:text-sm sm:leading-6"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>


                        {!message &&
                            <button type="submit" disabled={isLoading} className="flex w-full cursor-pointer justify-center rounded-md bg-[#3A1031] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#3a1031c0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A1031]">
                                {isLoading && <div className="h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full animate-spin"></div>}
                                Sign in
                            </button>
                        }

                        {error && <div className='text-center p-3 bg-red-200 rounded border border-red-500 text-red-500 font-bold'>{error}</div>}
                        {message && <div className='text-center p-3 bg-green-200 rounded border border-green-500 text-green-500 font-bold'>{message}</div>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserSignUp;