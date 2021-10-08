import React from 'react'
import { Text, View } from 'react-native'
//import { firebase } from '../../firebase/config'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function HomeScreen(props) {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    /*
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
*/
    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    )
}