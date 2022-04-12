import React,{useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Screens/Home";
import TodoList from './Screens/TodoList';
import EditList from './Screens/EditList';
import Colors from './constants/Colors';
import * as firebase from 'firebase';
import Login from "./Screens/Login";
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
  return(
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login}/>
    </AuthStack.Navigator>
  )
}
const Screens =() =>{
  return(<Stack.Navigator>
    <Stack.Screen name="C_S_J ToDo" component={Home}/>
    <Stack.Screen name="TodoList"
     component={TodoList}  
     options={({route})=>{
       return({
         title:route.params.title,
         headerStyle:{
           backgroundColor:route.params.color
         }
       })
     }}
     />
     <Stack.Screen name="Edit" component={EditList}
        options={({route})=>{
          return({
            title: route.params.title ? `Edit ${route.params.title} list` : "Create new list",
            headerStyle:{
              backgroundColor:route.params.color || Colors.blue
            },
            backgroundTintColor: "white"
          })
        }}
     />
  </Stack.Navigator>)
}

// export default function App() {
//   const[isAuthenticated, setIsAuthenticated] = useState(false);// enables and disables login page 
//   useEffect(()=> {
//     if(firebase.auth().currentUser) {
//       setIsAuthenticated(true)
//     }
//     firebase.auth().onAuthStateChanged(user =>{
//       console.log("Checking authentication state......")// passes  only if a user is authenticated
//       if(user){
//         setIsAuthenticated(true)
//       }
//       else{
//         setIsAuthenticated(false);
//       }

//     })

//   },[])// to stop is from running everytime we run it. it will only run once using []
//   return (
//     <NavigationContainer>      
//       {isAuthenticated ? <Screens/>: <AuthScreens />}
//     </NavigationContainer>
//   );
// }

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
      if (firebase.auth().currentUser) {
          setIsAuthenticated(true);
      }
      firebase.auth().onAuthStateChanged((user) => {
          console.log("Checking auth state...");
          if (user) {
              setIsAuthenticated(true);
          } else {
              setIsAuthenticated(false);
          }
      });
  }, []);

  return (
      <NavigationContainer>
          {isAuthenticated ? <Screens /> : <AuthScreens />}
      </NavigationContainer>
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyCC1wQd2cT1tatw7Zgha0KXr3pLTf-CMzg",
  authDomain: "cjstodo-9d755.firebaseapp.com",
  projectId: "cjstodo-9d755",
  storageBucket: "cjstodo-9d755.appspot.com",
  messagingSenderId: "258205299407",
  appId: "1:258205299407:web:14248d1a572344f585bdba",
  measurementId: "G-NG77NV5QEV"
};
firebase.initializeApp(firebaseConfig);

