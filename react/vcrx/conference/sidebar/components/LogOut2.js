/*
    LayoutSelection Component
    Author: DaoNC
    TimeCreated: 05/06/2019
    TimeModified: 05/06/2019
*/
import React, {Component}                       from "react";
import { connect }                              from "react-redux";
import {TouchableHighlight, Alert, TouchableOpacity} from "react-native";
import FontAwesome                              from "react-native-vector-icons/FontAwesome";
import styles                                   from "./styles2";
import { exitClass, handleLayout }              from "../../../actions";
import {ACTION_LOG_OUT}                         from "../../../constants";
import LinearGradient from "react-native-linear-gradient";
import {
    BoxModel,
    ColorPalette
} from "../../../../features/base/styles/components/styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ModalDropdown from "react-native-modal-dropdown";

class LogOut extends Component {
    constructor(props) {
        super(props);
    }

    _logOut = () => {
        Alert.alert(
            this.props._languages.topica.vcrx.error.notification,
            this.props._languages.topica.vcrx.layout.get_out,
            [{text: this.props._languages.topica.vcrx.layout.logout, onPress: () => {
                this.props.dispatch(handleLayout(0));
                this.props.dispatch(exitClass(ACTION_LOG_OUT));
            }},
            {text: this.props._languages.topica.vcrx.layout.cancel, style: "cancel"}],
            { cancelable: false }
        );
    }
    render() {
        let darkTheme = this.props._theme === "dark";
        let bgColor = darkTheme ? ColorPalette.backgroundGrey2 : ColorPalette.backgroundGrey;
        let textColor = darkTheme ? ColorPalette.lightGrey : ColorPalette.textBlue;
        return (
            <TouchableOpacity
                onPress = {this._logOut}
                style={ styles.styleMenuDisable }
                activeOpacity={ BoxModel.activeOpacity }
            >
                <LinearGradient
                    colors={ [ColorPalette.backgroundGrey, ColorPalette.backgroundGrey] }
                    start={{x: 0.0, y: 0.1}}
                    end={{x: 1, y: 0.9}}
                    style={{ ...styles.styleMenuDisable, backgroundColor: bgColor }}
                >
                    <FontAwesome name="sign-out" color={ ColorPalette.textBlue } size={ BoxModel.fontSizeMd } color={textColor} />
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

function _mapStateToProps(state) {
    return {
        _theme              : state["vcrx"].theme,
        _languages: state["vcrx"].languages,
    };
}

export default connect(_mapStateToProps)(LogOut);
