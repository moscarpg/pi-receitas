import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import Logar from './telas/Login';
import Receita from './telas/Receita';
import Inicial from './telas/Inicial';
import CadastroCurso from './telas/CadastroCurso';
import CadastroReceita from './telas/CadastroReceita';
import CatalogoCursos from './telas/CatalogoCursos';
import CatalogoReceitas from './telas/CatalogoReceitas';
import TodasReceitas from './telas/Todas as receitas';

const Drawer = createDrawerNavigator();
const usuario = auth.currentUser

function Deslogar() {
  signOut(auth).then(() => {
    console.log('Deslogado com sucesso')
    console.log(usuario)
  }).catch((error) => {
    console.log(error)
  });
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name="Home" component={Inicial} />
        <Drawer.Screen name="Catalogo de cursos" component={CatalogoCursos} />
        <Drawer.Screen name="Todas as receitas" component={TodasReceitas} />
        <Drawer.Screen options={{ drawerItemStyle: { height: 0 } }} name="Catalogo de receitas" component={CatalogoReceitas} />
        <Drawer.Screen options={{ drawerItemStyle: { height: 0 } }} name="Receita" component={Receita} />
        {usuario ? (<>
          <Drawer.Screen name="Cadastro de receitas" component={CadastroReceita} />
          <Drawer.Screen name="Cadastrar curso" component={CadastroCurso} />
          <Drawer.Screen name="Sair" component={Deslogar} />
        </>)
          :
          (<>
            <Drawer.Screen name="Logar" component={Logar} />
          </>)
        }
      </Drawer.Navigator>
    </NavigationContainer>
  );
}