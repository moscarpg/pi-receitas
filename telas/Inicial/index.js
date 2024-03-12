import { Text, ScrollView, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { auth } from "../../firebaseConfig";
import logo_projeto from '../../assets/inicial/logo_projeto.png'
import logo_senac from '../../assets/inicial/logo_senac.png'
import lateral_esquerda from '../../assets/inicial/lateral_esquerda.png'
import lateral_esquerda_baixo from '../../assets/inicial/lateral_esquerda_baixo.png'
import lateral_direita_baixo from '../../assets/inicial/lateral_direita_baixo.png'
import lateral_esquerda_alto from '../../assets/inicial/lateral_esquerda_alto.png'

import {
    useFonts,
    Lemon_400Regular
} from '@expo-google-fonts/lemon';
import {
    Montserrat_400Regular
} from '@expo-google-fonts/montserrat';

export default function Inicial({ navigation }) {

    let [fontsLoaded, fontError] = useFonts({
        Lemon_400Regular,
        Montserrat_400Regular
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }


    return (
        <ScrollView>
            <Image source={lateral_esquerda_alto} />
            <Image style={estilos.logoSenac} source={logo_senac} />
            <Text style={estilos.titulo}>Livro de receitas Senac</Text>
            <View style={estilos.topo}>
            </View>
            <Image style={estilos.logoProjeto} source={logo_projeto} />
            <Image style={estilos.lateralEsquerda} source={lateral_esquerda} />
            <TouchableOpacity style={estilos.botao} onPress={() => navigation.navigate('Catalogo de cursos')}>
                <Text style={estilos.textoBotao}>
                    Ver receitas
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.entrarProfessor} onPress={() => navigation.navigate('Logar')}>
                <Text style={estilos.eProfessor}>
                    É professor do Senac? <Text style={estilos.botaoLogin}>Entre com a sua senha</Text>
                </Text>
            </TouchableOpacity>
            <View style={estilos.rodape}>
                <Image style={estilos.lateralEsquerdaBaixo} source={lateral_esquerda_baixo} />
                <Text style={estilos.textoRodape}>Desenvolvido, testado e publicado pela turma 144</Text>
                <Image style={estilos.lateralDireitaBaixo} source={lateral_direita_baixo} />
            </View>
        </ScrollView>
    )
}

const estilos = StyleSheet.create({
    topo: {
        flexDirection: 'row',
    },
    logoSenac: {
        marginTop: -28,
        marginLeft: 17,
    },
    titulo: {
        alignSelf: 'center',
        fontFamily: 'Lemon_400Regular',
        fontSize: 10,
    },
    logoProjeto: {
        marginTop: 53,
        alignSelf: 'center',
    },
    lateralEsquerda: {
        marginTop: -74,
        marginBottom: -50,
    },
    botao: {
        paddingVertical: 22,
        paddingHorizontal: 70,
        alignSelf: 'center',
        backgroundColor: '#F78B1F',
        borderRadius: 11,
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Lemon_400Regular',
    },
    entrarProfessor: {
        marginTop: 63,
        alignSelf: 'center',
    },
    eProfessor: {
        fontFamily: 'Lemon_400Regular',
        fontSize: 10,
    },
    botaoLogin: {
        color: '#F78B1F'
    },
    rodape: {
        flexDirection: 'row',
        marginTop: 60,
        justifyContent: 'space-between',
    },
    textoRodape: {
        maxWidth: 165,
        textAlign: 'center',
        fontSize: 10,
        marginTop: 76,
        paddingLeft: 30,
        position: 'relative',
        fontFamily: 'Montserrat_400Regular'
    },
    lateralEsquerdaBaixo: {
        alignSelf: 'flex-start',
        marginTop: 64,
    },
    lateralDireitaBaixo: {
        marginTop: -6,
        alignSelf: 'flex-end',
    }
})