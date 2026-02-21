import './global.css';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/Login/Login';
import Cadastro from './src/pages/Cadastro/Cadastro';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Cadastro' component={Cadastro}/>
    </Stack.Navigator>
  );
}