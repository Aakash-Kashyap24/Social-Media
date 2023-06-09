import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link, useNavigate } from 'react-router-dom';
import TabBar from '../components/Tabbar';
import { clearUserErrors } from '../redux/action/UserAction';
import { RootState } from '../redux/store';
import Loader from '../components/Loader';

const Notifications: React.FC = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userCreated, isLoggedIn, error, loading } = useSelector(
    (state: RootState) => state.user
  );
  const tabs = [
    { label: 'All', path: '/notifications' },
   
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearUserErrors());
    }
  
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, userCreated, error, dispatch, alert, navigate]);

  return (
    <>

      {
        loading ? (
          <Loader />
        ) :
          (
            <div className="notifications mobile:w-[100%]  w-[80%]  lg:w-[60%] xl:w-[50%] border-x ml-[24%] -mr-1">
              <div className="notificationContainer flex mx-10 justify-between items-center mt-5">
                <h1 className="text-2xl font-semibold cursor-pointer">Notifications</h1>
                <Link to="/settings">
                  <SettingsOutlinedIcon className="hover:bg-gray-200 cursor-pointer hover:rounded-full" />
                </Link>
              </div>
              <div className="notificationNavbar flex justify-between h-14 mt-3">
                <TabBar tabs={tabs} />
              </div>
            </div>
          )}
    </>
  );
};

export default Notifications;
