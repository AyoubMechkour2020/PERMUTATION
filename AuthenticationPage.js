import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const AuthenticationPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleEmailChange = (value) => {
        setEmail(value);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
    };
    const handleLogin = async () => {
        try {
            const response = await axios.get('https://troubled-red-garb.cyclic.app/professeurs');

            const users = response.data;

            const user = users.find((user) => user.email === email);

            if (user) {
                setAuthenticated(true);
                onLogin();
                console.log('Authentication successful');
            } else {
                setAuthenticated(false);
                console.log('Authentication failed');
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error occurred during authentication:', error);
        }
    };


    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Adresse Email"
                value={email}
                onChangeText={handleEmailChange}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={handlePasswordChange}

            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
            {authenticated && <Text style={styles.successText}>Authentification réussie</Text>}
            <Modal visible={showModal} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Authentification échouée. Veuillez réessayer.</Text>
                        <Button title="Fermer" onPress={handleModalClose} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'black',
    },
    successText: {
        color: 'green',
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalText: {
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});




export default AuthenticationPage;
