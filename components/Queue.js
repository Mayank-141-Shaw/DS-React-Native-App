import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button, TextInput, Alert, DevSettings, Platform } from 'react-native'

export default function Queue() {

  const [queue, setQueue] = useState([])
  const [curValue, setCurValue] = useState(null)

  const callAlert = (title, msg, buttons) => {
    if( Platform.OS === 'web' ) alert(title+' : '+msg) 
    else Alert.alert(title, msg, buttons)
  }
  

  const push = (e) => {
    e.preventDefault()

    if(curValue != null){
      setQueue( [...queue, curValue] )
      setCurValue(null)
    }
  }

  
  const pop = (e) => {
    e.preventDefault()

    if(queue.length <= 0){
      // pop an alert
      callAlert('Queue Pop operation not possible !', 'Queue is empty', [])
    }

    if(queue.length > 0){
      let st = [...queue]
      Alert.alert('Popping',st.shift())
      setQueue(st)
    }
  }

  useEffect( ()=>{}, [queue] )

  return (
    <View style={styles.container}>
      <Text>Enter a value to add to Queue</Text>
      <TextInput
        style={styles.text_input}
        placeholder='Enter a value to add'
        testID='value_input'
        autoComplete='true'
        onChangeText={e=>setCurValue(e)}
      />
      <div style={styles.btn_group}>
        <Button class={styles.button} onPress={e => push(e)} title='Enqueue' />
        <Button class={styles.button} onPress={e => pop(e)} title='Dequeue' />
      </div>
      <div style={styles.queue}>
      {
        queue.length > 0 ?
        queue.map( (item,index) => 
                <div style={ 
                    index == 0 ? 
                    styles.queue_item_start : 
                    styles.queue_item
                }>
                    {item}
                </div>
            )
        :
        <>Queue is empty</>
      }
      </div>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff0',
    fontFamily:'monospace',
    textAlign:'center',
  },
  text_input:{
    backgroundColor:'lightblue',
    borderColor:'black',
    padding:'5px',
    textAlign:'center'
  },
  btn_group:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
  },
  button:{
    margin:'5px 10px'
  },
  queue:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center'
  },
  queue_item:{
    border: '1px solid black',
    width:'23%',                        // ( 92% / 4 ) = 23% 
    overflow:'hidden'
  },
  queue_item_start:{
    backgroundColor:'lightgreen',
    border: '1px solid black',
    width:'23%',                        // ( 92% / 4 ) = 23% 
    overflow:'hidden'
  }, 
})