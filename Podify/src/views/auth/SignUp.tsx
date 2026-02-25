import { FC, useState } from 'react';
import colors from '@utils/colors';
import { Button, StyleSheet, View } from 'react-native';
import AuthInputField from '@components/AuthInputField';
import { SafeAreaView } from 'react-native-safe-area-context';


interface Props { }

const SignUp: FC<Props> = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>

                <AuthInputField
                    placeholder='Your name'
                    label='Name'
                    containerStyle={styles.marginBottom}
                    onChange={(text) => {
                        setUserInfo({ ...userInfo, name: text })
                    }}
                />

                <AuthInputField
                    placeholder='example@email.com'
                    label='E-mail'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    containerStyle={styles.marginBottom}
                    onChange={(text) => {
                        setUserInfo({ ...userInfo, email: text })
                    }}
                />

                <AuthInputField
                    placeholder='*********'
                    label='Password'
                    autoCapitalize='none'
                    secureTextEntry
                    onChange={(text) => {
                        setUserInfo({ ...userInfo, password: text })
                    }}
                />

                <Button
                    onPress={() => {
                        console.log(userInfo)
                    }}
                    title='Sign Up'
                />

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 15
    },
    marginBottom: {
        marginBottom: 20
    }
});

export default SignUp;