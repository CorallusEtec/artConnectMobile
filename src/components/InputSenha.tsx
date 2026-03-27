import { View, Image, Pressable, TextInput } from "react-native";
import globalStyles from "../globalStyles";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
export default function InputSenha({ value, setValue, placeholder }) {
    
    const [mostrarSenha, setMostrarSenha] = useState(false);
  
    return (
      <View className="gap-1.5 border w-full border-stone-300 rounded-md flex-row bg-stone-200 p-1 items-center">
          <Feather name="lock"
          size={globalStyles.icone.size}
          color={globalStyles.icone.corIcones}
          />
          <TextInput
          secureTextEntry={!mostrarSenha}
          value={value}
          onChangeText={setValue}
          className="text-xl w-[80%] outline-none font-normal"
          placeholder={placeholder}
          keyboardType="default"
          />
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
