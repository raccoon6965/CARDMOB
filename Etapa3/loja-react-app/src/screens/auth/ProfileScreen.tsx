import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Platform } from "react-native"; // Adicionado TouchableOpacity e Platform
import * as ImagePicker from 'expo-image-picker'; // Adicionado ImagePicker (requer instalação: npx expo install expo-image-picker)

import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

import { requestProfile } from "../../services/ProfileService";

interface UserData {
    id: string;
}
const { UserData }: { UserData: UserData } = useAuth();

interface User {
    id: string;
    name: string;
    email: string;
    image?: string; // Optional property
}

function ProfileScreen({ navigation }: any) {
    const { theme, toggleTheme } = useTheme();
    const { logout, UserData } = useAuth();
    const [user, setUser] = useState({});
    const [localImageUri, setLocalImageUri] = useState(null); // Novo estado para a URI da imagem local

    // Função para lidar com a seleção da imagem
    const handleImagePick = async () => {
        // Solicitar permissão de acesso à galeria de fotos
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Desculpe, precisamos de permissão para acessar a galeria de fotos!');
                return;
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            // Atualiza o estado com a URI da imagem selecionada
            const [localImageUri, setLocalImageUri] = useState<string | null>(null);
            // O usuário solicitou apenas a atualização na tela, sem backend.
            // Se fosse para enviar ao backend, a lógica de upload estaria aqui.
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log(userData);
                const user = await requestProfile(userData?.id);
                console.log(user);
                setUser(user);
                console.log('Carregou o usuário!');
            }
            catch (error) {
                console.error('Erro ao carregar o perfil do usuário:', error);
            }
        }
        fetchProfile();
    }, []);

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <Text style={{ color: theme.colors.text, marginBottom: theme.spacing(1) }}>
                Profile Screen
            </Text>
            
            {/* Componente de imagem com botão de edição */}
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={handleImagePick}>
                    <Image 
                        // Usa a imagem local se estiver disponível, senão usa a imagem do usuário do backend
                        source={{ uri: localImageUri || user.image }} 
                        style={styles.image}
                    />
                    <Text style={[styles.editButtonText, { color: theme.colors.primary }]}>
                        Editar
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.text, { color: theme.colors.text }]}>{user.name}</Text>
            <Text style={[styles.text, { color: theme.colors.text }]}>{user.email}</Text>

            <Button title="Alternar Tema" color={theme.colors.primary} onPress={toggleTheme}/>
            <Button title="Ir para Detalhes" onPress={ () => navigation.navigate('Details')} />
            <Button title="Sair" onPress={logout}/>
        </View>
    );
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50, // Para deixar a imagem redonda
        backgroundColor: '#ccc', // Cor de fundo para quando a imagem não carregar
    },
    editButtonText: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 14,
    },
    text: { 
        fontSize: 16,
        marginBottom: 5,
    }
});
