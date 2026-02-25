
import { View, Text, Pressable, Image } from "react-native";
import { TextInput } from "react-native-web";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, flexDirection: "column" }}>

            {/*IMAGEM DE FUNDO*/}
            <View style={{ flex: 0.1 }}>
                <Image
                className="rounded-b-2xl"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                source={require("../../../assets/img/banner.jpeg")}
                />
            </View>

            {/*TÍTULO*/}
            <View className="items-center mb-2">
            <Text className="text-2xl font-semibold text-emerald-700">
                FAÇA SEU LOGIN
            </Text>
            </View>

            {/*E-MAIL*/}
            <View className="flex-row items-center border-emerald-700 border-b-2 pb-2 ml-3 mr-3 mt-6 gap-5">
                <Image source={require("bootstrap-icons/icons/envelope-fill.svg")}
                tintColor="#009966"
                style={{height:40, width:40}}
                />
                <TextInput
                    className="w-[90%] outline-none text-xl text-emerald-700 font-semibold placeholder:text-emerald-400"
                    placeholder="E-mail"
                />
            </View>

            {/*SENHA*/}
            <View className="flex-row items-center border-emerald-700 border-b-2 pb-2 ml-3 mr-3 mt-6 gap-5">
                <Image source={require("bootstrap-icons/icons/lock-fill.svg")}
                tintColor="#009966"
                style={{height:40, width:40}}
                />
                <TextInput
                    className="w-[90%] outline-none text-xl text-emerald-700 font-semibold placeholder:text-emerald-400"
                    placeholder="Senha"
                />
                <Image source={require("bootstrap-icons/icons/eye-fill.svg")}
                tintColor="#009966"
                style={{height:40, width:40}}
                />
            </View>

            <View className="flex-row items-center mt-6">
                <Text className="font-semibold w-30 mx-10">Lembrar Login</Text>
                <Pressable><Text className="text-emerald-700 font-semibold w-30 mx-10">Esqueci a Senha</Text></Pressable>
            </View>

            {/*ENTRAR*/}
            <View className="items-center mt-6">
                <Pressable className="bg-emerald-500  p-3  rounded-full w-1/4">
                <Text className="text-md text-white text-center font-semibold">Entrar</Text>
                </Pressable>
            </View>

            {/*CADASTRO*/}
            <View className="flex-row items-center mt-6">
                <Text className="font-semibold mx-10">Não tem Cadastro?</Text>
                <Pressable onPress={()=>navigation.navigate("Cadastro")} ><Text className="text-emerald-700 font-semibold mx-10">Cadastre-se</Text></Pressable>
            </View>
        </View>
    );
}