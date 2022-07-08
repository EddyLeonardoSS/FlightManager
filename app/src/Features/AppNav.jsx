
import { Nav, NavItem, NavLink, NavSection } from '../Components/Nav';
// This is an opinionated NavBar
export const AppNav = () => {
    
    return (
        <>
            <Nav  >
                <NavSection>
                    <NavItem style={{marginTop: '30px'}}>
                        <img src="https://webstockreview.net/images/clipart-plane-silhouette-18.png" height='60px' width='auto' alt='Airplane Icon'/>
                    </NavItem>
                    <NavItem>
                    <h1 style={{marginLeft: "570px", fontSize: "40px"}}>Welcome to Stormer Airlines</h1>
                    </NavItem>
                
                </NavSection>
                <NavSection jc="flex-start" style={{marginTop: "53px"}}>
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