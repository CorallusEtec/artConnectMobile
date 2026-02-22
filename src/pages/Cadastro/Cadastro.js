import { View, Image, Text, TextInput, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
export default function Cadastro() {
  const meses = [
    { num: 1, nome: "Janeiro" },
    { num: 2, nome: "Fevereiro" },
    { num: 3, nome: "Março" },
    { num: 4, nome: "Abril" },
    { num: 5, nome: "Maio" },
    { num: 6, nome: "Junho" },
    { num: 7, nome: "Julho" },
    { num: 8, nome: "Agosto" },
    { num: 9, nome: "Setembro" },
    { num: 10, nome: "Outubro" },
    { num: 11, nome: "Novembro" },
    { num: 12, nome: "Dezembro" },
  ];
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nome, setNome] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState(1);
  const [ano, setAno] = useState();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      {/* IMAGEM DE FUNDO */}
      <View style={{ flex: 0.15 }}>
        <Image
          className="rounded-b-2xl"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          source={require("../../../assets/img/banner.jpeg")}
        />
      </View>

      <View style={{ flex: 0.8, flexDirection: "column" }} className="m-2">
        <View className="items-center">
          <Text className="text-2xl font-semibold text-emerald-700">
            FAÇA SEU CADASTRO
          </Text>
        </View>

        <View className="flex-row items-center border-emerald-700 border-b-2 pb-2 ml-3 mr-3">
          <Image
            style={{ height: 40, width: 40 }}
            source={require("bootstrap-icons/icons/person-fill.svg")}
            tintColor="#009966"
          />
          <TextInput
            value={nome}
            onChangeText={(nome) => setNome(nome)}
            className="w-[90%] outline-none text-xl text-emerald-700 font-semibold placeholder:text-emerald-400"
            placeholder="Nome de usuário"
          />
        </View>

        <View style={{flex:0.14}} className="m-3">
          <View style={{flex:1}} className="flex-row gap-2 ">
            <Image
              style={{ height: 40, width: 40 }}
              tintColor="#009966"
              source={require("bootstrap-icons/icons/calendar-event.svg")}
            />
            <Text className="text-center font-semibold text-lg text-emerald-700">
              Data de Nascimento
            </Text>
          </View>
          <View className="flex-row justify-around">
            <TextInput
              placeholder="Dia"
              inputMode="numeric"
              maxLength={2}
              keyboardType="numeric"
              value={dia}
              onChangeText={(e) => setDia(e)}
              className="placeholder:text-green-200 outline-none text-center font-semibold bg-emerald-500 text-lg p-3 w-1/4 text-white rounded-full"
            />
            <Picker
              className="bg-emerald-500 p-3 text-lg text-white rounded-full font-semibold text-center"
              selectedValue={mes}
              onValueChange={(mes) => setMes(mes)}
            >
              {meses.map((mes) => {
                return (
                  <Picker.Item key={mes.num} label={mes.nome} value={mes.num} />
                );
              })}
            </Picker>
            <TextInput
              placeholder="Ano"
              value={ano}
              onChangeText={(e) => setAno(e)}
              inputMode="numeric"
              maxLength={4}
              keyboardType="numeric"
              className="placeholder:text-green-200 outline-none text-lg text-center font-semibold bg-emerald-500 p-3 w-1/4 text-white rounded-full"
            />
          </View>
        </View>
        
        <View style={{flex:0.1}} className="mb-5 flex-row items-center border-emerald-700 border-b-2 gap-2 pb-2 ml-3 mr-3">
          <Image source={require("bootstrap-icons/icons/envelope-fill.svg")}
          tintColor="#009966"
          style={{height:40, width:40}}
          />
          <TextInput
            value={email}
            keyboardType="email-address"
            inputMode="email"
            textContentType="emailAddress"
            onChangeText={(email) => setEmail(email)}
            className="w-[90%] outline-none text-xl text-emerald-700 font-semibold placeholder:text-emerald-400"
            placeholder="E-Mail"
          />
        </View>
        <View style={{flex:0.1}} className=" mb-5 flex-row items-center border-emerald-700 border-b-2 gap-2 ml-3 mr-3">
          <Image source={require("bootstrap-icons/icons/lock-fill.svg")}
          tintColor="#009966"
          style={{height:40, width:40}}
          />
          <TextInput
            value={senha}
            textContentType="newPassword"
            secureTextEntry={!mostrarSenha}
            keyboardType="visible-password"
            onChangeText={(senha) => setSenha(senha)}
            className="w-[90%] self-center outline-none text-xl text-emerald-700 font-semibold placeholder:text-emerald-400"
            placeholder="Senha"
          />
          <Pressable onPress={()=>setMostrarSenha(!mostrarSenha)}>
            <Image 
            style={{height:30, width:30}}
            tintColor="#009966"
            source={mostrarSenha?require('bootstrap-icons/icons/eye-fill.svg'):require('bootstrap-icons/icons/eye-slash-fill.svg')} />
          </Pressable>
        </View>
        <View className="flex-row justify-center">
          <Pressable className="  bg-emerald-500  p-3  rounded-full">
            <Text className="text-lg text-white text-center font-semibold">Criar conta</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
