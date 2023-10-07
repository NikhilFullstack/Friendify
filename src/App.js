import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import VerifyEmail from './pages/auth/VerifyEmail';
import ProfilePage from './pages/profile/Dashboard/ProfilePage';
import Post from './pages/profile/FeedPage/Post';
import Setting from './pages/profile/Setting/Setting';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultPage from './pages/auth/DefaultPage';
import Explore from './pages/profile/FeedPage/Explore';
import AddPost from './pages/profile/FeedPage/AddPost';
import OtherUserProfilePage from './pages/profile/OtherUser/OtherUserProfilePage';
import ForgetPasswordPage from './pages/auth/ForgetPasswordPage';
import UpdatePassword from './pages/auth/UpdatePassword';
import PrivateRoute from './pages/auth/PrivateRoute';
import OpenRoute from './pages/auth/OpenRoute';
import ProfileDashboard from './pages/profile/Dashboard/ProfileDashboard';
function App() {
  return (
    <div className='overflow-x-hidden min-h-screen w-screen'>
      
      <Routes>
        <Route exact path='/' element={<DefaultPage />} />
      {/* <Route exact path='/' element={<HomePage />} /> */}
        <Route exact path='/login' element={<OpenRoute><LoginPage /></OpenRoute>} />
        <Route exact path='/createPost' element={<PrivateRoute><AddPost /></PrivateRoute>} />
        {/* ok */}
        <Route exact path='/signup' element={<OpenRoute><SignupPage /></OpenRoute>} />
        {/* ok */}
        <Route exact path='/verify-email' element={<VerifyEmail/>} />
        <Route exact path='/dashboard/my-profile' element={<PrivateRoute><ProfileDashboard /></PrivateRoute>} />
        <Route exact path='/profile/:id' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route exact path='/post' element={<PrivateRoute><Post /></PrivateRoute>} />
        <Route eaxct path='/forgot-password' element={<ForgetPasswordPage />} />
        <Route exact path='/explore' element={<Explore />} />
        <Route exact path='/setting' element={<Setting />}  />
        <Route exact path='/update-password/:id' element={<UpdatePassword />} />
      </Routes>
    </div>
  );
}

export default App;
