import {
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';

import {
    useFonts,
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

import logoMenu from '../../assets/Group 1.png';
import pesquisa from '../../assets/Group 2.png';

export default function App() {
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
            <View style={estilos.topoMenus}>
                <TouchableOpacity>
                    <Image source={logoMenu} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={pesquisa} />
                </TouchableOpacity>
            </View>
            <Text style={estilos.titulo}>Cadastre uma receita</Text>
            <View style={estilos.smallContent}>
                <View style={estilos.labelInput}>
                    <Text style={estilos.label}>Nome da receita:</Text>
                    <TextInput
                        style={[estilos.tamanhoElementos, estilos.input]}
                        placeholder="Empadão"
                        placeholderTextColor='#c9c9c9'
                    />
                </View>
                <TouchableOpacity style={[estilos.tamanhoElementos, estilos.botoes]}>
                    Selecione uma imagem
                </TouchableOpacity>
                <TouchableOpacity style={[estilos.tamanhoElementos, estilos.botoes]}>
                    Confirmar
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
