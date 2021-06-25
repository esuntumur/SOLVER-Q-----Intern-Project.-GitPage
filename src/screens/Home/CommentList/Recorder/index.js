import React, { Component } from "react";
import "./recorder.scss";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordState: null,
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
    // setTimeout(() => {

    // }, timeout);
  };

  //audioData contains blob and blobUrl
  async onStop(audioData) {
    await this.props.reqAudioUrl(audioData.blob);
  }

  render() {
    const { recordState } = this.state;

    return (
      <div id="recorder">
        <AudioReactRecorder state={recordState} onStop={this.onStop.bind(this)} />

        <button onClick={this.start}
                className="recorder-btn rounded">
          Start
        </button>
        <button onClick={this.stop}
                className="recorder-btn rounded ms-3">
          Stop
        </button>
      </div>
    );
  }
}
