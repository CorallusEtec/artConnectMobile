import { View, Text, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import InputSenha from '../../components/InputSenha';
import { useEffect, useState } from "react";
import { ArtistaService} from '../../services/ArtistaService'
import useStore from "../../store";
import Logo from "../../components/Logo";
import InputIcon from "../../components/InputIcon";
import { ErroValidacao } from "../../services/ErroValidacao";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login({ route }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  /* FUNÇÕES E ESTADOS QUE MOSTRAM E MANIPULAM FEEDBACK DE VALIDAÇÃO */
  let valido = new ErroValidacao();
  const [validoVisual, setValidoVisual] = useState(valido);
  function feedbackFade(state, tempo) {
    setValidoVisual(state);
    setTimeout(()=>{
      setValidoVisual(st=>({
        ...st,
        valido: true
      }))
    }, tempo)
  }

  function logar() {
    valido = ArtistaService.validarLogin([email, senha])
    console.log(email);
    feedbackFade(valido, 2500);
    try {
      (async()=>{
        if(valido.valido) {
          const data = await ArtistaService.login(email, senha);
          if(data instanceof ErroValidacao) {
            valido = data;
            feedbackFade(valido, 2500)
          } else {
            await ArtistaService.saveUserLocal({email: email, senha: senha});
            navigation.navigate("Home");
          }
        } else {
          valido = valido.invalido("E-mail e/ou senha inválidos");
          feedbackFade(valido, 2000);
        }
      })();
    } catch (e) {
      
    }
  }

  useEffect(()=>{
    if(route.params instanceof ErroValidacao) {
      feedbackFade(route.params, 2000)
    }
  }, [])


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*IMAGEM DE FUNDO*/}
      <View className="flex items-center" style={{ backgroundColor: "#04CBAC" }}>
        <Logo height={200} width={300} />
      </View>

      <View style={{flex:1}} className="bg-white rounded-t-3xl">
        {/*TÍTULO*/}
        <View className="items-center gap-2">
          <Text className="text-4xl font-light text-gray-600 mb-2">Login</Text>

          <Text className="text-base text-gray-500">
            Bem vindo! Entre com sua conta.
          </Text>
        </View>

        {/* CAMPOS E ESQUECI SENHA ETC */}
        <View className="p-3 gap-3 mb-5">
          {/* CAMPOS  */}
          <View className="gap-2">
            {!validoVisual.valido?<Text className="text-base text-red-500">* {validoVisual.msg}</Text>:<></>}
            {/*E-MAIL*/}
            <InputIcon>
              <Feather

                name="mail"
                size={25}
                color="#5a5a5a"
              />
              <TextInput
                className="outline-none w-[90%] text-xl"
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
              />
            </InputIcon>
            {/*SENHA*/}
            <InputSenha placeholder={"Senha"} value={senha} setValue={setSenha} />
          </View>
            {/* ESQUECI SENHA ETC  */}
          <View className="flex-row justify-between">
            <View className="flex-row items-center gap-2">
              <Text></Text>
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
    </SafeAreaView>
  );
  /**
 * ENTRAR SEM LOGIN (IMPLEMENTAR DEPOIS)
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
 */
}
