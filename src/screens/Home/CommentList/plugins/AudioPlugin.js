import * as React from "react";
import { PluginComponent } from "react-markdown-editor-lite";
import { connect } from "react-redux";
import { setRenderAudioRecorder } from "../../../../redux/actions/commentAction";

export class AudioPlugin extends PluginComponent {
  static pluginName = "audio-player-plugin";
  static align = "left";
  static defaultConfig = {};

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setRenderAudioRecorder();
  }

  render() {
    return (
      <span className="button" title="audio-player-plugin" onClick={this.handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-mic-fill"
          viewBox="0 0 16 16"
        >
          <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
        </svg>
      </span>
    );
  }
}

const mapStateToProps = (state) => ({
  renderAudioRecorder: state.question.renderAudioRecorder,
});

const mapDispatchToProps = { setRenderAudioRecorder };

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlugin);
