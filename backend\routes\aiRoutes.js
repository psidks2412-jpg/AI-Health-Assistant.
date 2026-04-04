const router = require("express").Router();
const OpenAI = require("openai");
const Chat = require("../models/Chat");
const auth = require("../middleware/auth");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/chat", auth, async (req,res)=>{
  const {message} = req.body;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{role:"user",content:message}]
  });

  const reply = completion.choices[0].message.content;

  await Chat.create({user:req.user.id,message,reply});

  res.json({reply});
});

module.exports = router;
