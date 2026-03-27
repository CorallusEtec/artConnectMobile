import { View, Text, ActivityIndicator } from "react-native";
import Header from "../../components/Header";
import IconBar from "../../components/IconBar";
import Post from "../../components/Post";
import ArtistaModel from '../../models/ArtistaModel';
import { useEffect, useState } from "react";
import { ArtistaService } from "../../services/ArtistaService";
import { useNavigation } from "@react-navigation/native";
import { ErroValidacao } from "../../services/ErroValidacao";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const [load, setLoad] = useState(true);
    const [artista, setArtista] = useState(new ArtistaModel(null));
    const navigation = useNavigation();
    useEffect(()=>{
        try {
            (async()=>{
                const data = await ArtistaService.getUserLocal();
                const artista = await ArtistaService.login(data.email, data.senha);
                if(artista != null) {
                    setArtista(artista);
                } else {
                    navigation.navigate("Login", new ErroValidacao().invalido("Não foi possível fazer login, tente mais tarde"));
                }
            })();
        } finally {
            setLoad(false);
        }
    }, []);

    if(load) return <View><ActivityIndicator size={"large"} /></View>

    return (
        <SafeAreaView style={{flex: 1}}>
            <Header />
            <View style={{flex:1}} className="p-2">
                <View className="mb-5">
                    <Text className="text-2xl font-light">Olá, {artista.nome}</Text>
                </View>
                <View className="gap-3">
                    <Post />
                    <Post />
                </View>
            </View>
            <IconBar />
        </SafeAreaView>
    )
}