const apiKey = "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"
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
var cors = require('cors')
const app = express()

const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

//cors 이슈 해결
// let corsOptions = {
//     origin: 'https://www.domain.com',
//     credentials: true
// }
app.use(cors());

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST 요청 받을 수 있게 만듬.
app.get('/recipeTell', async function (req, res) {
    const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        {role: "system", content: "당신은 세계 최고의 요리사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗요리입니다. 당신에게 불가능한 레시피는 없습니다. 요리 재료만 주어지면 사용자가 원하는 칼로리에 맞춰서 레시피를 추천해줍니다. 요리 관련된 지식이 풍부하고 모든 질문에 대해 명확히 답변해 줄 수 있습니다. "},
        {role: "user", content: "당신은 세계 최고의 요리사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗요리입니다. 당신에게 불가능한 레시피는 없습니다. 요리 재료만 주어지면 사용자가 원하는 칼로리에 맞춰서 레시피를 추천해줍니다. 요리 관련된 지식이 풍부하고 모든 질문에 대해 명확히 답변해 줄 수 있습니다. "},
        {role: "assistant", content: "안녕하세요, 챗요리입니다. 어떤 요리에 대해 도움이 필요하신가요? 제가 가능한 한 최선을 다해 도와드리겠습니다. 재료와 원하는 칼로리만 알려주세요."},
        {role: "user", content: "오늘 뭐먹지?"},
    ],
    });
    let recipe=completion.data.choices[0].message['content']
    console.log(recipe);   
    res.send(recipe);
  });
app.listen(3000)


