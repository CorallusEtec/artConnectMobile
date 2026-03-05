import { View, Text, Pressable } from "react-native";
import { TextInput } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { Checkbox } from "expo-checkbox";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

{
  /*SE VOCê ESTÁ LENDO ISSO, O COMMIT DEU CERTO!*/
}

export default function TipoArte() {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const [selectedArt, setSelectedArt] = useState();

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      {/*TÍTULO*/}
      <View
        style={{
          flex: 0.9,
          flexDirection: "column",
          backgroundColor: "#ffffff",
        }}
      >
        <View className="items-center mb-2 mt-10">
          <Text className="text-5xl font-light text-gray-500 m-2.5">
            Olá Fulano
          </Text>

          <View className="items-center">
            <Text className="font-light text-2xl w-[90%] text-center text-gray-500">
              Bem vindo ao Art Connect!
            </Text>
            <Text className="font-light text-2xl text-center text-gray-500">
              Crie seu portifólio artístico e nós te conectamos com
              contratantes.
            </Text>
          </View>
        </View>

        <Text className="text-2xl text-center font-semibold text-gray-800 mb-4">
          Qual é o seu tipo de arte?
        </Text>

       {/* TIPO DE ARTE */}
        <View className="items-center mb-10">
            <View className="w-[70%] gap-2">
                <Text className="text-xl text-gray-800">Tipo de arte</Text>
                <View className="p-2 bg-gray-200 border-gray-300 border-2 rounded-lg gap-2">
                <Picker
                className="outline-none text-xl bg-gray-200 border-gray-300 text-gray-500"
                selectedValue={selectedArt}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedArt(itemValue)
                }
                >
                <Picker.Item label="Pintura" value="Pintura" />
                <Picker.Item label="Teatro" value="Teatro" />
                <Picker.Item label="Música" value="Música" />
                <Picker.Item label="Literatura" value="Literatura" />
                </Picker>
                </View>
            </View>
        </View>

        {/*CRIAR CONTA*/}
        <View className="items-center">
          <Pressable
            onPress={()=>navigation.navigate("Home")}
            style={{ backgroundColor: "#04CBAC" }}
            className="rounded-lg bg-emerald-500 p-3 w-2/4"
          >
            <Text className="text-2xl text-white text-center">Criar Conta</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
