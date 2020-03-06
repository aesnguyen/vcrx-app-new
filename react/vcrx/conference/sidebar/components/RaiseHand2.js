/*
    Room Component
    Author: AnhLH2
    TimeCreated: 27/05/2019
    TimeModified: 27/05/2019
*/
import React                                from "react";
import { connect }                          from "react-redux";
import { translate }                        from "./../../../../features/base/i18n";
import styles                               from "./styles2";
import {
    Text,
    TouchableHighlight, TouchableOpacity, View
} from "react-native";
import FontAwesome                          from "react-native-vector-icons/FontAwesome";
import {
    getLocalParticipant
}                                           from "../../../../features/base/participants";
import { raiseHand }                        from "../../../actions";
import LinearGradient from "react-native-linear-gradient";
import {
    BoxModel,
    ColorPalette
} from "../../../../features/base/styles/components/styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

class RaiseHand extends React.Component{

    _raiseHand = () => {
        this.props.dispatch(raiseHand());
    }

    render(){
        const isActive = this.props.participantLocal.raiseHand;
        let darkTheme = this.props._theme === "dark";
        let bgColor = darkTheme ? ColorPalette.backgroundGrey2 : ColorPalette.backgroundGrey;
        let textColor = darkTheme ? ColorPalette.lightGrey : ColorPalette.textBlue;
        if(isActive ) {
            textColor = ColorPalette.white;
        }
        return(
            <TouchableOpacity
                onPress={this._raiseHand}
                style={{ borderRadius: 18 }}
                activeOpacity={ BoxModel.activeOpacity }
            >
                <LinearGradient
                    colors={ isActive ? [ ColorPalette.classy , ColorPalette.classyGadient ] : [ColorPalette.backgroundGrey, ColorPalette.backgroundGrey] }
                    start={{x: 0.0, y: 0.1}}
                    end={{x: 1, y: 0.9}}
                    style={{ ...styles.styleMenuEnable, backgroundColor: bgColor }}
                >
                    <FontAwesome5
                        name="hand-paper"
                        color={ textColor }
                        size={ BoxModel.fontSizeMd }
                    />
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

function _mapStateToProps(state) {
    return {
        _theme              : state["vcrx"].theme,
        participantLocal    : getLocalParticipant(state)
    };
}

export default translate(connect(_mapStateToProps)(RaiseHand));
