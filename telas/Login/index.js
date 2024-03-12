import { StatusBar, View, TouchableOpacity, Text, SafeAreaView, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from '../../firebaseConfig';
import logo from '../../assets/logo.png';
import {
    useFonts,
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_500Medium,
} from '@expo-google-fonts/montserrat';

const auth = getAuth();

export default function Logar({ navigation }) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [usuario, setUsuario] = useState({})

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
                <Text>{usuario.email}</Text>
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
