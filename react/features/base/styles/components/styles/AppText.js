import React, { Component } from "react";
import { Text } from "react-native";
import { ColorPalette, BoxModel } from "../styles";


class AppText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { headline, title, subheader, header, bold, menu, caption, style, medium, textSm } = this.props;

        //default style
        let fontSize = 14;
        let fontWeight = "normal";
        let color = ColorPalette.textBlack;
        let lineHeight = 20;

        if (bold) {
            fontWeight = "bold";
        }
        if (medium) {
            fontWeight = "500";
        }
        if (headline) {
            fontSize = 24;
            lineHeight = 32;
        }
        if (title) {
            fontSize = 20;
            fontWeight = "bold";
            lineHeight = 28;
        }
        if (subheader) {
            fontSize = 16;
            fontWeight = "bold";
            lineHeight = 24;
        }
        if (header) {
            fontSize = 18;
            fontWeight = "bold";
            lineHeight = 21;
        }
        if (menu) {
            fontSize = 16;
            lineHeight = 24;
        }
        if (caption) {
            fontSize = 12;
            lineHeight = 16;
            color = ColorPalette.textDisabled;
        }
        if(textSm) {
            fontSize = 12;
        }
        let textStyle = {
            fontFamily: "Roboto",
            fontSize,
            fontWeight,
            lineHeight,
            color,
        };
        return (
            <Text allowFontScaling={false} {...this.props} style={[textStyle, style]}>
                {this.props.children}
            </Text>
        );
    }
}


export default AppText;
