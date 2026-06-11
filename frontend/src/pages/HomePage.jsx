import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Logout } from '../api/authapi';
import toast from 'react-hot-toast';
import { useUser } from '../UserContext';

const HomePage = () => {
  const navigate = useNavigate();
  const{user,setUser}=useUser();
  const handleLogout = async (e)=>{
    e.preventDefault();

    const logoutPromise = Logout();
     toast.promise(logoutPromise, {
      loading: "Loginng out...",
      success: "Logged out successfully!",
      error: (err) =>
        err?.response?.data?.message || err?.message || "Error when fetching",
    });

    try{
        const response= await logoutPromise;
        if (response.status === 200) {
            setUser(null);
            navigate("/login", { replace: true });
        }
    }catch(err){
      console.log(err);
    }

  }
  return (
    <div className=' h-screen flex flex-col gap-2 items-center justify-center'>
      <h1 className='text-2xl font-semibold'>Welcome,{user?.fullname} to the Home Page!</h1>
      <button className='p-3 bg-black text-white rounded-lg cursor-pointer hover:opacity-80'
              onClick={handleLogout}
      >Logout</button>
    </div>
  )
}

export default HomePage
