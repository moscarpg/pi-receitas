import {
    SafeAreaView,
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import receita from '../../assets/receitas/image 2.png';
import logoMenu from '../../assets/Group 1.png';
import pesquisa from '../../assets/Group 2.png';

import {
    useFonts,
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from '../../firebaseConfig';

import { useState, useEffect } from 'react';


export default function App({ route, navigation }) {
    const [receitas, setReceitas] = useState(null)

    route.params ? { nome, id } = route.params : nome = 'Todas as receitas', id = 0

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const recuperandoDados = async () => {
                const lista = []
                const docRef = id != 0 ? query(collection(db, "receitas"), where('curso', '==', id)) : query(collection(db, "receitas"));
                const querySnapshot = await getDocs(docRef);
                querySnapshot.forEach((doc) => {
                    atual = doc.data();
                    atual['id'] = doc.id;
                    lista.push(atual)
                });
                setReceitas(lista);
            }

            recuperandoDados();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation])




    let [fontsLoaded, fontError] = useFonts({
        Montserrat_700Bold,
        Montserrat_900Black,
        Montserrat_600SemiBold,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <SafeAreaView style={estilos.bigContent}>
            <Text style={estilos.titulo}>{nome}</Text>
            {nome != 'Todas as receitas' ? <Text style={estilos.subTitulo}>Receitas deliciosas do nosso curso de {nome}</Text> : null}
            {receitas ? <FlatList
                style={estilos.conteudoGrande}
                numColumns={2}
                columnWrapperStyle={estilos.teste}
                data={receitas}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { navigation.navigate('Receita') }} style={estilos.card}>
                        <Image style={estilos.imagem} source={{ uri: item.imagem }} />
                        <Text style={estilos.textoCard}>{item.nome}</Text>
                    </TouchableOpacity>
                )}
            /> : <Text>Nenhuma receita encontrada</Text>}
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
        marginVertical: 40,
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
