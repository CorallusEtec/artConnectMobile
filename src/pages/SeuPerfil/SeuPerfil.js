import { Pressable, View, Text } from "react-native"
import IconBar from "../../components/IconBar"
import { useNavigation } from "@react-navigation/native"
import Feather from '@expo/vector-icons/Feather';
import Post from "../../components/Post";
import CompSeuPerfil from "../../components/CompSeuPerfil";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SeuPerfil() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex:1}}>
            {/* HEADER */}
            <View className="flex-row bg-teal-500 p-4 items-center justify-between">
                <View className="flex-row items-center gap-3">
                    <Pressable onPress={()=>navigation.navigate("Home")}>
                        <Feather name="arrow-left" size={24} color="white" />
                    </Pressable>
                <Text className="text-2xl font-light text-white">Seu Perfil</Text>
                </View>
                <Pressable>
                    <Feather name="settings" size={24} color="white" />
                </Pressable>
            </View>
            {/* CONTEÚDO */}
            <View style={{flex:1}} className="p-2 gap-3">
                <CompSeuPerfil />
                <Post />
            </View>
            {/* BARRA DE NAVEGAÇÃO */}
            <IconBar />
        </SafeAreaView>
    )
}