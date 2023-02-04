import React, { useState } from "react";
import { OpenAIApi, Configuration } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const configuration = new Configuration({
    organization: process.env.REACT_APP_ORG,
    apiKey: process.env.REACT_APP_API,
  });
  const openai = new OpenAIApi(configuration);

  const generateResponse = async () => {
    await openai
      .createCompletion({
        prompt: prompt,
        model: "text-davinci-003",
        max_tokens: 256,
        temperature: 0.7,
      })
      .then((res) => {
        setResponse(res.data.choices[0].text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app-main">
      <h1 className="header">World Best Coolest AI [OpenAI]</h1>
      <textarea
        className="app-input"
        type="text"
        placeholder="Enter your prompt here"
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={generateResponse}>Generate Response</button>
      {response && <p className="response-text">{response}</p>}
    </div>
  );
}

export default App;
