import useAuth from "../../../Hooks/useAuth";


const UserHome = () => {
    const { user } = useAuth();
    return (
           <div>
            <h2 className="text-3xl font-semibold text-center">Hi, Welcome Back <span className="text-green-500">{ user?.displayName}</span></h2>
        </div>
    );
};

export default UserHome;