/*
-expo.io > documentação > routing para aprender a rotear 
-reactnavigation.org > getting.started - usaremos essa biblioteca
-instalaçao - npm install @react-navigation/native
-instalar pacote unico do expo para reactnavigation
-tipos de navegação: por abas, por drower (menu que surge), stacknavigator (por botoes)
-npm install react-navigation/stack 
*/
/* - importações necessarias para as rotas */ 
import { NavigationContainer} from '@react-navigation/native';
import { CreateStackNavigator} from '@react-navigation/stack';
import Incidents from './pages/Incidents'
import Details from './pages/Details'

/*responsavel pelo navigator e o screen */
const AppStack = CreateStackNavigator();

export default function Routes() {
    return(
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen component={Incidents} />
                <AppStack.Screen component={Details} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}
