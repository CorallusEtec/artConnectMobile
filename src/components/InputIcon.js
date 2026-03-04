import { View, Image } from 'react-native';
import globalStyles from '../globalStyles';
export default function InputIcon({ children }) {
    return (
        <View className="gap-1.5 border border-stone-300 rounded-md flex flex-row bg-stone-200 p-1 items-center">
            {children}
        </View>
    )
}