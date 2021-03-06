import React, { Component } from "react";
import { connect }          from "react-redux";
import styles               from "./styles2";
import { View, Text }       from "react-native";
import FontAwesome          from "react-native-vector-icons/FontAwesome";
import MaterialIcons          from "react-native-vector-icons/MaterialIcons";
import {
    getTimeServer,
    updateTimeNow
}                           from "../../../actions";
import { ColorPalette, AppText } from "../../../../features/base/styles/components/styles";

class Timer extends Component{
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(getTimeServer());
        this.idGetTimeServer = setInterval(() => this.props.dispatch(getTimeServer()), 10000);
        this.idPlusTimeNow   = setInterval(() => this.props.dispatch(updateTimeNow()), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.idGetTimeServer);
        clearInterval(this.idPlusTimeNow);
    }

    render() {
        return (
            <View style={ styles.countDownView }>
                <MaterialIcons name="alarm" size={16} color={ ColorPalette.classy } style={ styles.countDownIcon } />
                <AppText style={ styles.countDownContent } >{this.props.timeFormat}</AppText>
            </View>
        );
    }
}

function formatTime(time) {
    let hours      =  Math.floor(( time % (86400)) / (3600));
    let mins       =  Math.floor(( time % (86400)) % (3600) / 60);
    let secs       =  Math.floor(( time % (86400)) % (3600) % 60);
    hours = (hours < 10) ? "0"+ hours : hours;
    mins  = (mins < 10) ? "0"+ mins : mins;
    secs  = (secs < 10) ? "0"+ secs : secs;
    let timeFormat = hours + ": " + mins + ": " + secs;
    return timeFormat;
}

function _mapStateToProps(state) {
    let time = 0;
    let timeFormat = "00:00:00";
    if(state["vcrx"].roomInfo.timeStarted){
        time = parseInt(state["vcrx"].timeNow) - parseInt(state["vcrx"].roomInfo.timeStarted);
        if(time > 0){
            timeFormat = formatTime(time);
        }
    }else{
        if(state["vcrx"].timeNow < state["vcrx"].roomInfo.timeAvailable){
            time = state["vcrx"].roomInfo.timeAvailable - parseInt(state["vcrx"].timeNow);
            if(time > 0){
                timeFormat = formatTime(time);
            }
        }
    }
    return {
        time, timeFormat
    };
}

export default connect(_mapStateToProps)(Timer);
