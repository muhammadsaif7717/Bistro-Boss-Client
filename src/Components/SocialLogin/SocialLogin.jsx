import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";



const SocialLogin = () => {
    const { googleLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {

                // post logged in user to DB
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    photo: res.user.photoURL,
                }
                axiosPublic.post('/users', userInfo)
                    .then(() => { })

                //afer login show alert
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successfull with google",
                    showConfirmButton: false,
                    timer: 1500
                });

                // then navigate
                setTimeout(() => {
                    navigate(location?.state?.from || '/');
                }, 1700);
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
                console.log(err.message)
            })

    }
    return (
        <div>
            <div className="divider py-0 my-0 mt-4">OR</div>
            <div className='mt-4 '>
                <button onClick={handleGoogleLogin} className="btn w-full border-blue-500 text-xl text-blue-500">
                    <FaGoogle></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;