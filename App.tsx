import { StatusBar } from 'expo-status-bar';
import React from 'react';

import * as S from './styles'
export default function App() {
  return (
    <S.Container>
      <S.Txt>Meu app 1.0

      </S.Txt>
      <StatusBar style="auto" />
    </S.Container>
  );
}


