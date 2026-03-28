import { CommonActions, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

import {View, ActivityIndicator} from 'react-native';
import Logo from '../../components/Logo';

export default function Splash() {
    const navigation = useNavigation();
    {/* ENQUANTO NÃO TEM VALIDAÇÃO DE LOGIN, SIMULAÇÃO DE CARREGAR */}
    function load() {
        navigation.dispatch(CommonActions.navigate("Login"));
    }
    useEffect(()=>{
        setTimeout(()=>{
            load();
        }, 2000);
    }, [])
    return (
        <View style={{flex:1}} className="bg-teal-600 items-center gap-5">
            <View style={{flex:0.5}} className="justify-end">
                <Logo width={300} height={200} />
            </View>
            <View style={{flex:0.5}} className="justify-start">
                <ActivityIndicator size={'large'} color={"#ffffff"} />
            </View>
        </View>
    )
}