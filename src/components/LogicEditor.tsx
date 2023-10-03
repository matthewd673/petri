import AceEditor from "react-ace/lib/ace"

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

interface LogicEditorProps {
  setCode: any, // code state setter
}

const LogicEditor = ({ setCode }: LogicEditorProps) => {
  const onChange = (value: string) => {
    setCode(value);
  }

  return (
    <div>
      <AceEditor
        mode="javascript"
        theme="github"
        onChange={onChange}
        />
    </div>
  )
}

export default LogicEditor;