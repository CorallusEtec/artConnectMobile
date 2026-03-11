import { View, Text, Pressable, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { Checkbox } from "expo-checkbox";
import InputSenha from '../../components/InputSenha';
import { useState } from "react";
import ArtistaService from "../../services/ArtistaService";
import useStore from "../../store";
import Logo from "../../components/Logo";

{
  /*SE VOCê ESTÁ LENDO ISSO, O COMMIT DEU CERTO!*/
}

export default function Login() {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const alterStateUsuario = useStore(state=>state.alter)
  


  async function logar() {
    const data = await ArtistaService.login(email, senha);
    await ArtistaService.saveUserLocal(data);
    alterStateUsuario(data);
    navigation.navigate("Home");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#04CBAC" }}>
      {/*IMAGEM DE FUNDO*/}
      <View className="flex items-center" style={{ backgroundColor: "#04CBAC" }}>
        <Logo height={200} width={300} />
      </View>

      <View className="bg-white rounded-t-xl" style={{ flex: 1 }}>
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
            <View className="flex-row items-center bg-stone-200 border-stone-300 border-2 rounded-lg gap-2">
              <Feather
                style={{ margin: 7 }}
                name="mail"
                size={25}
                color="#5a5a5a"
              />
              <TextInput
                className="w-[90%] outline-none text-xl"
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/*SENHA*/}
            <InputSenha value={senha} setValue={setSenha} />
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
            <Pressable onPress={()=>logar()}
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
          <Pressable
            className="flex-row justify-center"
            onPress={() => navigation.navigate("Cadastro")}
          >
          <Text className="font-light text-lg">Não tem Cadastro? </Text>
          
            <Text className="font-normal text-lg text-gray-500">Cadastre-se</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
