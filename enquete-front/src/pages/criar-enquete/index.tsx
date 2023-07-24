import { Button, TextField } from '@mui/material';
import { Content } from '../../components/content';
import { Header } from '../../components/header';
import { ContainerGeneral } from '../../styles/styles.general';
import { GroupCreationEnquete, TextTitle } from './styles';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';

interface EnqueteTypes {
  idQuestion: string;
  question: string;
  expirationDate: Date;
  idStatusQuestion: number;
  status: string;
  answers: {
    idAnswer: string;
    idQuestion: string;
    answer: string;
    countVotes: number;
  }[];
  countRowsAnswers: number;
  countTotalVotes: number;
}

export function CriarEnquete() {
  const [enquete, setEnquete] = useState<string>('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createQuestion(enquete);
  }

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setEnquete(event.target.value);
  }

  async function createQuestion(question: string) {
    await axios
      .post('http://localhost:3000/questions', {
        question,
      })
      .then((resp) => {
        setEnquete('');
      });
  }
  return (
    <ContainerGeneral>
      <Header />
      <Content>
        <TextTitle>Criar enquete</TextTitle>
        <form onSubmit={handleSubmit}>
          <GroupCreationEnquete>
            <div>
              <TextField
                label="Enquete"
                variant="outlined"
                type="text"
                value={enquete}
                onChange={handleChangeInput}
              />
              <Button variant="contained" type="submit">
                Adicionar
              </Button>
            </div>
          </GroupCreationEnquete>
        </form>
      </Content>
    </ContainerGeneral>
  );
}
