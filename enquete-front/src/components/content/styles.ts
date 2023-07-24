import styled from 'styled-components';

export const ContainerContent = styled.div`
  margin: 0 auto;
  width: 90%;
  height: auto;
  background-color: #dfe6e9;

  padding: 10px;

  -webkit-box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.6);

  border: 2px solid #dfe6e3;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  div {
    table {
      thead {
        tr {
          th {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
`;
