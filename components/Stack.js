import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button, TextInput, Alert, DevSettings, Platform } from 'react-native'

export default function Stack() {

  const [stack, setStack] = useState([])
  const [curValue, setCurValue] = useState(null)

  const callAlert = (title, msg, buttons) => {
    if( Platform.OS === 'web' ) alert(title+' : '+msg) 
    else Alert.alert(title, msg, buttons)
  }
  

  const push = (e) => {
    e.preventDefault()

    if(curValue != null){
      setStack( [curValue, ...stack] )
      setCurValue(null)
    }
  }

  
  const pop = (e) => {
    e.preventDefault()

    if(stack.length <= 0){
      // pop an alert
      callAlert('Stack Pop operation not possible !', 'Stack is empty', [])
    }

    if(stack.length > 0){
      let st = [...stack]
      Alert.alert('Popping',st.shift())
      setStack(st)
    }
  }

  useEffect( ()=>{}, [stack] )

  return (
    <View style={styles.container}>
      <Text>Enter a value to push into stack</Text>
      <TextInput
        style={styles.text_input}
        placeholder='Enter a value to push'
        testID='value_input'
        autoComplete='true'
        onChangeText={e=>setCurValue(e)}
      />
      <div style={styles.btn_group}>
        <Button class={styles.button} onPress={e => push(e)} title='Push' />
        <Button class={styles.button} onPress={e => pop(e)} title='Pop' />
      </div>
      <div style={styles.stack}>
      {
        stack.length > 0 ?
        stack.map( (item,index) => 
          <div style={
            index == 0 ?
            styles.stack_item_top :
            styles.stack_item 
          }>
            {item}
          </div>
        )
        :
        <>Stack is empty</>
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
    margin:'5px 10px',
  },
  stack:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  stack_item:{
    border: '1px solid black',
    width:'50%',                        // ( 92% / 4 ) = 23% 
    overflow:'hidden'
  },
  stack_item_top:{
    backgroundColor:'lightgreen',
    border: '1px solid black',
    width:'50%',                        // ( 92% / 4 ) = 23% 
    overflow:'hidden'
  }, 
})