import { View, Text } from "react-native";
import Header from "../../components/Header";
import IconBar from "../../components/IconBar";
import Post from "../../components/Post";
export default function Home() {
    return (
        <View style={{flex: 1}}>
            <Header />
            <View style={{flex:1}} className="p-2">
                <View className="mb-5">
                    <Text className="text-2xl font-light">Olá, Fulano</Text>
                </View>
                <Post />
            </View>
            <IconBar />
        </View>
    )
}