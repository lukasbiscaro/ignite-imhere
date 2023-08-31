import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from './styles'
import { Participant } from '../../components/Participant';

export function Home() {

    const [participants, setParticipants] = useState<string[]>([])
    const [participantName, setParticipantName] = useState('')

    const handleParticipantAdd = () => {
        if (participants.includes(participantName)) {
            return Alert.alert('Participante Existente', 'Já existe um participante na lista com esse nome.')
        }

        setParticipants(prevState => [...prevState, participantName])
        setParticipantName('')
    }

    const handleParticipantRemove = (fullName: string) => {
        Alert.alert('Remover Participante', `Deseja remover o participante ${fullName}?`, [
            {
                text: 'Sim, remover participante.',
                onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== fullName))
            },
            {
                text: 'Não, manter participante.',
                style: 'destructive'
            }
        ])
        console.log(`Você removeu o participante ${fullName}`)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>Nome do evento</Text>
            <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do participante'
                    placeholderTextColor='#6b6b6b'
                    value={participantName}
                    onChangeText={setParticipantName}
                />
                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        fullName={item}
                        onRemove={() => handleParticipantRemove(item)} />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ningúem chegou no evento ainda? Adicione participantes a sua lista de presenca.
                    </Text>
                )}
            />

        </View>
    );
}