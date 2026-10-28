import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { cores } from "../theme";
import { acompanharRanking } from "../services/resultadosFirebase";
import type { Resultado } from "../types/Resultado";

export default function TelaRanking() {
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => acompanharRanking(
    (lista) => {
      setResultados(lista.sort((a, b) => a.tentativas - b.tentativas));
      setErro(null);
      setCarregando(false);
    },
    (mensagem) => {
      setErro(mensagem);
      setCarregando(false);
    }
  ), []);

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <Text style={styles.etiqueta}>PLACAR GERAL</Text>
      <Text style={styles.titulo}>Ranking dos jogadores</Text>
      <Text style={styles.descricao}>Os resultados com menos tentativas aparecem primeiro.</Text>

      {carregando ? (
        <ActivityIndicator color={cores.azul} size="large" style={{ marginTop: 30 }} />
      ) : erro ? (
        <View style={styles.estado}>
          <Text style={styles.estadoTitulo}>Não foi possível carregar o ranking</Text>
          <Text style={styles.estadoTexto}>{erro}</Text>
          <Text style={styles.estadoTexto}>Confira as credenciais e as regras do Realtime Database.</Text>
        </View>
      ) : resultados.length === 0 ? (
        <View style={styles.estado}>
          <Text style={styles.estadoTitulo}>Ainda não há resultados</Text>
          <Text style={styles.estadoTexto}>Vença uma partida para aparecer aqui.</Text>
        </View>
      ) : (
        resultados.map((item, indice) => (
          <View style={styles.item} key={item.id}>
            <View style={[styles.posicao, indice === 0 && styles.primeiro]}>
              <Text style={[styles.posicaoTexto, indice === 0 && styles.primeiroTexto]}>{indice + 1}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.nickname}>{item.nickname}</Text>
              <Text style={styles.detalhe}>Número sorteado: {item.numeroSorteado}</Text>
            </View>
            <View style={styles.pontuacao}>
              <Text style={styles.tentativas}>{item.tentativas}</Text>
              <Text style={styles.rotuloTentativas}>tentativas</Text>
            </View>
          </View>
        ))
      )}

      <Link href="/" style={styles.voltar}>← Voltar ao jogo</Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: 18, paddingBottom: 36 },
  etiqueta: { color: cores.azul, fontSize: 11, fontWeight: "900", letterSpacing: 2 },
  titulo: { color: cores.branco, fontSize: 25, fontWeight: "900", marginTop: 7 },
  descricao: { color: cores.cinza, marginTop: 7, marginBottom: 18, lineHeight: 20 },
  estado: { padding: 18, borderRadius: 14, borderWidth: 1, borderColor: cores.borda, backgroundColor: cores.cartao, marginTop: 8 },
  estadoTitulo: { color: cores.branco, fontSize: 16, fontWeight: "800" },
  estadoTexto: { color: cores.cinza, marginTop: 7, lineHeight: 20 },
  item: { flexDirection: "row", alignItems: "center", backgroundColor: cores.cartao, borderColor: cores.borda, borderWidth: 1, borderRadius: 13, padding: 13, marginBottom: 10 },
  posicao: { width: 38, height: 38, borderRadius: 12, backgroundColor: cores.destaque, alignItems: "center", justifyContent: "center" },
  primeiro: { backgroundColor: cores.amarelo },
  posicaoTexto: { color: cores.branco, fontWeight: "900", fontSize: 16 },
  primeiroTexto: { color: "#192438" },
  info: { flex: 1, marginLeft: 12 },
  nickname: { color: cores.branco, fontWeight: "800", fontSize: 15 },
  detalhe: { color: cores.cinza, fontSize: 11, marginTop: 4 },
  pontuacao: { alignItems: "center", marginLeft: 8 },
  tentativas: { color: cores.verde, fontSize: 20, fontWeight: "900" },
  rotuloTentativas: { color: cores.cinza, fontSize: 9 },
  voltar: { color: cores.azul, fontWeight: "800", textAlign: "center", marginTop: 20 }
});
