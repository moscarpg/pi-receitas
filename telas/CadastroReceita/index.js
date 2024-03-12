import {
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';

import { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

import {
    useFonts,
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { ScrollView } from 'react-native-gesture-handler';

const storage = getStorage();

export default function App() {

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [curso, setCurso] = useState(null)
    const [cursos, setCursos] = useState(null)
    const [image, setImage] = useState(null);

    useEffect(() => {
        const recuperandoCursos = async () => {
            const lista = []
            const docRef = query(collection(db, "cursos"));
            const querySnapshot = await getDocs(docRef);
            querySnapshot.forEach((doc) => {
                atual = doc.data();
                atual['id'] = doc.id;
                lista.push(atual)
            });
            setCursos(lista);
        }
        recuperandoCursos();
    }, [])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    async function adicionar() {
        async function exportImage(imageUri) {
            try {
                const response = await fetch(imageUri)
                const blobFile = await response.blob()
                const reference = ref(storage, 'receitas/' + Date.now())
                const result = await uploadBytes(reference, blobFile)
                const url = await getDownloadURL(result.ref)

                setImage(url);

                try {
                    const docRef = await addDoc(collection(db, "receitas"), {
                        nome: nome,
                        descricao: descricao,
                        curso: curso,
                        imagem: url,
                        ingredientes: [],
                        instrucoes: []
                    });
                    setNome('')
                    setDescricao('')
                    setImage(null)
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.log("Error adding document: ", e);
                }

                return url;
            }
            catch (err) {
                return Promise.reject(err)
            }
        }

        exportImage(image);
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
        <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
            <View style={estilos.bigContent}> 
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
                        <Text style={estilos.label}>Subtítulo:</Text>
                        <TextInput
                            style={[estilos.tamanhoElementos, estilos.input]}
                            value={descricao}
                            onChangeText={(e) => setDescricao(e)}
                            placeholder="Subtítulo"
                            placeholderTextColor='#c9c9c9'
                        />
                    </View>
                    <Picker
                        selectedValue={curso}
                        onValueChange={(itemValue, itemIndex) => setCurso(itemValue)}
                    >
                        {cursos ? cursos.map((curso, index) => (
                            <Picker.Item key={index} label={curso.nome} value={curso.id} />
                        )) : null}
                    </Picker>
                    <TouchableOpacity onPress={pickImage} style={[estilos.tamanhoElementos, estilos.botoes]}>
                        <Text style={estilos.textoBotoes}>
                            Selecione uma imagem
                        </Text>
                    </TouchableOpacity>
                    {image ? <Image source={{ uri: image }} style={{ width: 150, height: 150, alignSelf: 'center', borderRadius: 356, borderWidth: 1, borderColor: '#005594' }} /> : null}
                    <TouchableOpacity onPress={adicionar} style={[estilos.tamanhoElementos, estilos.botoes]}>
                        <Text style={estilos.textoBotoes}>
                            Confirmar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
    textoBotoes: {
        color: '#fff',
        fontFamily: 'Montserrat_700Bold',
        fontSize: 13,
    }
});
