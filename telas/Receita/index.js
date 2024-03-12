import {
    SafeAreaView,
    View,
    ScrollView,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import {
    useFonts,
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';

import { useFocusEffect } from '@react-navigation/native';

import { useState, useEffect, useCallback } from 'react';

export default function Receita({ route, navigation }) {
    const [receita, setReceita] = useState(null)

    const { id } = route.params;

    const recuperandoDados = async () => {
        const docRef = doc(db, "receitas", id);
        try {
            const doc = await getDoc(docRef);

            setReceita(doc.data());
            console.log("Cached document data:", doc.data());
        } catch (e) {
            console.log("Error getting cached document:", e);
        }
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
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={estilos.ajuste}>
                <Image style={estilos.topoImagem} source={{ uri: receita?.imagem }} />
            </View>
            <View style={estilos.mainApoio}>
                <View style={estilos.apoio}></View>
                <View style={estilos.main}>
                    <Text style={estilos.titulo}>{receita?.nome}</Text>
                    {receita?.descricao ? <Text style={estilos.subtitulo}>{receita.descricao}</Text> : null}
                    <Text style={estilos.topicos}>Ingredientes</Text>
                    {receita?.ingredientes?.map((item, index) => (
                        <Text style={estilos.itens} key={index}>{'\u2B25'}  {item}</Text>
                    ))}
                    <Text style={estilos.topicos}>Instruções</Text>
                    {receita?.instrucoes?.map((item, index) => (
                        <Text style={estilos.itens} key={index}>{index + 1}.  {item}</Text>
                    ))}
                </View>
            </View>
        </ScrollView>
    )

}

const estilos = StyleSheet.create({
    topoImagem: {
        width: '100%',
        height: 188,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    ajuste: {
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderColor: '#005594',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        marginBottom: 23,
    },
    mainApoio: {
        flexDirection: 'row',
        marginLeft: 20,
    },
    apoio: {
        borderLeftWidth: 1,
        borderColor: '#F78B1F',
        marginBottom: 20,
    },
    main: {
        paddingLeft: 16,
        marginBottom: 20,
        borderLeftWidth: 2,
        borderColor: '#005594'
    },
    titulo: {
        fontSize: 20,
        fontFamily: 'Montserrat_900Black',
        color: '#005594',
        marginBottom: 23,
    },
    subtitulo: {
        fontSize: 10,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#005594',
        marginLeft: 7,
    },
    topicos: {
        fontSize: 15,
        fontFamily: 'Montserrat_900Black',
        color: '#005594',
        marginLeft: 7,
        marginTop: 37,
        marginBottom: 13,
    },
    itens: {
        fontSize: 10,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#005594',
        marginLeft: 17,
        marginBottom: 1,
    }
})