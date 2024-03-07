import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Logar from './telas/Login';
import Inicial from './telas/Inicial';
import CadastroCurso from './telas/CadastroCurso';
import CadastroReceita from './telas/CadastroReceita';
import CatalogoCursos from './telas/CatalogoCursos';
import CatalogoReceitas from './telas/CatalogoReceitas';

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
        <Drawer.Screen name="Receita" component={Inicial} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}