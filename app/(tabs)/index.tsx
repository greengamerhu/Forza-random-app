import { Pressable, StyleSheet } from 'react-native';
import React, {useState, useEffect, createContext, useContext} from 'react';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Button, ListItem, color } from '@rneui/base';
import { getCarsList, getTypes } from '../../components/readJSON';
import { CarDetails } from '../../components/CarDetails';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Link, Tabs } from 'expo-router';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  mainPage: undefined
  carsScreen : {carTypeList : CarDetails[]}
  
};

const Stack = createNativeStackNavigator<RootStackParamList>();
type carScreenProps = NativeStackScreenProps<RootStackParamList, 'carsScreen'> 
export const CarScreen : React.FC<carScreenProps> = (props) => {
  function checkPerformanceColor(performanceClass : string) {
    if (performanceClass == 'D') {
      return '#42bdf4'
    }
    if (performanceClass == 'C') {
      return '#ffc533'
    }
    if (performanceClass == 'B') {
      return '#ff632c'
    }
    if (performanceClass == 'A') {
      return '#f43156'
    }
    if (performanceClass == 'S1') {
      return '#b960e8'
    }
    if (performanceClass == 'S2') {
      return '#165edb'
    }
    if (performanceClass == 'X') {
      return '#19d858'
    }
  }
  return ( <View style={styles.container}>
          { <ScrollView >
      {
        
        props.route.params.carTypeList.map(item => (
          <React.Fragment key={item.Id}>

          <ListItem  key={item.Id}  containerStyle = {{backgroundColor : 'transparent'}} >
            <ListItem.Content >
                <View  style={{flexDirection : 'row', flex :1}}>

                    <View style={{flex:5}}>
                      <Text style = {{fontSize : 18}} >{item.Name}</Text>
                    </View>
                    <View style={{flex:2}}>
                      <View style={[styles.horizontalContainer, { borderColor : checkPerformanceColor(item.PI), }]} >
                        <View  style={{flex : 1, backgroundColor : checkPerformanceColor(item.PI), paddingHorizontal: 8,paddingVertical: 5.,alignItems: 'center',justifyContent: 'center',minWidth: 27}}>
                           <Text >{item.PI}</Text> 
                        </View>
                        <View  style = {{flex:5, backgroundColor :'white', paddingHorizontal: 8,paddingVertical: 4,alignItems: 'center',justifyContent: 'center',} }>
                           <Text style = {styles.indicatorText}>{item.PI__1}</Text>
                        </View>
                      </View>
                    {/* <Text  style={{backgroundColor : checkPerformanceColor(item.PI), textAlign : 'center', fontSize : '25px'}}>{item.PI}</Text> */}
                     {/* <Text style={{backgroundColor : 'white', color: 'black', fontWeight : 'bold', textAlign : 'center', fontSize : '20px'}}>{item.PI__1}</Text> */}
                    </View>
                   
                   
                </View>
            </ListItem.Content>
          </ListItem>
  
        </React.Fragment>
        ))
      }
      </ScrollView> }
   
    
    
    <Button title={"Vissza"} onPress={() => props.navigation.goBack()}></Button>
  </View>
  )
}
type mainPageScreenProps = NativeStackScreenProps<RootStackParamList, 'mainPage', 'carsScreen'> 
export const MainPage:  React.FC<mainPageScreenProps> = (props) => {
  const [carList, setCarList] = useState<CarDetails[]>([]) 
  const [randomTypeList, setrandomTypeList] = useState<CarDetails[]>([]) 
  const [randomType, setrandomType] = useState('')  
  const [randomAvgPerft, setrandomAvgPref] = useState('')
  const [randomMaxPerft, setrandomMaxPref] = useState('')
  const [randomMinPerft, setrandomMinPref] = useState('')
useEffect(() => {
      
  let cars = getCarsList()
  if(carList.length == 0) {
    setCarList(cars)
  } else {
  }

})

  let pickRandomType = () => {
    let types : string[] = getTypes()
    let type = getRandomElement(types)
    let typeFiltered = carList.filter((item) => item.Type == type)
    let avgPerformance = 0
    let maxPerformance = typeFiltered[0].PI__1
    let minPerformance = typeFiltered[0].PI__1
    let sumPerformance = 0
    typeFiltered.forEach((item) => {
      sumPerformance += item.PI__1
      if(item.PI__1 > maxPerformance ) {
        maxPerformance = item.PI__1
      }
      if(item.PI__1 < minPerformance) {
        minPerformance = item.PI__1
      }
    })
    avgPerformance = sumPerformance / (typeFiltered.length)
    setrandomType(type)
    setrandomMinPref("Min: " + minPerformance)
    setrandomMaxPref("Max: "  + maxPerformance )
    setrandomAvgPref("Avg: " + Math.round(avgPerformance) )
    setrandomTypeList(typeFiltered)

  }
  const getRandomElement = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)]
  return ( 
  
      <View style={styles.container}>

   

      <View style={styles.container}>
        <Text style = {{fontSize : 40, alignSelf : 'center', padding : 10}}>{randomType}</Text>
        {randomType == "" ? '' : <Pressable  onPress={() => { props.navigation.push('carsScreen', { carTypeList : randomTypeList}) }} style = {styles.button} >
            <Text style = {styles.buttonTitle}>Show cars</Text>
          </Pressable>}
        <View style={styles.container3 }>
          <Text style = {{fontSize : 15, alignSelf : 'center'}}>{ randomMinPerft}</Text>
          <Text style = {{fontSize : 15, alignSelf : 'center'}}>{randomAvgPerft}</Text>
          <Text style = {{fontSize : 15, alignSelf : 'center'}}>{ randomMaxPerft}</Text>
        </View>

      </View>
    <View style={{flex : 2}}>

    
      <Button title={'RANDOMIZE'} onPress={pickRandomType} ></Button>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
   
    </View>
    </View>
  )
}

