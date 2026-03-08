import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { View, Pressable, Text } from "react-native";
import useStore from "../store";
import { useNavigation } from "@react-navigation/native";
export default function CompSeuPerfil() {
  const usuario = useStore(state=>state.usuario);
  const navigator = useNavigation()
    return (
      <View className=" bg-stone-200 rounded-lg gap-2 p-2">
        <View className="flex-row">
          <Pressable className="w-[15%]">
            <FontAwesome name="user-circle-o" size={40} color="black" />
          </Pressable>
          <View className="w-[85%]">
            {/* NOME E EDIT */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row justify-center w-[85%]">
                <Text className="text-stone-800 text-lg font-semibold">
                  {usuario.nome}
                </Text>
              </View>
              <Pressable onPress={()=>navigator.navigate("EditarPerfil")} className="w-[15%]">
                <Feather name="edit" size={24} color="black" />
              </Pressable>
            </View>
            {/* ARTE E LOCAL */}
            <View className="flex-row justify-around">
              <Text className=" text-base">Ginasta Rítmico</Text>
              <Text className=" text-base text-stone-500">São Paulo - SP</Text>
            </View>
          </View>
        </View>
        <View className="gap-1.5">
            {/* SEGUIDORES E POSTAGENS */}
            <View className="flex-row justify-around">
              <View className="flex-row items-center gap-1">
                <Text className="font-semibold">3</Text>
                <Text className="text-base text-stone-800">postagens</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="font-semibold">2</Text>
                <Text className="text-base text-stone-800">seguidores</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="font-semibold">0</Text>
                <Text className="text-base text-stone-800">seguindo</Text>
              </View>
            </View>
            {/* CONTATOS */}
            <View className="items-center">
                <Pressable className="flex-row items-center gap-2">
                    <Feather name="paperclip" size={20} color="black" />
                    <Text className="font-semibold text-teal-800">Contatos</Text>
                </Pressable>
            </View>
        </View>
      </View>
    );
}
