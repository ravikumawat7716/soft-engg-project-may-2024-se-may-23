import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import axios from "axios";
import { ApiUrl } from "../config";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");

  const [codeDetail, setCodeDetail] = useState(null);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const codeExplainer = async () => {
    const res = await axios({
      url: `${ApiUrl}/code_explanation`,
      data: editorRef.current.getValue(),
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
    });

    setCodeDetail(res.data.result);
    console.log(res.data.result);
  };

  return (
    <div>
      <div className="flex gap-1">
        <div className="w-[60%]">
          <h1 className="border border-green-400 px-4 py-2 text-green-400 mb-4 rounded-md">
            Python
          </h1>
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </div>
        <Output className="w-[40%]" editorRef={editorRef} language={language} />
        <div className="flex flex-col">
          {editorRef && (
            <button
              className="px-4 py-2 text-white rounded-full bg-red-700"
              onClick={codeExplainer}
            >
              Explain Code
            </button>
          )}

          {codeDetail && <h1>{codeDetail}</h1>}
        </div>
      </div>
    </div>
  );
};
export default CodeEditor;
