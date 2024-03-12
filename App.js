import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import Logar from './telas/Login';
import Receita from './telas/Receita';
import ReceitaAdmin from './telas/ReceitaAdmin'
import Inicial from './telas/Inicial';
import CadastroCurso from './telas/CadastroCurso';
import CadastroReceita from './telas/CadastroReceita';
import CatalogoCursos from './telas/CatalogoCursos';
import CatalogoReceitas from './telas/CatalogoReceitas';
import TodasReceitas from './telas/Todas as receitas';

import { StatusBar, View, TouchableOpacity, Text, SafeAreaView, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import logo from './assets/logo.png';
import {
  useFonts,
  Montserrat_900Black,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_500Medium,
} from '@expo-google-fonts/montserrat';


const Drawer = createDrawerNavigator();

function MyDrawer() {

  const [usuario, setUsuario] = useState(auth.currentUser)

  function Logar({ navigation }) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')

    let [fontsLoaded, fontError] = useFonts({
      Montserrat_700Bold,
      Montserrat_900Black,
      Montserrat_600SemiBold,
      Montserrat_500Medium
    });

    if (!fontsLoaded && !fontError) {
      return null;
    }

    async function logar() {
      await signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          // Signed in 
          setUsuario(userCredential.user);
          navigation.navigate('Home')
          // ...
        })
        .catch((error) => {
          setErro(error.message);
          setSenha('')
          // ..
        });
    }

    return (
      <ScrollView style={estilos.conteudo}>
        <StatusBar />
        <Image style={estilos.imagem} source={logo} />
        <View style={estilos.formulario}>
          <Text style={estilos.label}>Email</Text>
          <TextInput
            placeholder="Digite seu email"
            style={[estilos.input, { marginBottom: 42 }]}
            placeholderTextColor="#797979"
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
          <Text style={estilos.label}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha"
            style={[estilos.input, { marginBottom: 13 }]}
            placeholderTextColor="#797979"
            value={senha}
            secureTextEntry={true}
            onChangeText={(e) => setSenha(e)}
          />
          <Text>{erro}</Text>
          <Text>{usuario?.email}</Text>
          <TouchableOpacity style={estilos.submit} onPress={logar}><Text>Entrar</Text></TouchableOpacity>
        </View>
      </ScrollView>
    )
  }

  const estilos = StyleSheet.create({
    conteudo: {
      flex: 1,
      backgroundColor: '#FA8643',
      // alignItems: 'center',
    },
    imagem: {
      alignSelf: 'flex-start',
    },
    formulario: {
      marginTop: 100,
      alignSelf: 'center',
    },
    label: {
      color: '#fff',
      fontSize: 15,
      fontFamily: 'Montserrat_500Medium'
    },
    input: {
      width: 273,
      paddingHorizontal: 3,
      paddingVertical: 13,
      backgroundColor: '#ebd2b6',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 10,
      fontFamily: 'Montserrat_500Medium'
    },
    esqueci: {
      fontSize: 13,
      color: '#fff',
      fontFamily: 'Montserrat_500Medium'
    },
    submit: {
      alignSelf: 'center',
      color: '#fff',
      backgroundColor: '#767ccb',
      paddingHorizontal: 64,
      paddingVertical: 14,
      borderRadius: 10,
      marginTop: 48,
      fontFamily: 'Montserrat_500Medium'
    },
  });

  function Deslogar({ navigation }) {
    signOut(auth).then(() => {
      console.log('Deslogado com sucesso')
      setUsuario(null)
      navigation.navigate('Home')
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen name="Home" component={Inicial} />
      <Drawer.Screen name="Catalogo de cursos" component={CatalogoCursos} />
      <Drawer.Screen name="Todas as receitas" component={TodasReceitas} />
      <Drawer.Screen options={{ drawerItemStyle: { display: 'none' } }} name="Catalogo de receitas" component={CatalogoReceitas} />
      {usuario ? (<>
        <Drawer.Screen name="Cadastro de receitas" component={CadastroReceita} />
        <Drawer.Screen name="Cadastrar curso" component={CadastroCurso} />
        <Drawer.Screen name="Sair" component={Deslogar} />
        <Drawer.Screen options={{ drawerItemStyle: { display: 'none' } }} name="Receita" component={ReceitaAdmin} />
      </>)
        :
        (<>
          <Drawer.Screen name="Logar" component={Logar} />
          <Drawer.Screen options={{ drawerItemStyle: { display: 'none' } }} name="Receita" component={Receita} />
        </>)
      }
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}