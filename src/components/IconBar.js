import { Pressable, View } from "react-native"
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
export default function IconBar() {
    const navigation = useNavigation();
    return (
        <View className="bg-teal-500 flex-row justify-between p-4 items-center">
            <Pressable>
                <Feather name="search" size={24} color="white" />
            </Pressable>
            <Pressable>
                <Feather name="plus" size={24} color="white" />
            </Pressable>
            <Pressable>
                <Feather name="home" size={24} color="white" />
            </Pressable>
            <Pressable>
                <Feather name="bell" size={24} color="white" />
            </Pressable>
            <Pressable onPress={()=>navigation.navigate("SeuPerfil")}>
                <Feather name="user" size={24} color="white" />
            </Pressable>
        </View>
    )
}