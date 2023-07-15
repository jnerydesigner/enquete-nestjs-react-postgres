import {
  Container,
  ContainerContent,
  DivLine,
  ContainerAnswer,
  ContainerQtdVotes,
  QtdVotes,
  ContainerGraphics,
  ContainerQtdAndAnswer,
} from './styles';
import Chart from 'react-google-charts';

export const Data = [
  ['Você investe na Bolsa de Valores', '1'],
  ['Sim', 20],
  ['Não', 30],
];

export const Options = {
  title: 'Você investe na Bolsa de Valores',
  is3D: true,
  width: 1000,
  height: 400,
  backgroundColor: '#8395a7',
};

export function Home() {
  return (
    <Container>
      <ContainerContent>
        <h1>Você investe na Bolsa de Valores</h1>
        <DivLine />
        <ContainerQtdAndAnswer>
          <ContainerAnswer>Sim</ContainerAnswer>
          <ContainerQtdVotes>
            <QtdVotes>20</QtdVotes>
          </ContainerQtdVotes>
        </ContainerQtdAndAnswer>
        <ContainerQtdAndAnswer>
          <ContainerAnswer>Não</ContainerAnswer>
          <ContainerQtdVotes>
            <QtdVotes>30</QtdVotes>
          </ContainerQtdVotes>
        </ContainerQtdAndAnswer>

        <DivLine />
        <ContainerGraphics>
          <Chart chartType="PieChart" data={Data} options={Options} />
        </ContainerGraphics>
      </ContainerContent>
    </Container>
  );
}
