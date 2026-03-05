import { View, Text, Pressable, TextInput } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import globalStyles from "../../globalStyles";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InputIcon from "../../components/InputIcon";
import { Picker } from "@react-native-picker/picker";
export default function CadastroEndereco() {
    const navigate = useNavigation();
    return (
        <View style={{flex:1}} className="p-5">
            <View style={{flex:0.13}} className="flex flex-row justify-between items-end">
                <View className="">
                    <Pressable onPress={()=>navigate.navigate("Cadastro")}>
                        <Feather name="arrow-left-circle" size={32} color={globalStyles.paleta.verdePrimary} />
                    </Pressable>
                </View>
                <Text className="text-emerald-700 font-light text-4xl">Endereço</Text>
                <Text></Text>
            </View>
            <View style={{flex:0.2}} className="justify-start items-center">
                <Text className="w-[75%] text-center font-light text-xl">Confirme seu endereço nos campos abaixo</Text>
            </View>
            <View style={{flex:0.1}} className="gap-2">
                <InputIcon>
                    <Feather name="map" size={24} color="black" />
                    <TextInput className="w-[86%]" placeholder="Logradouro" />
                </InputIcon>
                <InputIcon>
                    <Ionicons name="pin" size={24} color="black" />
                    <TextInput className="w-[86%]" placeholder="Complemento" />
                </InputIcon>
                <View className="flex flex-row justify-between gap-">
                    <View className="flex flex-row w-[38%] bg-stone-200 border border-stone-300 rounded-lg px-1">
                        <Feather name="map-pin" size={24} color={globalStyles.paleta.corIcones} style={{alignSelf: 'center'}} />
                        <TextInput className="w-[83%]" placeholder="CEP" />
                    </View>
                    <View className="flex items-center w-[60%] flex-row bg-stone-200 border border-stone-300 rounded-lg">
                        <TextInput className="w-[88%]" placeholder="Bairro" />
                    </View>
                </View>
                <InputIcon>
                    <MaterialIcons name="location-city" size={24} color={globalStyles.paleta.corIcones} />
                    <TextInput className="w-[90%]" placeholder="Cidade" />
                </InputIcon>
                <View className="border w-[65%] self-center border-stone-300 rounded-lg bg-stone-200">
                    <Picker>
                        <Picker.Item label="UF" />
                    </Picker>
                </View>
            </View>
            <View className="items-center">
                <Pressable className=" p-2 bg-emerald-700 rounded-full">
                    <Feather name="arrow-right" size={24} color="white" />
                </Pressable>
            </View>
        </View>
    )
}