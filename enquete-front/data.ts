const Data: Array<[string, number | string]> = [
  ['1', '1'],
  ['Sim', 20],
  ['Não', 30],
  ['Tavez', 20],
];

const arrTitle: any = ['1', '1'];
const arrDta01 = ['Não', 30];
const arrDta02 = ['Sim', 20];
const arrDta03 = ['Tavez', 20];
const arrGeneral: [] = [];
Data.map((d) => {
  return d;
});

const createDataArray = (): Array<[string, number | string]> => {
  const Data: Array<[string, number | string]> = [
    ['Você investe na Bolsa de Valores', '1'],
    ['Sim', 20],
    ['Não', 30],
  ];

  return Data;
};

createDataArray();
