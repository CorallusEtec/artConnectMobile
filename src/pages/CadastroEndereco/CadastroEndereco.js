import { View, Text, Pressable, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import globalStyles from "../../globalStyles";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InputIcon from "../../components/InputIcon";
import { Picker } from "@react-native-picker/picker";
import ArtistaModel from "../../models/ArtistaModel";
import useStore from "../../store";
import { ArtistaService } from "../../services/ArtistaService";
import { ErroValidacao } from "../../services/ErroValidacao";
import MaskInput from "react-native-mask-input";

export default function CadastroEndereco() {

    const navigate = useNavigation();
    const [artista, setArtista] = useState(new ArtistaModel())
    const alterStateUsuario = useStore(store=>store.alter);
    const stateUsuario = useStore(store=>store.usuario);
    const [listaUf, setListaUf] = useState([]);
    let valido = new ErroValidacao();
    const [validoVisual, setValidoVisual] = useState(valido);
    const [loading, setLoading] = useState(true);

    /* ATUALIZA O FEEDBACK DE ERRO */
    function refreshValido(state, tempo) {
        setValidoVisual(state);
        setTimeout(()=>{
            setValidoVisual(st=>({
                ...st,
                valido: true
            }));
        }, tempo)
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
            /*
            if(stateUsuario == null) {
                navigate.navigate("Cadastro");
            } else {
                setArtista(new ArtistaModel(stateUsuario));
            }
            */
            fetchUfs();

        } finally {
            setLoading(false);
        }
    }, []);
    
    
    function coletarDados() {
        valido = ArtistaService.validarCampos(artista, undefined, ['nomeLog', 'numLog', 'cep', 'bairro', 'cidade', 'estado'])
        if(!valido.valido) {
            refreshValido(valido, 2000);
        } else {
            alterStateUsuario(artista);
            navigate.navigate("TipoArte");
        }
    }

    async function attPeloCEP(cep) {
        if(cep.length ==9) {
            try {
                setLoading(true);
                const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                return data.json();
            } finally {
                setLoading(false);
            }
        }
    }
    function handleUsuario(valor, campo) {
        switch (campo) {
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
            default:
                setArtista(dados=>({
                    ...dados,
                    [campo]: valor
                }));
                break;
        }
    }


    if (loading) return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size="large" /></View>;

    return (
        <SafeAreaView style={{flex:1, padding: 10}}>
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
                {!validoVisual.valido?<Text className="text-lg text-red-500">* {validoVisual.msg}</Text>:<></>}
                {/* LOGRADOURO */}
                <View className="flex flex-row gap-1">
                    <View className="w-[70%] gap-1.5 border border-stone-300 rounded-md flex-row bg-stone-200 p-1 items-center">
                        <Feather name="map" size={24} color={globalStyles.paleta.corIcones} />
                        <TextInput value={artista.nomeLog}
                        onChangeText={(e)=>handleUsuario(e, 'nomeLog')}
                        className="outline-none w-[90%] text-lg"
                        placeholder="Logradouro" />
                    </View>
                    <View className="w-[30%] gap-1.5 border border-stone-300 rounded-md flex-row bg-stone-200 p-1 items-center">
                        <Feather name="hash" size={24} color={globalStyles.paleta.corIcones} />
                        <TextInput value={artista.numLog}
                        maxLength={5}
                        keyboardType="numeric"
                        onChangeText={(e)=>handleUsuario(e, 'numLog')}
                        className="outline-none w-[90%] text-lg"
                        placeholder="N°" />
                    </View>
                </View>
                {/* COMPLEMENTO */}
                <InputIcon>
                    <Ionicons name="pin" size={24} color={globalStyles.paleta.corIcones} />
                    <TextInput value={artista.complemento} onChangeText={(e)=>handleUsuario(e, 'complemento')} className="outline-none w-[90%] text-lg" placeholder="Complemento" />
                </InputIcon>
                <View className="flex flex-row justify-between">
                    {/* CEP */}
                    <View className="p-1.5 flex flex-row w-[38%] bg-stone-200 border border-stone-300 rounded-lg gap-1.5">
                        <Feather name="map-pin" size={24} color={globalStyles.paleta.corIcones} style={{alignSelf: 'center'}} />
                        <MaskInput value={artista.cep}
                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                        maxLength={9}
                        keyboardType="numeric"
                        onChangeText={(e)=>handleUsuario(e, 'cep')}
                        className="outline-none text-lg w-[90%]" placeholder="CEP" />
                    </View>
                    {/* BAIRRO */}
                    <View className="flex items-center w-[60%] p-1.5 flex-row bg-stone-200 border border-stone-300 rounded-lg">
                        <TextInput value={artista.bairro} onChangeText={(e)=>handleUsuario(e, 'bairro')} className="outline-none w-full text-lg" placeholder="Bairro" />
                    </View>
                </View>
                {/* CIDADE */}
                <InputIcon>
                    <MaterialIcons name="location-city" size={24} color={globalStyles.paleta.corIcones} />
                    <TextInput value={artista.cidade} onChangeText={(e)=>handleUsuario(e, 'cidade')} className="text-lg w-[90%] outline-none" placeholder="Cidade" />
                </InputIcon>
                {/* UF */}
                <View className="border w-[75%] self-center border-stone-300 rounded-lg bg-stone-200">
                    <Picker
                        selectedValue={artista.estado}
                        onValueChange={(itemValue) => handleUsuario(itemValue, 'estado')}
                        >
                        <Picker.Item label="UF" value="" />
                            {listaUf.map((uf) => (
                                <Picker.Item key={uf.id} label={`${uf.nome} (${uf.sigla})`} value={uf.sigla} />
                            ))}
                    </Picker>
                </View>
            {/* PROXIMO */}
            <View className="items-center">
                <Pressable onPress={()=>coletarDados()} className=" p-2 bg-emerald-700 rounded-full">
                    <Feather name="arrow-right" size={24} color="white" />
                </Pressable>
            </View>
            </View>
        </SafeAreaView>
    )
}