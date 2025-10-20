import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import UniLogo from '../assets/UniLogo.webp'
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        setEmail('');
        setPassword('');
    }

    return (
        <>
            <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
                <div className="text-[#3a1031] p-1 rounded-full hover:bg-red-500 hover:text-white border-2 flex items-center justify-center w-7 h-7 font-bold absolute top-2 right-5"><Link to={'/'} >X</Link></div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-20 w-auto" src={UniLogo} alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#3a1031]">Sign in to continue</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder='Email address'
                                required
                                className="block w-full rounded-md border-0 bg-white/5 p-1.5 text-[#3A1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-balck sm:text-sm sm:leading-6"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder='Password'
                                required
                                className="block w-full rounded-md border-0 bg-white/5 p-1.5 text-[#3a1031] shadow-sm ring-1 ring-inset ring-[#3A1031] focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button type="submit" disabled={isLoading} className="flex w-full justify-center rounded-md bg-[#3A1031] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#3a1031c0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A1031]">
                                {isLoading && <div className="h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full animate-spin"></div>}
                                Sign in
                            </button>
                            <h4 className='text-center mt-2 text-sm'>Don't you have an account? <Link to={'/signup'} className='text-[#3a1031] underline text-sm font-bold text-nowrap'>Sign Up Here</Link></h4>
                        </div>
                        {error && <div className='text-center p-3 bg-red-200 rounded border border-red-500 text-red-500 font-bold'>{error}</div>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login