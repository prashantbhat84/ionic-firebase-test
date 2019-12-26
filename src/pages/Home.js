import React, { Component, Fragment } from "react";
import { Media } from "@ionic-native/media";
import { File } from "@ionic-native/file";
import Firebase from "../config/config";
import {
  IonHeader,
  IonTitle,
  IonNav,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonList,
  IonItem
} from "@ionic/react";

class Home extends Component {
  constructor(navCtrl, media, file, platform) {
    super();
    let filePath = "";
    let fileName = "";
    let recording = false;
    let audioObject = null;
    let audioList = [{ name: "prashant" }, { name: "vishwa" }];
  }
  state = {
    recording: false
  };
  getAudioList = () => {
    if (localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  };
  ionViewWillEnter() {
    this.getAudioList();
  }
  startRecord = () => {
    let uid = "qwer123";
    this.recording = true;
    if (this.platform.is("ios")) {
      this.fileName =
        "record" +
        new Date().getDate() +
        new Date().getMonth() +
        new Date().getFullYear() +
        new Date().getHours() +
        new Date().getMinutes() +
        new Date().getSeconds() +
        ".3gp";
      this.filePath =
        this.file.documentsDirectory.replace(/file:\/\//g, "") + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is("android")) {
      this.fileName =
        "record" +
        new Date().getDate() +
        new Date().getMonth() +
        new Date().getFullYear() +
        new Date().getHours() +
        new Date().getMinutes() +
        new Date().getSeconds() +
        ".3gp";
      this.filePath =
        this.file.externalDataDirectory.replace(/file:\/\//g, "") +
        this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
    Firebase.database()
      .ref("/audio/" + uid)
      .set({
        record: this.filePath
      });
  };
  stopRecording = () => {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  };
  playAudio = (file, idx) => {
    if (this.platform.is("ios")) {
      this.filePath =
        this.file.documentsDirectory.replace(/file:\/\//g, "") + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is("android")) {
      this.filePath =
        this.file.externalDataDirectory.replace(/file:\/\//g, "") + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  };

  render() {
    return (
      <Fragment>
        <IonHeader>
          <IonNav>
            <IonTitle>Sound Recorder & Player</IonTitle>
          </IonNav>
        </IonHeader>

        <IonContent padding>
          <IonCard>
            <IonCardContent>
              <IonCardTitle>
                <p>Hello</p>
              </IonCardTitle>
              {this.state.recording ? (
                <button onClick={() => this.startRecord}>Start record</button>
              ) : (
                <button onClick={() => this.stopRecording}>Stop Record</button>
              )}
            </IonCardContent>
          </IonCard>
        </IonContent>
      </Fragment>
    );
  }
}

export default Home;
