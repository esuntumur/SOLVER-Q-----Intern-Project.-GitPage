import React from "react";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import MarkdownIt from "markdown-it";

import "react-markdown-editor-lite/lib/index.css";
import MyCounterA from "./plugins/MyCounterA";
import MyCounterB from "./plugins/MyCounterB";
import HandleFullScreen from "./plugins/HandleFullScreen";

Editor.use(MyCounterA, {
  start: 2,
});
Editor.use(MyCounterB, {
  start: 3,
});
Editor.use(HandleFullScreen);

export default function App() {
  const mdEditor = React.useRef(null);

  const handleClick = () => {
    if (mdEditor.current) {
      alert(mdEditor.current.getMdValue());
    }
  };
  function handleEditorChange({ html, text }) {
    // console.log("handleEditorChange", html, text);
  }
  const onImageUpload = (e) => {
    this.props.uploadImage(e);
    // try {
    //   const form = new FormData();
    //   form.append("image", e.target.files[0]);
    //   console.log(`Logged Output ~ form`, form);
    //   fetch(`http://localhost:4000/items`, {
    //     method: "POST",
    //     body: form,
    //   });
    // } catch (error) {}

    // uploadimage
  };
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  return (
    <div className="App">
      <button onClick={handleClick}>Get value</button>
      <Editor
        onImageUpload={onImageUpload}
        ref={mdEditor}
        style={{
          height: "500px",
        }}
        renderHTML={(text) => mdParser.render(text)}
        // renderHTML={(text) => <ReactMarkdown source={text} />}
        onChange={handleEditorChange}
      />
    </div>
  );
}
