/*
    Room Component
    Author: AnhLH2
    Modified: DaoNC
    TimeCreated: 27/05/2019
    TimeModified: 05/06/2019
*/
import React            from "react";
import styles           from "./styles2";
import {TouchableOpacity, View} from "react-native";
import RaiseHand2        from "./RaiseHand2";
import ChatIcon2         from "../../chat/components/ChatIcon2";
import SwitchTheme         from "../../chat/components/SwitchTheme";
import LogOut2           from "./LogOut2";
import LayoutSelection  from "./LayoutSelection";
import WarningBtn2       from "../../warning/components/WarningBtn2";
import {
    BoxModel,
    ColorPalette
} from "../../../../features/base/styles/components/styles";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5          from "react-native-vector-icons/FontAwesome5";

function SideBar({ styleLayout, styleMenuBtn, socket }) {
    return(
        <View style={[styles.sidebar,(styleLayout||{})]}>
            <SwitchTheme />
            <View>
                <ChatIcon2 />
                <RaiseHand2 />
                <WarningBtn2 styleMenuBtn={styleMenuBtn} />
            </View>
            {/*<LayoutSelection styleMenuBtn={styleMenuBtn} />*/}
            <LogOut2 socket={socket} />
        </View>
    );
}

export default SideBar;
