import axios from "axios";

const getFileSummary = async (fullPath, source, context) => {
  const raw = JSON.stringify({
    model: "llama3.2",
    prompt: `Summarize the following source code with path - ${fullPath} in not more than 100 words for vue project file. Only summarize in plain english points. Total response should not exceed 150 words.
    ${source.sourceContent}`,
    stream: false,
    raw: false,
    context,
  });

  let res = {
    context: [],
    response: {}
  };
  return await axios.post("http://localhost:11434/api/generate", raw)
    .then((res) => res.data)
    .then((result) => {
      return result;
    })
    .catch((error) => console.error(error));
};

export { getFileSummary };
