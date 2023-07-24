import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Content } from '../../components/content';
import { Header } from '../../components/header';
import { ContainerGeneral } from '../../styles/styles.general';
import { GroupCreationEnquete, TextTitle, FormEnquete } from './styles';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

interface EnqueteTypes {
  idQuestion: string;
  question: string;
  expirationDate?: Date;
  idStatusQuestion?: number;
  status?: string;
  answers?: {
    idAnswer: string;
    idQuestion: string;
    answer: string;
    countVotes: number;
  }[];
  countRowsAnswers?: number;
  countTotalVotes?: number;
}

export function EditEnqueteUnique() {
  const navigate = useNavigate();
  const { idQuestion: idQuestionParam, idAnswer: idAnswerParam } = useParams();
  const [idQuestionState, setIdQuestionState] = useState<string>(
    idQuestionParam as string
  );
  const [idAnswerState, setIdAnswerState] = useState<string>(
    idAnswerParam as string
  );

  const [idSearchAnswer, setIdSearchAnswer] = useState<string>('');

  const [answer, setAnswer] = useState<string>('');
  const [enqueteGroup, setEnqueteGroup] = useState<EnqueteTypes>();

  useEffect(() => {
    searchEnquete(idQuestionState);
    handleSearchAnswer(idAnswerState);
  }, []);

  async function searchEnquete(idQuestion: string) {
    await axios
      .get(`http://localhost:3000/questions/${idQuestion}/findone`)
      .then((resp) => {
        setEnqueteGroup(resp.data);
      });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateAnswer(idSearchAnswer as string, answer);
  }

  const handleUpdateAnswer = (idAnswer: string, idQuestion: string) => {
    navigate(`/edit-enquete-unique/${idAnswer}/${idQuestion}`);
    handleSearchAnswer(idAnswer);
  };

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value);
  }

  async function updateAnswer(idAnswer: string, answer: string) {
    console.log(idAnswer, answer);
    await axios
      .put(`http://localhost:3000/answers/${idAnswer}/update`, {
        answer,
      })
      .then(async (resp) => {
        await axios
          .get(`http://localhost:3000/questions/${idQuestionState}/findone`)
          .then((resp) => {
            setEnqueteGroup(resp.data);
          });
        await axios
          .get(`http://localhost:3000/answers/${idAnswer}/findone`)
          .then((resp) => setAnswer(resp.data?.answer));
      });
  }

  const handleSearchAnswer = async (idAnswer: string) => {
    await axios
      .get(`http://localhost:3000/answers/${idAnswer}/findone`)
      .then((resp) => {
        console.log(resp.data);
        setAnswer(resp.data?.answer);
        setIdSearchAnswer(resp.data.idAnswer);
      });
  };

  async function handleDeleteAnswer(idAnswer: string) {
    await axios
      .delete(`http://localhost:3000/answers/${idAnswer}/delete`)
      .then(async () => {
        await axios
          .get(`http://localhost:3000/questions/${idQuestionState}/findone`)
          .then((resp) => {
            setEnqueteGroup(resp.data);
          });
      });
  }
  return (
    <ContainerGeneral>
      <Header />
      <Content>
        <TextTitle>{enqueteGroup?.question}</TextTitle>
        <FormEnquete onSubmit={handleSubmit}>
          <GroupCreationEnquete>
            <div>
              <TextField
                label="Respostas"
                variant="outlined"
                type="text"
                value={answer}
                onChange={handleChangeInput}
              />
              <Button variant="contained" type="submit">
                Atualizar
              </Button>
            </div>
          </GroupCreationEnquete>
        </FormEnquete>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" color="red">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Enquete
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Qtd Votes
                </TableCell>

                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enqueteGroup?.answers?.map((row) => (
                <TableRow
                  key={row.idAnswer}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.answer}
                  </TableCell>
                  <TableCell align="center">{row.countVotes}</TableCell>
                  <TableCell
                    align="center"
                    style={{
                      gap: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      color={'primary'}
                      onClick={() =>
                        handleUpdateAnswer(row.idAnswer, row.idQuestion)
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      color={'error'}
                      variant="contained"
                      onClick={() => handleDeleteAnswer(row.idAnswer)}
                    >
                      Apagar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Content>
    </ContainerGeneral>
  );
}
