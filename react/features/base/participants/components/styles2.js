// @flow

import { BoxModel, ColorPalette } from "../../styles";

/**
 * The styles of the feature base/participants.
 */
export default {
    defaultImg: {
        width: 200,
        height: 110,
    },
    circle: {
        width: 10,
        height: 10,
        marginRight: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: ColorPalette.white,
        backgroundColor: ColorPalette.green
    },
    ratingBox: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: ColorPalette.classy,
        paddingHorizontal: BoxModel.padding,
    },
    /**
     * Container for the avatar in the view.
     */
    avatarContainer: {
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },

    /**
     * Style for the text rendered when there is a connectivity problem.
     */
    connectionInfoText: {
        color: ColorPalette.white,
        fontSize: 12,
        marginVertical: BoxModel.margin,
        marginHorizontal: BoxModel.margin,
        textAlign: "center"
    },

    /**
     * Style for the container of the text rendered when there is a
     * connectivity problem.
     */
    connectionInfoContainer: {
        alignSelf: "center",
        backgroundColor: ColorPalette.darkGrey,
        borderRadius: 20,
        marginTop: BoxModel.margin
    },

    /**
     * {@code ParticipantView} style.
     */
    participantView: {
        // position: "relative",
        paddingVertical: 0,
        paddingHorizontal: 0,
        alignItems: "stretch",
        flex: 1,
        justifyContent: "center",
        borderRadius: 4,
        overflow: "hidden",
    },

    title: {
        position: "absolute",
        bottom: "4%",
        textAlign: "center",
        width: "100%",
        fontSize: 12,
        color: "#333333"
    }
};
