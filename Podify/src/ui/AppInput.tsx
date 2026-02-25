import { FC } from 'react';
import colors from '@utils/colors';
import { TextInputProps, StyleSheet, TextInput } from 'react-native';


interface Props extends TextInputProps { }

const AppInput: FC<Props> = (props) => {
    return (
        <TextInput
            {...props}
            placeholderTextColor={colors.INACTIVE_CONTRAST}
            style={styles.inputArea}
        />
    );
};

const styles = StyleSheet.create({
    inputArea: {
        borderWidth: 2,
        borderColor: colors.SECONDARY,
        height: 45,
        borderRadius: 25,
        color: colors.CONTRAST,
        padding: 10
    },
});

export default AppInput;