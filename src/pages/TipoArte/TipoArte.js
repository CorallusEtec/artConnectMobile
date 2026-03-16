import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import useStore from "../../store";
import { ArtistaService } from "../../services/ArtistaService";
import ArtistaModel from "../../models/ArtistaModel";
import ArteService from "../../services/ArteService";
import { ErroValidacao } from "../../services/ErroValidacao";

export default function TipoArte() {

  const [artista, setArtista] = useState(new ArtistaModel(null));
  const usuarioStore = useStore(store=>store.usuario);
  const saveStateUsuario = useStore(store=>store.alter);
  const navigation = useNavigation();
  const [selectedArt, setSelectedArt] = useState(1);
  
  const [listaArte, setListaArte] = useState([]);
  const [load, setLoad] = useState(true);

  async function carregarArte() {
    try {
      const dados = await ArteService.findAll();
      if(dados == undefined) {
        navigation.navigate("Cadastro", new ErroValidacao().invalido("Ocorreu um erro ao prosseguir com o cadastro, tente mais tarde"));
      } else {
        setListaArte(dados);
      }
    } catch (erro) {
      navigation.navigate("Cadastro");
    } finally {
      setLoad(false);
    }
  }

  useEffect(()=> {
    try {
      carregarArte();
      if(usuarioStore == null) {
        navigation.navigate("Cadastro");
      } else {
        setArtista(new ArtistaModel(usuarioStore));
      }

    } finally {
      setLoad(false)
    }
  }, [])

  function criarConta() {
    artista.idArte = selectedArt;
    saveArtista(artista);
    navigation.navigate("Home");
  }
  async function saveArtista(artista) {
    await ArtistaService.save(artista);
    await ArtistaService.saveUserLocal(artista);
    saveStateUsuario(artista);
  }

  if(load) return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size="large" /></View>

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      {/*TÍTULO*/}
      <View
        style={{
          flex: 0.9,
          flexDirection: "column",
          backgroundColor: "#ffffff",
        }}
      >
        <View className="items-center mb-2 mt-10">
          <Text className="text-5xl font-light text-gray-500 m-2.5">
            Olá {usuarioStore.nome}
          </Text>

          <View className="items-center">
            <Text className="font-light text-2xl w-[90%] text-center text-gray-500">
              Bem vindo ao Art Connect!
            </Text>
            <Text className="font-light text-2xl text-center text-gray-500">
              Crie seu portifólio artístico e nós te conectamos com
              contratantes.
            </Text>
          </View>
        </View>

        <Text className="text-2xl text-center font-semibold text-gray-800 mb-4">
          Qual é o seu tipo de arte?
        </Text>

       {/* TIPO DE ARTE */}
        <View className="items-center mb-10">
            <View className="w-[70%] gap-2">
                <Text className="text-xl text-gray-800">Tipo de arte</Text>
                <View className="p-2 bg-gray-200 border-gray-300 border-2 rounded-lg gap-2">
                <Picker
                className="outline-none text-xl bg-gray-200 border-gray-300 text-gray-500"
                selectedValue={selectedArt}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedArt(itemValue)
                }
                >
                  {listaArte.map(arte=> (
                    <Picker.Item key={arte.id} label={arte.nomeArte} value={arte.id} />
                  ))}
                </Picker>
                </View>
            </View>
        </View>

        {/*CRIAR CONTA*/}
        <View className="items-center">
          <Pressable
            onPress={()=>criarConta()}
            style={{ backgroundColor: "#04CBAC" }}
            className="rounded-lg bg-emerald-500 p-3 w-2/4"
          >
            <Text className="text-2xl text-white text-center">Criar Conta</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
