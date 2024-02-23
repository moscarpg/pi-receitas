import {
    SafeAreaView,
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
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

export default function App({ route }) {
    let [fontsLoaded, fontError] = useFonts({
        Montserrat_700Bold,
        Montserrat_900Black,
        Montserrat_600SemiBold,
    });
    const {titulo, subtitulo} = route.params

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <SafeAreaView style={estilos.bigContent}>
            <View style={estilos.topoMenus}>
                <TouchableOpacity>
                    <Image source={logoMenu} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={pesquisa} />
                </TouchableOpacity>
            </View>
            <Text style={estilos.titulo}>{titulo}</Text>
            <Text style={estilos.subTitulo}>{subtitulo}</Text>
            <View style={estilos.conteudoGrande}>
                <TouchableOpacity style={estilos.card}>
                    <Image style={estilos.imagem} source={receita} />
                    <Text style={estilos.textoCard}>Empadão</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.card}>
                    <Image style={estilos.imagem} source={receita} />
                    <Text style={estilos.textoCard}>Empadão</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.card}>
                    <Image style={estilos.imagem} source={receita} />
                    <Text style={estilos.textoCard}>Empadão</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.card}>
                    <Image style={estilos.imagem} source={receita} />
                    <Text style={estilos.textoCard}>Empadão</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.card}>
                    <Image style={estilos.imagem} source={receita} />
                    <Text style={estilos.textoCard}>Empadão</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.card}>
                    <Image style={estilos.imagem} source={receita} />
                    <Text style={estilos.textoCard}>Empadão</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    topoMenus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 258,
        marginTop: 31,
        marginBottom: 40,
    },
    bigContent: {
        alignItems: 'center',
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 51,
        justifyContent: 'center',
        marginTop: 57,
    },
    card: {
        backgroundColor: '#fff',
        paddingHorizontal: 13,
        paddingBottom: 60,
        borderRadius: 24,
        maxHeight: 136,
        shadowColor: '#F78B1F',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 70,
        gap: 8,
    },
    imagem: {
        marginTop: -10,
    },
    textoCard: {
        maxWidth: 78,
        textAlign: 'center',
        fontSize: 10,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#005594',
    },
});
