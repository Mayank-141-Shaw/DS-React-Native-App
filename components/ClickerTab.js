import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function ClickerTab(props) {

    const [toggle, setToggle] = useState(false)

    const toggleButton = () => {
        setToggle(!toggle)
        console.log(toggle)
    }

    useEffect(()=>{},[toggle])

  return (
    <View style={styles.container}>
        <div style={styles.heading} onClick={ toggleButton }>
            <Text style={styles.title} allowFontScaling >{props.title.toUpperCase()}</Text>
        </div>
        {
        toggle ? 
        <div style={styles.ds} >
            {props.ds}
        </div>
        :
        <></>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        borderRadius:'4px',
        width:'92%',
        margin:'1rem',
        shadowOffset:{width: 0, height: 1},
        shadowColor:'#171717',
        shadowOpacity:0.4,
        shadowRadius:3
    },
    heading:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        
        borderTopEndRadius:'4px',
        borderTopStartRadius:'4px'
    },
    title:{
        textAlign:'center',
        backgroundColor:'red',
        flexGrow: 1,
        fontSize:'1.5rem',
        fontWeight:'700',
        borderTopStartRadius:'4px',
    },
    ds:{
        padding:'10px',
        
    }
})