import {
    BoxModel,
    ColorPalette,
    createStyleSheet
} from "./../../../../features/base/styles";
import { createStyles, minHeight }  from "react-native-media-queries";
import { responsiveFontSize }       from "react-native-responsive-dimensions";
let base = createStyleSheet({
    chatWrapper:{
        width: "100%",
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
    },
    chatHeadTitle:{
        flex:1,
        position: "relative",
        zIndex: 10,
        alignItems: "center",
        borderWidth: 1,
        borderBottomWidth: 0,
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        paddingVertical: BoxModel.paddingSm,
        paddingHorizontal: BoxModel.padding,
        borderColor: ColorPalette.border,
        backgroundColor: "transparent",
    },
    disabledTab: {
        borderWidth: 0,
        borderBottomWidth: 1,
    },
    chatHeadTitleView:{
        flexDirection:"row",
        alignItems: "center",
        overflow: "hidden",
    },
    chatHeadTitleViewText:{
        marginLeft: BoxModel.paddingSm,
    },
    chatListUser:{
        width: "100%",
        // backgroundColor: ColorPalette.white,
        backgroundColor: ColorPalette.grey100,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        height: 36,
        borderRadius: 18,
        marginTop: BoxModel.paddingSm,
        paddingHorizontal: BoxModel.paddingMd,
        paddingRight: BoxModel.paddingSm,
    },
    showOnTop: {
        position: "absolute",
        top: -15,
        right: -7,
        borderColor: ColorPalette.white,
    },
    textNotify: {
        backgroundColor: ColorPalette.red,
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderColor: "transparent",
    },
    controlChat:{
        height:30,
        flexDirection:"row",
        padding:0,
        margin:0,
        backgroundColor:"#eaeaea"
    },
    publicChat:{
        flex:1,
        padding:0,
        margin:0,
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: "#fff",
        borderRightWidth: 2
    },
    optionChat:{
        flex:1,
        padding:0,
        margin:0,
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: "#fff",
        borderRightWidth: 2
    },
    privateChat:{
        flex:1,
        padding:0,
        margin:0,
        justifyContent: "center",
        alignItems: "center"
    },
    textControlChat:{
        textAlign:"center"
    },
    listUser:{
        textAlign:"center",
        margin: 5,
        backgroundColor:"#fff",
        height: 30,
        borderRadius: 15,
        lineHeight: 24,
        justifyContent:"center",
        alignItems: "center"
    },
    numberChatPrivate:{
        color:"red",
        padding:5,
        backgroundColor:"green",
        width:20,
        height:20,
        borderRadius:10,
        position:"absolute",
        right:15,
        top: 3
    },
    boxNumberNotifi:{
        zIndex:1111111111111,
        backgroundColor:"red",
        padding:1,
        position:"absolute",
        top:4,
        right:5,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        width:30,
        height:16,
    },
    numberNotifi:{
        color:"#fff",
        fontSize:10,
    },
    boxNotifiPrivate:{
        zIndex:1111111111111,
        backgroundColor:"red",
        padding:1,
        position:"absolute",
        top:4,
        right:5,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        width:30,
        height:16,
    },
    styleMenuDisable: {
        zIndex: 100,
        backgroundColor: "#777",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent:"center",
        alignItems:"center",
        marginVertical: BoxModel.padding
    },
    styleMenuEnable: {
	    zIndex: 100,
	    width: 36,
	    height: 36,
        borderRadius: 18,
	    justifyContent: "center",
	    alignItems: "center",
	    marginVertical: BoxModel.padding
    },
    fontAwesomeWarning:{
        textAlignVertical: "center",
        fontSize: 16,
    },
    boxNumbernoti:{
	    zIndex: 100,
	    backgroundColor: ColorPalette.red,
	    padding:0,
	    position:"absolute",
	    top: -1,
	    right: -1,
	    width: 16,
	    height: 16,
	    borderRadius: 8,
	    justifyContent:"center",
	    alignItems:"center"
    },
    sidebarNumbernoti:{
        color: ColorPalette.white,
        fontSize: BoxModel.fontSizeXs
    },
});

const styles = createStyles(
    base,
    minHeight(752, {
        textControlChat:{
            fontSize:responsiveFontSize(1.3),
        },
        listUser:{
            fontSize: responsiveFontSize(1.3),
        },
        numberNotifi:{
            fontSize:responsiveFontSize(0.8),
        },
        boxNotifiPrivate:{
            padding:2,
            width:26,
            height:18,
        },
        boxNumberNotifi:{
            padding:2,
            width:26,
            height:18,
        }
    })
);

export default styles;
