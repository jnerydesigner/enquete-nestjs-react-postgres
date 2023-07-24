import { ReactNode } from 'react';
import { ContainerContent } from './styles';

interface ContentProps {
  children: ReactNode;
}

export function Content({ children }: ContentProps) {
  return <ContainerContent>{children}</ContainerContent>;
}
