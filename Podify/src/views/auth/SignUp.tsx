import * as yup from 'yup';
import AppLink from '@ui/AppLink';
import { FC, useState } from 'react';
import Form from '@components/form';
import { StyleSheet, View } from 'react-native';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AuthInputField from '@components/form/AuthInputField';
import AuthFormContainer from '@components/AuthFormContainer';


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
    const [secureEntry, setSecureEntry] = useState(true);

    const togglePasswordView = () => { setSecureEntry(!secureEntry) }

    return (
        <Form
            onSubmit={(values) => {
                console.log(values)
            }}
            initialValues={initialValues}
            validationSchema={signupSchema}
        >
            <AuthFormContainer
                heading='Welcome'
                subHeading='Get started on podify creating a new account'
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
                        secureTextEntry={secureEntry}
                        name='password'
                        containerStyle={styles.marginBottom}
                        rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry}
                        />}
                        onRightIconPress={togglePasswordView}
                    />

                    <SubmitBtn title='Sign Up' />

                    <View style={styles.linkContainer}>
                        <AppLink title='Forget my password' />
                        <AppLink title='Sign In' />
                    </View>

                </View>

            </AuthFormContainer>
        </Form>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        paddingHorizontal: 15
    },
    marginBottom: {
        marginBottom: 20
    },
    linkContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },

});

export default SignUp;