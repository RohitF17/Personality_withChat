import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Chat from './screens/Chat';
import Home from './screens/Home';
import Question1Screen from './screens/Question1';
import Question2Screen from './screens/Question2';
import Question3Screen from './screens/question3';
import Question4Screen from './screens/question4';
import ResultScreen from './screens/resultpage';

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Question1Screen}>
     <Stack.Screen name='Question1' component={Question1Screen} />
      <Stack.Screen name='Question2' component={Question2Screen} />
      <Stack.Screen name='Question3' component={Question3Screen} />
      <Stack.Screen name='Question4' component={Question4Screen} /> 
      <Stack.Screen name='Result' component={ResultScreen} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Chat' component={Chat} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}
function TestScreen(){
  return(
  <Stack.Navigator screenOptions={{ headerShown: false }} defaultScreenOptions={ResultScreen}>
      <Stack.Screen name='Question1' component={Question1Screen} />
      <Stack.Screen name='Question2' component={Question2Screen} />
      <Stack.Screen name='Question3' component={Question3Screen} />
      <Stack.Screen name='Question4' component={Question4Screen} /> 
      <Stack.Screen name='Result' component={ResultScreen} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
// unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}  
     
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}