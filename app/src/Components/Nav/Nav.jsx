import styled from "styled-components";

export const Nav = styled.nav`
    
    color: ${({color}) => color ?? 'black'};
    font-size: 20px;
    padding: 1em 1.5em;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-image: url('https://th.bing.com/th/id/R.d083104dd0c567eb047ed93e92fa88bd?rik=lQSgJJ9M4HjEPg&pid=ImgRaw&r=0');
    background-attachment: fixed;
`;

// export const Nav = ({children}) => {
//     return (
//         <nav>
//             {children}
//         </nav>
//     );
// }