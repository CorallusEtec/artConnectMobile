import { View, Image, Pressable, TextInput } from "react-native";
import globalStyles from "../globalStyles";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
export default function InputSenha({ value, setValue, placeholder }) {
    
    const [mostrarSenha, setMostrarSenha] = useState(false);
  
    return (
      <View className="gap-1.5 border border-stone-300 rounded-md flex flex-row bg-stone-200 p-1 items-center justify-between">
        <View className="flex flex-row items-center gap-2">
          <Feather name="lock"
          size={globalStyles.icone.size}
          color={globalStyles.icone.corIcones}
          />
          <TextInput
          secureTextEntry={!mostrarSenha}
          value={value}
          onChangeText={setValue}
          className="w-80 text-xl outline-none font-normal"
          placeholder={placeholder}
          keyboardType="default"
          />
        </View>
        <Pressable onPress={()=>setMostrarSenha(!mostrarSenha)}>
          <Feather
            name={!mostrarSenha?"eye":"eye-off"}
            color={globalStyles.paleta.corIcones}
            size={globalStyles.icone.size}
          />
        </Pressable>
      </View>
  );
}
