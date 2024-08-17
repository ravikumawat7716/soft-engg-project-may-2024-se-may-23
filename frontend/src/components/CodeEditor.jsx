import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import axios from "axios";
import { ApiUrl } from "../config";

import markdownIt from "markdown-it";
import { Button } from "@chakra-ui/react";

function indentText(text, indentString) {
  const lines = text.split("\n");
  const indentedLines = lines.map((line) => indentString + line);
  return indentedLines.join("\n");
}

function toMarkdown(text) {
  // Replace '•' with '*'
  text = text.replace(/•/g, "*");
  // Indent text
  text = indentText(text, "> ");

  // Initialize markdown-it
  const md = markdownIt();
  // Render markdown
  return md.render(text);
}

const CodeEditor = ({ testCases }) => {
  const [isLoading, setIsLoading] = useState(false);

  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");

  const [codeDetail, setCodeDetail] = useState(null);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const codeExplainer = async () => {
    setIsLoading(true);
    const res = await axios({
      url: `${ApiUrl}/code_explanation`,
      data: editorRef.current.getValue(),
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
    });

    const formattedExplanation = toMarkdown(res.data.result);

    setIsLoading(false);

    setCodeDetail(formattedExplanation);
  };

  return (
    <div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 md:flex-row w-[70%] ">
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
          <Output
            className="w-[40%]"
            editorRef={editorRef}
            language={language}
            testCases={testCases}
          />
        </div>

        <div className="w-[30%] flex flex-col">
          {editorRef && (
            <Button
              className="px-4 py-2 text-white rounded-full bg-indigo-500"
              onClick={codeExplainer}
              isLoading={isLoading}
            >
              Explain Code
            </Button>
          )}

          {codeDetail && (
            <div
              className="font-semibold mt-4"
              dangerouslySetInnerHTML={{ __html: codeDetail }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default CodeEditor;
