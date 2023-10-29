import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import VerifyEmail from './pages/auth/VerifyEmail';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultPage from './pages/auth/DefaultPage';
import ForgetPasswordPage from './pages/auth/ForgetPasswordPage';
import UpdatePassword from './pages/auth/UpdatePassword';
import PrivateRoute from './pages/auth/PrivateRoute';
import OpenRoute from './pages/auth/OpenRoute';
import DeleteMe from './components/common/commentTemplate/DeleteMe';
import Dashboard from './components/common/commentTemplate/Dashboard';
import ErrorPage from './pages/auth/ErrorPage';
function App() {
  return (
    <div className='overflow-x-hidden min-h-screen w-screen'>
      
      <Routes>
        <Route exact path='/' element={<DefaultPage />} />
        <Route exact path='/login' element={<OpenRoute><LoginPage /></OpenRoute>} />
        <Route exact path='/signup' element={<OpenRoute><SignupPage /></OpenRoute>} />
        <Route exact path='/deleteme' element={<Dashboard />} />
        <Route exact path='/verify-email' element={<VerifyEmail/>} />
        <Route exact path='/profile/:id' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route exact path='/post/:id' element={<DeleteMe />} />
        <Route eaxct path='/forgot-password' element={<ForgetPasswordPage />} />
        <Route exact path='/update-password/:id' element={<UpdatePassword />} />
        <Route exact path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
