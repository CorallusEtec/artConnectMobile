import { createStackNavigator } from "@react-navigation/stack";
import TipoArte from "./src/pages/TipoArte/TipoArte";
import Login from "./src/pages/Login/Login";
import Cadastro from "./src/pages/Cadastro/Cadastro";
import { NavigationContainer } from "@react-navigation/native";
import "./global.css";

export default function App() {
  const Stack = createStackNavigator();
  return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="TipoArte" component={TipoArte} options={{headerShown: false}} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}