import React            from "react";
import { connect }      from "react-redux";
import styles           from "./styles2";
import {
    BoxModel,
    ColorPalette,
    AppText,
} from "./../../../../features/base/styles";
import {
    Text,
    View,
    TouchableOpacity
}                       from "react-native";
import {
    changeTabsChat,
    handleReadMessage
}                       from "../../../actions";
import {
    CHAT_TABS_PUBLIC,
    CHAT_ID_PUBLIC
}                       from "./../../../constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";

class PublicChatTitle extends React.Component{
    constructor(props){
        super(props);
    }

    _changeTabsChat = (tabs, toId, toFullname) => {
        this.props.dispatch(changeTabsChat(tabs, toId, toFullname));
        this.props.dispatch(handleReadMessage(CHAT_ID_PUBLIC, CHAT_TABS_PUBLIC));
    }

    render(){
        let isActive = this.props.chatInfoTab == CHAT_TABS_PUBLIC;
        let darkTheme = this.props._theme === "dark";
        let textColor = darkTheme ? ColorPalette.lightGrey : ColorPalette.textBlack;
        let borderNotiColor = darkTheme ? ColorPalette.backgroundBlack : ColorPalette.white;
        if(isActive) {
            textColor = ColorPalette.classy;
        }
        return(
            <TouchableOpacity
                activeOpacity={ BoxModel.activeOpacity }
                onPress = {()=>this._changeTabsChat( CHAT_TABS_PUBLIC, CHAT_ID_PUBLIC, null )}
                style ={{ ...styles.chatHeadTitle,  ... isActive ? {} : styles.disabledTab, borderColor: darkTheme ? ColorPalette.borderDark1 : ColorPalette.border }}
            >
                <View style={styles.chatHeadTitleView}>
                    <FontAwesome5
                        name="comment-dots"
                        color={ textColor }
                        size={ BoxModel.fontSize }
                    />
                    <AppText
                        style={{
                            ...styles.chatHeadTitleViewText,
                            color: textColor
                        }}
                    >
                        {this.props._languages.topica.vcrx.chat.public}
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
    return {
        _theme          : state["vcrx"].theme,
        _languages      : state["vcrx"].languages,
        totalNotify     : state["vcrx"].chatInfo.notifies.public,
        // totalNotify     : 22,
        chatInfoTab     : state["vcrx"].chatInfo.tabs,
    };
}

export default connect(_mapStateToProps)(PublicChatTitle);
