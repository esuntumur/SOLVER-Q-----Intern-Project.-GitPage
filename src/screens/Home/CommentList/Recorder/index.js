import React, { Component } from "react";
import "./recorder.scss";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordState: null,
      loading: false,
    };
    this.success = this.success.bind(this);
    this.fail = this.fail.bind(this);
  }
  start = () => {
    try {
      this.setState({
        recordState: RecordState.START,
      });
    } catch (error) {
      console.log(`Console.log  =>  ~ App ~ error`, error);
    }
  };
  stop = () => {
    this.setState({
      recordState: RecordState.STOP,
    });
  };
  success = () => toast("You're signed up!");
  fail = () => toast("Email has already been taken");

  //audioData contains blob and blobUrl
  async onStop(audioData) {
    this.setState({ loading: true });
    await this.props.reqAudioUrl(audioData.blob);
    this.props.setRenderAudioRecorder();
    this.setState({ loading: false });
  }
  render() {
    const { recordState } = this.state;

    return (
      <div id="recorder">
        <ToastContainer />
        <div className="wave">
          <AudioReactRecorder state={recordState} onStop={this.onStop.bind(this)} />
          <span type="button" onClick={this.start} className="recorder-btn rounded">
            Start
          </span>
          <span type="button" onClick={this.stop} className="recorder-btn rounded ms-3">
            Stop
          </span>
          <div className="loader">
            {this.state.loading && (
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                // timeout={3000} //3 secs
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
