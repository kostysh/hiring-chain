import styled from 'styled-components';

export default styled.div`
display: flex;
justify-self: stretch;
width: ${({ width = '0' }) => width};
`;