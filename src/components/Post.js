import { Pressable, View, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
export default function Post() {
  return (
    <View className="border border-stone-300 rounded-lg p-1">
      {/* CABEÇALHO */}
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <Pressable>
            <FontAwesome name="user-circle-o" size={40} color="black" />
          </Pressable>
          <View className="">
            <Text className="text-lg">Nome Perfil</Text>
            <Text className="text-sm font-light text-stone-500">
              há 3 dias atrás
            </Text>
          </View>
        </View>
        <Pressable>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      {/* CONTEUDO */}
      <View className="mb-5">
        <Text className="text-sm font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non
          ligula eu dui viverra imperdiet non in lacus. Maecenas ornare nisi
          libero, ac efficitur quam dictum rutrum.
        </Text>
      </View>
      {/* REAÇÕES */}
      <View className="flex-row  justify-between">
        <View className="flex-row gap-5 items-center">
          {/* LIKE */}
          <View className="flex-row items-center gap-2">
            <Text className="font-semibold text-lg">5</Text>
            <Pressable>
              <Feather name="thumbs-up" size={24} color="black" />
            </Pressable>
          </View>
          {/* DISLIKE */}
          <View className="flex-row items-center gap-2">
            <Text className="font-semibold text-lg">1</Text>
            <Pressable>
              <Feather name="thumbs-down" size={24} color="black" />
            </Pressable>
          </View>
          {/* COMENTARIOS */}
          <View className="flex-row items-center gap-2">
            <Text className="font-semibold text-lg">2</Text>
            <Pressable>
              <Feather name="message-square" size={24} color="black" />
            </Pressable>
          </View>
        </View>
        <Pressable className="pr-7">
            <Feather name="share-2" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}
