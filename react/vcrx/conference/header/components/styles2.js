import {BoxModel, ColorPalette} from "../../../../features/base/styles";
import { StyleSheet }               from "react-native";

let audioButtonStylesIcon = {
    alignSelf: "center",
    fontSize: 13
};
export default StyleSheet.create({
    leftBox: {
        flexDirection: "row",
        alignItems: "center",
        flex: 4,
    },
    rightBox: {
        flexDirection: "row",
        alignItems: "center",
        flex: 4,
        justifyContent: "flex-end",
    },
    circle: {
        width: 14,
        height: 14,
        marginRight: 8,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: ColorPalette.white,
        backgroundColor: ColorPalette.green
    },
    microBox: {
        position: "relative",
        bottom: 3,
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 5,
        borderColor: ColorPalette.textBlack,
        backgroundColor: ColorPalette.classy,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        position: "relative",
        // flex: 1,
        height: 34,
        backgroundColor: ColorPalette.black,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: BoxModel.paddingMd,
    },
    headerGradient: {
        flex: 1,
        height: 30,
        backgroundColor: "#fff",
        justifyContent: "center",
        elevation: 10
    },
    headerLogo: {
        height: 30,
        width: 240,
        position: "absolute",
        left: 0,
        resizeMode: "contain",
        marginLeft: 0
    },
    roomIdHeader: {
        color: ColorPalette.classy,
    },
    audioButtonStyles: {
        flex: 1,
        justifyContent: "center",
        borderWidth: 0,
        flexDirection: "row",
        borderRadius: 15
    },
    borderIconMicOff: {
        position: "absolute",
        left: "50%",
        width: 25,
        height: 25,
        borderRadius: 15,
        backgroundColor: "#fff",
        borderColor: ColorPalette.darkGrey,
        borderWidth: 1
    },
    borderIconMicOn: {
        position: "absolute",
        left: "50%",
        width: 25,
        height: 25,
        borderRadius: 15,
        backgroundColor: "#f5515f"
    },
    audioButtonStylesIconMuted: {
        ...audioButtonStylesIcon,
        color: ColorPalette.darkGrey,
    },
    audioButtonStylesIconNotMuted: {
        ...audioButtonStylesIcon,
        color: "#fff"
    }
});
