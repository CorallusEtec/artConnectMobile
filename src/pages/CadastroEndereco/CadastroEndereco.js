import { View, Text, Pressable, TextInput } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import globalStyles from "../../globalStyles";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InputIcon from "../../components/InputIcon";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
export default function CadastroEndereco() {
    const navigate = useNavigation();
    return (
        <SafeAreaView style={{flex:1}} className="p-5">
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
                    <TextInput className="outline-none w-[90%] text-lg" placeholder="Logradouro" />
                </InputIcon>
                {/* COMPLEMENTO */}
                <InputIcon>
                    <Ionicons name="pin" size={24} color={globalStyles.paleta.corIcones} />
                    <TextInput className="outline-none w-[90%] text-lg" placeholder="Complemento" />
                </InputIcon>
                <View className="flex flex-row justify-between">
                    {/* CEP */}
                    <View className="p-1.5 flex flex-row w-[38%] bg-stone-200 border border-stone-300 rounded-lg gap-1.5">
                        <Feather name="map-pin" size={24} color={globalStyles.paleta.corIcones} style={{alignSelf: 'center'}} />
                        <TextInput className="outline-none text-lg w-[90%]" placeholder="CEP" />
                    </View>
                    {/* BAIRRO */}
                    <View className="flex items-center w-[60%] p-1.5 flex-row bg-stone-200 border border-stone-300 rounded-lg">
                        <TextInput className="outline-none w-full text-lg" placeholder="Bairro" />
                    </View>
                </View>
                {/* CIDADE */}
                <InputIcon>
                    <MaterialIcons name="location-city" size={24} color={globalStyles.paleta.corIcones} />
                    <TextInput className="text-lg w-[90%] outline-none" placeholder="Cidade" />
                </InputIcon>
                {/* UF */}
                <View className="border w-[65%] p-2 self-center border-stone-300 rounded-lg bg-stone-200">
                    <Picker>
                        <Picker.Item label="UF" />
                    </Picker>
                </View>
            </View>
            {/* PROXIMO */}
            <View className="items-center">
                <Pressable onPress={()=>navigate.navigate("TipoArte")} className=" p-2 bg-emerald-700 rounded-full">
                    <Feather name="arrow-right" size={24} color="white" />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}