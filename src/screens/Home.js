import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {
  AddIcon,
  Box,
  Button,
  Container,
  Heading,
  Center,
  HStack,
  Stack,
  Icon,
  Checkbox,
} from 'native-base'
import {useIsFocused} from '@react-navigation/native'
const Home = ({navigation, route}) => {
  const [ListOfTodo, setListOfTodo] = useState([])
  const [loading, setLoading] = useState(false)
  const reload = useIsFocused()

  // useEffect
  useEffect(() => {
    getList()
  }, [reload])

  const getList = async () => {
    setLoading(true)
    const getTodo = await AsyncStorage.getItem('@todo')
    setListOfTodo(JSON.parse(getTodo))
    setLoading(false)
  }
  const deleteTodo = async id => {
    const newList = ListOfTodo.filter(item => item.id !== id)
    await AsyncStorage.setItem('@todo', JSON.stringify(newList))
    setListOfTodo(newList)
  }

  const markComplete = async id => {
    const newList = ListOfTodo.map(list => {
      if (list.id === id) {
        list.isChecked = !list.isChecked
      }
      return list
    })
    await AsyncStorage.setItem('@todo', JSON.stringify(newList))
    setListOfTodo(newList)
  }

  console.log(ListOfTodo, 'ListOfTodo')
  if (loading) {
    return (
      <Heading
        style={{
          textAlign: 'center',
          marginTop: 'auto',
          marginBottom: 'auto',
        }}>
        Loading....
      </Heading>
    )
  }

  return (
    <Box style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Button
          style={{
            backgroundColor: '#5067FF',
            height: 70,
            width: 70,
            borderRadius: 70 / 2,
            marginLeft: 300,
            marginTop: 550,
            position: 'absolute',
          }}
          onPress={() => navigation.navigate('Add')}>
          <AddIcon name='add' size='6' color='#fff' />
        </Button>
        {ListOfTodo?.length === 0 ? (
          <Container>
            <Heading style={styles.heading}>Todo is Empty</Heading>
          </Container>
        ) : (
          <>
            <Stack space={3} alignItems='center'>
              <Heading textAlign='center' mb='10' style={styles.heading}>
                List of Todo
              </Heading>
              {ListOfTodo?.map(item => (
                <HStack space={14} alignItems='center' key={item?.id}>
                  <Text style={styles.seasonName}>{item?.name}</Text>
                  <Button
                    colorScheme='red'
                    onPress={() => deleteTodo(item?.id)}>
                    Delete
                  </Button>
                  <Button
                    onPress={() => navigation.navigate('Edit', {item})}
                    colorScheme='yellow'>
                    Update
                  </Button>
                  <Checkbox
                    colorScheme='green'
                    onPress={() => markComplete(item?.id)}
                    isChecked={item?.isChecked}
                  />
                </HStack>
              ))}
            </Stack>
          </>
        )}
      </ScrollView>
    </Box>
  )
}

export default Home

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    position: 'relative',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
  },
})
