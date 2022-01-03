import React from 'react'
import {StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './src/screens/Home'
import Add from './src/screens/Add'
import Edit from './src/screens/Edit'
import {NativeBaseProvider} from 'native-base'
const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor='#1b262c' />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              headerStyle: {
                backgroundColor: '#0f4c75',
              },
              title: 'Todo App',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: '#00b7c2',
              },
            }}
          />

          <Stack.Screen
            name='Add'
            component={Add}
            options={{
              headerStyle: {
                backgroundColor: '#0f4c75',
              },
              title: 'Todo App',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: '#00b7c2',
              },
            }}
          />

          <Stack.Screen
            name='Edit'
            component={Edit}
            options={{
              headerStyle: {
                backgroundColor: '#0f4c75',
              },
              title: 'Todo App',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: '#00b7c2',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App
