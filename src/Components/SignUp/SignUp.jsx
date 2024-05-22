
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link } from 'react-router-dom';


const SignUp = () => {
    const { createNewUser, updateUserProfile } = useContext(AuthContext)

    const handleFormSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;


        //create user
        createNewUser(email, password)
            .then(res => {
                console.log('New User Created', res.user)
            })
            .then(() => {
                // update user profile
                updateUserProfile(name, photo)
                    .then(() => {
                        console.log('Profile Updated')
                    })
                    .catch(err => console.log(err.message))
            })
            .catch(err => console.log(err.message))
        form.reset()

    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col  md:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6 lg:w-[75%]">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleFormSubmit} className="card-body pb-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
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
                                placeholder="Password"
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                name="photo"
                                placeholder="Photo URL here..."
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" value="Login" className="btn btn-primary" />
                        </div>
                    </form>
                    <div className='flex justify-center w-full pb-10'>
                        <span>Already have account? Please <Link to={`/login`} className='text-blue-600'>Login</Link></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;