import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { View, Pressable, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ArtistaService } from "../services/ArtistaService";
import ArtistaModel from "../models/ArtistaModel";
import ArteService from "../services/ArteService";
export default function CompSeuPerfil() {
  const navigator = useNavigation()
  const [load, setLoad] = useState(true);
  const [listaContatos, setListaContatos] = useState([]);
  const [artista, setArtista] = useState(new ArtistaModel(null)); 

  useEffect(()=>{
    try {
      (async()=>{
        const data = await ArtistaService.getUserLocal();
        const usuario = await ArtistaService.login(data.email, data.senha);
        usuario.nomeArte = await getNomeArte(usuario.idArte);
        const lista = await ArtistaService.todosContatos(usuario.id);
        setListaContatos(lista);
        setArtista(usuario);
      })();
    } finally {
      setLoad(false);
    }
  }, [])
  async function getNomeArte(idArte) {
    const arte = await ArteService.getArte(idArte);
    return arte.nomeArte;
  }

      if(load) return <View><ActivityIndicator size={"large"} /></View>
    return (
      <View className=" bg-stone-200 rounded-lg gap-2 p-2">
        <View className="flex-row">
          <Pressable className="w-[15%]">
            <FontAwesome name="user-circle-o" size={40} color="black" />
          </Pressable>
          <View className="w-[85%]">
            {/* NOME E EDIT */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row justify-center w-[85%]">
                <Text className="text-stone-800 text-lg font-semibold">
                  {artista.nome}
                </Text>
              </View>
              <Pressable onPress={()=>navigator.navigate("EditarPerfil")} className="w-[15%]">
                <Feather name="edit" size={24} color="black" />
              </Pressable>
            </View>
            {/* ARTE E LOCAL */}
            <View className="flex-row justify-around">
              <Text className=" text-base">{artista.nomeArte}</Text>
              <Text className=" text-base text-stone-500">{artista.cidade} - {artista.estado}</Text>
            </View>
          </View>
        </View>
        <View className="gap-1.5">
            {/* SEGUIDORES E POSTAGENS */}
            <View className="flex-row justify-around">
              <View className="flex-row items-center gap-1">
                <Text className="font-semibold">3</Text>
                <Text className="text-base text-stone-800">postagens</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="font-semibold">2</Text>
                <Text className="text-base text-stone-800">seguidores</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="font-semibold">0</Text>
                <Text className="text-base text-stone-800">seguindo</Text>
              </View>
            </View>
            {/* CONTATOS */}
            <View className="items-center">
                <Pressable className="flex-row mb-3 items-center gap-2">
                    <Feather name="paperclip" size={20} color="black" />
                    <Text className="font-semibold text-xl text-teal-800">Contatos</Text>
                </Pressable>
                {listaContatos.length<=0?<Text className="text-stone-800 text-lg">Nenhum contato adicionado</Text>:<></>}
                {listaContatos.map(c=>(
                  <Text className="text-lg" key={c.id}>{c.valorContato}</Text>
                ))}
            </View>
        </View>
      </View>
    );
}
