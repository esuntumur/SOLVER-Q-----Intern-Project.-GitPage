import React, { Component } from "react";
import "./recorder.scss";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import Loader from "react-loader-spinner";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordState: null,
      loading: false,
    };
  }
  start = () => {
    try {
      console.log(`Console.log  =>  ~ App ~ try`);
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
        <div className="wave">
          <AudioReactRecorder state={recordState} onStop={this.onStop.bind(this)} />
          <button type="button " onClick={this.start} className="recorder-btn rounded">
            Start
          </button>
          <button type="button" onClick={this.stop} className="recorder-btn rounded ms-3">
            Stop
          </button>
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
