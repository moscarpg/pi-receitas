import {
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';

import { useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

import {
    useFonts,
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

export default function App() {
    const [nome, setNome] = useState('')
    async function adicionar() {
        try {
            const docRef = await addDoc(collection(db, "receitas"), {
                nome: nome
            });
            console.warn("Document written with ID: ", docRef.id);
        } catch (e) {
            console.warn("Error adding document: ", e);
        }
    }

    let [fontsLoaded, fontError] = useFonts({
        Montserrat_700Bold,
        Montserrat_900Black,
        Montserrat_600SemiBold
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <SafeAreaView style={estilos.bigContent}>
            <Text style={estilos.titulo}>Cadastre uma receita</Text>
            <View style={estilos.smallContent}>
                <View style={estilos.labelInput}>
                    <Text style={estilos.label}>Nome da receita:</Text>
                    <TextInput
                        style={[estilos.tamanhoElementos, estilos.input]}
                        value={nome}
                        onChangeText={(e) => setNome(e)}
                        placeholder="Empadão"
                        placeholderTextColor='#c9c9c9'
                    />
                </View>
                <TouchableOpacity style={[estilos.tamanhoElementos, estilos.botoes]}>
                    <Text>
                        Selecione uma imagem
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={adicionar} style={[estilos.tamanhoElementos, estilos.botoes]}>
                    <Text>
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    bigContent: {
        alignItems: 'center',
        marginTop: 50,
    },
    titulo: {
        fontSize: 20,
        color: '#005594',
        fontFamily: 'Montserrat_900Black',
    },
    smallContent: {
        marginTop: 93,
        gap: 34,
    },
    labelInput: {
        gap: 5,
    },
    tamanhoElementos: {
        width: 224,
        height: 48,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 30,
    },
    label: {
        fontSize: 10,
        color: '#005594',
        fontFamily: 'Montserrat_600SemiBold'
    },
    input: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F78B1F',
        fontSize: 12,
        paddingLeft: 14,
    },
    botoes: {
        backgroundColor: '#F78B1F',
        borderRadius: 16,
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat_700Bold',
        fontSize: 13,
    },
});
