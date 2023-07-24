import styled from 'styled-components';

export const ContainerGeneral = styled.div`
  margin: 0 auto;
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: #6c5ce7;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 7fr;
  grid-template-areas:
    'header'
    'content';
  /* justify-content: center;
  align-items: center;
  flex-direction: column; */
  /* padding: 20px 10px 0 0; */
`;
