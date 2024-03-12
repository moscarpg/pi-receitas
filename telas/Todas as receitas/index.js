import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    View
} from 'react-native';

import {
    useFonts,
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from '../../firebaseConfig';

import { useState, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';


export default function App({ route, navigation }) {
    const [receitas, setReceitas] = useState(null)

    const recuperandoDados = async () => {
        const lista = []
        const docRef = query(collection(db, "receitas"))
        const querySnapshot = await getDocs(docRef);
        querySnapshot.forEach((doc) => {
            atual = doc.data();
            atual['id'] = doc.id;
            lista.push(atual)
        });
        setReceitas(lista);
    }

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                recuperandoDados();
            });
            return unsubscribe;
        })
    )

    let [fontsLoaded, fontError] = useFonts({
        Montserrat_700Bold,
        Montserrat_900Black,
        Montserrat_600SemiBold,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <FlatList
            ListHeaderComponent={() => (
                <View style={{ marginBottom: 40, }}>
                    <Text style={estilos.titulo}>Todas as receitas</Text>
                    <Text style={estilos.subTitulo}>Todas as nossas deliciosas receitas</Text>
                </View>
            )}
            showsVerticalScrollIndicator={false}
            style={estilos.conteudoGrande}
            numColumns={2}
            columnWrapperStyle={estilos.teste}
            data={receitas}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('Receita', item)} style={estilos.card}>
                    <Image style={estilos.imagem} source={{ uri: item.imagem }} />
                    <Text style={estilos.textoCard}>{item.nome}</Text>
                </TouchableOpacity>
            )}
        />
    );
}

const estilos = StyleSheet.create({
    titulo: {
        fontSize: 20,
        color: '#005594',
        fontFamily: 'Montserrat_900Black',
        alignSelf: 'flex-start',
        marginLeft: 25,
    },
    subTitulo: {
        fontSize: 10,
        maxWidth: 216,
        alignSelf: 'flex-start',
        marginLeft: 25,
        marginTop: 14,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#005594',
    },
    conteudoGrande: {
        paddingVertical: 40,
        paddingHorizontal: 'auto',
        alignSelf: 'center'
    },
    card: {
        backgroundColor: '#fff',
        paddingHorizontal: 13,
        paddingBottom: 60,
        borderRadius: 24,
        height: 136,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.00,
        elevation: 7,
        marginTop: 10,
        marginHorizontal: 10,
        gap: 8,
        alignSelf: 'center'
    },
    imagem: {
        marginTop: -10,
        width: 76,
        height: 76,
        borderRadius: 256,
        borderWidth: 1,
        borderColor: '#005594'
    },
    textoCard: {
        maxWidth: 78,
        textAlign: 'center',
        fontSize: 10,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#005594',
    },
    teste: {
        flexWrap: 'wrap',
        marginBottom: 44,
        gap: 51,
    },
});