import React, { useState } from "react";
import { Alert, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import { cores } from "../theme";
import { salvarResultado } from "../services/resultadosFirebase";

export default function TelaJogo() {
  const [nickname, setNickname] = useState("");
  const [numeroSorteado, setNumeroSorteado] = useState<number | null>(null);
  const [palpite, setPalpite] = useState("");
  const [tentativas, setTentativas] = useState(0);
  const [dica, setDica] = useState("Digite seu nickname para começar.");
  const [corDica, setCorDica] = useState(cores.cinza);
  const [venceu, setVenceu] = useState(false);
  const [partidaIniciada, setPartidaIniciada] = useState(false);
  const [salvando, setSalvando] = useState(false);

  function iniciarPartida() {
    const nome = nickname.trim();
    if (!nome) {
      Alert.alert("Nickname obrigatório", "Digite seu nickname antes de começar.");
      return;
    }
    setNickname(nome);
    setNumeroSorteado(Math.floor(Math.random() * 100) + 1);
    setPalpite("");
    setTentativas(0);
    setDica("Partida iniciada! Tente um número de 1 a 100.");
    setCorDica(cores.azul);
    setVenceu(false);
    setPartidaIniciada(true);
  }

  async function conferirPalpite() {
    Keyboard.dismiss();
    if (!partidaIniciada || numeroSorteado === null || venceu) return;
    const numero = Number(palpite);
    if (!palpite.trim() || !Number.isInteger(numero) || numero < 1 || numero > 100) {
      Alert.alert("Palpite inválido", "Digite um número inteiro entre 1 e 100.");
      return;
    }

    const total = tentativas + 1;
    setTentativas(total);
    setPalpite("");

    if (numero === numeroSorteado) {
      setVenceu(true);
      setCorDica(cores.verde);
      setDica(`Parabéns, ${nickname}! Você acertou em ${total} tentativa(s).`);
      setSalvando(true);
      try {
        await salvarResultado({
          nickname,
          tentativas: total,
          numeroSorteado,
          data: new Date().toISOString()
        });
        setDica(`Você venceu em ${total} tentativa(s)! Resultado salvo no ranking.`);
      } catch (erro) {
        const mensagem = erro instanceof Error ? erro.message : "Não foi possível salvar o resultado.";
        Alert.alert("Erro ao salvar", `${mensagem}\nVerifique a configuração e as regras do Firebase.`);
      } finally {
        setSalvando(false);
      }
    } else if (numeroSorteado > numero) {
      setDica("O número sorteado é MAIOR que seu palpite. Tente novamente!");
      setCorDica(cores.verde);
    } else {
      setDica("O número sorteado é MENOR que seu palpite. Tente novamente!");
      setCorDica(cores.vermelho);
    }
  }

  function reiniciar() {
    setNumeroSorteado(null);
    setPalpite("");
    setTentativas(0);
    setDica("Digite seu nickname para começar.");
    setCorDica(cores.cinza);
    setVenceu(false);
    setPartidaIniciada(false);
    setSalvando(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
      <View style={styles.cartao}>
        <Text style={styles.etiqueta}>DESAFIO</Text>
        <Text style={styles.titulo}>Adivinhe o número</Text>
        <Text style={styles.descricao}>O aplicativo sorteou um número entre 1 e 100. Descubra qual é!</Text>

        {!partidaIniciada ? (
          <>
            <Text style={styles.rotulo}>Nickname do jogador</Text>
            <TextInput
              style={styles.campo}
              value={nickname}
              onChangeText={setNickname}
              placeholder="Ex.: jogador123"
              placeholderTextColor={cores.cinza}
              maxLength={24}
              autoCapitalize="none"
              returnKeyType="done"
            />
            <Pressable style={styles.botao} onPress={iniciarPartida}>
              <Text style={styles.textoBotao}>Começar partida</Text>
            </Pressable>
          </>
        ) : (
          <>
            <View style={styles.painel}>
              <Text style={styles.rotuloPainel}>JOGADOR</Text>
              <Text style={styles.jogador}>{nickname}</Text>
              <View style={styles.linha} />
              <Text style={styles.rotuloPainel}>TENTATIVAS</Text>
              <Text style={styles.contador}>{tentativas}</Text>
            </View>
            <Text style={styles.rotulo}>Seu palpite</Text>
            <TextInput
              style={styles.campo}
              value={palpite}
              onChangeText={setPalpite}
              placeholder="Número de 1 a 100"
              placeholderTextColor={cores.cinza}
              keyboardType="number-pad"
              maxLength={3}
              editable={!venceu}
              returnKeyType="go"
              onSubmitEditing={conferirPalpite}
            />
            {!venceu && (
              <Pressable style={styles.botao} onPress={conferirPalpite}>
                <Text style={styles.textoBotao}>Conferir palpite</Text>
              </Pressable>
            )}
            <View style={[styles.caixaDica, { borderColor: corDica }]}>
              <Text style={[styles.dica, { color: corDica }]}>{dica}</Text>
            </View>
            {salvando && <Text style={styles.salvando}>Salvando resultado...</Text>}
            {venceu && (
              <Pressable style={styles.botaoSecundario} onPress={reiniciar}>
                <Text style={styles.textoBotaoSecundario}>Jogar novamente</Text>
              </Pressable>
            )}
          </>
        )}
      </View>

      <Link href="/ranking" asChild>
        <Pressable style={styles.linkRanking}>
          <Text style={styles.linkRankingTexto}>Ver ranking dos jogadores →</Text>
        </Pressable>
      </Link>
      <Text style={styles.rodape}>Dica verde: o número é maior. Dica vermelha: o número é menor.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: 18, paddingBottom: 36 },
  cartao: { backgroundColor: cores.cartao, borderColor: cores.borda, borderWidth: 1, borderRadius: 20, padding: 20 },
  etiqueta: { color: cores.azul, fontSize: 11, fontWeight: "900", letterSpacing: 2 },
  titulo: { color: cores.branco, fontSize: 27, fontWeight: "900", marginTop: 8 },
  descricao: { color: cores.cinza, lineHeight: 21, marginTop: 8, marginBottom: 18 },
  rotulo: { color: cores.branco, fontWeight: "700", marginBottom: 8, marginTop: 16 },
  campo: { backgroundColor: cores.fundo, borderColor: cores.borda, borderWidth: 1, borderRadius: 11, paddingHorizontal: 14, paddingVertical: 13, color: cores.branco, fontSize: 16 },
  botao: { backgroundColor: cores.azul, borderRadius: 11, paddingVertical: 14, alignItems: "center", marginTop: 15 },
  textoBotao: { color: "#0D1725", fontWeight: "900", fontSize: 15 },
  painel: { backgroundColor: cores.fundo, borderRadius: 12, padding: 15, marginTop: 8 },
  rotuloPainel: { color: cores.cinza, fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  jogador: { color: cores.branco, fontSize: 18, fontWeight: "800", marginTop: 3 },
  linha: { height: 1, backgroundColor: cores.borda, marginVertical: 12 },
  contador: { color: cores.amarelo, fontSize: 28, fontWeight: "900", marginTop: 3 },
  caixaDica: { marginTop: 18, borderWidth: 1, borderRadius: 12, padding: 14, backgroundColor: cores.fundo },
  dica: { fontWeight: "800", lineHeight: 21, textAlign: "center" },
  salvando: { color: cores.cinza, textAlign: "center", marginTop: 10 },
  botaoSecundario: { backgroundColor: cores.destaque, borderWidth: 1, borderColor: cores.borda, borderRadius: 11, paddingVertical: 14, alignItems: "center", marginTop: 15 },
  textoBotaoSecundario: { color: cores.branco, fontWeight: "900", fontSize: 15 },
  linkRanking: { alignItems: "center", padding: 18 },
  linkRankingTexto: { color: cores.azul, fontWeight: "800" },
  rodape: { color: cores.cinza, textAlign: "center", fontSize: 12, lineHeight: 18 }
});
