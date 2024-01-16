import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";
import { Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap';

const Navigation = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }

    return (
        <Navbar bg="altDark" expand="lg" className="rounded p-4">
            <Navbar.Brand as={Link} to="/">Boss Workouts</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {user && (
                        <NavItem className="d-flex col-3">
                            <NavDropdown title={user.firstName} id="user-dropdown" className="bg-success text-white">
                                <NavDropdown.Item onClick={handleClick}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </NavItem>
                    )}
                    {!user && (
                        <Nav.Link as={Link} to="/login" className="btn btn-primary">
                            Login
                        </Nav.Link>
                    )}
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="#">Link</Nav.Link>
                    <NavDropdown title="Tools" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#">Program Maker</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">Bench Program</NavDropdown.Item>
                        <NavDropdown.Item href="#">PR Calculator</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;