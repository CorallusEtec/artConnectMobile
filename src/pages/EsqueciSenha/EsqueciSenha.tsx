import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, TextInput } from 'react-native';
import styles from './estilo';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from '@expo/vector-icons/EvilIcons';




export default function EsqueciSenha() {
    const navigation = useNavigation();
    return (

        <View style={styles.container}>
            <StatusBar style="auto" />

  {/*Botao Voltar*/}

            <View style={styles.Bloco1}>
                <Pressable onPress={() => navigation.goBack()} className="p-2">

                    <EvilIcons name="arrow-left" size={60} color="#009966" />
                </Pressable>

            </View>


  {/*/Text Input do Email */}
            <View style={styles.Bloco2}>

                <Text style={styles.texto}>Esqueceu a senha?</Text>



                <Text style={styles.texto2}>Insira o seu Email de Cadastro a Redefinir Senha</Text>


                <View className="flex-row items-center border-emerald-700 border-b-2 pb-2 ml-3 mr-3 mt-6 gap-5">
                    <Image source={require("bootstrap-icons/icons/envelope-fill.svg")}
                        tintColor="#009966"
                        style={{ height: 40, width: 40 }}
                    />
                    <TextInput
                        className="w-[90%] outline-none text-xl text-emerald-700 font-semibold placeholder:text-emerald-400"
                        placeholder="E-mail"
                    />
                </View>

            </View>

  {/*/Botão de Enviar as Informações */}


            <View style={styles.Bloco3}>

                <Pressable className="bg-emerald-500  p-3  rounded-full w-1/4">
                    <Text className="text-md text-white text-center font-semibold">Enviar</Text>
                </Pressable>

            </View>

        </View>


    );
}
