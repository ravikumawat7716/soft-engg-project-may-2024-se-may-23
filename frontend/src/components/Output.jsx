import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language, testCases }) => {
  const toast = useToast();
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const results = [];
      let passedCount = 0;

      for (const testCase of testCases) {
        console.log(testCase);
        const result = await executeCode(language, sourceCode, testCase.input);

        if (result && result.run && typeof result.run.output === "string") {
          const outputLines = result.run.output.trim().split("\n");
          const lastLine = outputLines[outputLines.length - 1];
          const passed = lastLine === testCase.expectedOutput;

          results.push({
            input: testCase.input,
            expected: testCase.expectedOutput,
            output: lastLine,
            passed,
          });

          if (passed) {
            passedCount++;
          }
        } else {
          throw new Error("Unexpected response structure from executeCode");
        }
      }

      setTestResults({ total: testCases.length, passed: passedCount });
      setOutput(results);
      setIsError(results.some((r) => !r.passed));
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box w="50%">
      <div className="flex justify-between">
        <Text mb={2} fontSize="lg">
          Output
        </Text>
        <Button
          className="border border-gray-500 rounded-md px-4 py-2 bg-green-200"
          variant="outline"
          colorScheme="green"
          mb={4}
          isLoading={isLoading}
          onClick={runCode}
        >
          Run Code
        </Button>
      </div>

      <div
        className={`border-2 border-gray-500 h-[590px] rounded-md p-2 ${
          isError ? "text-red-500" : "text-green-500"
        }`}
        height="75vh"
      >
        {testResults && (
          <Text>
            {`Out of ${testResults.total} test cases, ${testResults.passed} passed.`}
          </Text>
        )}
        {output.map((result, index) => (
          <Box key={index}>
            <Text>{`Input: ${result.input}`}</Text>
            <Text>{`Expected Output: ${result.expected}`}</Text>
            <h1
              className={result.passed ? "text-green-500" : "text-red-500"}
            >{`Output: ${result.output}`}</h1>
          </Box>
        ))}
        {!testResults && 'Click "Run Code" to see the output here'}
      </div>
    </Box>
  );
};

export default Output;
