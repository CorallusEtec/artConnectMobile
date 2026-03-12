import { View, Text, Pressable, TextInput, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import globalStyles from "../../globalStyles";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InputIcon from "../../components/InputIcon";
import { Picker } from "@react-native-picker/picker";
import useStore from "../../store";
import ArtistaModel from "../../models/ArtistaModel";
export default function CadastroEndereco() {

    const navigate = useNavigation();
    const [ufs, setUfs] = useState([]);
    const [selectedUf, setSelectedUf] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchUfs = async () => {
        try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        const data = await response.json();
        setUfs(data);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchUfs();
    }, []);

    if (loading) return <View><ActivityIndicator size="large" style={{ margin: 300 }} /></View>;

    return (
        <View style={{flex:1}} className="p-5">
            {/* TITULO */}
            <View className="flex flex-row justify-between items-end">
                <View className="">
                    <Pressable onPress={()=>navigate.navigate("Cadastro")}>
                        <Feather name="arrow-left-circle" size={32} color={globalStyles.paleta.verdePrimary} />
                    </Pressable>
                </View>
                <Text className="text-emerald-700 font-light text-4xl">Endereço</Text>
                <Text></Text>
            </View>
            {/* SUBTITULO */}
            <View className="justify-start items-center mb-10">
                <Text className="w-[75%] text-center font-light text-xl">Confirme seu endereço nos campos abaixo</Text>
            </View>
            {/* CAMPOS */}
            <View className="gap-2 mb-10">
                {/* LOGRADOURO */}
                <InputIcon>
                    <Feather name="map" size={24} color={globalStyles.paleta.corIcones} />
                    <TextInput value={log} onChangeText={setLog} className="outline-none w-[90%] text-lg" placeholder="Logradouro" />
                </InputIcon>
                {/* COMPLEMENTO */}
                <InputIcon>
                    <Ionicons name="pin" size={24} color={globalStyles.paleta.corIcones} />
                    <TextInput value={comp} onChangeText={setComp} className="outline-none w-[90%] text-lg" placeholder="Complemento" />
                </InputIcon>
                <View className="flex flex-row justify-between">
                    {/* CEP */}
                    <View className="p-1.5 flex flex-row w-[38%] bg-stone-200 border border-stone-300 rounded-lg gap-1.5">
                        <Feather name="map-pin" size={24} color={globalStyles.paleta.corIcones} style={{alignSelf: 'center'}} />
                        <TextInput value={cep} onChangeText={setCep} className="outline-none text-lg w-[90%]" placeholder="CEP" />
                    </View>
                    {/* BAIRRO */}
                    <View className="flex items-center w-[60%] p-1.5 flex-row bg-stone-200 border border-stone-300 rounded-lg">
                        <TextInput value={bairro} onChangeText={setBairro} className="outline-none w-full text-lg" placeholder="Bairro" />
                    </View>
                </View>
                {/* CIDADE */}
                <InputIcon>
                    <MaterialIcons name="location-city" size={24} color={globalStyles.paleta.corIcones} />
                    <TextInput value={cidade} onChangeText={setCidade} className="text-lg w-[90%] outline-none" placeholder="Cidade" />
                </InputIcon>
                {/* UF */}
                <View className="border p-2 self-center border-stone-300 rounded-lg bg-stone-200">
                    <Picker
                        className="p-1.5 flex flex-row bg-stone-200 border border-stone-300 rounded-lg gap-1.5"
                        selectedValue={selectedUf}
                        onValueChange={(itemValue) => setSelectedUf(itemValue)}
                        >
                        <Picker.Item label="Estado (UF)" value="" />
                        {ufs.map((uf) => (
                            <Picker.Item key={uf.id} label={`${uf.nome} (${uf.sigla})`} value={uf.sigla} />
                        ))}
                    </Picker>
                </View>
            </View>
            {/* PROXIMO */}
            <View className="items-center">
                <Pressable onPress={()=>coletarDados()} className=" p-2 bg-emerald-700 rounded-full">
                    <Feather name="arrow-right" size={24} color="white" />
                </Pressable>
            </View>
        </View>
    )
}