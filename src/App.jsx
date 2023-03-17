import reactLogo from './assets/react.svg'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home';
import { Register } from './common/Register/Register';
import { Login } from './common/Login/Login';
import { NavBar } from './common/NavBar/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const App = () => {
  return (
    <Container fluid className="App">
      <Row>
        <Col>
          <NavBar></NavBar>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/auth/login' element={<Login></Login>}></Route>
            <Route path='/auth/register' element={<Register></Register>}></Route>
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}