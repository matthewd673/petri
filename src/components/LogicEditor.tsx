import styles from "./LogicEditor.module.css";
import CodeEditor from "@uiw/react-textarea-code-editor";

interface LogicEditorProps {
  setCode: any, // code state setter
}

const LogicEditor = ({ setCode }: LogicEditorProps) => {
  const defaultText = "// get(x, y): returns the value of the cell at (x, y)\n\n// executed once per cell at the beginning\nconst seed = (x, y) => {\n  return 0;\n};\n\n// executed once per cell per generation\nconst step = (x, y) => {\n  return get(x, y);\n};\n\n// determines what color to use to draw a given value\nconst color = (value) => {\n  return value === 0 ? [255, 255, 255] : [0, 0, 0];\n};\n\nreturn { seed, step, color };";

  const onChange = (value: string) => {
    setCode(value);
  }

  return (
    <div className={styles.editorContainer}>
      <CodeEditor
        language="js"
        onChange={(e) => onChange(e.target.value)}
        value={defaultText}
        padding={15}
        style={{
          width: 500,
          height: 440,
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
        />
    </div>
  )
}

export default LogicEditor;