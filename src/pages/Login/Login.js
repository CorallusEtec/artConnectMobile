import { View, Text, Pressable, Image } from "react-native";
import { TextInput } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { Checkbox } from "expo-checkbox";
import { useState } from "react";

{
  /*SE VOCê ESTÁ LENDO ISSO, O COMMIT DEU CERTO!*/
}

export default function Login() {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#04CBAC" }}>
      {/*IMAGEM DE FUNDO*/}
      <View style={{ flex: 0.15, backgroundColor: "#04CBAC" }}></View>

      <View className="bg-white rounded-t-xl" style={{ flex: 0.9 }}>
        {/*TÍTULO*/}
        <View className="items-center">
          <Text className="text-5xl text-gray-600">Login</Text>

          <Text className="text-xl text-gray-500">
            Bem vindo! Entre com sua conta.
          </Text>
        </View>

        {/* CAMPOS E ESQUECI SENHA ETC */}
        <View className="p-3 gap-3 mb-5">
          {/* CAMPOS  */}
          <View className="gap-2">
            {/*E-MAIL*/}
            <View className="flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg gap-2">
              <Feather
                style={{ margin: 7 }}
                name="mail"
                size={25}
                color="#5a5a5a"
              />
              <TextInput
                className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                placeholder="E-mail"
              />
            </View>

            {/*SENHA*/}
            <View className="flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg gap-2">
              <Feather
                style={{ margin: 7 }}
                name="lock"
                size={25}
                color="#5a5a5a"
              />
              <TextInput
                className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                placeholder="Senha"
              />
              <Feather
                style={{ margin: 7 }}
                name="eye"
                size={25}
                color="#5a5a5a"
              />
            </View>
          </View>
            {/* ESQUECI SENHA ETC  */}
          <View className="flex-row justify-between">
            <View className="flex-row items-center gap-2">
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#4630EB" : undefined}
              />
              <Text className="font-normal text-lg">Lembre-se de Mim</Text>
            </View>
            <Pressable>
              <Text className="text-gray-500 text-lg">Esqueci a Senha</Text>
            </Pressable>
          </View>
        </View>

        {/*BOTÕES*/}
        <View className="gap-3 mb-8">
          {/*ENTRAR*/}
          <View className="items-center">
            <Pressable
              style={{ backgroundColor: "#04CBAC" }}
              className="rounded-lg bg-emerald-500 p-3 w-2/4"
            >
              <Text className="text-2xl text-white text-center">Logar</Text>
            </Pressable>
          </View>
          {/*ENTRAR SEM LOGIN*/}
          <View className="items-center">
            <Pressable
              style={{ backgroundColor: "#fff" }}
              className="border-gray-300 border-2 rounded-lg bg-emerald-500 p-3 w-4/6"
            >
              <Text className="text-2xl text-gray-500 text-center">
                Entrar sem Login
              </Text>
            </Pressable>
          </View>
        </View>

        {/*CADASTRO*/}
        <View className="flex-row justify-center">
          <Text className="font-light text-lg">Não tem Cadastro? </Text>
          <Pressable
            onPress={() => navigation.navigate("Cadastro")}
          >
            <Text className="font-light text-lg text-gray-500">Cadastre-se</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
