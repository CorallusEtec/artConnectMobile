import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import useStore from "../../store";

export default function TipoArte() {

  const usuario = useStore(store=>store.usuario);
  const navigation = useNavigation();
  const [selectedArt, setSelectedArt] = useState();

  console.log(usuario);

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
            Olá {usuario.nome}
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
