import React, { Component } from "react";
import {
    View, Text,
    FlatList, ScrollView, TouchableOpacity, Image
} from "react-native";
import { connect }          from "react-redux";
import { translate }        from "../../../../features/base/i18n";
import styles               from "./styles";
import FontAwesome          from "react-native-vector-icons/FontAwesome";
import FontAwesome5          from "react-native-vector-icons/FontAwesome5";
import MaterialIcons          from "react-native-vector-icons/MaterialIcons";
import { saveLogAction, setDataChangeMic, toggleAudio } from "../../../actions";
import { JitsiParticipantConnectionStatus } from "../../../../features/base/lib-jitsi-meet";
import {
    CONNECTTION_FAILD, ICON,
    KEY_ROLE_ASSISTANT, KEY_ROLE_MOBILE,
    KEY_ROLE_PO,
    KEY_ROLE_STUDENT,
    KEY_ROLE_TEACHER,
    ACTION_LOG_MIC
} from "../../../constants";
import {MEDIA_TYPE}         from "../../../../features/base/media/constants";
import {
    getTrackByMediaTypeAndParticipant,
}                           from "../../../../features/base/tracks";
import {Base64}             from "js-base64";
import { getParticipants } from "../../../../features/base/participants";
import { ColorPalette, BoxModel, AppText } from "../../../../features/base/styles";

const LOGO_URL = "./../../../images/logo5.png";

