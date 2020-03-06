import React            from "react";
import { connect }      from "react-redux";
import {
    Text, View,
    TouchableOpacity
}                       from "react-native";
import styles           from "./styles2";
import {
    changeTabsChat,
    handleReadMessage
}                       from "../../../actions";
import {
    CHAT_TABS_OPTION,
    CHAT_TABS_PRIVATE
} from "./../../../constants";
import {
    AppText,
    BoxModel,
    ColorPalette
} from "../../../../features/base/styles/components/styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

class UserChatTitle extends React.Component{
    constructor(props){
        super(props);
    }

    _changeTabsChat = (tabs, toId, toFullname) => {
        this.props.dispatch(changeTabsChat(tabs, toId, toFullname));
        this.props.dispatch(handleReadMessage(toId, CHAT_TABS_PRIVATE));
    }

    render(){
        if(!this.props.isShow){
            return(<View/>);
        }
        let isActive = this.props.chatInfoTab == CHAT_TABS_PRIVATE;
        let darkTheme = this.props._theme === "dark";
        let textColor = darkTheme ? ColorPalette.lightGrey : ColorPalette.textBlack;
        let borderNotiColor = darkTheme ? ColorPalette.backgroundBlack : ColorPalette.white;
        if(isActive) {
            textColor = ColorPalette.classy;
        }
        return(
            <TouchableOpacity
                activeOpacity={ BoxModel.activeOpacity }
                onPress = {()=>this._changeTabsChat( CHAT_TABS_PRIVATE, this.props.toUserId, null )}
                style ={{ ...styles.chatHeadTitle,  ... isActive ? {} : styles.disabledTab, borderColor: darkTheme ? ColorPalette.borderDark1 : ColorPalette.border }}
            >
                <View style={styles.chatHeadTitleView}>
                    <FontAwesome5
                        name="user"
                        color={ textColor }
                        size={ BoxModel.fontSize }
                    />
                    <AppText
                        numberOfLines={1}
                        style={{
                            ...styles.chatHeadTitleViewText,
                            color: textColor
                        }}
                    >{this.props.toFullname}</AppText>
                </View>
            </TouchableOpacity>
        );
    }
}

function _mapStateToProps(state){
    return {
        _theme          : state["vcrx"].theme,
        toFullname  : state["vcrx"].chatInfo.toFullname,
        toUserId    : state["vcrx"].chatInfo.toUserId,
        chatInfoTab     : state["vcrx"].chatInfo.tabs,
        isShow      : (state["vcrx"].chatInfo.toFullname != "")
    };
}

export default connect(_mapStateToProps)(UserChatTitle);
