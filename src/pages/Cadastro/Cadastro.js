<<<<<<< HEAD
import { View, Image, Text, TextInput, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
export default function Cadastro() {
  const navigation = useNavigation();
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
      <View style={{ flex: 0.1 }}>
        <Image
          className="rounded-b-2xl"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          source={require("../../../assets/img/banner.jpeg")}
        />
      </View>

      <View style={{ flex: 0.8, flexDirection: "column" }}>
        <View className="items-center mb-2">
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

        <View style={{flex:0.16}} className="m-3">
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
              className="placeholder:text-green-200 outline-none text-center font-semibold bg-emerald-500 text-md p-1 w-1/4 text-white rounded-full"
            />
            <Picker
              className="bg-emerald-500 p-2 pr-3 text-md text-white rounded-full font-semibold text-center"
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
              className="placeholder:text-green-200 outline-none text-md text-center font-semibold bg-emerald-500 p-1 w-1/4 text-white rounded-full"
            />
          </View>
        </View>
        
        <View className="mb-5 flex-row items-center border-emerald-700 border-b-2 gap-2 pb-2 ml-3 mr-3">
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
        <View className="flex-row items-baseline justify-around mb-5 mr-5">
          <Pressable className="  bg-emerald-500  p-3  rounded-full">
            <Text className="text-md text-white text-center font-semibold">Criar conta</Text>
          </Pressable>
          <Pressable onPress={()=>navigation.navigate("Login")}>
            <Text className="text-emerald-700 font-semibold">Já tem uma Conta? Faça Login</Text>
=======
import { View, Text, TextInput, Pressable } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import InputSenha from "../../components/InputSenha";
import InputIcon from "../../components/InputIcon";
import { Picker } from "@react-native-picker/picker";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../globalStyles";

export default function Cadastro() {
  const navigation = useNavigation();

  function selectDate() {
    setMostrarData(true);
  }
  function onChangeData(event, data) {
    setMostrarData(false);
    setDataNasc(data);
  }
  const [mostrarData, setMostrarData] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");
  const [cpf, setCpf] = useState("");
  const [sexo, setSexo] = useState();
  const [dataNasc, setDataNasc] = useState(new Date(2007, 4, 20));

  return (
    <View className="p-3" style={{ flex: 1, flexDirection: "column" }}>
      {/*TITULO E BANNER*/}
      <View style={{ flex: 0.25 }} className="items-center justify-center">
        <Text className="font-normal text-5xl text-emerald-800">Cadastro</Text>
        <Text className="text-emerald-900 w-[80%] text-center font-light text-xl">
          Sua primeira vez no Art Connect? Vamos criar uma conta pra você
        </Text>
      </View>
      {/*FORM*/}
      <View style={{ flex: 0.6 }} className="gap-2">
        <View className="gap-2 mb-5">
          {/*Nome*/}
          <InputIcon>
            <Feather
              name="user"
              size={globalStyles.icone.size}
              color={globalStyles.icone.corIcones}
            />
            <TextInput
              value={nome}
              keyboardType="default"
              onChangeText={setNome}
              className="w-full text-xl outline-none font-normal"
              placeholder="Nome Completo"
            />
          </InputIcon>
          {/*Email*/}
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
              className="w-full text-xl outline-none font-normal"
              placeholder="E-mail"
            />
          </InputIcon>
          {/*Senha*/}
          <InputSenha value={senha} setValue={setSenha} />
          {/*Confirmar Senha*/}
          <InputSenha value={senhaConfirm} setValue={setSenhaConfirm} />
          {/*CPF*/}
          <InputIcon>
            <Feather
              name="key"
              size={globalStyles.icone.size}
              color={globalStyles.icone.corIcones}
            />
            <TextInput
              keyboardType="numeric"
              value={cpf}
              onChangeText={setCpf}
              className="w-full text-xl outline-none font-normal"
              placeholder="CPF"
            />
          </InputIcon>
        </View>
        {/* DATA E SEXO */}
        <View className="flex flex-row justify-between mb-7">
          {/*DATA NASC*/}
          <View>
            <Text className="font-medium text-lg">Data de Nascimento</Text>
            <Pressable
              onPress={selectDate}
              className="p-4 flex flex-row justify-between items-center border border-stone-300 rounded-lg bg-stone-200"
            >
              <Text className="text-lg font-normal text-stone-800">
                {dataNasc.toLocaleDateString()}
              </Text>
              <Feather
                name="calendar"
                size={24}
                color={globalStyles.icone.corIcones}
              />
            </Pressable>
            {mostrarData && (
              <RNDateTimePicker
                value={dataNasc}
                mode="date"
                maximumDate={new Date()}
                minimumDate={new Date(new Date().getFullYear()-100,new Date().getMonth()-1 ,new Date().getDate())}
                is24Hour={true}
                onChange={onChangeData}
              />
            )}
          </View>
          {/*SEXO*/}
          <View className="flex">
            <Text className="font-medium text-lg">Sexo</Text>
            <View className="border border-stone-300 rounded-lg bg-stone-200">
              <Picker
                style={{
                  width: 150,
                  height: "auto",
                  color: "#7d7d7d",
                  textAlign: "center",
                  fontWeight: "semibold",
                }}
                selectedValue={sexo}
                onValueChange={(itemValue) => setSexo(itemValue)}
              >
                <Picker.Item value="Masculino" label="Masculino" />
                <Picker.Item
                  value="Masculino"
                  label="Feminino"
                  className="text-black"
                />
              </Picker>
            </View>
          </View>
        </View>
        {/*PROXIMO E LOGIN*/}
        <View className="items-center gap-3">
          <Pressable className="flex flex-row">
            <Text className="text-lg font-normal">Ja tem uma conta? </Text>
            <Text className="text-lg text-emerald-600">Faça Login</Text>
          </Pressable>
          <Pressable className="bg-teal-700 p-2 rounded-full" onPress={()=>navigation.navigate("CadastroEndereco")}>
            <Feather
              name="arrow-right"
              size={globalStyles.icone.size}
              color={"#ffffff"}
            />
>>>>>>> fa3c8b21f13e5188a2354562dae8765a42e3ecb8
          </Pressable>
        </View>
      </View>
    </View>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> fa3c8b21f13e5188a2354562dae8765a42e3ecb8
