import { FC } from 'react';
import colors from '@utils/colors';
import AppInput from '@ui/AppInput';
import { StyleProp, StyleSheet, Text, TextInputProps, View, ViewStyle } from 'react-native';


interface Props {
    label?: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    onChange?: (text: string) => void;
    containerStyle?: StyleProp<ViewStyle>;
    keyboardType?: TextInputProps['keyboardType'];
    autoCapitalize?: TextInputProps['autoCapitalize'];
}

const AuthInputField: FC<Props> = (props) => {

    const { label,
        onChange,
        placeholder,
        keyboardType,
        autoCapitalize,
        secureTextEntry,
        containerStyle } = props;

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.label}>{label}</Text>
            <AppInput
                placeholder={placeholder}
                onChangeText={onChange}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    label: {
        color: colors.CONTRAST,
        padding: 5
    }
});

export default AuthInputField;