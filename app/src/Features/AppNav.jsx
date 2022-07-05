
import { Nav, NavItem, NavLink, NavSection } from '../Components/Nav';

// This is an opinionated NavBar
export const AppNav = () => {


    return (
        <>
            <Nav >
                <NavSection jc="flex-start">
                    <NavItem>
                        <NavLink to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/flights" >Flights</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/searchFlights">Search Flights</NavLink>
                    </NavItem>
                </NavSection>
            </Nav>

        </>


    );
}