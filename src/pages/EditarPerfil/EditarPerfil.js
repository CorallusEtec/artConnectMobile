import { View, Text, Pressable, Image, Modal } from "react-native";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import ArtistaService from "../../services/ArtistaService";
import useStore from "../../store";

export default function EditarPerfil() {
    const navigation = useNavigation();
    const usuario = useStore((state) => state.usuario);
    const alter = useStore((state) => state.alter);
    const [isChecked, setChecked] = useState(false);
    const [selectedUf, setSelectedUf] = useState();

    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [complemento, setComplemento] = useState("");
    const [cep, setCep] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");

    async function salvar() {
        try{
        const dadosUsuario = {
            nome,
            bairro,
            cep,
            complemento,
            nomeLog: logradouro,
            cidade
        };
        await ArtistaService.alterarUsuario(dadosUsuario);

        const userAtualizado = {
            ...usuario,
            ...dadosUsuario
        };
        alter(userAtualizado);
        await ArtistaService.saveUserLocal(userAtualizado);
        navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    } 

        // CARREGA VALOR NOS INPUTS
        useEffect(() => {
            if(usuario) {
                setNome(usuario.nome || "");
                setLogradouro(usuario.nomeLog || "");
                setComplemento(usuario.complemento || "");
                setCep(usuario.cep || "");
                setBairro(usuario.bairro || "");
                setCidade(usuario.cidade || "");
            }
        }, [usuario]);

        const [modal, setModal] = useState (false);
        const abrirModal = () =>{
            setModal(true)
        }
        const fecharModal = () =>{
            setModal(false)
        }

    return (
        <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#04CBAC" }}>


            {/*HEADER*/}
            <View className="flex-row items-center ml-5" style={{ flex: 0.11, maxHeight: "100%", maxWidth: "100%", backgroundColor: "#04CBAC" }}>
                <Pressable onPress={navigation.goBack}><AntDesign name="arrow-left" size={24} color="white" /></Pressable>
                <Text className="text-2xl text-gray-100 m-4">
                    Editar Perfil
                </Text>
            </View>


            <View style={{ flex: 1.4, flexDirection: "column", backgroundColor: "#ffffff" }}>
                

                {/*FOTO DE PERFIL*/}
                <View className="items-center mb-2">
                    {/*ÍCONE PROVISÓRIO*/}
                    <MaterialCommunityIcons name="face-man-profile" size={125} color="black" />
                </View>
                <View className="flex-row items-center mb-2">
                    <Pressable>
                        <FontAwesome6 className="ml-36" name="trash-can" size={24} color="#04CBAC" />
                    </Pressable>
                    <Pressable>
                        <Feather className="mx-20" name="edit-2" size={24} color="#04CBAC" />
                    </Pressable>
                </View>


                {/*FORMLÁRIO*/}
                {/* nome */}
                <View className="flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg ml-3 mr-3 mt-1 gap-2">
                    <MaterialCommunityIcons style={{margin:7}} name="face-man-profile" size={25} color="#5a5a5a" />
                    <TextInput
                        className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                        placeholder="Nome Completo"
                        value={nome}
                        onChangeText={setNome}
                    />
                </View >

                <View className="my-6">
                    <Text className=" font-semibold text-2xl"> Contatos </Text>
                    <View>
                        <Text className="text-xl"> Telefone(s) </Text>
                        <View className="flex flex-row justify-between items-center bg-gray-200 border-gray-300 border-2 rounded-lg m-3 gap-2">
                            <MaterialCommunityIcons style={{margin:7}} name="phone-plus-outline" size={25} color="#5a5a5a" />
                            <TextInput 
                                className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                                placeholder="(11) 99999-9999"
                            />
                            <Pressable>
                                <FontAwesome style={{margin:7}} name="trash-o" size={24} color="red" />
                            </Pressable>
                        </View>
                            <Pressable className="flex-row justify-center items-center" onPress={abrirModal}>
                                <Text className="text-xl text-[#04CBAC]"> Adicionar telefone </Text>
                                <FontAwesome6 name="add" size={24} color="#04CBAC" />
                            </Pressable>
                    </View>

                    <View>
                        <Text className="text-xl"> Email(s) </Text>
                        <View className="flex flex-row justify-between items-center bg-gray-200 border-gray-300 border-2 rounded-lg m-3 gap-2">
                            <MaterialCommunityIcons style={{margin:7}} name="email" size={25} color="#5a5a5a" />
                            <TextInput 
                                className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                                placeholder="(11) 99999-9999"
                            />
                            <Pressable>
                                <FontAwesome style={{margin:7}} name="trash-o" size={24} color="red" />
                            </Pressable>
                        </View>
                            <Pressable className="flex-row justify-center items-center">
                                <Text className="text-xl text-[#04CBAC]"> Adicionar email </Text>
                                <FontAwesome6 name="add" size={24} color="#04CBAC" />
                            </Pressable>
                    </View>
                </View>

                {/* LOGRADOURO */}
                <Text className="font-semibold text-2xl ml-4">Endereço</Text>
                    <View className="w-5/5 flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg ml-3 m-3 gap-2">
                        <FontAwesome5 style={{margin:7}} name="map-pin" size={25} color="#5a5a5a" />
                        <TextInput
                            className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                            placeholder="Logradouro"
                            value={logradouro}
                        onChangeText={setLogradouro}
                        />
                    </View>

                {/* COMPLEMENTO */}
                <View className="flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg ml-3 m-3 gap-2">
                    <Feather style={{margin:7}} name="map" size={25} color="#5a5a5a" />
                    
                    <TextInput
                        className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                        placeholder="Complemento"
                        value={complemento}
                        onChangeText={setComplemento}
                    />
                </View>
                
                <View className="flex-row flex-wrap">
                    {/* CEP */}
                    <View className="w-1/4 flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg ml-3 m-3 gap-2">
                        <SimpleLineIcons style={{margin:7}} name="location-pin" size={25} color="black" />
                        <TextInput
                            className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                            placeholder="CEP"
                            value={cep}
                        onChangeText={setCep}
                        />
                    </View>

                    {/* BAIRRO */}
                    <View className="w-3/5 flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg ml-3 m-3 gap-2">
                        <Feather style={{margin:7}} name="mail" size={25} color="#5a5a5a" />
                        <TextInput
                            className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                            placeholder="Bairro"
                            value={bairro}
                        onChangeText={setBairro}
                        />
                    </View>
                </View>

                {/* CIDADE */}
                <View className=" mb-7 flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg ml-3 m-3 gap-2">
                    <MaterialCommunityIcons style={{margin:7}} name="city-variant-outline" size={25} color="#5a5a5a" />
                    <TextInput
                        className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                        placeholder="Cidade"
                        value={cidade}
                        onChangeText={setCidade}
                    />
                </View>

                {/* UF */}
                <View className="items-center">
                    <Picker
                        className="w-[60%] p-1.5 text-xl bg-gray-200 border-gray-300 border-2 rounded-lg text-gray-500"
                        selectedValue={selectedUf}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedUf(itemValue)
                        }>
                        <Picker.Item label="AC" value="Pintura" />
                        <Picker.Item label="AP" value="Teatro" />
                        <Picker.Item label="AM" value="Música" />
                        <Picker.Item label="PA" value="Literatura" />
                    </Picker>
                </View>

                {/*SALVAR*/}
                <View className="items-center">
                    <Pressable style={{backgroundColor: "#04CBAC"}} 
                    className="mt-10 rounded-lg bg-emerald-500 p-2 w-3/5"
                    onPress={salvar}>
                    <Text className="text-2xl text-white text-center">Salvar<Feather name="save" size={24} color="white" /></Text>
                    </Pressable>
                </View>
            </View>

            <Modal
            visible={modal}
            transparent={true}>
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white rounded-3xl items-center w-[90%]">
                        <View className="flex-row">
                            <Pressable onPress={fecharModal}>
                            <Ionicons className="m-3" name="close" size={25} color="gray" />
                            </Pressable>
                            <View className="flex-col items-center justify-center">
                                <Text className="text-2xl m-3 mr-14">Adicionar telefone</Text>
                                <View className="w-4/4 flex-row items-center justify-center bg-gray-200 border-gray-300 border-2 rounded-lg m-3 gap-2">
                                <MaterialCommunityIcons style={{margin:7}} name="phone-plus-outline" size={25} color="#5a5a5a" />
                                    <TextInput
                                    className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                                    placeholder="digite o telefone"
                                    value={telefone}
                                    onChangeText={setTelefone}
                                    />
                                </View>
                                <View className="items-center">
                                    <Pressable style={{backgroundColor: "#04CBAC"}} 
                                    className="m-3 rounded-lg bg-emerald-500 p-2 w-4/4"
                                    >
                                    <Text className="text-2xl text-white text-center">Salvar<Feather name="save" size={24} color="white" /></Text>
                                    </Pressable>
                                </View>
                            </View>
                            
                        </View>
                            
                    </View>
                </View>
            </Modal>
        </View>
    );
}