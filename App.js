import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View,TouchableHighlight, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {

  const [inputTexto, guardarInputTexto] = useState('');

  const [nombreAlmacenado, guardarNombreAlmacenado] = useState('');

  useEffect(()=>{
    obtenerDatosStorage();
  }, []);

  const guardarDato = async () =>{
    try {
      await AsyncStorage.setItem('nombre', inputTexto);
    } catch (error) {
      console.log(error);
    }
  }

  const obtenerDatosStorage = async()=>{
    try {
      const nombre = await AsyncStorage.getItem('nombre');
      guardarNombreAlmacenado(nombre);
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarDatos = async () =>{
    try {
      await AsyncStorage.removeItem('nombre');
      guardarNombreAlmacenado('');
    } catch (error) {
      
    }
  }

  return (
    <>
      <View style={styles.contenedor}>
        {nombreAlmacenado ?<Text>Hola: {nombreAlmacenado}</Text> : null}
        <TextInput placeholder="Escribe tu nombre" style={styles.inputTexto} 
          onChangeText={texto=>guardarInputTexto(texto)}
        />
        <Button title="Guardar" color="red" onPress={() => guardarDato()}/>
        {nombreAlmacenado ?<TouchableHighlight style={styles.btDelete} onPress={() => eliminarDatos()}>
          <Text style={styles.txt}>Eliminar nombre &times;</Text>
        </TouchableHighlight>: null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  inputTexto:{
    borderColor:'#665',
    borderBottomWidth:1,
    width:300,
    height:40,
    marginBottom:10,
    textAlign:'center'
  },
  btDelete:{
    backgroundColor:'orange',
    marginTop:10,
    padding:10,
    borderRadius:10
  },
  txt:{
    color:'white',
    fontWeight:'bold',
    textAlign:'center',
    textTransform:'uppercase',
    width:300
  }
});

export default App;
