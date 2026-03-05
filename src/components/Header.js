import { View, Text, Pressable } from "react-native"
import Feather from '@expo/vector-icons/Feather';
export default function Header() {
    return (
        <View className="bg-teal-500 flex-row justify-between p-4 items-center">
            <Text className="text-white text-xl font-semibold">Art Connect (Logo)</Text>
            <Pressable>
                <Feather name="message-circle" size={24} color="white" />
            </Pressable>
        </View>
    )
}