import axios from "axios";
import React, { useState } from "react";

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      url: "https://open-ai21.p.rapidapi.com/conversationgpt35",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "162a25cfbcmsh12b9500bf845cc1p130384jsn06a91289e0b4",
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
      },
      data: {
        messages: [
          {
            role: "user",
            content: { prompt },
          },
        ],
        web_access: false,
        system_prompt: "",
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
      },
    };

    try {
      const response = await axios.request(options);
      console.log("this is res:", response.data.result);
      setResponse(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };
  const cancelFilterMethod = (e) => {
    console.log(e.target.value);
    const cancel = document.getElementById("c");
    console.log("c:", cancel);
    cancel.value = "";
    console.log("clicked");
    setPrompt("");
    setResponse("");
    const answer = document.getElementById("answer");
    answer.innerText = "";

    // setFilter('')
    // const noData = document.getElementById('noData')
    //   console.log(noData);
    //   noData.innerHTML=''
    // axios.get("/places").then((res) => setPlaces(res.data));
  };
  return (
    <div className="relative mt-3 w-96">
      <div className="fixed top-2 right-48 p-3 shadow shadow-lg bg-gray-50 rounded-2xl">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-1">
            <div className="relative">
              <input
                type="text"
                id="c"
                value={prompt}
                placeholder="Ask me questions......"
                onChange={(e) => setPrompt(e.target.value)}
                className="text-gray-500 hover:shadow-md"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 absolute right-4 top-4"
                onClick={cancelFilterMethod}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <button className="text-primary bg-gray-200 rounded-2xl px-5 py-1 hover:shadow-lg cursor-pointer">
              ASK
            </button>
          </div>
        </form>
        <div className="bg-gray-200 mt-3 text-gray-500 rounded-2xl p-4 w-72 text-justify">
          {" "}
          <span className="underline font-semibold">Answer</span>
          <span id="answer">{response}</span>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
