import styled from 'styled-components';

// Style for main form
export const StyledForm = styled.div`
    /* This is all CSS */
    display: flex;
    border: solid grey;
    width: fit-content;
    padding: 50px;
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
   
    margin-top: 40px;
    margin: 0 auto;
    
    justify-content: center;
`;

export const FlightItem = styled.div`
    display: block;
    padding: 5px;
    margin-top: 45px;
    margin-left: 44px;
    border: solid blue;
    border-radius: 33px;
    width: 200px;
    height: 200px;
    justify-content: center;
    
    :hover{
        width: 220px;
    }
    transition: all 0.5s;
    
`;
export const DropdownBox = styled.div`
    display: flex;
    padding-top: 45px;
    padding-left: 45px;
    justify-content: center;
   
`;
export const SearchInput = styled.input`
    &[type="number"] {
        
        border: 1px solid black;
        width: 500px;
        margin: 2 auto;
        border-radius: 7px;
       
    }

    &[type="text"] {
        
        border: 1px solid black;
        width: 500px;
        margin: 2 auto;
       
        border-radius: 7px;
  }
    
`;

export const Dropdown = styled.select`
   
        padding: 3px;
        border: 1px solid black;
        border-radius: 3px;
        width: 160px;
        
        margin-left: 10px;
        
    
    
`;
export const Popup = styled.div`
position: fixed;
    background: #00000050;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    
`
export const PopupBox = styled.div`
position: relative;
    width: 70%;
    margin: 0 auto;
    height: auto;
    max-height: 70vh;
    margin-top: calc(100vh - 85vh - 20px);
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid #999;
    overflow: auto;
    
`