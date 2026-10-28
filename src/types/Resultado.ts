export type ResultadoDados = {
  nickname: string;
  tentativas: number;
  numeroSorteado: number;
  data: string;
};

export type Resultado = ResultadoDados & {
  id: string;
};
