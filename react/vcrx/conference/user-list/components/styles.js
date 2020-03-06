import {StyleSheet} from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { ColorPalette, BoxModel } from "../../../../features/base/styles";

let margin = responsiveHeight(2) > responsiveWidth(2) ? responsiveWidth(2) : responsiveHeight(2);
let parding = responsiveHeight(1) > responsiveWidth(1) ? responsiveWidth(1) : responsiveHeight(1);

export default StyleSheet.create({
    headerLogo: {
        width: 70,
        height: 19,
    },
    headerTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: ColorPalette.classy,
        borderRadius: 12,
        paddingHorizontal: BoxModel.padding,
        marginBottom: BoxModel.paddingSm,
        height: 24,
    },
    headerText: {
        color: "#fff",
    },
    wrapperItemUser2: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 13,
    },
    wrapperItemUser: {
        flexDirection: "row"
    },
    userListTittle: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        marginLeft: 5,
        marginBottom: 5,
        width: "45%",
        borderBottomWidth: 1,
        borderBottomColor: "#dbac69",
        backgroundColor: "#dbac69",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 2
    },
    userListTittleText: {
        fontSize: 11
    },
    listUser: {
        flex: 1,
        // backgroundColor: "rgba(255,255,255,1)",
        // paddingLeft: parding,
        // paddingTop: parding,
        // paddingRight: parding,
        // marginLeft: margin,
        // marginTop: margin,
        marginBottom: margin,
        // borderRadius: 5,
        // marginHorizontal: -BoxModel.padding,
        // paddingRight: BoxModel.padding,
    },
    userList: {
        flex: 8,
        textAlignVertical: "center",
        fontSize: 12,
        color: "#151a1d",
        marginTop: "2%",
        marginLeft: "1%",
        marginRight: "9%",
    },
    userListOwn: {
        flex: 8,
        textAlignVertical: "center",
        fontSize: 12,
        color: "#3399ff",
        marginTop: "2%",
        marginLeft: "1%",
        marginRight: "9%",
    },
    iconCirle: {
        fontSize: 13,
        marginRight: 3,
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center"
    },
    raiseHand: {
        marginRight: "12%",
        marginTop: "2%"
    },
    audioButtonStylesIconMuted: {
        width:100,
        color: ColorPalette.darkGrey,
        fontSize: 13,
        position: "absolute",
        right: "2%",
        marginTop: "2%"
    },
    audioButtonStylesIconNotMuted: {
        color: "#4C9AFF",
        fontSize: 14,
        position: "absolute",
        right: "2%",
        marginTop: "2%"
    },
    wrappUserItem: {
        width: "100%",
        height: 25,
        backgroundColor: "#fff",
        flexDirection: "row",
        position: "absolute",
        left: "1%"
    },
    roleIcon: {
        margin: "2%",
        width: 17
    },
    icAudio: {
        width: "5%",
        position: "absolute",
        right: "2%",
        marginTop: "2%"
    }
});
