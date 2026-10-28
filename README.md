# Adivinha Número

Projeto mobile com Expo Router, React Native, TypeScript e Firebase. A organização de rotas segue o padrão do repositório de referência, com telas dentro de `src/app`.

## Criar o projeto no Windows

Abra o terminal em `C:\projetos` e execute:

```bash
npx create-expo-app@latest adivinha-numero
cd adivinha-numero
npm run reset-project
```

Copie os arquivos deste projeto para a pasta criada, substituindo os arquivos correspondentes. Depois execute:

```bash
npx expo install firebase
npm install @react-native-async-storage/async-storage
npm install
npm run android
```

Se o comando `npm run reset-project` não criar a pasta `scripts` no template instalado, mantenha o projeto recém-criado e copie os arquivos da pasta `src` e o `firebaseConfig.ts`, sem substituir o `package.json` criado pelo Expo.

## Configurar Firebase

1. No Firebase Console, abra Configurações do projeto > Geral e registre um aplicativo Web.
2. Copie os valores da configuração para `firebaseConfig.ts`.
3. No Firebase Console, habilite Authentication > Email/Senha se for usar autenticação.
4. Crie um Cloud Firestore conforme a orientação da aula. O arquivo de configuração exporta `db` para esse serviço.
5. Crie também o Realtime Database e copie sua URL para `databaseURL`.
6. Os resultados do jogo são gravados na coleção lógica `resultados` do Realtime Database, e a tela de ranking acompanha as atualizações em tempo real.
7. Configure regras de segurança apropriadas antes de publicar. As regras abertas de teste são apenas para desenvolvimento e não devem ser usadas em produção.

## Arquivos principais

- `src/app/index.tsx`: jogo e dicas coloridas.
- `src/app/ranking.tsx`: ranking dos jogadores.
- `src/app/_layout.tsx`: navegação Expo Router.
- `firebaseConfig.ts`: inicialização do Firebase, Auth persistente com AsyncStorage, Firestore e Realtime Database.
- `src/services/resultadosFirebase.ts`: gravação e leitura dos resultados.

**Importante:** substitua todos os campos `COLE_AQUI_...` pelos dados do seu Firebase. O código não usa as credenciais públicas do repositório de referência.
