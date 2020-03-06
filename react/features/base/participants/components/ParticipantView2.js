// @flow

import React, { Component } from "react";
import { Text, View, Image } from "react-native";

import { Avatar } from "../../avatar";
import { translate } from "../../i18n";
import { JitsiParticipantConnectionStatus } from "../../lib-jitsi-meet";
import {
    MEDIA_TYPE,
    VideoTrack
} from "../../media";
import { Container, TintedView } from "../../react";
import { connect } from "../../redux";
import { StyleType } from "../../styles";
// import { TestHint } from "../../testing/components";
import { getTrackByMediaTypeAndParticipant } from "../../tracks";

import { shouldRenderParticipantVideo } from "../functions";
import styles from "./styles2";
import { ColorPalette, BoxModel, AppText } from "../../../../features/base/styles";
import { getParticipants } from "../../../../features/base/participants";

import { CONNECTTION_FAILD, KEY_ROLE_TEACHER} from "../../../../vcrx/constants";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

/**
 * The type of the React {@link Component} props of {@link ParticipantView}.
 */
type Props = {

    /**
     * True if the video should be rendered, false otherwise.
     */
    _renderVideo: boolean,

    /**
     * The video Track of the participant with {@link #participantId}.
     */
    _videoTrack: Object,

    /**
     * The avatar size.
     */
    avatarSize: number,

    /**
     * Whether video should be disabled for his view.
     */
    disableVideo: ?boolean,

    /**
     * Callback to invoke when the {@code ParticipantView} is clicked/pressed.
     */
    onPress: Function,

    /**
     * The ID of the participant (to be) depicted by {@link ParticipantView}.
     *
     * @public
     */
    participantId: string,

    /**
     * The style, if any, to apply to {@link ParticipantView} in addition to its
     * default style.
     */
    style: Object,

    /**
     * The function to translate human-readable text.
     */
    t: Function,

    /**
     * If true, a tinting will be applied to the view, regardless of video or
     * avatar is rendered.
     */
    tintEnabled: boolean,

    /**
     * The style of the tinting when applied.
     */
    tintStyle: StyleType,

    /**
     * The test hint id which can be used to locate the {@code ParticipantView}
     * on the jitsi-meet-torture side. If not provided, the
     * {@code participantId} with the following format will be used:
     * {@code `org.jitsi.meet.Participant#${participantId}`}
     */
    testHintId: ?string,

    /**
     * Indicates if the connectivity info label should be shown, if appropriate.
     * It will be shown in case the connection is interrupted.
     */
    useConnectivityInfoLabel: boolean,

    /**
     * The z-order of the {@link Video} of {@link ParticipantView} in the
     * stacking space of all {@code Video}s. For more details, refer to the
     * {@code zOrder} property of the {@code Video} class for React Native.
     */
    zOrder: number,

    /**
     * Indicates whether zooming (pinch to zoom and/or drag) is enabled.
     */
    zoomEnabled: boolean
};

/**
 * Implements a React Component which depicts a specific participant"s avatar
 * and video.
 *
 * @extends Component
 */
class ParticipantView extends Component<Props> {

    /**
     * Renders the connection status label, if appropriate.
     *
     * @param {string} connectionStatus - The status of the participant"s
     * connection.
     * @private
     * @returns {ReactElement|null}
     */
    _renderConnectionInfo(connectionStatus) {
        let messageKey;

        switch (connectionStatus) {
            case JitsiParticipantConnectionStatus.INACTIVE:
                messageKey = "connection.LOW_BANDWIDTH";
                break;
            case JitsiParticipantConnectionStatus.INTERRUPTED:
                messageKey = "connection.USER_CONNECTION_INTERRUPTED";
                break;
            default:
                return null;
        }

        const {
            avatarSize,
            _participantName: displayName,
            t
        } = this.props;

        // XXX Consider splitting this component into 2: one for the large view
        // and one for the thumbnail. Some of these don"t apply to both.
        const containerStyle = {
            ...styles.connectionInfoContainer,
            width: avatarSize * 1.5
        };

        return (
            <View
                pointerEvents = "box-none"
                style = { containerStyle }>
                <Text style = { styles.connectionInfoText }>
                    { t(messageKey, { displayName }) }
                </Text>
            </View>
        );
    }

    findUser = (role, isAudit = false) => user => user.name.split("-")[0] == role && user.audit == isAudit;

