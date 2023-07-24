import { ContainerGeneral } from '../../styles/styles.general';
import { Header } from '../../components/header';
import { Content } from '../../components/content';

export function Home() {
  return (
    <ContainerGeneral>
      <Header />
      <Content>
        <h1>home</h1>
      </Content>
    </ContainerGeneral>
  );
}
