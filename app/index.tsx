import { StatusBar } from 'expo-status-bar';
import { Suspense, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { standardLogin } from '@/utils/authUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError("");
            }, 3000)
        }
    }, [error])

    async function handleLogin() {
        setLoading(true);
        console.log(email, password);
        const res: any = await standardLogin(email, password);
        console.log(res);
        if (res.status === "success") {
            setLoading(false);
            console.log(res);
            const token = res.data.dataAuth.accessToken;
            await AsyncStorage.setItem('auth-token', token);
            router.replace('/shop')
        } else {
            setLoading(false);
            setError("Error: Invalid Credentials");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={require("../assets/logo.png")} style={styles.logo} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.descriptionTitle}>
                    Welcome
                </Text>
                <Text style={styles.description}>
                    The following is a react native app which uses the Expo CLI in order to allow compilation and testing on Android, IOS and Web.
                    Use the following credentials to Sign In: email - d.zambrano.vasconez@gmail.com , password: Palero1987
                </Text>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    style={styles.textInput}
                    placeholder='email'
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder='password'
                />
                {!loading && (
                    <Pressable
                        style={styles.button}
                        onPress={async () => { await handleLogin() }}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </Pressable>
                )}
                {loading && (
                    <Pressable style={styles.button} disabled >
                        <Text style={styles.buttonText}>Loading...</Text>
                    </Pressable>
                )}
                {error && (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                )}
            </View>
            <StatusBar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width: "100%",
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6D4859',
        position: 'relative',
    },
    headerIcon: {
        position: 'absolute',
        right: 30,
    },
    logo: {
        width: 70,
        height: 70,
    },
    inputContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: '#A8919C',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 5,
    },
    textInput: {
        width: '90%',
        height: 60,
        borderColor: '#E4DDDD',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: "#ffffff"
    },
    errorText: {
        color: "red",
    },
    button: {
        backgroundColor: "#806874",
        width: '90%',
        height: 70,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: 20,
    },
    description: {
        width: "90%",
        color: "#ffffff",
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 20,
    },
    descriptionTitle: {
        width: "90%",
        color: "#ffffff",
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingTop: 20,
    }
});
