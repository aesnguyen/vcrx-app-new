import React, { Component } from "react";
import styles       from "./styles2";
import {
    View
}                   from "react-native";
import { UserList2 } from "../../user-list";
import { Slide2 }    from "../../slide";
import { Header2 }    from "../../header";
import { SideBar2 }  from "../../sidebar";
import { Chat2 }     from "../../chat";
import { LargeVideo2 } from "../../large-video";

import {ColorPalette} from "../../../../features/base/styles/components/styles";

import {translate} from "../../../../features/base/i18n";
import {connect} from "react-redux";

class Layout2  extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={{ ...styles.contentLayout, backgroundColor: this.props._theme === "dark" ? ColorPalette.black0 : ColorPalette.white}}>
                <View style={styles.leftApp} >
                    <View style={{flex: 10}}>
                        <UserList2 />
                    </View>
                    <View style={{ ...styles.largeVideo, flex: 4 }} >
                        <LargeVideo2 />
                    </View>
                </View>
                <View style={styles.rightApp}>
                    <View style={ styles.drawLayout }>
                        <Slide2 socket={ this.props.socket }/>
                        <Header2 />
                        {
                            this.props.chatVisible
                            &&
                            <View style={styles.chatBoxVisible}>
                                <Chat2 />
                            </View>
                        }
                    </View>
                </View>
                <SideBar2 socket={ this.props.socket} />
            </View>
        );
    }
};

export function _mapStateToProps(state) {
    return {
        _theme             : state["vcrx"].theme,
    };
}
export default translate(connect(_mapStateToProps)(Layout2));
