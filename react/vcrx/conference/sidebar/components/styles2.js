import {
    BoxModel, ColorPalette,
    createStyleSheet
} from "./../../../../features/base/styles";
import {
    responsiveHeight,
    responsiveWidth
}                               from "react-native-responsive-dimensions";

let height = responsiveHeight(2) > responsiveWidth(2) ? responsiveWidth(2) : responsiveHeight(2);
export default createStyleSheet({
    sidebar: {
        // flex: 1,
        width: 65,
        // marginTop: height,
        paddingVertical: BoxModel.paddingLg,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        // borderRadius: 5,
        zIndex:14
    },
    sideBarButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    styleMenuDisable: {
        zIndex: 100,
        backgroundColor: ColorPalette.backgroundGrey,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: BoxModel.paddingSm
	  },
    fontAwesomeWarning:{
        textAlignVertical: "center",
        fontSize: 16,
    },
    boxNumbernoti:{
        zIndex:111111111,
        backgroundColor:"red",
        padding:0,
        position:"absolute",
        top:0,
        right:-1,
        width:16,
        height:12,
        borderRadius:6,
        justifyContent:"center",
        alignItems:"center"
    },
    sidebarNumbernoti:{
        color:"#fff",
        fontSize:8
    },
    sidebarLayout:{
        width: 120,
        height: 120,
        borderColor: "cornflowerblue",
        borderWidth: 1,
        borderRadius: 5,
        padding: 3,
    },
    sidebarLayoutText:{
        backgroundColor: "#777",
        textAlign: "center",
        color: "#fff",
        fontSize: 13,
    },
    activeLayout:{
        color:"#00CCFF",
        width:"100%",
        fontWeight:"bold"
    },
    styleMenuEnable: {
        zIndex: 100,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: BoxModel.paddingSm
    },
});
