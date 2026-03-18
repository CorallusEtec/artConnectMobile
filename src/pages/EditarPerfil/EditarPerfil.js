import { View, Text, Pressable, ActivityIndicator, ScrollView } from "react-native";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import { ArtistaService } from "../../services/ArtistaService";
import ArtistaModel from "../../models/ArtistaModel";
import { ErroValidacao } from "../../services/ErroValidacao";
import { SafeAreaView } from "react-native-safe-area-context";
import MaskInput from "react-native-mask-input";

export default function EditarPerfil() {
    const navigation = useNavigation();
    const [artista, setArtista] = useState(new ArtistaModel(null));
    const [load, setLoad] = useState(true);
    let valido = new ErroValidacao();
    const [validoVisual, setValidoVisual] = useState(valido);

    function refreshValido(state, tempo) {
        setValidoVisual(state);
        setTimeout(()=>{
            setValidoVisual(st=>({
                ...st,
                valido: true
            }));
        }, tempo)
    }

    const [listaUf, setListaUf] = useState([]);

    async function attPeloCEP(cep) {
        if(cep.length ==9) {
            try {
                setLoad(true);
                const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                return data.json();
            } finally {
                setLoad(false);
            }
        }
    }

    function handleArtista(valor, campo) {
        switch(campo) {
            case 'numLog':
                setArtista(dados=>({
                    ...dados,
                    [campo]: Number(valor)
                }));
                break
            case 'nomeLog':
                setArtista(dados=>({
                    ...dados,
                    [campo]: valor,
                    tipoLog: valor.split(' ')[0]
                }));
                break;
            case 'cep':
                (async ()=>{
                    if(valor.length >= 9) {
                        const data = await attPeloCEP(valor);
                        setArtista(dados=>({
                            ...dados,
                            cep: valor,
                            bairro: data.bairro,
                            cidade: data.localidade,
                            nomeLog: data.logradouro,
                            tipoLog: data.logradouro.split(" ")[0],
                            estado: data.uf
                        }));
                    } else {
                        setArtista(dados=>({
                            ...dados,
                            [campo]: valor
                        }));
                    }
                    
                })();
                break;
            default:
                setArtista(st=>({
                    ...st,
                    [campo]: valor
                }));
                break;
        }
    }
    const fetchUfs = async () => {
        try {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
            const data = await response.json();
            setListaUf(data);
        } catch (e) {

        }
    };
    useEffect(() => {
        try {
            (async()=>{
                await fetchUfs();
                const login = await ArtistaService.getUserLocal();
                const data = await ArtistaService.login(login.email, login.senha);
                if(data != null || data != undefined) {
                    setArtista(data);
                } else {
                    navigation.navigate("Login", new ErroValidacao().invalido("Erro na requisição, tente mais tarde"))
                }
            })();
        } finally {
            setLoad(false);
        }
    }, []);

    function alter() {
        valido = ArtistaService.validarCampos(artista, undefined, ['nome', 'nomeLog', 'cep', 'numLog', 'bairro', 'cidade', 'estado'])
        setValidoVisual(valido);
        if(valido.valido) {
            (async()=>{
                const status = await ArtistaService.alterarArtista(artista);
                if(status == 200) {
                    navigation.navigate("SeuPerfil");
                } else {
                    refreshValido(valido.invalido("Não foi possível salvar as alterações"), 2000);
                }
            })();
        } else {
            refreshValido(valido, 2000);
        }
    }

    if(load) return <View><ActivityIndicator size={"large"} /></View>
    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/*HEADER*/}
            <View className="flex-row items-center px-4" style={{ backgroundColor: "#04CBAC" }}>
                <Pressable onPress={navigation.goBack}><AntDesign name="arrow-left" size={24} color="white" /></Pressable>
                <Text className="text-2xl text-gray-100 m-4">
                    Editar Perfil
                </Text>
            </View>

            <ScrollView style={{flex:0.8}} className="p-3">
                {/*FOTO DE PERFIL*/}
                <View className="mb-5">
                    <View className="flex-row justify-center mb-2">
                        {/*ÍCONE PROVISÓRIO*/}
                        <MaterialCommunityIcons name="face-man-profile" size={125} color="black" />
                    </View>
                    <View className="items-center">
                        <View className="flex-row w-[70%] justify-around">
                            <Pressable>
                                <FontAwesome6  name="trash-can" size={24} color="#04CBAC" />
                            </Pressable>
                            <Pressable>
                                <Feather name="edit-2" size={24} color="#04CBAC" />
                            </Pressable>
                        </View>
                    </View>

                </View>
                
                {/* FORMULÁRIO */}
                {!validoVisual.valido?<Text className="text-base text-red-500">* {validoVisual.msg}</Text>:<></>}
                <View className="gap-5">  
                    {/*NOME*/}
                    <View className="gap-1">
                        <Text>Nome</Text>
                        <View className="flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg gap-2">
                            <MaterialCommunityIcons style={{margin:7}} name="face-man-profile" size={25} color="#5a5a5a" />
                            <TextInput
                                className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                                placeholder="Nome Completo"
                                value={artista.nome}
                                onChangeText={(e)=>handleArtista(e, 'nome')}
                            />
                        </View >
                    </View>

                    {/* ENDEREÇO */}
                    <View className="gap-3">
                        <Text className="font-normal text-2xl">Endereço</Text>
                        {/* NOME LOG */}
                        <View className="gap-1">
                            <Text>Logradouro</Text>
                            <View className="w-5/5 flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg gap-2">
                                <FontAwesome5 style={{margin:7}} name="map-pin" size={25} color="#5a5a5a" />
                                <TextInput
                                    className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                                    placeholder="Logradouro"
                                    value={artista.nomeLog}
                                    onChangeText={(e)=>handleArtista(e, 'nomeLog')}
                                />
                            </View>
                        </View>

                        {/* CEP E NUM */}
                        <View className="gap-3 flex-row justify-between">
                            {/* CEP */}
                            <View className="gap-1 w-2/5">
                                <Text>CEP</Text>
                                <View className=" flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg gap-2">
                                    <SimpleLineIcons style={{margin:7}} name="location-pin" size={25} color="black" />
                                    <MaskInput
                                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                        maxLength={9}
                                        className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                                        placeholder="CEP"
                                        value={artista.cep}
                                        onChangeText={(e)=>handleArtista(e, 'cep')}
                                    />
                                </View>
                            </View>
                            {/* NUM */}
                            <View className="gap-1 w-2/5">
                                <Text>Número</Text>
                                <View className=" flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg gap-2">
                                    <Feather style={{margin:7}} name="hash" size={25} color="#5a5a5a" />
                                    <TextInput
                                        className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                                        placeholder="N°"
                                        value={artista.numLog}
                                        onChangeText={(e)=>handleArtista(e, 'numLog')}
                                    />
                                </View>
                            </View>
                        </View>
                        
                        {/* COMPLEMENTO */}
                        <View className="gap-1">
                            <Text>Complemento</Text>
                            <View className="flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg gap-2">
                                <Feather style={{margin:7}} name="map" size={25} color="#5a5a5a" />
                                
                                <TextInput
                                    className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                                    placeholder="Complemento"
                                    value={artista.complemento}
                                    onChangeText={(e)=>handleArtista(e, 'complemento')}
                                />
                            </View>
                        </View>
                        
                        {/* BAIRRO */}
                        <View className="flex-row flex-wrap gap-1">

                            {/* BAIRRO */}
                            <Text className="font-normal">Bairro</Text>
                            <View className=" w-full p-2 flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg gap-2">
                                <TextInput
                                    className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                                    placeholder="Bairro"
                                    value={artista.bairro}
                                    onChangeText={(e)=>handleArtista(e, 'bairro')}
                                />
                            </View>
                        </View>

                        {/* CIDADE */}
                        <View className="gap-1">
                            <Text className="font-normal">Cidade</Text>
                            <View className=" mb-7 flex-row items-center bg-gray-200 border-gray-300 border-2 rounded-lg gap-2">
                                <MaterialCommunityIcons style={{margin:7}} name="city-variant-outline" size={25} color="#5a5a5a" />
                                <TextInput
                                    className="w-[90%] outline-none text-xl text-gray-500 placeholder:text-gray-500"
                                    placeholder="Cidade"
                                    value={artista.cidade}
                                    onChangeText={(e)=>handleArtista(e, 'cidade')}
                                />
                            </View>
                        </View>

                        {/* UF */}
                        <View className="items-center">
                            <View className="items-center">
                                <Text className="self-start">UF</Text>
                                <Picker
                                    className="w-[100%] p-1.5 text-xl bg-gray-200 border-gray-300 border-2 rounded-lg text-gray-500"
                                    selectedValue={artista.estado}
                                    onValueChange={(itemValue, itemIndex) =>
                                        handleArtista(itemValue, 'estado')
                                    }>
                                        <Picker.Item value="" label="UF" />
                                    {listaUf.map((uf) => (
                                        <Picker.Item key={uf.id} label={`${uf.nome} (${uf.sigla})`} value={uf.sigla} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>

                    {/*SALVAR*/}
                    <View className="items-center">
                        <Pressable onPress={()=>alter()} style={{backgroundColor: "#04CBAC"}} 
                        className="rounded-lg bg-emerald-500 p-2 w-3/5">
                            <Text className="text-2xl text-white text-center">Salvar<Feather name="save" size={24} color="white" /></Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}