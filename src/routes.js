/*
-expo.io > documentação > routing para aprender a rotear 
-reactnavigation.org > getting.started - usaremos essa biblioteca
-instalaçao - npm install @react-navigation/native
-instalar pacote unico do expo para reactnavigation
-tipos de navegação: por abas, por drower (menu que surge), stacknavigator (por botoes)
-npm install react-navigation/stack 
*/
/* - importações necessarias para as rotas */ 
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Incidents from './pages/Incidents'
import Details from './pages/Details'

/*responsavel pelo navigator e o screen(props= name e component)*/
const AppStack = createStackNavigator();

/*
- editamos as propriedades do navigator, como seu cabeçalho pela props screenOptions
-
 */
export default function Routes() {
    return(
        <NavigationContainer >
            <AppStack.Navigator screenOptions={{ headerShown:false}}> 
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Details} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}
