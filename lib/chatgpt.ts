import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.CHATGPT3_API_KEY,
});

const openai = new OpenAIApi(config);

export default openai;
