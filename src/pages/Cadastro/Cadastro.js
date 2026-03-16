import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import MaskInput, { Masks } from 'react-native-mask-input';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import InputSenha from "../../components/InputSenha";
import InputIcon from "../../components/InputIcon";
import { Picker } from "@react-native-picker/picker";
import ArtistaModel from '../../models/ArtistaModel';
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../globalStyles";
import useStore from '../../store';
import { ArtistaService } from "../../services/ArtistaService";
import { ErroValidacao } from "../../services/ErroValidacao";
export default function Cadastro() {
  
  const navigation = useNavigation();
  let valido = new ErroValidacao();
  const [validoVisual, setValidoVisual] = useState(valido)
  const [artista, setArtista] = useState(new ArtistaModel(null));
  const [senhaConfirm, setSenhaConfirm] = useState("");

  /* ALTERA O ESTADO GLOBAL */
  const alterStateUsuario = useStore(store=>store.alter)

  /* FUNÇÕES PARA O COMPONENTE DE DATA */
  const [mostrarData, setMostrarData] = useState(false);
  function selectDate() {
    setMostrarData(true);
  }
  function onChangeData(event, data) {
    setMostrarData(false);
    handleUsuario(data, 'dataNasc');
  }

  /* ALTERA O STATE DO USUARIO */
  function handleUsuario(valor, campo) {
    switch (campo) {
      default:
      setArtista(dados=>({
        ...dados,
        [campo]: valor
      }));
      break;
    }
  }
  /* VALIDAÇÃO DE CAMPOS E PASSAGEM PARA PRÓXIMA TELA */
  function coletarDados() {
    valido = ArtistaService.validarCampos(artista, senhaConfirm, ['nome', 'email', 'senha', 'cpf', 'dataNasc'])
    if(valido.valido) {
      artista.dataNasc = artista.dataNasc.toISOString().split('T')[0];
      alterStateUsuario(artista);
      navigation.navigate("CadastroEndereco");
    } else {
      setValidoVisual(valido);
    }
  }

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
      <ScrollView style={{ flex: 0.6 }} className="gap-2">
        {/* FEEDBACK DE ERROS */}
        {!validoVisual.valido?<Text className="text-red-500">* {validoVisual.msg}</Text>:<></>}
        {/* CAMPOS */}
        <View className="gap-2 mb-5">
          {/*Nome*/}
          <InputIcon>
            <Feather
              name="user"
              size={globalStyles.icone.size}
              color={globalStyles.icone.corIcones}
            />
            <TextInput
              value={artista.nome}
              onChangeText={(e)=>handleUsuario(e, 'nome')}
              keyboardType="default"
              className="w-[90%] text-xl outline-none font-normal"
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
              value={artista.email}
              onChangeText={(e)=>handleUsuario(e, 'email')}
              keyboardType="email-address"
              className="w-[90%] text-xl outline-none font-normal"
              placeholder="E-mail"
            />
          </InputIcon>
          {/*Senha*/}
          <InputSenha value={artista.senha} setValue={(e)=>handleUsuario(e,'senha')} placeholder={"Crie uma senha"}/>
          {/*Confirmar Senha*/}
          <InputSenha value={senhaConfirm} setValue={setSenhaConfirm} placeholder={"Confirme a senha"}/>
          {/*CPF*/}
          <InputIcon>
            <Feather
              name="key"
              size={globalStyles.icone.size}
              color={globalStyles.icone.corIcones}
            />
            <MaskInput
              mask={Masks.BRL_CPF}
              value={artista.cpf}
              onChangeText={(e)=>handleUsuario(e, 'cpf')}
              keyboardType="numeric"
              maxLength={14}
              className="w-[90%] text-xl outline-none font-normal"
              placeholder="CPF" />
          </InputIcon>
        </View>
        {/* DATA E SEXO */}
        <View className="flex flex-row justify-between mb-7">
          {/*DATA NASC*/}
          <View>
            <Text className="font-normal text-stone-800 text-lg">Data de Nascimento</Text>
            <Pressable
              onPress={selectDate}
              className="p-4 flex flex-row justify-between items-center border border-stone-300 rounded-lg bg-stone-200"
            >
              <Text className="text-lg font-normal text-stone-800">
                {artista.dataNasc.toLocaleDateString()}
              </Text>
              <Feather
                name="calendar"
                size={24}
                color={globalStyles.icone.corIcones}
              />
            </Pressable>
            {mostrarData && (
              <RNDateTimePicker
                value={artista.dataNasc}
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
            <Text className="font-normal text-stone-800 text-lg">Sexo</Text>
            <View className="border border-stone-300 rounded-lg bg-stone-200">
              <Picker
                style={{
                  width: 150,
                  height: "auto",
                  color: "#7d7d7d",
                  textAlign: "center",
                  fontWeight: "semibold",
                }}
                selectedValue={artista.sexo}
                onValueChange={(itemValue) => handleUsuario(itemValue, 'sexo')}
                
              >
                <Picker.Item value="m" label="Masculino" />
                <Picker.Item value="f" label="Feminino"/>
                <Picker.Item value="n" label="Não-Binário"/>
                <Picker.Item value="" label="Prefiro não dizer"/>
              </Picker>
            </View>
          </View>
        </View>
        {/*PROXIMO E LOGIN*/}
        <View className="items-center gap-3">
          <Pressable onPress={()=>navigation.navigate("Login")} className="flex flex-row">
            <Text className="text-lg font-light">Ja tem uma conta? </Text>
            <Text className="text-lg font-normal text-emerald-600">Faça Login</Text>
          </Pressable>
          <Pressable className="bg-teal-700 p-2 rounded-full" onPress={()=>coletarDados()}>
            <Feather
              name="arrow-right"
              size={globalStyles.icone.size}
              color={"#ffffff"}
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
