import { Button, TextField } from '@mui/material';
import { Content } from '../../components/content';
import { Header } from '../../components/header';
import { ContainerGeneral } from '../../styles/styles.general';
import { GroupCreationEnquete, TextTitle } from './styles';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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

export function EditQuestion() {
  const [enquete, setEnquete] = useState<string>('');
  const [questionReq, setQuestionReq] = useState<EnqueteTypes>();
  const { idQuestion: locationState } = useParams();
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    editQuestionFn();
  }

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setEnquete(event.target.value);
  }
  useEffect(() => {
    searchQuestion();
  }, []);

  async function searchQuestion() {
    await axios
      .get(`http://localhost:3000/questions/${locationState}/findone`)
      .then((resp) => {
        console.log(resp.data);
        setEnquete(resp.data?.question);
        setQuestionReq(resp.data);
      });
  }

  async function editQuestionFn() {
    await axios
      .put('http://localhost:3000/questions/update-enquete', {
        idQuestion: questionReq?.idQuestion,
        question: enquete,
      })
      .then((resp) => {
        setEnquete(resp.data?.question);
        navigate(`/enquete/${locationState}`);
      });
  }
  return (
    <ContainerGeneral>
      <Header />
      <Content>
        <TextTitle>{questionReq?.question}</TextTitle>
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
                Atualizar
              </Button>
            </div>
          </GroupCreationEnquete>
        </form>
      </Content>
    </ContainerGeneral>
  );
}
