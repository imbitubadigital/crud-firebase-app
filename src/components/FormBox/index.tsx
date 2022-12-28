import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Container} from './styles';
import {ButtonIcon} from '../ButtonIcon';
import {Input} from '../Input';
//import {Alert} from 'react-native';

export function FormBox() {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);

  async function handleSave() {
    firestore()
      .collection('products')

      .add({
        description,
        quantity,
        done: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        //  setDescription('');
        //  setQuantity(0);
        // Alert.alert('Produto adicionado com sucesso!');
      })
      .catch(error => console.log('erro ao cadastrar', error));
    // firestore()
    //   .collection('products')
    //   .doc('my-custom-id-1')
    //   .set({description, quantity, done: false})
    //   .then(() => {
    //     Alert.alert('Produto adicionado com sucesso!');
    //   })
    //   .catch(error => console.log('erro ao cadastrar', error));
  }
  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{marginHorizontal: 8}}
        onChangeText={value => setQuantity(Number(value))}
      />

      <ButtonIcon size="large" icon="add-shopping-cart" onPress={handleSave} />
    </Container>
  );
}
