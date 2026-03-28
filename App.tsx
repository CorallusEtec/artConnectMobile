import { createStackNavigator } from "@react-navigation/stack";
import EditarPerfil from "./src/pages/EditarPerfil/EditarPerfil";
import TipoArte from "./src/pages/TipoArte/TipoArte";
import Login from "./src/pages/Login/Login";
import Cadastro from "./src/pages/Cadastro/Cadastro";
import { NavigationContainer } from "@react-navigation/native";
import "./global.css";

import { Inter_400Regular, useFonts } from "@expo-google-fonts/inter";
import * as SplashScreen from 'expo-splash-screen';

import Splash from "./src/pages/Splash/Splash";
import CadastroEndereco from "./src/pages/CadastroEndereco/CadastroEndereco";
import Home from "./src/pages/Home/Home";
import SeuPerfil from "./src/pages/SeuPerfil/SeuPerfil";
import EsqueciSenha from "./src/pages/EsqueciSenha/EsqueciSenha";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  EsqueciSenha: undefined;
  Cadastro: undefined;
  Home: undefined;
}

export default function App() {
  const [load, erro] = useFonts({
    Inter_400Regular,
  });
  useEffect(()=>{
    if(load || erro) {
      SplashScreen.hideAsync();
    }
  }, [load, erro])

  if(!load && erro) {
    return null;
  }

  const Stack = createStackNavigator<RootStackParamList, "Stack">();
  return (
      <NavigationContainer>
        <Stack.Navigator id="Stack" initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} options={{headerShown: false}} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}} />
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}