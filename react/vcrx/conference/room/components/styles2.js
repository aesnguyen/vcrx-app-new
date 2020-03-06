import {
    BoxModel,
    ColorPalette,
    createStyleSheet
} from "./../../../../features/base/styles";
import { responsiveHeight ,responsiveWidth } from "react-native-responsive-dimensions";

let height = responsiveHeight(2) > responsiveWidth(2) ? responsiveWidth(2) : responsiveHeight(2);
export default createStyleSheet({
    header: {
        height: 30,
        backgroundColor: "#fff",
        flexDirection: "row"
    },
    headerGradient: {
        flex: 1,
        height: 30,
        backgroundColor: "#fff",
        elevation: 10
    },
    headerLogo: {
        height: 30,
        width: 240,
        resizeMode: "contain",
        marginLeft: 0
    },
    contentIdRoom: {
        position: "absolute",
        right: "1%",
        width: 180,
        height: 18,
        borderRadius: 10,
        backgroundColor: "#bfc4c8",
        marginTop: 5
    },
    roomIdHeader: {
        color: "#000",
        lineHeight: 17,
        textAlign: "center"
    },
    contentLayout: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
    },
    leftApp: {
        flex: 7,
        paddingVertical: BoxModel.padding,
        paddingLeft: BoxModel.padding,
        paddingRight: BoxModel.paddingLg,
    },
    largeVideo: {
        flex: 4,
        // marginLeft: height,
        marginTop: height,
        // marginBottom: height,
        borderRadius: 5,
        alignItems:"center",
        justifyContent: "center",
        zIndex: 0
    },
    rightApp: {
        flex: 16,
        flexDirection:"row",
        // paddingHorizontal: BoxModel.padding,
        // padding: height
    },
    CountDown2 : {
        flex: 1,
        marginTop: height
    },
    rightApp3 :{
        flex: 13,
        flexDirection:"row",
        padding: height
    },
    sideBar3: {
        flex: 1,
        flexDirection:"column",
        marginLeft: height,
        marginTop: 0
    },
    leftApp4:{
        flex: 1,
        flexDirection:"row",
        padding: height
    },
    drawLayout: {
        flex: 8,
        flexDirection: "column",
        position: "relative",
        // width:"100%",
        // borderRadius: 5,
        // borderRightWidth: 1,
        // borderLeftWidth: 1,
        // borderColor: ColorPalette.border,
    },
    chatBoxVisible: {
        position: "absolute",
        zIndex: 100,
        flex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: ColorPalette.white,
        // borderWidth: 1,
        // borderColor: ColorPalette.border,
    },
    largeVideoLayout4: {
        flex: 10,
        backgroundColor: "rgba(255,255,255,0.6)",
        borderRadius: 5
    }
});
