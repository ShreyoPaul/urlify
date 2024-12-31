const dotenv = require('dotenv');
const Groq = require('groq-sdk');


dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getSummerization(content) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You are a summarization tool. Summarize the content concisely. No preambles, please.
                
                Just return points, no preambles (like Here is a concise summary). Describe each points.
                Example:
                1. Point 1\n
                2. Point 2\n
                3. Point 3 etc.
                
                `,
            },
            {
                role: "user",
                content: content,
            },
        ],
        model: "llama3-8b-8192",

    });

}

module.exports = getSummerization;