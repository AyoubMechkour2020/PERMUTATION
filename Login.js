import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const Login = () => {
  const [formValues, setFormValues] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    password: '',
    grade: '',
    etablissement: '',
    specialite: '',
    villeActuelle: '',
    villesDesirees: '',
  });
  const [professeurs, setProfesseurs] = useState([]);
  const [uniqueSpecialites, setUniqueSpecialites] = useState([]);
  const [uniqueVillesActuelles, setUniqueVillesActuelles] = useState([]);

  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios
      .get('https://troubled-red-garb.cyclic.app/professeurs')
      .then((response) => {
        setProfesseurs(response.data);
        setUniqueSpecialites([...new Set(response.data.map((prof) => prof.specialite))]);
        setUniqueVillesActuelles([...new Set(response.data.map((prof) => prof.villeFaculteActuelle))]);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données des professeurs:', error);
      });
  }, []);

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(formValues);
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={formValues.nom}
        onChangeText={(value) => handleChange('nom', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={formValues.prenom}
        onChangeText={(value) => handleChange('prenom', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        value={formValues.telephone}
        onChangeText={(value) => handleChange('telephone', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formValues.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={formValues.password}
        onChangeText={(value) => handleChange('password', value)}
      />
      <Text style={styles.label}>Grade:</Text>
      <Picker
        style={styles.select}
        selectedValue={formValues.grade}
        onValueChange={(value) => handleChange('grade', value)}
        mode="dropdown"
      >
        <Picker.Item label="Sélectionner le grade" value="" />
        {[...new Set(professeurs.map((prof) => prof.grade))].map((grade) => (
          <Picker.Item key={grade} label={grade} value={grade} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Etablissement (abréviation)"
        value={formValues.etablissement}
        onChangeText={(value) => handleChange('etablissement', value)}
      />

      <Text style={styles.label}>Spécialité:</Text>
      <Picker
        style={styles.select}
        selectedValue={formValues.specialite}
        onValueChange={(value) => handleChange('specialite', value)}
        mode="dropdown"
      >
        <Picker.Item label="Sélectionner une spécialité" value="" />
        {uniqueSpecialites.map((specialite) => (
          <Picker.Item key={specialite} label={specialite} value={specialite} />
        ))}
      </Picker>

      <Text style={styles.label}>Ville Actuelle:</Text>
      <Picker
        style={styles.select}
        selectedValue={formValues.villeActuelle}
        onValueChange={(value) => handleChange('villeActuelle', value)}
        mode="dropdown"
      >
        <Picker.Item label="Sélectionner une ville" value="" />
        {uniqueVillesActuelles.map((ville) => (
          <Picker.Item key={ville} label={ville} value={ville} />
        ))}
      </Picker>

      <Text style={styles.label}>Villes Désirées:</Text>
      <TextInput
        style={styles.input}
        value={formValues.villesDesirees}
        onChangeText={(value) => handleChange('villesDesirees', value)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>
      <Text>MMMMMSHSJSHSJSSMSMSMSJSMSMSJSJSMS</Text>
      <Text>MMMMMSHSJSHSJSSMSMSMSJSMSMSJSJSMS</Text>
      <Text>MMMMMSHSJSHSJSSMSMSMSJSMSMSJSJSMS</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    paddingVertical: 20,
    paddingHorizontal: 20,


  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  select: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: 'white',
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

export default Login;
