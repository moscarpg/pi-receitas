import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logar from './telas/Login';
import Inicial from './telas/Inicial';
import CadastroCurso from './telas/CadastroCurso';
import CadastroReceita from './telas/CadastroReceita';
import CatalogoCursos from './telas/CatalogoCursos';
import CatalogoReceitas from './telas/CatalogoReceitas';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicial" component={Inicial} />
        <Stack.Screen name="Logar" component={Logar} />
        <Stack.Screen name="CadastroCurso" component={CadastroCurso} />
        <Stack.Screen name="CadastroReceita" component={CadastroReceita} />
        <Stack.Screen name="CatalogoCursos" component={CatalogoCursos} />
        <Stack.Screen name="CatalogoReceitas" component={CatalogoReceitas} />
        <Stack.Screen name="ReceitaPadrão" component={Inicial} />
        <Stack.Screen name="ReceitaAdmin" component={Inicial} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}