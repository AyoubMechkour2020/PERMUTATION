import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Button,
} from 'react-native';

const Combinaison = () => {
    const [professeurs, setProfesseurs] = useState([]);
    const [specialite, setSpecialite] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [combinations, setCombinations] = useState([]);

    const baseURL = 'https://troubled-red-garb.cyclic.app';

    useEffect(() => {
        axios
            .get(`${baseURL}/professeurs`)
            .then(response => {
                setProfesseurs(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données des professeurs:', error);
            });
    }, []);

    const handleSubmit = () => {
        const filteredProfesseurs = professeurs.filter(prof => prof.specialite === specialite);
        const generatedCombinations = generateCombinations(filteredProfesseurs);
        setCombinations(generatedCombinations);
        setShowResults(true);
    };

    const generateCombinations = (arr) => {
        const combinations = [];
        const len = arr.length;

        for (let i = 0; i < len - 1; i++) {
            for (let j = i + 1; j < len; j++) {
                const citiesDesiredByFirstProfessor = arr[i].villeDesiree.split(';');
                const citiesDesiredBySecondProfessor = arr[j].villeDesiree.split(';');

                const matchFound = citiesDesiredByFirstProfessor.includes(arr[j].villeFaculteActuelle) && citiesDesiredBySecondProfessor.includes(arr[i].villeFaculteActuelle);

                if (matchFound) {
                    const combination = [arr[i], arr[j]];
                    combinations.push(combination);
                }
            }
        }

        return combinations;
    };




    const handleReset = () => {
        setSpecialite('');
        setShowResults(false);
        setCombinations([]);
    };

    return (
        <ScrollView>
            <View style={styles.container}>

                <Text style={styles.label}>Spécialité</Text>
                <TextInput
                    style={styles.input}
                    value={specialite}
                    onChangeText={value => setSpecialite(value)}
                    placeholder="Entrez la spécialité"
                />


                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Rechercher</Text>
                </TouchableOpacity>

                {showResults && combinations.length > 0 && (
                    <ScrollView style={styles.results}>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.columnHeader}>Professeur 1</Text>
                                <Text style={styles.columnHeader}>Professeur 2</Text>
                            </View>

                            {combinations.map((combination, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableCell}>{combination[0].nom}</Text>
                                    <Text style={styles.tableCell}>{combination[1].nom}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                )}

                {showResults && combinations.length === 0 && (
                    <Text style={styles.noResults}>Pas de Combinaison</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'beige',
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
    },
    results: {
        marginTop: 20,
    },
    table: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        padding: 10,
    },
    columnHeader: {
        flex: 1,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        padding: 10,
    },
    tableCell: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    noResults: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 20,
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

export default Combinaison;
