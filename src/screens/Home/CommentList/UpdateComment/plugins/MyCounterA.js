import * as React from "react";
import { PluginComponent } from "react-markdown-editor-lite";

export default class Counter extends PluginComponent {
  // 这里定义插件名称，注意不能重复
  static pluginName = "my-counter";
  // 定义按钮被防止在哪个位置，默认为左侧，还可以放置在右侧（right）
  static align = "left";
  // 如果需要的话，可以在这里定义默认选项
  static defaultConfig = {
    start: 0,
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      num: this.getConfig("start"),
    };
  }

  handleClick() {
    // 调用API，往编辑器中插入一个数字
    this.editor.insertText(this.state.num);
    // 更新一下自身的state
    this.setState({
      num: this.state.num + 1,
    });
  }

  render() {
    return (
      <span
        className="button button-type-counter"
        title="Counter"
        onClick={this.handleClick}
      >
        {this.state.num}
      </span>
    );
  }
}
