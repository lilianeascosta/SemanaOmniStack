import React from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api'

export default function Detail () {
    const response = api.get('incidents');
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const message = 'Olá APAD, estou entrando em contato pois gostaria de ajudar no caoso "Cadelinha atropelada" com o valor de R$120,00';

    function navigateBack() {
        navigation.goBack(); //propria função do navigation para voltar
    }

    function sendMail() {
        //pacote do proprio expo
        MailComposer.composeAsync({
            subject: 'Heroi do caso: Cadelinha atropelada', //assunto da mensagem
            recipients: ['diego@rockeseat.com.br'], //quem vai receber a mensagem
            body: message, //conteudo da mensagem
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=557998666530&text=${message}`);
    }

    return(
        <View style={styles.container} >
            <View style={styles.header} >
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentVelue}>{response.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentVelue}>{response.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentVelue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(response.value)}
                        </Text>
 
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}