    /**
     * Implements React"s {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const {
            _connectionStatus: connectionStatus,
            _renderVideo: renderVideo,
            _videoTrack: videoTrack,
            onPress,
            tintStyle,
            _languages,
        } = this.props;

        // If the connection has problems, we will "tint" the video / avatar.
        const connectionProblem
            = connectionStatus !== JitsiParticipantConnectionStatus.ACTIVE;
        const useTint
            = connectionProblem || this.props.tintEnabled;

        const testHintId
            = this.props.testHintId
                ? this.props.testHintId
                : `org.jitsi.meet.Participant#${this.props.participantId}`;

        const users = this.props._participants.filter(user => user.name && user.email);
        const teacher        = users.find(this.findUser(KEY_ROLE_TEACHER));
        let teacherName = "";
        let connectStatusColor = ColorPalette.red;
        if(teacher) {
            connectStatusColor = ColorPalette.green;
            let { name, connectionStatus } = teacher;
            name = name.split("-");
            teacherName = name.slice(1,3).join("-");
            const { INACTIVE, INTERRUPTED } = JitsiParticipantConnectionStatus;
            if(connectionStatus == INACTIVE) {
                connectStatusColor = ColorPalette.red;
            }
            if(connectionStatus == INTERRUPTED) {
                connectStatusColor = ColorPalette.yellow;
            }
        }
        return (
            <View
                // onClick = { renderVideo ? undefined : onPress }
                style = {{
                    ...styles.participantView,
                    ...this.props.style
                }}
                // touchFeedback = { false }
            >
                {/*<TestHint*/}
                {/*    id = { testHintId }*/}
                {/*    onPress = { onPress }*/}
                {/*    value = ""*/}
                {/*/>*/}
                {
                    renderVideo
                    &&
                    <VideoTrack
                        onPress = { onPress }
                        videoTrack = { videoTrack }
                        waitForVideoStarted = { false }
                        zOrder = { this.props.zOrder }
                        zoomEnabled = { this.props.zoomEnabled }
                    />
                }
                {/*// LinearGradient in top*/}
                <LinearGradient
                    colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0)"]}
                    style={{
                        position: "absolute",
                        top: 0,
                        zIndex: 10,
                        width: "100%",
                        paddingHorizontal: BoxModel.paddingXs,
                        paddingVertical: BoxModel.paddingXs,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <AppText style={{ color: ColorPalette.white }}>{`${this.props._languages.topica.lms.header.room}: ${this.props._roomId}`}</AppText>
                    <MaterialIcons name={"crop-free"} size={ BoxModel.fontSizeMd } color={ColorPalette.white} />
                </LinearGradient>

                {/*// LinearGradient in bottom*/}
                <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        zIndex: 10,
                        width: "100%",
                        paddingHorizontal: BoxModel.paddingXs,
                        paddingVertical: BoxModel.paddingXs,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            maxWidth: "70%",
                            overflow: "hidden",
                        }}
                    >
                        <View style={{ ...styles.circle, backgroundColor: connectStatusColor }} />
                        <AppText numberOfLines={ 1 } textSm style={{ color: ColorPalette.white }}>
                            { teacherName ? teacherName : _languages.topica.vcrx.camera.notify }
                        </AppText>
                    </View>
                    <View
                        style={ styles.ratingBox }
                    >
                        <AppText textSm style={{ color: ColorPalette.classy }}>
                            { "Rating" }
                        </AppText>
                    </View>
                </LinearGradient>
                {
                    !renderVideo
                    &&
                    <View style = { styles.avatarContainer }>
                        <Image source={ require("../../../../vcrx/images/default_teacher.png") } style={ styles.defaultImg }></Image>
                    </View>
                }
                {/*{*/}
                {/*    !videoTrack*/}
                {/*    &&*/}
                {/*    <AppText style = {styles.title}>*/}
                {/*        {this.props._languages.topica.vcrx.camera.notify}*/}
                {/*    </AppText>*/}
                {/*}*/}
                {/*If the connection has problems, tint the video / avatar.*/}
                {/*{*/}
                {/*    useTint*/}
                {/*    &&*/}
                {/*    <TintedView*/}
                {/*        style = { connectionProblem ? undefined : tintStyle }*/}
                {/*    />*/}
                {/*}*/}
                {
                    this.props.useConnectivityInfoLabel
                    &&
                    this._renderConnectionInfo(connectionStatus)
                }
            </View>
        );
    }
}

/**
 * Maps (parts of) the redux state to the associated {@link ParticipantView}"s
 * props.
 *
 * @param {Object} state - The redux state.
 * @param {Object} ownProps - The React {@code Component} props passed to the
 * associated (instance of) {@code ParticipantView}.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state, ownProps) {
    const { disableVideo, participantId } = ownProps;

    return {
        _participants       : getParticipants(state),
        _roomId             : state["features/base/conference"].room,
        _languages          : state["vcrx"].languages,
        _renderVideo        : shouldRenderParticipantVideo(state, participantId) && !disableVideo,
        _videoTrack         : getTrackByMediaTypeAndParticipant( state["features/base/tracks"], MEDIA_TYPE.VIDEO, participantId)
    };
}

export default translate(connect(_mapStateToProps)(ParticipantView));
