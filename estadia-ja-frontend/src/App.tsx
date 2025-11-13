import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home.tsx';
import { SignUp } from './pages/SignUp/index.tsx';
import { Login } from './pages/Login/index.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { ProfilePage } from './pages/ProfilePage/index.tsx';
import { NewProperty } from './pages/NewProperty/index.tsx';
import { UpdatePropertyPage } from './pages/UpdateProperty/index.tsx';
import { PropertyDetailPage } from './pages/PropertyDetailsPage/index.tsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/cadastro' element={<SignUp />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/perfil' element={<ProfilePage />} />
        <Route path='/property/new' element={<NewProperty />} />
        <Route path='/property/edit/:id' element={<UpdatePropertyPage />} />
        <Route path='/property/:id' element={<PropertyDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
