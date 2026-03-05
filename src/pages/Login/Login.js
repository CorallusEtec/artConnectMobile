import { View, Text, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';
import { Checkbox } from 'expo-checkbox';
import { useState } from "react";
import globalStyles from "../../globalStyles";
import InputIcon from "../../components/InputIcon";
import InputSenha from "../../components/InputSenha";

{/*SE VOCê ESTÁ LENDO ISSO, O COMMIT DEU CERTO!*/}

export default function Login() {
    const navigation = useNavigation();
    const [senha, setSenha] = useState();
    const [email, setEmail] = useState();
    const [isChecked, setChecked] = useState(false);

    return (
        <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#04CBAC" }}>


            {/*IMAGEM DE FUNDO*/}
            <View style={{ flex: 0.15, maxHeight: "100%", maxWidth: "100%", backgroundColor: "#04CBAC" }}>
            </View>


            {/*TÍTULO*/}
            <View className="rounded-t-xl bg-white" style={{ flex: 0.9 }}>
                {/* TITULO */}
                <View style={{flex:0.2}} className=" justify-center items-center">
                    <Text className="text-4xl text-gray-600">
                        Login
                    </Text>


                    <Text className="text-xl text-gray-500">
                        Bem vindo! Entre com sua conta.
                    </Text>
                </View>

                {/* EMAIL */}
                <View style={{flex:0.21}} className="gap-3 p-2">   
                    {/*E-MAIL*/}
                    <InputIcon>
                        <Feather
                            name="mail"
                            size={24}
                            color={globalStyles.icone.corIcones}
                        />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            className="w-[90%] text-xl outline-none font-normal"
                            placeholder="E-mail"
                        />
                    </InputIcon>
                    {/*SENHA*/}
                    <InputSenha placeholder={"Senha"} value={senha} setValue={setSenha} />
                </View>

                {/* Opções */}
                <View style={{flex:0.1}} className="flex-row items-start justify-around">
                    <View className="flex flex-row items-center gap-3">
                        <Checkbox
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? globalStyles.paleta.verdePrimary : undefined}
                        />
                        <Text className="font-normal">Lembre-se de mim</Text>
                    </View>
                    <Pressable><Text className="text-gray-500">Esqueci a Senha</Text></Pressable>
                </View>


                {/*ENTRAR*/}
                <View style={{flex:0.18}} className="items-center">
                    <Pressable style={{backgroundColor: '#04CBAC'}} className="rounded-lg p-3 w-2/4">
                    <Text className="text-2xl text-white text-center">Logar</Text>
                    </Pressable>
                    <Pressable style={{backgroundColor: "#fff"}} className="mt-10 border-gray-300 border-2 rounded-lg bg-emerald-500 p-3 w-3/4">
                    <Text className="text-2xl text-gray-500 text-center">Entrar sem Login</Text>
                    </Pressable>
                </View>

                {/*CADASTRO*/}
                <View style={{flex:0.23}} className="flex-row items-center justify-center">
                    <Pressable className="flex flex-row" onPress={()=>navigation.navigate("Cadastro")} ><Text className="text-lg font-light">Não tem Cadastro? </Text>
                    <Text className="text-lg text-gray-500">Cadastre-se</Text></Pressable>
                </View>
            </View>
        </View>
    );
}