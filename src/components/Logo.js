import { Image } from "react-native"

export default function Logo({ width, height }) {
    return (
        <Image style={{width: width, height: height}} resizeMode="contain" tintColor={"white"} source={require('../../assets/img/logo_transparent.png')} />
    )
}