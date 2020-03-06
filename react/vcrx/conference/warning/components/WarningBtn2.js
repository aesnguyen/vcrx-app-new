/*
    WarningBtn Component
    Author: HaiNN3
    TimeCreated: 01/07/2019
    TimeModified: 01/07/2019
*/
import React, { Component }                 from "react";
import { connect }                          from "react-redux";
import { TouchableOpacity, Text, View, Alert }     from "react-native";
import ModalDropdown                        from "react-native-modal-dropdown";
import FontAwesome                          from "react-native-vector-icons/FontAwesome";
import styles                               from "./styles2";
import { handleWarning }                    from "../../../actions";
import { PERMISSION }                       from "../../../config";
import {
    BoxModel,
    ColorPalette
} from "../../../../features/base/styles/components/styles";
import LinearGradient from "react-native-linear-gradient";

class WarningBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: true
        };
    }

    _dropdownLayoutWillShow() {
        this.setState({
            styleMenuLayout: [styles.styleMenuEnable, (this.props.styleMenuBtn || {})]
        });
    }

    _dropdownLayoutWillHide() {
        this.setState({
            styleMenuLayout: [styles.styleMenuDisable, (this.props.styleMenuBtn || {})]
        });
    }

    _onSelectWarning = (index, name) => {
        let key = Number(index) + 1;
        this.props.dispatch(handleWarning(key));
    }

    warningValue = datas => {
        const result = datas.map((item, key) => (
            <Text>{item}</Text>
        ));
        return result;
    }

    componentWillMount(){
        if (PERMISSION.disableWarning.indexOf(this.props._userInfo.role) == -1){
            this.setState({role:true});
        } else {
            this.setState({role:false});
        }
    }

    _onPressButton  = () =>{
        if(!this.state.role){
            Alert.alert(this.props._languages.topica.vcrx.error.notification,this.props._languages.topica.vcrx.error.limited_role);
        }
    }

    render() {
        let { error } = this.props._languages.topica.vcrx;
        let errorValue = [ error.video, error.mic, error.slide, error.other ];
        let darkTheme = this.props._theme === "dark";
        let bgColor = darkTheme ? ColorPalette.backgroundGrey2 : ColorPalette.backgroundGrey;
        let textColor = darkTheme ? ColorPalette.lightGrey : ColorPalette.textBlue;
        return (
            <TouchableOpacity
                activeOpacity={ BoxModel.activeOpacity }
                onPress={ this._onPressButton }
            >
                {
                    this.state.role ?
                        <ModalDropdown
                            dropdownStyle={styles.sidebarError}
                            dropdownTextStyle={styles.sidebarErrorText}
                            animated={ true }
                            options={this.warningValue(errorValue)}
                            onSelect={(index, data) => this._onSelectWarning(index)}
                            onDropdownWillShow={() => this._dropdownLayoutWillShow()}
                            onDropdownWillHide={() => this._dropdownLayoutWillHide()}
                        >
                            <LinearGradient
                                colors={ [ColorPalette.backgroundGrey, ColorPalette.backgroundGrey] }
                                start={{x: 0.0, y: 0.1}}
                                end={{x: 1, y: 0.9}}
                                style={{ ...styles.styleMenuDisable, backgroundColor: bgColor }}
                            >
                                <FontAwesome name="warning" color={ ColorPalette.textBlue } size={ BoxModel.fontSizeMd } color={textColor} />
                            </LinearGradient>
                        </ModalDropdown>
                        :
                        <LinearGradient
                            colors={ [ColorPalette.backgroundGrey, ColorPalette.backgroundGrey] }
                            start={{x: 0.0, y: 0.1}}
                            end={{x: 1, y: 0.9}}
                            style={{ ...styles.styleMenuDisable, backgroundColor: bgColor }}
                        >
                            <FontAwesome name="warning" color={ ColorPalette.textBlue } size={ BoxModel.fontSizeMd } color={textColor} />
                        </LinearGradient>

                }
            </TouchableOpacity>
        );
    }
}

function _mapStateToProps(state) {
    return {
        _theme              : state["vcrx"].theme,
        _languages          : state["vcrx"].languages,
        _userInfo           : state["vcrx"].userInfo
    };
}

export default connect(_mapStateToProps)(WarningBtn);
