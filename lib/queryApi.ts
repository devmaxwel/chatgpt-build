import openai from "./chatgpt";

const query = async (prompt: string, id: string, model: string) => {
  const response = await openai
    .createCompletion({
      model: model,
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      `ChatGPT3 was unable to respond to your question. Please try again later. ${error.message}`;
    });

  return response;
};

export default query;
