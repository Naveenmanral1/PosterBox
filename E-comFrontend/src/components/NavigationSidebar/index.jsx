import React from 'react'
import { Text } from '../Text'
import { useNavigate  , useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/authSlice'

function NavigationSidebar() {
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch();

    const logoutHandler = () => {
      try {
        dispatch(logoutUser())
        navigate('/')
      } catch (error) {
        throw error;
      }
    }

    const isActive = (path) => location.pathname === path;
  return (
    <div className="md:hidden flex w-[26%] flex-col items-center gap-4 md:w-full">
                  <div onClick={()=>navigate('/myaccountpersonalinformation')} 
                  className={`flex self-stretch rounded-md px-4 py-3.5 ${isActive('/myaccountpersonalinformation') ? 'bg-blue_gray-900_01 ' : 'bg-white-a700 border border-blue_gray-100'}`}
                  >
                    <Text
                      as="p"
                      className={`text-[18px] font-medium  ${isActive('/myaccountpersonalinformation') ? 'text-white-a700 ' : 'text-black-900'}`}
                    >
                      Personal Information
                    </Text>
                  </div>

                  <div onClick={()=>navigate('/myaccountmyorders')} 
                  className={`flex self-stretch rounded-md px-4 py-3.5 ${isActive('/myaccountmyorders') ? 'bg-blue_gray-900_01 ' : 'bg-white-a700 border border-blue_gray-100'}`}>
                    <Text as="p" 
                    className={`text-[18px] font-medium  ${isActive('/myaccountmyorders') ? 'text-white-a700 ' : 'text-black-900'}`}>
                      My Orders
                    </Text>
                  </div>
                  <a
                    className="rounded-md border border-solid border-blue_gray-100 bg-white-a700 sm:pr-5"
                  >
                    <button
                  
                      onClick={logoutHandler}
                      className="pb-3 pl-4 pr-[34px] pt-[18px] text-[18px] font-medium"
                    >
                      Logout
                    </button>
                  </a>
                </div>
  )
}

export default NavigationSidebar
