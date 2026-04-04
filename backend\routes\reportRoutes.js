const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const OpenAI = require("openai");

const upload = multer({dest:"uploads/"});
const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

router.post("/upload", upload.single("file"), async (req,res)=>{
  const data = fs.readFileSync(req.file.path);
  const pdf = await pdfParse(data);

  const completion = await client.chat.completions.create({
    model:"gpt-4o-mini",
    messages:[{role:"user",content:`Summarize: ${pdf.text}`}]
  });

  res.json({summary:completion.choices[0].message.content});
});

module.exports = router;