export default function TabOneScreen({}) {
  return (
    <GestureHandlerRootView style={{flex : 1}}>
      <Stack.Navigator screenOptions={{headerShown : true, }}>
        <Stack.Screen name = 'mainPage' options={{title : "Randomizer", headerTitleAlign : 'center'}} component={MainPage} />
        <Stack.Screen name = "carsScreen"options={{title : "Car list"}} component={CarScreen} />
      </Stack.Navigator>
      </GestureHandlerRootView>
  )
 
  const [carList, setCarList] = useState<CarDetails[]>([]) 
  const [randomType, setrandomType] = useState('')
  const [randomAvgPerft, setrandomAvgPref] = useState('')
  const [randomMaxPerft, setrandomMaxPref] = useState('')
  const [randomMinPerft, setrandomMinPref] = useState('')


}


const styles = StyleSheet.create({
    horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth : 2,
    borderStyle : 'solid'
  },
  indicatorContainer: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    borderWidth: 1,
    borderColor: '#FFF', // White border for contrast
    marginRight: 5, // Space between the indicator and number box
  },
  indicatorText: {
    color: 'black', // White text color for contrast
    fontWeight: 'bold',
    fontSize: 16,
  },
  container3 : {
    flexDirection : 'row',
    justifyContent : 'space-around',
    textAlign : 'center',
    flexWrap : 'wrap',
    marginBottom : 10
  },  
  container2 : {
    flex : 3,
    justifyContent : 'center',
    alignItems : 'center'


  },
  container: {
    flex: 1,
    justifyContent : 'center',
    // alignItems : 'center'
  },

  title: {
    alignSelf : 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button : {
    margin : 30,
    width : 130,
    alignSelf : 'center',
    alignItems : 'center',
    borderColor: 'white', // Border color
    borderWidth: 2, // Border width
    backgroundColor: 'transparent', // Transparent background
    padding : 15,
    borderRadius: 5, // Rounded corners
  },
  buttonTitle: {
    color: 'white', // Text color
    fontWeight: 'bold', // Bold text
    fontSize : 18
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
});
