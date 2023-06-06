// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView } from 'react-native';
// import { PieChart } from 'react-native-chart-kit';

// const Statistics = () => {
//     const [statistics, setStatistics] = useState(null);
//     const [professorsCount, setProfessorsCount] = useState(null);
//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
//             const data = await response.json();
//             setStatistics(data);
//             setProfessorsCount(data.length);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     if (!statistics) {
//         return <Text>Loading...</Text>;
//     }

//     const getColorByIndex = (index) => {
//         const colors = [
//             '#FF6E6E',
//             '#FF976E',
//             '#FFC46E',
//             '#FFEE6E',
//             '#EEFF6E',
//             '#C4FF6E',
//             '#96FF6E',
//             '#6EFF6E',
//             '#6EFF9B',
//             '#6EFFC4',
//             '#6EFFEE',
//             '#6EEFFF',
//             '#6EC4FF',
//             '#6E96FF',
//             '#6E6EFF',
//         ];

//         return colors[index % colors.length];
//     };

//     const renderGradeStatistics = () => {
//         const grades = {};
//         statistics.forEach((professor) => {
//             if (grades[professor.grade]) {
//                 grades[professor.grade] += 1;
//             } else {
//                 grades[professor.grade] = 1;
//             }
//         });

//         const gradeData = Object.keys(grades).map((grade) => {
//             const percentage = (grades[grade] / statistics.length) * 100;
//             return {
//                 name: `${grade} (${percentage.toFixed(2)}%)`,
//                 population: grades[grade],
//                 color: getColorByIndex(grades[grade]),
//                 legendFontColor: '#7F7F7F',
//                 legendFontSize: 12,
//             };
//         });

//         return (
//             <View style={styles.chartContainer}>
//                 <Text style={styles.chartTitle}>Professeurs Par Grade</Text>
//                 <PieChart
//                     data={gradeData}
//                     width={385}
//                     height={200}
//                     chartConfig={{
//                         color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//                         labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                     }}
//                     accessor="population"
//                     backgroundColor="transparent"
//                     paddingLeft="15"
//                     absolute
//                 />
//             </View>
//         );
//     };

//     const renderCityStatistics = () => {
//         const cities = {};
//         statistics.forEach((professor) => {
//             if (cities[professor.villeDesiree]) {
//                 cities[professor.villeDesiree] += 1;
//             } else {
//                 cities[professor.villeDesiree] = 1;
//             }
//         });

//         // Sort cities by population in descending order
//         const sortedCities = Object.entries(cities).sort((a, b) => b[1] - a[1]);

//         // Get the top 10 cities
//         const top10Cities = sortedCities.slice(0, 10);

//         const cityData = top10Cities.map(([city, population]) => {
//             const percentage = (population / statistics.length) * 100;
//             return {
//                 name: `${city} (${percentage.toFixed(2)}%)`,
//                 population: population,
//                 color: getColorByIndex(population),
//                 legendFontColor: '#7F7F7F',
//                 legendFontSize: 12,
//             };
//         });

//         return (
//             <View style={styles.chartContainer}>
//                 <Text style={styles.chartTitle}>Villes plus demandees</Text>
//                 <PieChart
//                     data={cityData}
//                     width={385}
//                     height={200}
//                     chartConfig={{
//                         color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//                         labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                     }}
//                     accessor="population"
//                     backgroundColor="transparent"
//                     paddingLeft="15"
//                     absolute
//                 />
//             </View>
//         );
//     };

//     const renderSpecialityStatistics = () => {
//         const specialities = {};
//         statistics.forEach((professor) => {
//             if (specialities[professor.specialite]) {
//                 specialities[professor.specialite] += 1;
//             } else {
//                 specialities[professor.specialite] = 1;
//             }
//         });

//         // Sort specialities by population in descending order
//         const sortedSpecialities = Object.entries(specialities).sort((a, b) => b[1] - a[1]);

//         // Get the top 10 specialities
//         const top10Specialities = sortedSpecialities.slice(0, 10);

//         const specialityData = top10Specialities.map(([speciality, population]) => {
//             const percentage = (population / statistics.length) * 100;
//             return {
//                 name: `${speciality} (${percentage.toFixed(2)}%)`,
//                 population: population,
//                 color: getColorByIndex(population),
//                 legendFontColor: '#7F7F7F',
//                 legendFontSize: 12,
//             };
//         });


//         return (
//             <View style={styles.chartContainer}>
//                 <Text style={styles.chartTitle}>Professeurs par specialite</Text>
//                 <PieChart
//                     data={specialityData}
//                     width={385}
//                     height={200}
//                     chartConfig={{
//                         color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//                         labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                     }}
//                     accessor="population"
//                     backgroundColor="transparent"
//                     paddingLeft="15"
//                     absolute
//                 />
//             </View>
//         );
//     };


