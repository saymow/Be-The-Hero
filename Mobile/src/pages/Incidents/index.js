import React, { useEffect, useState } from "react"
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons"

import Api from "../../services/api"

import logoImg from "../../assets/logo.png"

import styles from "./styles"



export default function Incidents(){
  const [incidents,setIncidents] = useState([])
  const [total,settotal] = useState(0)

  const [page,setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  function navigateToDetail(incident){
    navigation.navigate('Detail', { incident })
  }

  async function loadIncidents(){
    if(loading){
      return
    }
    if(total > 0 && incidents.length === total){
      return 
    }

    setLoading(true)

    const response = await Api.get('incidents',{
      params: { page }
    })

    setIncidents([...incidents, ...response.data])
    settotal(response.headers['x-total-count'])
    setPage(page+1)
    setLoading(false)
  }


  useEffect(() =>{
    loadIncidents()
  }, [])


  return(
    <View  style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} Casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos e salve o dia.</Text>

      <FlatList
       data={incidents}
       style={styles.incidentList}
       keyExtractor={incident => String(incident.id)}
       showsVerticalScrollIndicator={true}
       onEndReached={loadIncidents}
       onEndReachedThreshold={.2}
       renderItem={({ item: incident }) => (
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name}</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL'
            }).format(incident.value)}
          </Text>

          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigateToDetail(incident)}
          >
            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#E02041" />
          </TouchableOpacity>
        </View>
       )}      
      />
      
    </View> 
  );
}