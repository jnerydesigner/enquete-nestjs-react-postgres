import { ContainerHeader } from './styles';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <ContainerHeader>
      <h1>Criador de Enquetes</h1>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="/criar-enquete">Criar Enquete</a>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
    </ContainerHeader>
  );
}