class UserList  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTeacherList: true,
            showStudentList: true,
        };
    }

    findUser = (role, isAudit = false) => user => user.name.split("-")[0] == role && user.audit == isAudit;

    removeDuplicates = (arr, property) => {
        return arr.filter((obj, index, arr) => {
            return arr.map(mapObj => mapObj[property]).indexOf(obj[property]) === index;
        });
    }

    _sortTeacherList = () => {
        let userList = [];
        let users = this.props._participants.filter(user => user.name && user.email && user.connectionStatus != CONNECTTION_FAILD);

        let teachers        = users.filter(this.findUser(KEY_ROLE_TEACHER));
        let assistants      = users.filter(this.findUser(KEY_ROLE_ASSISTANT));
        let pos             = users.filter(this.findUser(KEY_ROLE_PO));

        return userList.concat(teachers, assistants, pos );
    }

    _sortStudentList = () => {
        let userList = [];
        let users = this.props._participants.filter(user => user.name && user.email && user.connectionStatus != CONNECTTION_FAILD);

        let mobileStudents  = users.filter(this.findUser(KEY_ROLE_MOBILE));
        let webStudents     = users.filter(this.findUser(KEY_ROLE_STUDENT));
        let auditStudents   = users.filter(this.findUser(KEY_ROLE_MOBILE, true));
        auditStudents       = auditStudents.filter(user => user.local == true);

        mobileStudents = this.removeDuplicates(mobileStudents,"avatarID");
        return userList.concat( webStudents, mobileStudents, auditStudents );
    }

    _getAudioTrack(id){
        let audioTrack = getTrackByMediaTypeAndParticipant(this.props._track, MEDIA_TYPE.AUDIO, id);
        let audioMuted = !audioTrack || audioTrack.muted;
        return audioMuted;
    }

    _renderItem = (user) => {
        let { local, name, raiseHand, id, audit, connectionStatus } = user.item;
        let iconName = ICON.IC_MIC_DISABLE;
        let darkTheme = this.props._theme === "dark";
        let color = darkTheme ? ColorPalette.lightGrey : ColorPalette.textBlue;
        if(local && darkTheme) {
            color = ColorPalette.white;
        }
        let iconColor = darkTheme ? ColorPalette.white : ColorPalette.textBlue;
        if(!this._getAudioTrack(id)){
            iconName = ICON.IC_MIC_ENABLE;
            if (this.props.dataMic.timeStart && local){
                let dataMic = this.props.dataMic;
                let data = {
                    userId: dataMic.userId,
                    roomId: this.props.idRoom,
                    action: "turn off",
                    status: iconName === ICON.IC_MIC_ENABLE ? "pass" : "fail",
                    timeListen: new Date().getTime() - dataMic.timeStart
                };
                this.props.dispatch(setDataChangeMic({...dataMic, timeStart: 0}));
                this.props.dispatch(saveLogAction(data, ACTION_LOG_MIC));
            }
        }

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
        const { INACTIVE, INTERRUPTED } = JitsiParticipantConnectionStatus;
        let connectStatusColor = ColorPalette.green;
        if(connectionStatus == INACTIVE) {
            connectStatusColor = ColorPalette.red;
        }
        if(connectionStatus == INTERRUPTED) {
            connectStatusColor = ColorPalette.yellow;
        }
        return (
            <View
                key = {user.index}
                style = {{ ...styles.headerTitle, backgroundColor: local ? ColorPalette.backgroundGrey :  "transparent" }}
            >
                <View style={{flexDirection: "row", maxWidth: "90%", overflow: "hidden", alignItems:"center", position: "relative" }}>
                    <View style={{ width: 20, justifyContent: "center", flexDirection: "row", marginRight: BoxModel.paddingSm }}>
                        <FontAwesome5 color={iconColor}  name={icon} size = {14} />
                        <FontAwesome color={connectStatusColor}  name={"circle"} size = {8} style={{ position: "absolute", bottom: -3, right: -2 }}/>
                    </View>
                    <AppText numberOfLines={1} textSm style={{ color: color }} >{displayName}</AppText>
                </View>
                <FontAwesome color = { iconName === ICON.IC_MIC_DISABLE ? color : ColorPalette.classy } name={iconName} size = { BoxModel.fontSizeSm } />
            </View>
        );
    }

    _keyExtractor = item => item.id.toString()

    toggleTeacherList = () => {
        this.setState({showTeacherList: !this.state.showTeacherList});
    }

    toggleStudentList = () => {
        this.setState({showStudentList: !this.state.showStudentList});
    }

    render() {
        const teacherList = this._sortTeacherList();
        const studentList = this._sortStudentList();
        const { showStudentList, showTeacherList } = this.state;
        let darkTheme = this.props._theme === "dark";
        let textColor = darkTheme ? ColorPalette.textBlack : ColorPalette.white;
        return (
            <View style={styles.listUser}>
                <View style={{ paddingHorizontal: BoxModel.padding, marginBottom: BoxModel.paddingSm }}>
                    {/*<AppText textSm>{this.props._languages.topica.vcrx.error.users}</AppText>*/}
                    <Image
                        style={ styles.headerLogo }
                        source={ require( LOGO_URL ) }
                    />
                </View>
                <ScrollView
                    // showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity
                        style={styles.headerTitle}
                        onPress={ this.toggleTeacherList }
                        activeOpacity={ BoxModel.activeOpacity }
                    >
                        <AppText textSm style={{ color: textColor }}>{ "Teacher, PO & trợ giảng (" + teacherList.length + ")"  }</AppText>
                        <MaterialIcons
                            color={ textColor }
                            name={showTeacherList ? "keyboard-arrow-up" : "keyboard-arrow-down" }
                            size = { BoxModel.fontSize }
                        />
                    </TouchableOpacity>
                    {
                        showTeacherList &&
                        <FlatList
                            data={ teacherList }
                            renderItem={ this._renderItem }
                            keyExtractor={ this._keyExtractor }
                        />
                    }
                    <TouchableOpacity
                        style={styles.headerTitle}
                        onPress={ this.toggleStudentList }
                        activeOpacity={ BoxModel.activeOpacity }
                    >
                        <AppText textSm style={{ color: textColor }}>{ "Học sinh (" + studentList.length + ")"  }</AppText>
                        <MaterialIcons
                            color={ textColor }
                            name={ showStudentList ? "keyboard-arrow-up" : "keyboard-arrow-down" }
                            size = { BoxModel.fontSize }
                        />
                    </TouchableOpacity>
                    {
                        showStudentList &&
                        <FlatList
                            data = { studentList }
                            renderItem = {this._renderItem}
                            keyExtractor={this._keyExtractor}
                        />
                    }
                </ScrollView>
            </View>
        );
    }
}

export function _mapStateToProps(state) {
    return {
        _theme             : state["vcrx"].theme,
        _participants       : getParticipants(state),
        _languages          : state["vcrx"].languages,
        _track              : state["features/base/tracks"],
        dataMic             : state["vcrx"].dataMic,
        idRoom              : state["vcrx"].roomInfo.idRoom
    };
}
export default translate(connect(_mapStateToProps)(UserList));
