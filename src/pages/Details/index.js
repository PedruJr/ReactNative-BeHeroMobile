/*importamos o react e a div<View> porem do react-native */
import React from 'react';
import {Feather} from '@expo/vector-icons';

/*pegamos informaçoes pelos parametros enviado pela rota (incidents) */
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png';

/* importando todos os metodos da classe na var MailComposer */
import * as MailComposer from 'expo-mail-composer';

export default function Incidents() {
    const navigation = useNavigation();
    
    /*pegar parametros enviado pela rota*/
    const route = useRoute();
    const incident = route.params.incident;
    
    const message = `Ola ${incident.nome}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" no valor de "R$${incident.value}"`;
    
    function navigateBack() {
        navigation.goBack();
    }
    /*expo install expo-mail-composer (possui documentação) */
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        });

    }
    /*Utilizaremos deep linking(atraves de endereços) */
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return(
        <View style={styles.container}>
             <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                <Feather name="arrow-left" size={28} color="#e02041" />

                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
    <Text style={styles.incidentValue}>{incident.nome} de {incident.city}/{incident.uf.toUpperCase()}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>R${incident.value}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={[styles.heroTitle, {textAlign: 'center'}]}>Salve o dia!</Text>
                <Text style={[styles.heroTitle, {textAlign: 'center'}]}>Seja o heroi desse caso!</Text>

                <Text style={[styles.heroDescription,{textAlign: 'center'}]}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                    <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                    <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}