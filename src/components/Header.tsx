import { View, Pressable } from "react-native"
import Feather from '@expo/vector-icons/Feather';
import Logo from "./Logo";
export default function Header() {
    return (
        <View className="bg-teal-500 flex-row justify-between p-2 px-5 items-center">
            <Logo width={120} height={70} />
            <Pressable>
                <Feather name="message-circle" size={32} color="white" />
            </Pressable>
        </View>
    )
}