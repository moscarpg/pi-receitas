import {
    SafeAreaView,
    View,
    ScrollView,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import {
    useFonts,
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';

import { useFocusEffect } from '@react-navigation/native';

import { useState, useCallback, useEffect } from 'react';

export default function Receita({ route, navigation }) {
    const [receita, setReceita] = useState(null)
    const [cadastrarIngrediente, setCadastrarIngrediente] = useState(false)
    const [cadastrarInstrucao, setCadastrarInstrucao] = useState(false)
    const [novoIngrediente, setNovoIngrediente] = useState('')
    const [novaInstrucao, setNovaInstrucao] = useState('')
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

    useEffect(() => {
        recuperandoDados();
    }, [])

    useEffect(() => {
        console.log(receita)
    }, [receita.ingredientes, receita.instrucoes])

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

    async function adicionarIngrediente() {
        receita.ingredientes.push(novoIngrediente)
        setReceita(receita)
        const docRef = doc(db, 'receitas', id)
        await updateDoc(docRef, {
            ingredientes: receita.ingredientes
        })
        setCadastrarIngrediente(cadastrarIngrediente ? false : true)
        setCadastrarIngrediente(cadastrarIngrediente ? false : true)
    }

    async function excluirIngrediente(index) {
        receita.ingredientes.splice(index, 1)
        setReceita(receita)
        const docRef = doc(db, 'receitas', id)
        await updateDoc(docRef, {
            ingredientes: receita.ingredientes
        })
        setCadastrarIngrediente(cadastrarIngrediente ? false : true)
        setCadastrarIngrediente(cadastrarIngrediente ? false : true)
    }

    async function adicionarInstrucao() {
        receita.instrucoes.push(novaInstrucao)
        setReceita(receita)
        const docRef = doc(db, 'receitas', id)
        await updateDoc(docRef, {
            instrucoes: receita.instrucoes
        })
        setCadastrarInstrucao(cadastrarInstrucao ? false : true)
        setCadastrarInstrucao(cadastrarInstrucao ? false : true)
    }

    function excluirInstrucao(index) {
        receita.instrucoes.splice(index, 1)
        setReceita(receita)
        const docRef = doc(db, 'receitas', id)
        updateDoc(docRef, {
            instrucoes: receita.instrucoes
        })
        setCadastrarInstrucao(cadastrarInstrucao ? false : true)
        setCadastrarInstrucao(cadastrarInstrucao ? false : true)
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
                    {cadastrarIngrediente ?
                        <View style={{ marginBottom: 20, flexDirection: 'row' }}>
                            <TextInput
                                placeholder='Adicione um ingrediente'
                                data={novoIngrediente}
                                onChangeText={(e) => { setNovoIngrediente(e) }}
                            />
                            <TouchableOpacity onPress={adicionarIngrediente} style={{ backgroundColor: '#F78B1F', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 15, marginLeft: 20 }}>
                                <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Montserrat_600SemiBold' }}>Adicionar</Text>
                            </TouchableOpacity>
                        </View> : null}
                    <View style={estilos.grupoTopico}>
                        <View style={{ gap: 5 }}>
                            {receita?.ingredientes?.map((item, index) => (
                                <View key={index} style={{ flexDirection: 'row' }}>
                                    <Text style={[estilos.itens, { marginRight: 5 }]} key={index}>{'\u2B25'}  {item}</Text>
                                    <TouchableOpacity onPress={() => excluirIngrediente(index)} style={estilos.botoes}><Text>-</Text></TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        <View style={estilos.grupoBtn}>
                            <TouchableOpacity onPress={() => setCadastrarIngrediente(cadastrarIngrediente ? false : true)} style={estilos.botoes}>
                                <Text style={estilos.plus}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={estilos.topicos}>Instruções</Text>
                    {cadastrarInstrucao ?
                        <View style={{ marginBottom: 20, flexDirection: 'row' }}>
                            <TextInput
                                placeholder='Adicione uma instrução'
                                data={novaInstrucao}
                                onChangeText={(e) => { setNovaInstrucao(e) }}
                            />
                            <TouchableOpacity onPress={adicionarInstrucao} style={{ backgroundColor: '#F78B1F', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 15, marginLeft: 20 }}>
                                <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Montserrat_600SemiBold' }}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        : null}
                    <View style={estilos.grupoTopico}>
                        <View style={{ gap: 5 }}>
                            {receita?.instrucoes?.map((item, index) => (
                                <View key={index} style={{ flexDirection: 'row' }}>
                                    <Text style={[estilos.itens, { marginRight: 5 }]}>{index + 1}.  {item}</Text>
                                    <TouchableOpacity onPress={() => excluirInstrucao(index)} style={estilos.botoes}><Text>-</Text></TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        <View style={estilos.grupoBtn}>
                            <TouchableOpacity onPress={() => setCadastrarInstrucao(cadastrarInstrucao ? false : true)} style={estilos.botoes}>
                                <Text style={estilos.plus}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    },
    plus: {
        fontSize: 40,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#fff',
    },
    botoes: {
        alignSelf: 'center',
        width: 34,
        maxHeight: 54,
        backgroundColor: '#F78B1F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.00,
        elevation: 7,
    },
    grupoBtn: {
        flexDirection: 'row',
        gap: 10,
    },
    grupoTopico: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})