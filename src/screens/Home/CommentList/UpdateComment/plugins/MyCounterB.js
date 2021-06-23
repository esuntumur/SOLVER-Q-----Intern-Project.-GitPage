import * as React from "react";

const Counter = (props) => {
  const [num, setNum] = React.useState(props.config.start);

  const handleClick = () => {
    // 调用API，往编辑器中插入一个数字
    props.editor.insertText(num);
    // 更新一下自身的state
    setNum(num + 1);
  };

  return (
    <span className="button button-type-counter" title="Counter" onClick={handleClick}>
      {num}
    </span>
  );
};
// 如果需要的话，可以在这里定义默认选项
Counter.defaultConfig = {
  start: 1,
};
Counter.align = "left";
Counter.pluginName = "my-counter-b";

export default Counter;
