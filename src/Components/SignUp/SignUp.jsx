import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './SignUp.css'
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SocialLogin from '../SocialLogin/SocialLogin';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();
    const { createNewUser, updateUserProfile } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm();

    const password = watch('password');

    useEffect(() => {
        if (password) {
            trigger('password');
        }
    }, [password, trigger]);


    const onSubmit = (data) => {
        console.log(data);

        // create new user
        createNewUser(data.email, data.password)
            .then(() => {
                // console.log('New User Created', res.user)
            })
            .then(() => {
                // update user profile
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photo,
                        }
                        //post user to DB
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "New User Created",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            })

                        // then navigate
                        setTimeout(() => {
                            navigate(location?.state?.from || '/');
                        }, 1700);
                        // console.log('Profile Updated')
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                        });
                        console.log(err.message)
                    })
            })
            .catch(err => console.log(err.message))

    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200 sign-up-container">
                <div className="hero-content flex justify-center items-center w-full">
                    <div className="card p-5 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-0 gap-0 w-full">
                            <h1 className="text-3xl lg:text-5xl font-bold text-center">Sign Up now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Name"
                                    className="input input-bordered"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="Email"
                                    className="input input-bordered"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters long" },
                                        maxLength: { value: 20, message: "Password must not exceed 20 characters" },
                                        validate: {
                                            hasUpperCase: value => /[A-Z]/.test(value) || "Password must include at least one uppercase letter",
                                            hasLowerCase: value => /[a-z]/.test(value) || "Password must include at least one lowercase letter",
                                            hasNumber: value => /\d/.test(value) || "Password must include at least one number",
                                            hasSpecialChar: value => /[@$!%*?&]/.test(value) || "Password must include at least one special character"
                                        }
                                    })}
                                    placeholder="Password"
                                    className="input input-bordered"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("photo", { required: "Photo URL is required" })}
                                    placeholder="Photo URL here..."
                                    className="input input-bordered"
                                />
                                {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="Sign Up" className="btn btn-primary" />
                            </div>
                        </form>
                        <div>
                            <SocialLogin></SocialLogin>
                        </div>
                        <div className='flex justify-center w-full mt-4'>
                            <span>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
