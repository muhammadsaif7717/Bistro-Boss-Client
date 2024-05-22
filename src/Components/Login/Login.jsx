import { useContext, useEffect, useRef } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link } from 'react-router-dom';


const Login = () => {
    const { loginUser } = useContext(AuthContext)
    const captchaInputRef = useRef(null);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])


    const handleFormSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const captchaValue = form.captcha.value; // Get the captcha value from the form
        const isValidCaptcha = validateCaptcha(captchaValue);
        if (!isValidCaptcha) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invallid Captcha!",
            });
            return;
        }

        // const newUser = { email, password }

        // login user
        loginUser(email, password)
            .then(res => {
                console.log('User logged In', res.user)
            })
            .catch(err => console.log(err.message))
        form.reset()
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col  md:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6 lg:w-[75%]">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleFormSubmit} className="card-body pb-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input
                                type="text"
                                ref={captchaInputRef}
                                name="captcha"
                                placeholder="Type the Captcha"
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" value="Login" className="btn btn-primary" />
                        </div>
                    </form>
                    <div className='flex justify-center w-full pb-10'>
                        <span>New to Bistro Boss? Please <Link to={`/sign-up`} className='text-blue-600'>Sign Up</Link></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;