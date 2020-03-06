/*
    LayoutSelection Component
    Author: DaoNC
    TimeCreated: 05/06/2019
    TimeModified: 05/06/2019
*/
import React, {Component}                       from "react";
import { connect }                              from "react-redux";
import { TouchableOpacity, Alert, View }            from "react-native";
import FontAwesome                              from "react-native-vector-icons/FontAwesome";
import styles                                   from "../../room/components/styles";
import styles2                                   from "./styles2";
import { toggleAudio }          from "../../../actions";
import { AudioMuteButton }      from "../../../../features/toolbox";
import {getLocalParticipant} from "../../../../features/base/participants";
import {getTrackByMediaTypeAndParticipant} from "../../../../features/base/tracks";
import {MEDIA_TYPE} from "../../../../features/base/media";
import LinearGradient from "react-native-linear-gradient";
import {
    BoxModel,
    ColorPalette
} from "../../../../features/base/styles/components/styles";

class MicroButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let darkTheme = this.props._theme === "dark";
        let bgColor = darkTheme ? ColorPalette.black0 : ColorPalette.black;
        return (
            <TouchableOpacity
                activeOpacity={ BoxModel.activeOpacity }
                onPress={ () => this.props.dispatch(toggleAudio()) }
                style={{ borderRadius: 23, }}
            >
                <LinearGradient
                    colors={["#DBAC69", "#6D4C1C"]}
                    start={{x: 0.0, y: 0.1}}
                    end={{x: 1, y: 0.9}}
                    style={{ ...styles2.microBox, borderColor: bgColor }}
                >
                    <AudioMuteButton onClick={ () => this.props.dispatch(toggleAudio()) } styles={{ iconStyle: { fontSize: 18 } }}/>
                </LinearGradient>
            </TouchableOpacity>
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
        _languages                  : state["vcrx"].languages
    };
}

export default connect(_mapStateToProps)(MicroButton);
