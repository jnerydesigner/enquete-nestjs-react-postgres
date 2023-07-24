import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Content } from '../../components/content';
import { Header } from '../../components/header';
import { ContainerGeneral } from '../../styles/styles.general';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { MdDisabledVisible, MdRemoveRedEye } from 'react-icons/md';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface EnqueteTypes {
  idQuestion: string;
  question: string;
  expirationDate: Date;
  idStatusQuestion: number;
  statusQuestion: string;
  answers: {
    idAnswer: string;
    idQuestion: string;
    answer: string;
    countVotes: number;
  }[];
  countRowsAnswers: number;
  countTotalVotes: number;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [enquetes, setEnquetes] = useState<EnqueteTypes[]>();
  useEffect(() => {
    handleCallEnquete();
  }, []);

  async function handleCallEnquete() {
    await axios.get('http://localhost:3000/questions/findall').then((resp) => {
      setEnquetes(resp.data);
    });
  }

  function handleNavigateEnquete(idQuestion: string) {
    navigate(`/enquete/${idQuestion}`);
  }

  function handleNavigateEnqueteEdit(idQuestion: string) {
    navigate(`/edit-enquete/${idQuestion}`);
  }

  function handleChangeStatusQuestion(idQuestion: string) {
    axios
      .put(`http://localhost:3000/questions/change-status`, {
        idQuestion,
      })
      .then(() => handleCallEnquete());
  }
  return (
    <ContainerGeneral>
      <Header />
      <Content>
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
                  Data de Expiração
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Status
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enquetes?.map((row) => (
                <TableRow
                  key={row.idQuestion}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.question}
                  </TableCell>
                  <TableCell align="center">
                    {row.countTotalVotes ? row.countTotalVotes : 0}
                  </TableCell>
                  <TableCell align="center">
                    {convertDate(row.expirationDate)}
                  </TableCell>
                  <TableCell align="center">
                    {row.idStatusQuestion === 1 ? (
                      <Button
                        size="small"
                        variant="contained"
                        color={'success'}
                        startIcon={<MdRemoveRedEye />}
                        onClick={() =>
                          handleChangeStatusQuestion(row.idQuestion)
                        }
                      >
                        {row.statusQuestion}
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        color={'warning'}
                        startIcon={<MdDisabledVisible />}
                        onClick={() =>
                          handleChangeStatusQuestion(row.idQuestion)
                        }
                      >
                        {row.statusQuestion}
                      </Button>
                    )}
                  </TableCell>
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
                      color={'info'}
                      startIcon={<RemoveRedEyeIcon />}
                      onClick={() => handleNavigateEnquete(row.idQuestion)}
                    >
                      Ver
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color={'primary'}
                      startIcon={<BorderColorIcon />}
                      onClick={() => handleNavigateEnqueteEdit(row.idQuestion)}
                    >
                      Editar
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

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

function convertDate(dataString: Date): string {
  const data = new Date(dataString);
  return format(data, 'dd MMMM yyyy', { locale: ptBR });
}
