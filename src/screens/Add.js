import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {
  Container,
  Box,
  FormControl,
  Item,
  Input,
  Button,
  Heading,
  WarningOutlineIcon,
  Stack,
} from 'native-base'
import shortid from 'shortid'
import AsyncStorage from '@react-native-community/async-storage'
const Add = ({navigation}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const addToList = async () => {
    try {
      if (!name || !description) {
        return alert('Please add both fields')
      }
      const seasonToAdd = {
        id: shortid.generate(),
        name,
        description,
        isChecked: false,
      }
      console.log(seasonToAdd, 'seasonToAdd')
      // get and setItem in localstorge
      const storedValue = await AsyncStorage.getItem('@todo')
      const prevList = await JSON.parse(storedValue)
      console.log(prevList, 'prevList')
      if (!prevList) {
        let DataList = [seasonToAdd]
        await AsyncStorage.setItem('@todo', JSON.stringify(DataList))
      } else {
        prevList.push(seasonToAdd)
        await AsyncStorage.setItem('@todo', JSON.stringify(prevList))
        setName('')
        setDescription('')
      }
      navigation.navigate('Home')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box style={styles.container}>
      <ScrollView>
        <Heading size='md' style={styles.heading}>
          Add To Watch List
        </Heading>
        <FormControl>
          <Input
            w={{
              base: '100%',
              md: '25%',
            }}
            variant='rounded'
            type='text'
            size='xl'
            placeholder='Enter the Todo'
            value={name}
            onChangeText={text => {
              setName(text)
            }}
            style={{color: '#eee', textAlign: 'center'}}
          />
          <Input
            w={{
              base: '100%',
              md: '25%',
            }}
            mt='8'
            variant='rounded'
            type='text'
            size='xl'
            value={description}
            onChangeText={text => {
              setDescription(text)
            }}
            placeholder='Total no of todo'
            style={{color: '#eee', textAlign: 'center'}}
          />
          <Button
            onPress={addToList}
            small
            primary
            mt='5'
            style={{borderRadius: 50}}>
            <Text style={{color: '#eee', fontSize: 20}}>Add</Text>
          </Button>
        </FormControl>
      </ScrollView>
    </Box>
  )
}
export default Add
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b262c',
  },

  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
})
