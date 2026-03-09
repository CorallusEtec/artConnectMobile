import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import useStore from '../../store';
import ArtistaService from '../../services/ArtistaService';
import {View, Image, ActivityIndicator} from 'react-native';
import Logo from '../../components/Logo';

export default function Splash() {
    const navigate = useNavigation();
    const setLocalUser = useStore(state=> state.alter)
    {/* ENQUANTO NÃO TEM VALIDAÇÃO DE LOGIN, SIMULAÇÃO DE CARREGAR */}
    async function load() {
        console.log("Rodando")
        const user = await ArtistaService.getUserLocal();
        if(user != null) {
            setLocalUser(user);
            navigate.navigate("Home");
        } else {
            navigate.navigate("Login");
        }
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
            <View style={{flex:1}} className="justify-start">
                <ActivityIndicator size={'large'} color={"#ffffff"} />
            </View>
        </View>
    )
}