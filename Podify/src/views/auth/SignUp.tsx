import { FC } from 'react';
import * as yup from 'yup';
import colors from '@utils/colors';
import Form from '@components/form';
import { StyleSheet, View } from 'react-native';
import SubmitBtn from '@components/form/SubmitBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthInputField from '@components/form/AuthInputField';


const signupSchema = yup.object({
    name: yup
        .string()
        .trim("Name is missing!")
        .min(3, "Invalid name!")
        .max(50)
        .required("Name is required!"),
    email: yup
        .string()
        .trim("Email is missing!")
        .email("Invalid email format!")
        .required("Email is required!"),
    password: yup
        .string()
        .trim("Password is missing!")
        .min(6, 'password is too short')
        .max(36, 'password is too long')
        .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
            "Password is too simple!"
        )
        .required("Password is required!")
})

interface Props { }

const initialValues = {
    name: '',
    email: '',
    password: ''
};

const SignUp: FC<Props> = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Form
                onSubmit={(values) => {
                    console.log(values)
                }}
                initialValues={initialValues}
                validationSchema={signupSchema}
            >
                <View style={styles.formContainer}>
                    <AuthInputField
                        name='name'
                        placeholder='Your name'
                        label='Name'
                        containerStyle={styles.marginBottom}
                    />

                    <AuthInputField
                        name='email'
                        placeholder='example@email.com'
                        label='E-mail'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        containerStyle={styles.marginBottom}
                    />

                    <AuthInputField
                        placeholder='*********'
                        label='Password'
                        autoCapitalize='none'
                        secureTextEntry
                        name='password'
                        containerStyle={styles.marginBottom}
                    />

                    <SubmitBtn title='Sign Up' />

                </View>
            </Form>
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