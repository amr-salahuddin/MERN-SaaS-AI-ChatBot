

async function chat(queryData){
    const response = await fetch(process.env.AI_URL, {
        method: 'POST',
        body: JSON.stringify({
            model: process.env.AI_MODEL,
            messages: queryData.messages,
            max_tokens: queryData.max_tokens||100,
        }),
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${process.env.AI_SECRET}`,
        }
    });

    const data = await response.json();
    console.log('data',data.choices[0].message);
    const reponseMessage = data.choices[0].message.content;
    const prompt_tokens = data.usage.prompt_tokens;
    const completion_tokens = data.usage.completion_tokens;

    return {
        reponseMessage,
        prompt_tokens,
        completion_tokens
    }
}
module.exports = chat
