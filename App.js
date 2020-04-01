import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes';
/*
  -started with expo init nomedoprojeto
  -assets possui o icon e o splash screen
  -app.json você altera o nome do seu aplicativo
  -react-native possui a função fast refresh, atualização rapida ao alterar o codigo
  -<View> é o novo <div>, native nao possui as tags padrões
  -<Text> para todos os textos
  -classe StyleSheet para criar os css com o metodo create 
  -por padrão todos os componentes são css{display: flex}, o flex: 1; significa ocupar toda tela
  -css ao estilo react com camelCase e textos colocados sobre 'aspas'
  -nao possui herença, estilização por elemento
  -
 */



export default function App() {
  return (
    <Routes />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
