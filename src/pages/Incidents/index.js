import React, {useEffect,useState} from 'react';
import { Feather }from '@expo/vector-icons';
/*
- responsavel pela navegação entre as pages
- usaremos um metodo vinculado ao botão de detalhes
 */
import{useNavigation} from '@react-navigation/native';

/*
-substituimos o button por touchableOpacity, pois o button tem estilizações padroes.
-importamos o pacote de icones desejado em @expo/vector-icons.
-para fazer listagens que scrollam, usamos flatlist.

-FlatList-Props.
- date={[1,2,3]} informação a ser renderizada.
- renderItem={}: função responsavel pela renderização da lista ela fica em (devido a ser usado JSX).
- keyExtractor: salva a key responsavel pelos identificadores de lista, passamos uma função(incident => String(incident) o final é necessario a conversão a string).
- showsVerticalScrollIndicator={false}: desabilita barra de rolagem aparecendo.

- para conversão de valores instalamos o pacote INTL
- sempre que precisar passar parametros por uma props utilizar função para nao executar no inicio da aplicação
-
*/
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';

export default function Incidents() {
    const [incidents,setIncidents] = useState([]);
   
    /* 
    - Paginação para saber qual page
    - loading para page por vez, uma requisiçaõ por vez
    - total para saber o total de pages
    */
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    /*agora associamos este metodo ao botão mais detalhes
    - esta função tambem pode receber parametros que enviaram informaçoes a proxima pagina
    - if( total > 0 && incidents.length === total): utilizado para saber se ja foi carregado todas as paginas e se foi carregado a primeira page
    */
    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    /* integrando com paginação
    
    */
        async function loadIncidents(){
            if (loading){
                return;
            }
            if( total > 0 && incidents.length === total) {
                return;
            }

            setLoading(true);

            const response = await api.get('incidents', {
                params: {page}
            });
            /*integração de dois vetores */
            setIncidents([...incidents, ...response.data]);

            setTotal(response.headers['x-total-count']);

            setPage( page + 1);
            setLoading(false);
        }

    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <Text style={styles.headerText}>
                 Total de <Text styles={styles.headerTextBold}>{incidents.length} incidentes</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos a baixo e salve o dia!</Text>
            
        
          <FlatList
          data={incidents}
          style={styles.incidentList}
          keyExtractor={ incident => String(incident.id)}
          showsVerticalScrollIndicator={false}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          renderItem={({item: incident}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.nome}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>R${incident.value}</Text>

            <TouchableOpacity style={styles.detailsButton} 
             onPress={() => navigateToDetail(incident)}
             >
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#e02041" />

             </TouchableOpacity>

        </View>

          )}
          />

         

       

        </View>
    );
}