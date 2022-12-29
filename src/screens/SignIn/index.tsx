import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Container, Account, Title, Subtitle} from './styles';
import {ButtonText} from '../../components/ButtonText';
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {Alert} from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // async function handleSigninInAnonymously() {
  //   const {user} = await auth().signInAnonymously();
  //   console.log('user', user);
  // }

  function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Usuário criado com sucesso!'))
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert('E-mail já cadastrado no sistema!');
        }
        if (error.code === 'auth/invalid-email') {
          return Alert.alert('E-mail invalido!');
        }
        if (error.code === 'auth/weak-password') {
          return Alert.alert('A senha deve ter no mínimo 6 dígitos!');
        }
      });
  }
  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Acesso seu e-mail para recuperar sua senha!'))
      .catch(error => {
        console.log('wwwww', error.code);
        if (error.code === 'auth/invalid-email') {
          return Alert.alert('E-mail invalido!');
        }
        if (error.code === 'auth/user-not-found') {
          return Alert.alert('E-mail invalido no sistema!');
        }
      });
  }

  async function handleSigninWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({user}) => console.log(user))
      .catch(error => {
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          return Alert.alert('Credenciais inválidas!');
        }
      });
  }
  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleSigninWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}
