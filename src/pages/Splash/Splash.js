import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

export default function Splash() {
    const navigate = useNavigation();
    {/* ENQUANTO NÃO TEM VALIDAÇÃO DE LOGIN, SIMULAÇÃO DE CARREGAR */}
    useEffect(()=>{
        setTimeout(()=>{
            navigate.navigate("Login");
        }, 2000);
    }, [])
    return (
        <View style={{flex:1}} className="bg-teal-600 items-center gap-5">
            <View style={{flex:0.5}} className="justify-end">
                <Text className="text-white text-center text-5xl">Logo do projeto</Text>
            </View>
            <View style={{flex:1}} className="justify-start">
                <ActivityIndicator size={'large'} color={"#ffffff"} />
            </View>
        </View>
    )
}