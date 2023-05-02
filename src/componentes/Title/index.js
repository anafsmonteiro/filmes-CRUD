import styled from "styled-components";

const Titulo = styled.h1`
 color: #ccc;
 text-transform: uppercase;
 font-size: 24px;
`
function Title({children}) {
    return (
    <Titulo>{children}</Titulo>
    )
    
} 

export default Title;