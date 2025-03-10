import React , {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/authSlice";
import { useSelector } from "react-redux";

function Dropdown(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status)

  const logoutHandler = () => {
        try {
          dispatch(logoutUser())
          navigate('/signin')
        } catch (error) {
          throw error;
        }
      }

      const handleClick = () => {
        if (authStatus === true) {
          
          navigate("/myaccountpersonalinformation");
        } else {
          navigate('/signin');
        }
      };

    return(
        <div className="origin-top-right absolute right-0 mt-2 w-56 shadow-lg bg-white-a700 ring-black-900 ring-opacity-5 focus:outline-none">
            <div className="py-1 w-full">
                <div className="w-full hover:bg-gray-100 rounded"
                      onClick={handleClick} >
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                       My Account 
                    </button>
                </div>
                <div className="w-full hover:bg-gray-100 rounded"
                      onClick={()=>navigate( authStatus ? '/myaccountmyorders' : '/signin')}>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                       My Orders 
                    </button>
                </div>
                <div className="w-full hover:bg-gray-100 rounded"
                       onClick={logoutHandler}>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                       Logout 
                    </button>
                </div>

            </div>
            
        </div>
    )
}

export default Dropdown;