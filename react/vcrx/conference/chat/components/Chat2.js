import React, {Component} from "react";
import { View }             from "react-native";
import {
    BoxModel,
    ColorPalette,
    AppText,
} from "./../../../../features/base/styles";
import UserListChat2         from "./UserListChat2";
import OptionChatTitle2      from "./OptionChatTitle2";
import UserChatTitle2        from "./UserChatTitle2";
import PublicChatTitle2      from "./PublicChatTitle2";
import ChatContent          from "./ChatContent";
import styles               from "./styles2";
import {translate} from "../../../../features/base/i18n";
import {connect} from "react-redux";

class Chat2 extends Component {

    constructor(props){
        super(props);
    }

    render() {
        let darkTheme = this.props._theme === "dark";
        let textColor = darkTheme ? ColorPalette.lightGrey : ColorPalette.textBlack;
        let bgColor = darkTheme ? ColorPalette.backgroundBlack : ColorPalette.white;
        return(
            <View style={{ padding: BoxModel.paddingMd, backgroundColor: bgColor, flex: 1 }}>
                <AppText bold style={{ marginBottom: BoxModel.padding, color: textColor }}>{ this.props._languages.topica.vcrx.chat.talk }</AppText>
                <View style={styles.chatWrapper}>
                    {/*sắp xếp chat box theo thứ tự ngược lại => để hiện notification*/}
                    <UserChatTitle2 />
                    <OptionChatTitle2 />
                    <PublicChatTitle2 />
                </View>
                <ChatContent />
                <UserListChat2 />
            </View>
        );
    }
}

function _mapStateToProps(state) {
    return {
        _theme             : state["vcrx"].theme,
        _languages      : state["vcrx"].languages,
    };
}

export default translate(connect(_mapStateToProps)(Chat2));
