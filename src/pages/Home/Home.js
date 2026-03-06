import { View, Text } from "react-native";
import Header from "../../components/Header";
import IconBar from "../../components/IconBar";
import Post from "../../components/Post";
import { useState } from "react";
export default function Home() {
    const [artista, setArtista] = useState(null);
    const [load, setLoad] = useState(true);
    return (
        <View style={{flex: 1}}>
            <Header />
            <View style={{flex:1}} className="p-2">
                <View className="mb-5">
                    <Text className="text-2xl font-light">Olá</Text>
                </View>
                <Post />
            </View>
            <IconBar />
        </View>
    )
}