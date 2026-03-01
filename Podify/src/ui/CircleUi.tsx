import { FC } from 'react';
import colors from '@utils/colors';
import { FlexStyle, StyleSheet, View } from 'react-native';

interface Props {
    size: number;
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const CircleUi: FC<Props> = ({ size, position }) => {

    let viewPosition: FlexStyle = {};

    switch (position) {
        case "top-left":
            viewPosition = {
                top: -size / 2,
                left: -size / 2
            }
            break;
        case "top-right":
            viewPosition = {
                top: -size / 2,
                right: -size / 2
            }
            break
        case "bottom-right":
            viewPosition = {
                bottom: -size / 2,
                right: -size / 2
            }
            break
        case "bottom-left":
            viewPosition = {
                bottom: -size / 2,
                left: -size / 2
            }
            break
    }

    const styles = StyleSheet.create({
        circleContainer: {
            width: size,
            height: size,
            position: 'absolute',
            ...viewPosition
        },
        circle: {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors.SECONDARY,
            opacity: 0.3,
        },
        innerCircle: {
            width: size / 1.5,
            height: size / 1.5,
            borderRadius: size / 3,
            backgroundColor: colors.SECONDARY,
            opacity: 0.3,
            position: 'absolute',
            top: "50%",
            left: "50%",
            transform: [
                { translateX: -size / 3 },
                { translateY: -size / 3 }
            ],
        },
    });

    return (
        <View style={styles.circleContainer}>
            <View style={styles.circle} />
            <View style={styles.innerCircle} />
        </View>
    );
};

export default CircleUi;