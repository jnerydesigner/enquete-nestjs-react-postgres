import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #6c5ce7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerContent = styled.div`
  width: 90%;
  height: auto;
  background-color: #dfe6e9;

  padding: 10px;

  -webkit-box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.6);

  border: 2px solid #dfe6e3;
  border-radius: 8px;
  h1 {
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;

export const ContainerAnswer = styled.button`
  width: 90%;
  height: auto;
  background-color: #6c5ce7;
  padding: 10px 20px;
  border-radius: 8px;
  outline: none;
  border: 0;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
`;

export const ContainerQtdVotes = styled.div`
  width: 10%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerQtdAndAnswer = styled.div`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

export const ContainerGraphics = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const QtdVotes = styled.div`
  width: 100%;
  height: auto;
  margin: 10px 0;
  background-color: #6c5ce7;
  padding: 10px 20px;
  border-radius: 8px;
  outline: none;
  border: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
`;

export const DivLine = styled.div`
  width: 100%;
  height: 4px;
  background-color: #636e72;
  margin: 10px 0;
`;
