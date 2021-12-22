import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {Box, FormControl, Input, Button, Heading} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
const Edit = ({navigation, route}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [id, setId] = useState(null)

  useEffect(() => {
    const {item} = route.params
    const {id, name, description} = item
    setName(name)
    setDescription(description)
    setId(id)
  }, [])

  const UpdateToList = async () => {
    try {
      if (!name || !description) {
        return alert('Please add both fields')
      }
      const seasonToUpdate = {
        id,
        name,
        description,
        isChecked: false,
      }

      // get and setItem in localstorge
      const storedValue = await AsyncStorage.getItem('@todo')
      const List = await JSON.parse(storedValue)
      console.log(List, 'prevList')

      List.map(item => {
        if (item.id === id) {
          item.name = name
          item.description = description
        }
        return item
      })
      await AsyncStorage.setItem('@todo', JSON.stringify(List))
      navigation.navigate('Home')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box style={styles.container}>
      <ScrollView>
        <Heading size='md' style={styles.heading}>
          Update todo
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
            onPress={UpdateToList}
            small
            primary
            mt='5'
            style={{borderRadius: 50}}>
            <Text style={{color: '#eee', fontSize: 20}}>update</Text>
          </Button>
        </FormControl>
      </ScrollView>
    </Box>
  )
}
export default Edit
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
