import { onValue, orderByChild, query, push, ref, set } from "firebase/database";
import { database, firebaseConfigurado } from "../../firebaseConfig";
import type { Resultado, ResultadoDados } from "../types/Resultado";

export async function salvarResultado(dados: ResultadoDados): Promise<void> {
  if (!firebaseConfigurado) {
    throw new Error("Firebase não configurado. Preencha firebaseConfig.ts com os dados do seu projeto.");
  }
  const novoResultado = push(ref(database, "resultados"));
  await set(novoResultado, dados);
}

export function acompanharRanking(
  atualizar: (resultados: Resultado[]) => void,
  falhar: (mensagem: string) => void
) {
  if (!firebaseConfigurado) {
    falhar("Configure as credenciais do Firebase em firebaseConfig.ts.");
    return () => undefined;
  }

  const consulta = query(ref(database, "resultados"), orderByChild("tentativas"));
  return onValue(
    consulta,
    (snapshot) => {
      const lista: Resultado[] = [];
      snapshot.forEach((registro) => {
        const dados = registro.val() as ResultadoDados;
        lista.push({
          id: registro.key ?? `${dados.nickname}-${dados.tentativas}`,
          nickname: dados.nickname,
          tentativas: dados.tentativas,
          numeroSorteado: dados.numeroSorteado,
          data: dados.data
        });
      });
      atualizar(lista);
    },
    (erro) => falhar(erro.message)
  );
}
