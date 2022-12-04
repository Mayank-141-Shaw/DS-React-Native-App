
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios'
import Stack from './components/Stack';
import ClickerTab from './components/ClickerTab';
import Queue from './components/Queue';

export default function App() {

  const [countryData, setCountryData] = useState([])

  const [country, setCountry] = useState(null)



  useEffect(()=>{
    // get data on country codes on app start

    async function getCountries(){
      let url = `https://restcountries.com/v3.1/all`
      
      await axios.get(url,{
        responseType:'json',
        mode:"no-cors",
        method:"GET",
        headers:{
          'Access-Control-Allow-Origin':"true"
        }
      })
        .then( res => {
          res.headers['Access-Control-Allow-Origin'] = "true"
          return res
        })
        .then( res => res.data )
        .then( data => {
          setCountryData(data)
          console.log(data[0])
        })
        .catch( err => console.log(err) )
    }

    getCountries()
  }, [])




  const getCountryCode = (e) => {
    
    if(e == ""){
      setCountry(null)
      return;
    }

    if(countryData.length != 0){
      for(let ctry of countryData){
        if(ctry['name'].common.toLowerCase().startsWith( e ) ){
          setCountry(ctry);
          break
        }
      }
      
    }
  }



  useEffect(()=>{},[country])




  return (
    <View style={styles.container}>
      <Text style={styles.app_heading}>Data Structure App</Text>


      <ClickerTab title='stack' ds={<Stack />} />
      <ClickerTab title='queue' ds={<Queue />} />


      <Text style={styles.text}>Enter the country name</Text>
      <TextInput 
        autoComplete="true"
        blurOnSubmit="true"
        onChangeText={ e => getCountryCode(e) }
        style={styles.text_input}
      />
      {
        country ? 
        <>
          <Text>Country Name : {country.name.common}</Text>
          <Text>Population : {country.population}</Text>
          <Text>Region : {country.region}</Text>
          <Text>Status : {country.status}</Text>
          <img 
            src={country.flags.svg} 
            height={"100"} 
            width={"100"} 
            alt={`Alt ${country.name.common} flag`}
          />
        </>
        :
        <Text>Default</Text>
      }
      
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily:'monospace'
  },

  text:{
    color:'red',
    fontWeight:'700',
    fontSize:'2em'
  },

  text_input:{
    backgroundColor:'lightblue',
    borderColor:'black'
  },

  app_heading: {
    fontSize:'1.5rem',
    fontWeight:'800',
    textTransform:'uppercase',
    margin:'2rem'
  }
});
