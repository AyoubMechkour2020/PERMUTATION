import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Statistics from './Statistics';
import Login from './Login';
import AboutUs from './AboutUs';
import AuthenticationPage from './AuthenticationPage';
import Rechercher from './Recherche';
import Combinaison from './Combinaison';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
        tabBarPosition="bottom"
      >
        {isLoggedIn ? (
          <>
            <Tab.Screen name="Acceuil" component={Statistics} />
            <Tab.Screen name="Inscription" component={Login} />
            <Tab.Screen name="Rechercher" component={Rechercher} />
            <Tab.Screen name="Combinaison" component={Combinaison} />
          </>
        ) : (
          <>
            <Tab.Screen
              name="A propos de nous"
              component={AboutUs}
              options={{ tabBarLabel: 'A propos de nous' }}
            />
            <Tab.Screen
              name="Connexion"
              options={{ tabBarLabel: 'Connexion' }}
            >
              {() => (
                <AuthenticationPage onLogin={() => setIsLoggedIn(true)} />
              )}
            </Tab.Screen>
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
