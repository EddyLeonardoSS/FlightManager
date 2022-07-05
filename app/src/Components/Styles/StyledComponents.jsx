import styled from 'styled-components';

// Style for main form
export const StyledForm = styled.div`
    /* This is all CSS */
    display: flex;
    border: solid grey;
    width: fit-content;
    padding: 20px;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
`;

// Style for each flight div in flight list page
export const Box = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 800px;
    height: 800px;
    margin-top: 40px;
    margin: 0 auto;
    
    justify-content: center;
`;
export const BoxSingle = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 500px;
    height: 300px;
    margin-top: 40px;
    margin: 0 auto;
    
    justify-content: center;
`;
export const FlightItem = styled.div`
    display: center;
    

    padding: 5px;
    margin-top: 45px;
    margin-left: 44px;
    margin-bottom: 44px;
    border: solid grey;
    width: 200px;
    height: 120x;
    
    justify-content: center;
    

    :hover{
        width: 220px;
    }
    
    transition: all 0.5s;
    

`;



