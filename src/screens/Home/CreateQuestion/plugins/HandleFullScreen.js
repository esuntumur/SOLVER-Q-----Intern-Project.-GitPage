import * as React from "react";
import { PluginComponent } from "react-markdown-editor-lite";

export default class HandleFullScreen extends PluginComponent {
  static pluginName = "handle-full-screen";
  static align = "left";

  constructor(props) {
    super(props);

    this.handleFullScreen = this.handleFullScreen.bind(this);
  }

  handleFullScreen() {}

  componentDidMount() {
    this.editor.on("fullscreen", this.handleFullScreen);
  }

  // componentWillUnmount() {
  //   this.editor.off("fullscreen", this.handleFullScreen);
  // }

  render() {
    return null;
  }
}
