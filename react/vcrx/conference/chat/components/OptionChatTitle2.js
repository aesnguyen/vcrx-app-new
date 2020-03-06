import React            from "react";
import { connect }      from "react-redux";
import styles           from "./styles2";
import {
    Text, View,
    TouchableHighlight, TouchableOpacity
} from "react-native";
import {
    changeTabsChat
}                       from "../../../actions";
import {
    CHAT_TABS_OPTION, CHAT_TABS_PUBLIC
} from "./../../../constants";
import {BoxModel, AppText, ColorPalette} from "../../../../features/base/styles/components/styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

class OptionChatTitle extends React.Component{
    constructor(props){
        super(props);
    }

    _changeTabsChat = (tabs, toId, toFullname) => {
        this.props.dispatch(changeTabsChat(tabs, toId, toFullname));
    }

    render(){
        let isActive = this.props.chatInfoTab == CHAT_TABS_OPTION;
        let darkTheme = this.props._theme === "dark";
        let textColor = darkTheme ? ColorPalette.lightGrey : ColorPalette.textBlack;
        let borderNotiColor = darkTheme ? ColorPalette.backgroundBlack : ColorPalette.white;
        if(isActive) {
            textColor = ColorPalette.classy;
        }
        return(
            <TouchableOpacity
                activeOpacity={ BoxModel.activeOpacity }
                onPress = {()=>this._changeTabsChat( CHAT_TABS_OPTION, null, null )}
                style ={{ ...styles.chatHeadTitle,  ... isActive ? {} : styles.disabledTab, borderColor: darkTheme ? ColorPalette.borderDark1 : ColorPalette.border }}
            >
                <View style={styles.chatHeadTitleView}>
                    <FontAwesome5
                        name="users"
                        color={ textColor }
                        size={ BoxModel.fontSize }
                    />
                    <AppText
                        style={{
                            ...styles.chatHeadTitleViewText,
                            color: textColor
                        }}
                    >
                        { this.props.languages.topica.vcrx.chat.options }
                    </AppText>
                </View>
                <View style={ this.props.totalNotify ? { ...styles.textNotify, ...styles.showOnTop, borderColor: borderNotiColor } : {} }>
                    {
                        this.props.totalNotify != 0 &&
                        <AppText style={{ color: ColorPalette.white }} textSm>{this.props.totalNotify}</AppText>
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

function _mapStateToProps(state){
    let totalNotify = state["vcrx"].chatInfo.notifies.private.reduce((t, n) => {
        return t += n.count;
    }, 0);
    // totalNotify = 15
    return {
        _theme          : state["vcrx"].theme,
        totalNotify,
        languages       : state["vcrx"].languages,
        chatInfoTab     : state["vcrx"].chatInfo.tabs,
    };
}

export default connect(_mapStateToProps)(OptionChatTitle);
