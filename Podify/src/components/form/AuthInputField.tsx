import { FC, useEffect } from 'react';
import colors from '@utils/colors';
import AppInput from '@ui/AppInput';
import { useFormikContext } from 'formik';
import Animated,
{
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import {
    View,
    Text,
    ViewStyle,
    StyleProp,
    StyleSheet,
    TextInputProps,
} from 'react-native';


interface Props {
    name: string;
    label?: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    keyboardType?: TextInputProps['keyboardType'];
    autoCapitalize?: TextInputProps['autoCapitalize'];
}

const AuthInputField: FC<Props> = (props) => {
    const inputTransformValue = useSharedValue(0);

    const { handleChange, values, errors, touched, handleBlur } =
        useFormikContext<{ [key: string]: string }>()

    const { label,
        name,
        placeholder,
        keyboardType,
        autoCapitalize,
        secureTextEntry,
        containerStyle } = props;

    const errorMsg = touched[name] && errors[name] ? errors[name] : '';

    const shakeUI = () => {
        inputTransformValue.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withSpring(0, {
                damping: 8,
                mass: 0.5,
                stiffness: 1000,
            })
        )
    }

    const inputStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: inputTransformValue.value }]
        }
    });

    useEffect(() => {
        if (errorMsg) shakeUI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorMsg]);

    return (
        <Animated.View style={[inputStyle, containerStyle]}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>
            <AppInput
                value={values[name]}
                placeholder={placeholder}
                onChangeText={handleChange(name)}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureTextEntry}
                onBlur={handleBlur(name)}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    label: {
        color: colors.CONTRAST,
    },
    errorMsg: {
        color: colors.ERROR
    },
    labelContainer: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default AuthInputField;