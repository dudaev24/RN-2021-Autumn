import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from '@apollo/client';
import {AUTH_USER} from '../grphql/mutations';

const SignIn = ({navigation}) => {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [group, setGroup] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  const [authorization] = useMutation(AUTH_USER, {
    onCompleted: async ({authUser}) => {
      setAuthorized(true);
      setGroup(authUser.user.group);
      setName(authUser.user.name);
      await AsyncStorage.setItem('token', authUser.token);
      navigation.replace('Tabs');
    },
    onError: ({message}) => {
      console.log(message);
      if (message === 'Incorrect password') {
        ToastAndroid.show('Пароль неверный', ToastAndroid.SHORT);
        return null;
      }
      ToastAndroid.show('Произошла ошибка', ToastAndroid.SHORT);
    },
  });

  const onAuthorization = () => {
    authorization({
      variables: {login, password},
    });
  };

  return (
    <View style={styles.main}>
      <View style={styles.inputField}>
        <Text style={[styles.labelText, {marginTop: 20}]}>Логин:</Text>
        <TextInput
          onChangeText={text => setLogin(text)}
          value={login}
          style={[styles.inputText, styles.text]}
        />

        <Text style={styles.labelText}>Пароль:</Text>
        <TextInput
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          value={password}
          style={[styles.inputText, styles.text]}
        />

        <TouchableOpacity style={styles.signInButton} onPress={onAuthorization}>
          <Text style={[styles.text, {color: 'white'}]}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#7B47E9',
    height: '100%',
    justifyContent: 'center',
  },

  inputText: {
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    margin: 20,
    marginTop: 10,
  },

  labelText: {
    fontSize: 20,
    marginLeft: 20,
  },
  inputField: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    margin: 20,
  },

  text: {
    fontSize: 16,
  },

  signInButton: {
    backgroundColor: '#000000',
    margin: 20,
    borderRadius: 30,
    borderColor: '#000000',
    padding: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignIn;
