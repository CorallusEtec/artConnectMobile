import { Pressable, View, Text, Modal } from "react-native"
import IconBar from "../../components/IconBar"
import { useNavigation } from "@react-navigation/native"
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Post from "../../components/Post";
import CompSeuPerfil from "../../components/CompSeuPerfil";
import { useState } from 'react';

export default function SeuPerfil() {
    const navigation = useNavigation();
    const [modal, setModal] = useState (false);
    const abrirModal = () =>{
        setModal(true)
    }
    const fecharModal = () =>{
        setModal(false)
    }
    return (
        <View style={{flex:1}}>
            {/* HEADER */}
            <View className="flex-row bg-teal-500 p-4 items-center justify-between">
                <View className="flex-row items-center gap-3">
                    <Pressable onPress={()=>navigation.navigate("Home")}>
                        <Feather name="arrow-left" size={24} color="white" />
                    </Pressable>
                <Text className="text-2xl font-light text-white">Seu Perfil</Text>
                </View>
                <Pressable onPress={abrirModal}>
                    <Feather name="settings" size={24} color="white" />
                </Pressable>
                <Modal
                visible={modal}
                transparent={true}>
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="bg-white rounded-3xl items-center w-[90%]">
                            <View className="flex-row">
                                <Pressable onPress={fecharModal}>
                                    <Ionicons className="m-3" name="close" size={25} color="gray" />
                                </Pressable>
                                <Text className="text-2xl m-3 mr-14">Configurações</Text>
                            </View>
                            <Text className="text-xl m-3 text-gray-600">Preferência do app</Text>
                            <Text className="text-xl m-3 text-gray-600">Acesso e segurança</Text>
                            <Text className="text-xl m-3 text-gray-600">Suporte</Text>
                            <Text className="text-xl m-3 text-gray-600">Contas bloqueadas</Text>
                            <Text className="text-xl m-3 text-gray-600">Sobre o Art Connect</Text>
                            <Pressable>
                                <View className="flex-row">
                                    <Text className="text-2xl m-3">Sair</Text>
                                    <Ionicons className="m-4" name="exit-outline" size={25} color="gray" />
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
            {/* CONTEÚDO */}
            <View style={{flex:1}} className="p-2 gap-3">
                <CompSeuPerfil />
                <Post />
            </View>
            {/* BARRA DE NAVEGAÇÃO */}
            <IconBar />
        </View>
    )
}