import React, {Component}                       from "react";
import { connect }                              from "react-redux";
import { translate }                            from "./../../../../features/base/i18n";
import { View, TouchableOpacity, Text }         from "react-native";
import FontAwesome                              from "react-native-vector-icons/FontAwesome";
import styles                                   from "./styles2";
import { switchTheme } from "../../../actions";
import { CHAT_ID_PUBLIC, CHAT_TABS_PUBLIC }     from "../../../constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
    AppText,
    BoxModel,
    ColorPalette
} from "../../../../features/base/styles/components/styles";
import LinearGradient from "react-native-linear-gradient";

class SwitchTheme extends Component {
    constructor(props) {
        super(props);
    }

    toggleTheme = () => {
        this.props.dispatch( switchTheme(this.props._theme !== "dark" ? "dark" : "light"));
    }

    render() {
        let isActive = this.props._theme === "dark";
        return (
            <TouchableOpacity
                onPress={ this.toggleTheme }
                activeOpacity={ BoxModel.activeOpacity }
            >
                <LinearGradient
                    colors={ isActive ? [ ColorPalette.classy , ColorPalette.classyGadient] : [ColorPalette.backgroundGrey, ColorPalette.backgroundGrey] }
                    start={{x: 0.0, y: 0.1}}
                    end={{x: 1, y: 0.9}}
                    style={{ ...styles.styleMenuEnable }}
                >
                    <FontAwesome5 name={"moon"} size = { BoxModel.fontSizeMd } solid color={ isActive ? ColorPalette.white : ColorPalette.textBlue }/>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

function _mapStateToProps(state) {
    return {
        _theme : state["vcrx"].theme,
    };
}

export default translate(connect(_mapStateToProps)(SwitchTheme));
