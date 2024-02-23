import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logar from './telas/Login';
import Inicial from './telas/Inicial';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicial" component={Inicial} />
        <Stack.Screen name="Logar" component={Logar} />
        <Stack.Screen name="CadastroCurso" component={Inicial} />
        <Stack.Screen name="CadastroReceita" component={Inicial} />
        <Stack.Screen name="CatalogoCursos" component={Inicial} />
        <Stack.Screen name="Receitas" component={Inicial} />
        <Stack.Screen name="ReceitaPadrão" component={Inicial} />
        <Stack.Screen name="ReceitaAdmin" component={Inicial} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}