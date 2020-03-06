import {
    ColorPalette,
    createStyleSheet
} from "./../../../../features/base/styles";
import { responsiveHeight,responsiveWidth } from "react-native-responsive-dimensions";

let height = responsiveHeight(2) > responsiveWidth(2) ? responsiveWidth(2) : responsiveHeight(2);

export default createStyleSheet({
    countDownView: {
        flexDirection: "row",
        alignItems: "center",
    },
    countDownContent: {
        fontSize: 14,
        color: ColorPalette.classy
    },
    countDownIcon: {
        marginRight: 5
    },
});
