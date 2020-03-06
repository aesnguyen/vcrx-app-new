import React, { Component }     from "react";
import {
    View, Text,
    Image,
    StatusBar
}                               from "react-native";
import { connect }              from "react-redux";
import { Timer2 }    from "../../timer";
import {
    getLocalParticipant
}                               from "../../../../features/base/participants";
import { toggleAudio }          from "./../../../actions";
import {
    getTrackByMediaTypeAndParticipant,
}                               from "../../../../features/base/tracks";
import {
    MEDIA_TYPE
}                               from "../../../../features/base/media";
import { AudioMuteButton }      from "../../../../features/toolbox";
import {AppText, ColorPalette} from "../../../../features/base/styles";
import styles                   from "./styles2";
import MicroButton from "./MicroButton";
import {JitsiParticipantConnectionStatus} from "../../../../features/base/lib-jitsi-meet";

class Header  extends Component {
    constructor(props) {
        super(props);
    }

    _renderLocalAudio = () => {
        if (this.props._idLocalParticipant != "local") {
            let audioButtonStyles = {};
            audioButtonStyles.style     = styles.audioButtonStyles;
            audioButtonStyles.iconStyle = this.props._styleAudioBtn;
            return (
                <AudioMuteButton
                    onClick = { this._onToggleAudio }
                    styles = { audioButtonStyles }
                />
            );
        }
    }

    _onToggleAudio = () => {
        this.props.dispatch(toggleAudio());
    }

    render() {
        const { _languages, _participantLocal } = this.props;
        const headerLang = _languages.topica.lms.header;
        let connectStatusColor = ColorPalette.green;
        let connectStatusText = headerLang.network_status_good;
        if(_participantLocal) {
            let {  connectionStatus } = _participantLocal;
            const { INACTIVE, INTERRUPTED } = JitsiParticipantConnectionStatus;
            if(connectionStatus == INACTIVE) {
                connectStatusColor = ColorPalette.red;
                connectStatusText = headerLang.network_status_disconnect;
            }
            if(connectionStatus == INTERRUPTED) {
                connectStatusColor = ColorPalette.yellow;
                connectStatusText = headerLang.network_status_bad;
            }
        }
        let darkTheme = this.props._theme === "dark";
        let bgColor = darkTheme ? ColorPalette.black0 : ColorPalette.black;
        return (
            <View style={{ ...styles.header, backgroundColor: bgColor }}>
                <View style={ {...styles.leftBox} }>
                    <View
                        style={{ ...styles.circle, backgroundColor: connectStatusColor }}
                    />
                    <AppText style={{ color: ColorPalette.classy }}>{ headerLang.network_status + ": "}</AppText>
                    <AppText style={{ color: connectStatusColor }}>{ connectStatusText }</AppText>
                </View>
                <MicroButton/>
                <View style={{ ...styles.rightBox }}>
                    <Timer2 />
                </View>
            </View>
        );
    }
}

export function _mapStateToProps(state) {
    let _track              = state["features/base/tracks"];
    let _participantLocal   = getLocalParticipant(state);

    let audioTrackLocal     = getTrackByMediaTypeAndParticipant(_track, MEDIA_TYPE.AUDIO, _participantLocal.id);
    let _audioMutedLocal     = !audioTrackLocal || audioTrackLocal.muted;
    let _styleIconMic, _styleAudioBtn;
    if(_audioMutedLocal){
        _styleIconMic       = styles.borderIconMicOff;
        _styleAudioBtn      = styles.audioButtonStylesIconMuted;
    }else{
        _styleIconMic       = styles.borderIconMicOn;
        _styleAudioBtn      = styles.audioButtonStylesIconNotMuted;
    }

    return {
        _theme             : state["vcrx"].theme,
        _styleIconMic,
        _styleAudioBtn,
        _roomId                     : state["features/base/conference"].room,
        _idLocalParticipant         : _participantLocal.id,
        _participantLocal         : _participantLocal,
        _languages                  : state["vcrx"].languages
    };
}

export default connect( _mapStateToProps)(Header);
