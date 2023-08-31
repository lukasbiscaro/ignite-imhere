import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type Props = {
    fullName: string,
    onRemove: () => void
}

export function Participant({ fullName, onRemove }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{fullName}</Text>
            <TouchableOpacity style={styles.button} onPress={onRemove}>
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
        </View>
    )
}