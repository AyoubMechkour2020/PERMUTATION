import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Recherche = () => {
  const [professeurs, setProfesseurs] = useState([]);
  const [originalProfesseurs, setOriginalProfesseurs] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villeDesiree, setVilleDesiree] = useState('');

  const baseURL = 'https://troubled-red-garb.cyclic.app/professeurs';

  useEffect(() => {
    axios
      .get(baseURL)
      .then(response => {
        setProfesseurs(response.data);
        setOriginalProfesseurs(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données des professeurs:', error);
      });
  }, []);

  const handleSpecialiteChange = value => {
    setSelectedSpecialite(value);
  };

  const handleSubmit = () => {
    let filteredProfesseurs = originalProfesseurs;

    if (selectedSpecialite !== '') {
      filteredProfesseurs = filteredProfesseurs.filter(
        prof => prof.specialite === selectedSpecialite
      );
    }

    if (villeActuelle !== '') {
      filteredProfesseurs = filteredProfesseurs.filter(
        prof => prof.villeFaculteActuelle === villeActuelle
      );
    }

    if (villeDesiree !== '') {
      filteredProfesseurs = filteredProfesseurs.filter(
        prof => prof.villeDesiree === villeDesiree
      );
    }

    setProfesseurs(filteredProfesseurs);
  };

  const handleReset = () => {
    setProfesseurs(originalProfesseurs);
    setSelectedSpecialite('');
    setVilleActuelle('');
    setVilleDesiree('');
  };

  // Filtrer les valeurs uniques pour les menus déroulants
  const specialites = [
    ...new Set(originalProfesseurs.map(prof => prof.specialite))
  ];
  const villesActuelles = [
    ...new Set(originalProfesseurs.map(prof => prof.villeFaculteActuelle))
  ];
  const villesDesirees = [
    ...new Set(originalProfesseurs.map(prof => prof.villeDesiree))
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recherche de Professeurs</Text>
      <Text style={styles.label}>Spécialité</Text>
      <Picker
        style={styles.select}
        selectedValue={selectedSpecialite}
        onValueChange={handleSpecialiteChange}
        mode="dropdown"
      >
        <Picker.Item label="Sélectionner une spécialité" value="" />
        {specialites.map(specialite => (
          <Picker.Item
            key={specialite}
            label={specialite}
            value={specialite}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Ville Actuelle</Text>
      <Picker
        style={styles.select}
        selectedValue={villeActuelle}
        onValueChange={value => setVilleActuelle(value)}
        mode="dropdown"
      >
        <Picker.Item label="Sélectionner votre Ville Actuelle" value="" />
        {villesActuelles.map(ville => (
          <Picker.Item key={ville} label={ville} value={ville} />
        ))}
      </Picker>

      <Text style={styles.label}>Ville Désirée</Text>
      <Picker
        style={styles.select}
        selectedValue={villeDesiree}
        onValueChange={value => setVilleDesiree(value)}
        mode="dropdown"
      >
        <Picker.Item label="Sélectionner votre Ville Désirée" value="" />
        {villesDesirees.map(ville => (
          <Picker.Item key={ville} label={ville} value={ville} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </TouchableOpacity>



      <ScrollView style={styles.results}>
        {professeurs.map(prof => (
          <TouchableOpacity key={prof._id} style={styles.profCard}>
            <Text style={styles.profName}>{`${prof.nom}
             ${prof.email}  ${prof.tel} ${prof.grade})  ${prof.specialite}  ${prof.faculteActuelle} ${prof.villeFaculteActuelle} : ${prof.villeDesiree}`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
  select: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 20,
  },
  results: {
    marginTop: 20,
  },
  profCard: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  profName: {
    fontSize: 16,
    fontWeight: 'bold',
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

export default Recherche;
