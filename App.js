import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/pages/Login/Login";
import Cadastro from "./src/pages/Cadastro/Cadastro";
import Esquecisenha from "./src/pages/esquecisenha/senha.js";
import { NavigationContainer } from "@react-navigation/native";
import "./global.css";

export default function App() {
  const Stack = createStackNavigator();
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="esquecisenha" component={Esquecisenha} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}