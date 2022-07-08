import styled from "styled-components";

export const NavSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: ${({jc}) => jc ?? 'baseline'};
   
`;