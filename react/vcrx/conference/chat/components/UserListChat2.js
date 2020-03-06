import React            from "react";
import { connect }      from "react-redux";
import {Base64}         from "js-base64";
import {
    Text, View,
    TouchableOpacity,
    FlatList
}                       from "react-native";
import styles           from "./styles2";
import {
    changeTabsChat,
    handleReadMessage, saveLogAction, setDataChangeMic
} from "../../../actions";

import {
    CHAT_TABS_OPTION,
    CHAT_TABS_PRIVATE,
    KEY_ROLE_TEACHER,
    KEY_ROLE_STUDENT,
    KEY_ROLE_MOBILE,
    KEY_ROLE_ASSISTANT,
    KEY_ROLE_PO, CONNECTTION_FAILD, ICON, ACTION_LOG_MIC
} from "../../../constants";
import {
    PERMISSION
}                       from "../../../config";
import { BoxModel, AppText, ColorPalette } from "../../../../features/base/styles/components/styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

class UserListChat extends React.Component{
    constructor(props){
        super(props);
    }

    _changeTabsChat = (tabs, toId, toFullname) => {
        this.props.dispatch(changeTabsChat(tabs, toId, toFullname));
        this.props.dispatch(handleReadMessage(toId, CHAT_TABS_PRIVATE));
    }

    _renderItemUser = (user) => {
        let { local, name, raiseHand, id, audit, connectionStatus } = user.item;
        let iconName = ICON.IC_MIC_DISABLE;
        let darkTheme = this.props._theme === "dark";
        let color = darkTheme ? ColorPalette.white : ColorPalette.textBlue;
        let bgColor = darkTheme ? ColorPalette.backgroundBlack2 : ColorPalette.backgroundGrey;
        let iconList = [
            {role: KEY_ROLE_TEACHER,    icon: "user-graduate"},
            {role: KEY_ROLE_ASSISTANT,  icon: "user-graduate"},
            {role: KEY_ROLE_PO,         icon: "user-cog"},
            {role: KEY_ROLE_STUDENT,    icon: "laptop"},
            {role: KEY_ROLE_MOBILE,     icon: "mobile-alt"},
            {role:"ALL",                icon: "exclamation-triangle"}
        ];
        name = name.split("-");
        let icon = iconList.find(icon => icon.role == name[0]).icon;
        if(name[0] == KEY_ROLE_MOBILE && audit) icon = ICON.IC_AUDIT;
        let displayName = name[0] !== KEY_ROLE_MOBILE ? name.slice(1,3).join("-") : Base64.decode(name.slice(1,3).join("-"));
        let uInfo       = displayName.split("-");
        let notify      = this.props._chatInfo.notifies.private.find(n => (n.from == uInfo[uInfo.length-1] && n.count != 0));
        // let notify      = {count: 10};

        return (
            <TouchableOpacity
                activeOpacity={ BoxModel.activeOpacity }
                onPress={ () => this._changeTabsChat( CHAT_TABS_PRIVATE, uInfo[uInfo.length - 1], displayName ) }
                key = {user.index}
                style ={{ ...styles.chatListUser, backgroundColor: bgColor }}>
                <View style={styles.chatHeadTitleView}>
                    <View style={{ width: 20, justifyContent: "center", flexDirection: "row" }}>
                        <FontAwesome5 color={color}  name={icon} size = {14} />
                    </View>
                    <AppText style = {{ ...styles.chatHeadTitleViewText, color: color  }}>{displayName}</AppText>
                </View>
                <View style={{ ... notify ? styles.textNotify : {} }}>
                    {
                        notify &&
                            <AppText textSm style={{ color: ColorPalette.white }} >{ notify.count }</AppText>

                    }
                </View>
            </TouchableOpacity>
        );
    }

    _keyExtractor = item => item.id;

    render(){

        if(this.props._chatInfo.tabs === CHAT_TABS_OPTION && this.props._users.length > 0) {
            return(
                <FlatList
                    data = {this.props._users}
                    renderItem = {this._renderItemUser}
                    keyExtractor={this._keyExtractor}
                />
            );
        }else{
            return(<View/>);
        }
    }
}

function _mapStateToProps(state){
    let participants = state["features/base/participants"];
    let role = state["vcrx"].userInfo.role;
    let users = [];
    users = [
        ...participants.filter(user => user.name && user.name.split("-")[0] === KEY_ROLE_TEACHER),
        ...participants.filter(user => user.name && user.name.split("-")[0] === KEY_ROLE_ASSISTANT),
        ...participants.filter(user => user.name && user.name.split("-")[0] === KEY_ROLE_PO),
        ...participants.filter(user => user.name && user.name.split("-")[0] === KEY_ROLE_STUDENT && !user.audit),
        ...participants.filter(user => user.name && user.name.split("-")[0] === KEY_ROLE_MOBILE && !user.local && !user.audit)
    ];
    if ( PERMISSION.disablePulicChat.indexOf(role) >= 0){
        users = [
            ...participants.filter(user => user.name && user.name.split("-")[0] === KEY_ROLE_PO)
        ];
    }
    return {
        _users      : users,
        _chatInfo   : state["vcrx"].chatInfo,
        _theme      : state["vcrx"].theme,
    };
}

export default connect(_mapStateToProps)(UserListChat);
