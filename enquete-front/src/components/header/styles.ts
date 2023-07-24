import styled from 'styled-components';

export const ContainerHeader = styled.div`
  margin-top: 30px;
  margin: 0 auto;
  width: 90%;
  height: 100px;
  background-color: #dfe6e9;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  -webkit-box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.6);

  border-radius: 8px;
  div {
    width: 30%;
    height: 100px;
    font-size: 1.4rem;
    ul {
      height: 100%;
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      li {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        a {
          text-decoration: none;
          margin: 10px 20px;
          padding: 10px 30px;
        }
      }
    }
  }
  h1 {
    width: 70%;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 2rem;
  }
`;
