import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';  
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import logoImg from '../../assets/logo.png'
import styles from './styles'
import api from '../../services/api';

export default function Incidents () {
    const [incidents, setIncidents] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const navigation = useNavigation();
    const teste = incidents.name;
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false); //para armazenar informação qd buscaa dados novos, para evitar que sejam buscados novamente

    function navigateToDetail (incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if(loading == true){
            return; //evitar q qd uma requisição seja feita que mais uma requisição venha a acontecer
        }
        if(total > 0 && incidents.length == total){
            return;
        }
        setLoading(true);
        const response = await api.get(`incidents`, {params: { page }});
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1); //pular para proxima pagina
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);
    return(
        <View style={styles.container}>
            <View style={styles.header} >
                <Image source={logoImg} />
                <Text style={styles.headerText} >
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title} >Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)} //como ta retornando um objeto pegamos apenas o id
                showsHorizontalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => ( //troca o nome da variavel item por incident
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentVelue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentVelue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentVelue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText} >Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )} //responsavel por renderizar cada item da lista
            />
        </View>
    );
}