import React, {Component}                       from "react";
import { connect }                              from "react-redux";
import { translate }                            from "./../../../../features/base/i18n";
import { View, TouchableOpacity, Text }         from "react-native";
import FontAwesome                              from "react-native-vector-icons/FontAwesome";
import styles                                   from "./styles2";
import {changeTabsChat, handleReadMessage, toggleChatVisible} from "../../../actions";
import { CHAT_ID_PUBLIC, CHAT_TABS_PUBLIC }     from "../../../constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
    AppText,
    BoxModel,
    ColorPalette
} from "../../../../features/base/styles/components/styles";
import LinearGradient from "react-native-linear-gradient";

class ChatIcon extends Component {
    constructor(props) {
        super(props);
    }

    _showChatWindow = () => {
        if (this.props._chatInfo.chatVisible) {
            this.props.dispatch(toggleChatVisible(false));
            this.props.dispatch(changeTabsChat("",0));
        } else {
            this.props.dispatch(handleReadMessage(CHAT_ID_PUBLIC, CHAT_TABS_PUBLIC));
            this.props.dispatch(changeTabsChat(CHAT_TABS_PUBLIC, CHAT_ID_PUBLIC));
            this.props.dispatch(toggleChatVisible(true));
        }
    }

    render() {
        let total = this.props._chatInfo.notifies.private.reduce((t, n) => {
            return t += n.count;
        }, this.props._chatInfo.notifies.public);
        let isActive = this.props._chatInfo.chatVisible;
        let darkTheme = this.props._theme === "dark";
        let bgColor = darkTheme ? ColorPalette.backgroundGrey2 : ColorPalette.backgroundGrey;
        let textColor = darkTheme ? ColorPalette.lightGrey : ColorPalette.textBlue;
        if(isActive ) {
            textColor = ColorPalette.white;
        }
        return (
            <TouchableOpacity
                onPress={this._showChatWindow}
                activeOpacity={ BoxModel.activeOpacity }
            >
                <LinearGradient
                    colors={ isActive ? [ ColorPalette.classy , ColorPalette.classyGadient] : [ColorPalette.backgroundGrey, ColorPalette.backgroundGrey] }
                    start={{x: 0.0, y: 0.1}}
                    end={{x: 1, y: 0.9}}
                    style={{ ...styles.styleMenuEnable, backgroundColor: bgColor }}
                >
                    <FontAwesome5
                        name="comment-dots"
                        color={ textColor }
                        size={ BoxModel.fontSizeMd }
                    />
                    {
                        total != 0 &&
                        <View style={styles.boxNumbernoti}>
                            <AppText style={styles.sidebarNumbernoti} >{total}</AppText>
                        </View>
                    }
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

function _mapStateToProps(state) {
    return {
        _theme              : state["vcrx"].theme,
        _chatInfo           : state["vcrx"].chatInfo,
    };
}

export default translate(connect(_mapStateToProps)(ChatIcon));
