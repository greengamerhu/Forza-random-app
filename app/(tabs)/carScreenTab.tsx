import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../StackParamList"
import { Text, View } from '../../components/Themed';

import { Button, Pressable, ScrollView, StyleSheet } from "react-native"
import React, { useEffect, useState } from "react"
import {  ListItem } from "@rneui/base"
import { CarDetails } from "../../components/CarDetails";
import { Icon } from "@rneui/themed";


type carScreenProps = NativeStackScreenProps<RootStackParamList, 'carsScreen'> 
export const CarScreen : React.FC<carScreenProps> = (props) => {
  const [randomTypeList, setrandomTypeList] = useState<CarDetails[]>([]) 
  const [sortAscending, setSortAscending] = useState(true); 
    useEffect(() => {
        setrandomTypeList(props.route.params.carTypeList)
    }, [props.route.params.carTypeList])
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
  function sortList(whichButton : String) {
    if(whichButton == "PI") {
        const sorted =  [...randomTypeList].sort((a,b) => {
            if(sortAscending) {
                return a.PI__1 - b.PI__1
            } else {
                return b.PI__1 - a.PI__1
            }
            
        })
        setrandomTypeList(sorted)
        setSortAscending(!sortAscending)
    } else {

    }

   

  }
    return ( <View style={styles.container}>
            <View style = {{flexDirection : 'row'}}>
                
                <View style = {{flex : 3}}><Text >Car Name</Text></View>
                <View style = {{flex : 3}}><Text style = {{alignSelf : 'center'}}>Performance Index</Text></View>
            </View>
          { <ScrollView >
      {
        
            randomTypeList.map(item => (
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
      </ScrollView> 
      }
   
      <Pressable style={styles.button} onPress={() => {sortList('PI')}}>
        <Text style={styles.buttonTitle}>Sort by Performance Index</Text>
      </Pressable>
  </View>
  )
}
 const styles = StyleSheet.create({
    horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth : 2,
    borderStyle : 'solid'
  },
  buttonTitle: {
    color: 'white', // Text color
    fontWeight: 'bold', // Bold text
    fontSize : 18
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
  container: {
    flex: 1,
    justifyContent : 'center',
    // alignItems : 'center'
  },
  button : {
    margin : 30, 
    alignSelf : 'center',
    alignItems : 'center',
    borderColor: 'white', // Border color
    borderWidth: 2, // Border width
    backgroundColor: 'transparent', // Transparent background
    padding : 15,
    borderRadius: 5, // Rounded corners
  }

});
