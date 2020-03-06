import {
    BoxModel, ColorPalette,
    createStyleSheet
} from "./../../../../features/base/styles";
import { Dimensions }           from "react-native";
import {
    responsiveHeight,
    responsiveWidth
}                               from "react-native-responsive-dimensions";

const RES_WIDTH = 86;
const RES_HEIGHT = 86;

export default createStyleSheet({
    styleMenuDisable: {
        backgroundColor: ColorPalette.backgroundGrey,
        zIndex: 100,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: BoxModel.paddingSm
	  },
  	styleMenuEnable: {
        backgroundColor: ColorPalette.classy,
        zIndex: 100,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: BoxModel.paddingSm
    },
    fontAwesomeWarning:{
        textAlignVertical: "center",
        color: "#fff",
        fontSize: 16,
    },
    sidebarErrorText:{
        borderRadius: 5,
        backgroundColor: ColorPalette.white,
        textAlign: "center",
        color: ColorPalette.textBlack,
        fontSize: BoxModel.fontSize,
    },
    sidebarError:{
        width: 130,
        marginTop: 40,
        marginRight: 40,
        borderColor: ColorPalette.border,
        backgroundColor: ColorPalette.white,
        boxShadow: "0px 10px 24px rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        borderRadius: 5,
        padding: 0
    },
    mainBox: {
        justifyContent:"center",
        // width: Dimensions.get("window").width > Dimensions.get("window").height ? Dimensions.get("window").width : Dimensions.get("window").height,
        // height: Dimensions.get("window").height < Dimensions.get("window").width ? Dimensions.get("window").height : Dimensions.get("window").width,
        position: "absolute",
        zIndex: 1000,
        alignItems: "center"
    },
    errorBox:{
	    backgroundColor: ColorPalette.white,
        borderRadius: 4,
        width: responsiveWidth(RES_WIDTH) > responsiveHeight(RES_WIDTH) ? responsiveWidth(RES_WIDTH) : responsiveHeight(RES_WIDTH),
        height: responsiveHeight(RES_HEIGHT) < responsiveWidth(RES_HEIGHT) ? responsiveHeight(RES_HEIGHT) : responsiveWidth(RES_HEIGHT),
        padding: BoxModel.paddingLg,
    },
    inputError:{
        flex: 5,
	    borderColor: ColorPalette.border,
        backgroundColor: ColorPalette.grey100,
	    borderWidth:1,
        borderRadius: 0,
        marginTop: BoxModel.paddingMd,
        padding: BoxModel.padding,
        textAlignVertical:"top",
        color: ColorPalette.textBlack,
    },
    inputTitleError:{
        padding: BoxModel.padding,
        marginTop: BoxModel.paddingMd,
        color: ColorPalette.textBlack,
        borderColor: ColorPalette.border,
        backgroundColor: ColorPalette.grey100,
        borderWidth: 1,
    },
    title:{
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    advise:{
    },
    boxSubmit:{
        alignItems:"flex-end"
    },
    sendBtn:{
        height: 40,
        width: 120,
	    backgroundColor: ColorPalette.classy,
	    justifyContent:"center",
        alignItems:"center",
        borderRadius: 3,
    },
    closeBtnFooter: {
        backgroundColor: ColorPalette.white,
        borderColor: ColorPalette.border,
        borderWidth: 1,
        marginRight: BoxModel.paddingSm,
    },
    closeBtn:{
	    justifyContent:"center",
	    alignItems:"center",
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: ColorPalette.backgroundGrey
    },
    sendBtnSub:{
        color: ColorPalette.white
    },
    inputErrorText:{
        color:"red",
        fontSize:10,
        marginLeft:15
    },
    footer: {
        marginTop: BoxModel.paddingMd,
        flexDirection: "row",
        justifyContent: "flex-end",
    }
});
