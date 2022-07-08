
import { Nav, NavItem, NavLink, NavSection } from '../Components/Nav';
// This is an opinionated NavBar
export const AppNav = () => {
    
    return (
        <>
            <Nav ><NavSection>
                    <NavItem>
                    <h1 style={{marginLeft: "760px"}}>Welcome to Stormer Airlines</h1>
                    </NavItem>
                
                </NavSection>
                <NavSection jc="flex-start" style={{marginTop: "25px"}}>
                   
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