import { View, Text } from "react-native";
import Header from "../../components/Header";
import IconBar from "../../components/IconBar";
import Post from "../../components/Post";
import useStore from "../../store";

export default function Home() {

    const usuario = useStore(state=> state.usuario)

    return (
        <View style={{flex: 1}}>
            <Header />
            <View style={{flex:1}} className="p-2">
                <View className="mb-5">
                    <Text className="text-2xl font-light">Olá, {usuario.nome}</Text>
                </View>
                <Post />
            </View>
            <IconBar />
        </View>
    )
}