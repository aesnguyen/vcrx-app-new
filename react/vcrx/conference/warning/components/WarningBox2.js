/**
 * WarningBox component
 * Desciption of file
 *
 * Author     : Hainn3
 * Modified   : Hainn3
 * Created at : 2019/07/01
 * Modified at: 2019/07/01
 *
 *
 * Copyright (c)-2017 TOPICA EDTECH GROUP (www.topica.asia)
 * ********************************************************
 */

import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Keyboard
}                                       from "react-native";
import React, { Component }             from "react";
import { connect }                      from "react-redux";
import styles                           from "./styles2";
import { ColorPalette, BoxModel, AppText } from "../../../../features/base/styles";
import {
    handleWarning,
    handleSendWarning
}                                       from "../../../actions";

class WarningBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            title:""
        };
    }

    componentWillUnmount(){
        this.closePopup();
    }

    render() {
        let title = "";
        const { _errorBoxKey } = this.props;
        switch (_errorBoxKey) {
            case 1 : title = this.props._languages.topica.vcrx.error.video; break;
            case 2 : title = this.props._languages.topica.vcrx.error.mic; break;
            case 3 : title = this.props._languages.topica.vcrx.error.slide; break;
            case 4 : title = this.props._languages.topica.vcrx.error.other; break;
            default: break;
        }
        let darkTheme = this.props._theme === "dark";
        let textColor = darkTheme ? ColorPalette.lightGrey : ColorPalette.textBlack;
        let placeholderTextColor = darkTheme ? ColorPalette.grey200 : ColorPalette.darkGrey;
        let bgColor = darkTheme ? ColorPalette.backgroundBlack2 : ColorPalette.white;
        let borderColor = darkTheme ? ColorPalette.borderDark1 : ColorPalette.border;
        if(_errorBoxKey != 0) {
            return(
                <View style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    position: "absolute",
                    top: 0,
                    alignItems:"center",
                    justifyContent: "center"
                }}>
                    <View style={{ ...styles.mainBox }}>
                        <View style={{ ...styles.errorBox, backgroundColor: bgColor }}>
                            <View style={styles.title}>
                                <AppText title style={{ color:textColor }}>{ title }</AppText>
                                <TouchableOpacity
                                    activeOpacity={ BoxModel.activeOpacity }
                                    accessibilityLabel={"Close popup"}
                                    onPress={this.closePopup}
                                    style={styles.closeBtn}
                                    underlayColor="transparent"
                                >
                                    <AppText caption >X</AppText>
                                </TouchableOpacity>
                            </View>
                            {
                                _errorBoxKey == 4
                                &&
                                <TextInput
                                    style = {{ ...styles.inputTitleError, backgroundColor: bgColor, color: textColor, borderColor: borderColor }}
                                    placeholder = { this.props._languages.topica.vcrx.error.enter_title}
                                    placeholderTextColor={ placeholderTextColor }
                                    multiline = {false}
                                    onChangeText={this._onTitleChange}
                                    underlineColorAndroid={"transparent"}
                                    value={this.state.title}
                                />
                            }
                            <TextInput
                                style = {{ ...styles.inputError, backgroundColor: bgColor, color: textColor, borderColor: borderColor }}
                                placeholder = {this.props._languages.topica.vcrx.error.enter}
                                placeholderTextColor={ placeholderTextColor }
                                multiline = {true}
                                numberOfLines = {4}
                                onChangeText={this._onMessageChange}
                                underlineColorAndroid={"transparent"}
                                value={this.state.message}
                            />
                            {
                                this.state.showNotify == true &&
                                <AppText style={styles.inputErrorText}>{this.props._languages.topica.vcrx.error.no_input}</AppText>
                            }
                            <View style={ styles.footer } >
                                <View style = {{ ...styles.boxSubmit }}>
                                    <TouchableOpacity
                                        activeOpacity={ BoxModel.activeOpacity }
                                        accessibilityLabel={"Close popup"}
                                        onPress={this.closePopup}
                                        style={{ ...styles.sendBtn, ...styles.closeBtnFooter, backgroundColor: bgColor }}
                                        // underlayColor="transparent"
                                    >
                                        <AppText style={{color: textColor}}>{this.props._languages.topica.vcrx.error.close}</AppText>
                                    </TouchableOpacity>
                                </View>
                                <View style = {styles.boxSubmit}>
                                    <TouchableOpacity
                                        activeOpacity={ BoxModel.activeOpacity }
                                        accessibilityLabel={"Tap to send"}
                                        onPress={this._onNotifyOtherWarning}
                                        style={styles.sendBtn}
                                        underlayColor="transparent"
                                    >
                                        <AppText style={styles.sendBtnSub}>{this.props._languages.topica.vcrx.error.send}</AppText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else {
            return(<View />);
        }
    }

    _onNotifyOtherWarning  = () => {
        let title = this.state.title;
        if (this.props._errorBoxKey == 1){
            title = this.props._languages.topica.vcrx.error.video;
        } else if (this.props._errorBoxKey == 2){
            title = this.props._languages.topica.vcrx.error.mic;
        } else if (this.props._errorBoxKey == 3){
            title = this.props._languages.topica.vcrx.error.slide;
        }
        if (title.replace(/^\s+/, "").replace(/\s+$/, "") != ""){
            this.props.dispatch(handleSendWarning(title, this.state.message, this.props.socket));
            this.setState({message:"", title:""});
            this.setState({showNotify:false});
        } else {
            this.setState({showNotify:true});
        }
    }

    closePopup  = () => {
        Keyboard.dismiss();
        this.props.dispatch(handleWarning(0));
        this.setState({showNotify:false, title:"", message:""});
    }


    _onMessageChange = value => {
        this.setState({ message: value });
    }

    _onTitleChange  = value => {
        this.setState({ title: value, showNotify: value.length == 0 });
    }
}


export function _mapStateToProps(state: Object) {
    return {
        _theme   : state["vcrx"].theme,
        _languages   : state["vcrx"].languages,
        _errorBoxKey : state["vcrx"].roomInfo.errorKey,
        // _errorBoxKey : 4,
    };
}

export default connect( _mapStateToProps )( WarningBox );
