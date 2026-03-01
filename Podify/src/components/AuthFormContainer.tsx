import { FC, ReactNode } from 'react';
import colors from '@utils/colors';
import CircleUi from '@ui/CircleUi';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
    heading?: string;
    subHeading?: string;
    children?: ReactNode
}

const AuthFormContainer: FC<Props> = ({ heading, subHeading, children }) => {
    return <View style={styles.container}>
        <CircleUi position='top-left' size={200} />
        <CircleUi position='top-right' size={100} />
        <CircleUi position='bottom-right' size={200} />
        <CircleUi position='bottom-left' size={100} />

        <View style={styles.headerContainer}>
            <Image source={require('../assets/logo.png')} />
            <Text style={styles.welcome}>{heading}</Text>
            <Text style={styles.text}>{subHeading}</Text>
        </View>

        {children}
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    welcome: {
        color: colors.SECONDARY,
        fontSize: 25, fontWeight: "bold",
        paddingVertical: 5
    },
    text: {
        color: colors.CONTRAST,
        fontSize: 16
    },
    headerContainer: {
        width: '100%',
        paddingHorizontal: 15,
        marginBottom: 20
    }
});

export default AuthFormContainer;