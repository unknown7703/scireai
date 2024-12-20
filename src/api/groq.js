import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "",
  dangerouslyAllowBrowser: true
});

export async function main() {
  const prompt = "What is the best way to go about literature reviews?";
  const chatCompletion = await groqChat(prompt);
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function groqChat(query) {
  const prompt = `
  INSTRUCTIONS:
  1. Do not add ay introductory exclamations or greetings.
  2. Do not ask any concluding questions.
  3. Do not provide summaries at the end.

  PROMPT:
  You are assisting researchers by responding to the QUERY that they have.
  
  QUERY: ${query}`;

  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an AI assistant that helps researchers.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
  });
}

export async function contextMenuLookup(text) {
  const prompt = `
  INSTRUCTIONS:
  1. Do not add ay introductory exclamations or greetings.
  2. Do not ask any concluding questions.
  3. Do not provide summaries at the end.

  PROMPT:
  You are assisting researchers by explaining the meaning of TERM that they wish to understand, providing clear explanations along with relevant examples to enhance their comprehension.
  
  TERM: ${text}`;

  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an AI assistant that helps researchers.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
  });
}

main();
