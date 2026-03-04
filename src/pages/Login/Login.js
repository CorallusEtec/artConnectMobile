import { View, Text, Pressable, Image } from "react-native";
import { TextInput } from "react-native-web";
import { useNavigation } from "@react-navigation/native";

{/*SE VOCê ESTÁ LENDO ISSO, O COMMIT DEU CERTO!*/}

export default function Login() {
    const navigation = useNavigation();


    return (
        <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#04CBAC" }}>


            {/*IMAGEM DE FUNDO*/}
            <View style={{ flex: 0.15, maxHeight: "100%", maxWidth: "100%", backgroundColor: "#04CBAC" }}>
            </View>


            {/*TÍTULO*/}
            <View style={{ flex: 0.9, flexDirection: "column", borderTopLeftRadius:30, borderTopRightRadius:30, backgroundColor: "#ffffff" }}>
                <View className="items-center mb-2">
                    <Text className="text-5xl text-gray-600 m-2.5">
                        Login
                    </Text>


                    <Text className="text-xl text-gray-500 mb-8">
                        Bem vindo! Entre com sua conta.
                    </Text>
                </View>


                {/*E-MAIL*/}
                <View className="flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg ml-3 mr-3 mt-6 gap-2">
                    <Image source={require("bootstrap-icons/icons/envelope.svg")}
                    tintColor="#5a5a5a"
                    style={{height:25, width:25, margin:7}}
                    />
                    <TextInput
                        className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                        placeholder="E-mail"
                    />
                </View>


                {/*SENHA*/}
                <View className="flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg ml-3 mr-3 mt-6 gap-2">
                    <Image source={require("bootstrap-icons/icons/lock.svg")}
                    tintColor="#5a5a5a"
                    style={{height:25, width:25, margin:7}}
                    />
                    <TextInput
                        className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                        placeholder="Senha"
                    />
                    <Image source={require("bootstrap-icons/icons/eye.svg")}
                    tintColor="#5a5a5a"
                    style={{height:25, width:25, margin:7}}
                    />
                </View>


                <View className="flex-row items-center mt-6">
                    <Text className="font-semibold w-30 mx-10">Lembrar Login</Text>
                    <Pressable><Text className="text-gray-500 w-30 mx-10">Esqueci a Senha</Text></Pressable>
                </View>


                {/*ENTRAR*/}
                <View className="items-center mt-6">
                    <Pressable style={{backgroundColor: "#04CBAC"}} className="mt-10 rounded-lg bg-emerald-500 p-3 w-2/4">
                    <Text className="text-2xl text-white text-center">Logar</Text>
                    </Pressable>
                </View>
                
                <View className="items-center mt-6 mb-10">
                    <Pressable style={{backgroundColor: "#fff"}} className="mt-10 border-gray-300 border-2 rounded-lg bg-emerald-500 p-3 w-3/4">
                    <Text className="text-2xl text-gray-500 text-center">Entrar sem Login</Text>
                    </Pressable>
                </View>

                {/*CADASTRO*/}
                <View className="w-3/4 flex-row items-center mt-6">
                    <Text className="font-semibold">Não tem Cadastro? </Text>
                    <Pressable onPress={()=>navigation.navigate("Cadastro")} ><Text className="text-gray-500">Cadastre-se</Text></Pressable>
                </View>
            </View>
        </View>
    );
}
