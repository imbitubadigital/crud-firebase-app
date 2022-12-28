import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {styles} from './styles';
import {Product, ProductProps} from '../Product';
import firestore from '@react-native-firebase/firestore';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  useEffect(() => {
    const subscribe = firestore()
      .collection('products')
      // .where('quantity', '==', 2) // filtro
      //.limit(3)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
        setProducts(data);
      });

    return () => subscribe();

    // .catch(error => console.log('erro ao cadastrar', error));
  }, []);
  // useEffect(() => {
  //   firestore()
  //     .collection('products')
  //     .get()
  //     .then(response => {
  //       const data = response.docs.map(doc => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       }) as ProductProps[];
  //       setProducts(data);
  //     })
  //     .catch(error => console.log('erro ao cadastrar', error));
  // }, []);
  // useEffect(() => {
  //   firestore()
  //     .collection('products')
  //     .doc('kfM4HdyB33nGEfk7bif1')
  //     .get()
  //     .then(response => {
  //       console.log('response', {...response.data(), id: response.id});
  //     })
  //     .catch(error => console.log('erro ao cadastrar', error));
  // }, []);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({item}) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
