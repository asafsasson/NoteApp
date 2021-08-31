import React, { createContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import fire from '../fire'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState({ value: ''})
    const [password, setPassword] = useState({ value: ''})

    const loginBtn = () => {
        console.log(email.value)
        console.log(password.value)
        fire.auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(() => {
                fire.auth().onAuthStateChanged(authUser => {
                    if (authUser !== null) {
                        console.log(authUser)
                    }
                })
            })
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        alert("wrong Email");
                        console.log(err.message)
                        break;
                    case "auth/wrong-password":
                        alert("wrong Password");
                        console.log(err.message)
                        break;
                }

            });
    }

    const signupBtn = () => {
        console.log("signUp")
    }


    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/moveoappLogo.png')}
            />
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setEmail({ value: text })} />
            </View>
            <View style={styles.inputView} >
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setPassword({ value: text })} />
            </View>

            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={loginBtn} style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>

            </TouchableOpacity>
            <TouchableOpacity  onPress={signupBtn}>
                <Text style={styles.loginText}>Signup</Text>
            </TouchableOpacity>
        </View>

    )

}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(241, 241, 241)',
        alignItems: 'center',
        justifyContent: 'center',

    },
    logo: {
        width: "50%",
        height: "20%",
        marginBottom: 40
    },

    appName: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#fb5b5a",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        height: 70,

    },
    forgot: {
        color: "#808080",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "rgb(241 ,180, 23)",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10

    },
    loginText: {
        color: "#808080",
        fontWeight: "bold",
        fontSize: 15,
    }
});