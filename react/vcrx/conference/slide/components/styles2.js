import { createStyleSheet }       from "../../../../features/base/styles";

export default createStyleSheet({
    pdf: {
        flex: 1,
        zIndex: -9999,
        backgroundColor: "rgba(0,0,0,0)"
    },
    sildeLayout: {
        flex: 10,
        flexDirection: "column",
        position: "relative"
    },
    sildeLoading: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.3)"
    }
});