//     return (
//         <ScrollView>
//             <Text style={styles.text}> Statistiques </Text>
//             <View>
//                 <Text style={styles.text}>Nombre de profs inscrits :  {professorsCount}</Text>
//             </View>
//             <View style={styles.container}>
//                 <View style={styles.chartContainer}>
//                     {renderGradeStatistics()}
//                 </View>
//                 <View style={styles.chartContainer}>
//                     {renderCityStatistics()}
//                 </View>
//                 <View style={styles.chartContainer}>
//                     {renderSpecialityStatistics()}
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };
// const styles = {
//     container: {
//         flex: 1,
//         marginRight: 50,
//     },
//     chartContainer: {
//         marginBottom: 20,
//     },
//     chartTitle: {
//         textAlign: 'center',
//         marginBottom: 10,
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     text: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         paddingLeft: 10,
//     },
// };

// export default Statistics;
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const Statistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [professorsCount, setProfessorsCount] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
            const data = await response.json();
            setStatistics(data);
            setProfessorsCount(data.length);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!statistics) {
        return <Text>Loading...</Text>;
    }

    const getColorByIndex = (index) => {
        const colors = [
            '#FF6E6E',
            '#FF976E',
            '#FFC46E',
            '#FFEE6E',
            '#EEFF6E',
            '#C4FF6E',
            '#96FF6E',
            '#6EFF6E',
            '#6EFF9B',
            '#6EFFC4',
            '#6EFFEE',
            '#6EEFFF',
            '#6EC4FF',
            '#6E96FF',
            '#6E6EFF',
        ];

        return colors[index % colors.length];
    };

    const renderGradeStatistics = () => {
        const grades = {};
        statistics.forEach((professor) => {
            if (grades[professor.grade]) {
                grades[professor.grade] += 1;
            } else {
                grades[professor.grade] = 1;
            }
        });

        const gradeData = Object.keys(grades).map((grade) => {
            const percentage = (grades[grade] / statistics.length) * 100;
            return {
                name: `${grade} (${percentage.toFixed(2)}%)`,
                population: grades[grade],
                color: getColorByIndex(grades[grade]),
            };
        });

        return (
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Professeurs Par Grade</Text>
                <BarChart
                    data={{
                        labels: gradeData.map((data) => data.name),
                        datasets: [
                            {
                                data: gradeData.map((data) => data.population),
                            },
                        ],
                    }}
                    width={385}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    verticalLabelRotation={30}
                    showValuesOnTopOfBars={true}
                    yAxisLabel=""
                    yAxisSuffix=""
                />
            </View>
        );
    };

    const renderCityStatistics = () => {
        const cities = {};
        statistics.forEach((professor) => {
            if (cities[professor.villeDesiree]) {
                cities[professor.villeDesiree] += 1;
            } else {
                cities[professor.villeDesiree] = 1;
            }
        });

        // Sort cities by population in descending order
        const sortedCities = Object.entries(cities).sort((a, b) => b[1] - a[1]);

        // Get the top 10 cities
        const top10Cities = sortedCities.slice(0, 10);

        const cityData = top10Cities.map(([city, population]) => {
            const percentage = (population / statistics.length) * 100;
            return {
                name: `${city} (${percentage.toFixed(2)}%)`,
                population: population,
                color: getColorByIndex(population),
            };
        });

        return (
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Villes plus demandées</Text>
                <BarChart
                    data={{
                        labels: cityData.map((data) => data.name),
                        datasets: [
                            {
                                data: cityData.map((data) => data.population),
                            },
                        ],
                    }}
                    width={385}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    verticalLabelRotation={30}
                    showValuesOnTopOfBars={true}
                    yAxisLabel=""
                    yAxisSuffix=""
                />
            </View>
        );
    };

    const renderSpecialityStatistics = () => {
        const specialities = {};
        statistics.forEach((professor) => {
            if (specialities[professor.specialite]) {
                specialities[professor.specialite] += 1;
            } else {
                specialities[professor.specialite] = 1;
            }
        });

        // Sort specialities by population in descending order
        const sortedSpecialities = Object.entries(specialities).sort((a, b) => b[1] - a[1]);

        // Get the top 10 specialities
        const top10Specialities = sortedSpecialities.slice(0, 10);

        const specialityData = top10Specialities.map(([speciality, population]) => {
            const percentage = (population / statistics.length) * 100;
            return {
                name: `${speciality} (${percentage.toFixed(2)}%)`,
                population: population,
                color: getColorByIndex(population),
            };
        });

        return (
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Professeurs par spécialité</Text>
                <BarChart
                    data={{
                        labels: specialityData.map((data) => data.name),
                        datasets: [
                            {
                                data: specialityData.map((data) => data.population),
                            },
                        ],
                    }}
                    width={385}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    verticalLabelRotation={30}
                    showValuesOnTopOfBars={true}
                    yAxisLabel=""
                    yAxisSuffix=""
                />
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Statistiques</Text>
            <View style={styles.countContainer}>
                <Text style={styles.countText}>Nombre de professeurs inscrits: {professorsCount}</Text>
            </View>
            {renderGradeStatistics()}
            {renderCityStatistics()}
            {renderSpecialityStatistics()}
            <Text>hhhhhhhhhhhhhhhhhhhhh</Text>

        </ScrollView>
    );
};

const styles = {
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    countContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    countText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    chartContainer: {
        marginTop: 20,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
};

export default Statistics;

