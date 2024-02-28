import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Logar from './telas/Login';
import Inicial from './telas/Inicial';
import CadastroCurso from './telas/CadastroCurso';
import CadastroReceita from './telas/CadastroReceita';
import CatalogoCursos from './telas/CatalogoCursos';
import CatalogoReceitas from './telas/CatalogoReceitas';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Inicial'>
        <Drawer.Screen name="Inicial" component={Inicial} />
        <Drawer.Screen name="Cadastro de receitas" component={CadastroReceita} />
        <Drawer.Screen name="Logar" component={Logar} />
        <Drawer.Screen name="Cadastrar curso" component={CadastroCurso} />
        <Drawer.Screen name="Catalogo de cursos" component={CatalogoCursos} />
        <Drawer.Screen name="Catalogo de receitas" component={CatalogoReceitas} />
        <Drawer.Screen name="ReceitaPadrão" component={Inicial} />
        <Drawer.Screen name="ReceitaAdmin" component={Inicial} />
      </Drawer.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen name="CadastroReceita" component={CadastroReceita} />
        <Stack.Screen name="Inicial" component={Inicial} />
        <Stack.Screen name="Logar" component={Logar} />
        <Stack.Screen name="CadastroCurso" component={CadastroCurso} />
        <Stack.Screen name="CatalogoCursos" component={CatalogoCursos} />
        <Stack.Screen name="CatalogoReceitas" component={CatalogoReceitas} />
        <Stack.Screen name="ReceitaPadrão" component={Inicial} />
        <Stack.Screen name="ReceitaAdmin" component={Inicial} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}