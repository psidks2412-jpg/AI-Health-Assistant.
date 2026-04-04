import {useState} from "react";
import API from "../api";

export default function Chat(){
  const [msg,setMsg]=useState("");
  const [chat,setChat]=useState([]);

  const send=async()=>{
    const token = localStorage.getItem("token");

    const res = await API.post("/ai/chat",
      {message:msg},
      {headers:{Authorization:token}}
    );

    setChat([...chat,{user:msg,bot:res.data.reply}]);
    setMsg("");
  };

  const speak=()=>{
    const rec = new window.webkitSpeechRecognition();
    rec.onresult=e=>setMsg(e.results[0][0].transcript);
    rec.start();
  };

  return(
    <div>
      <h2>AI Doctor</h2>

      {chat.map((c,i)=>(
        <div key={i}>
          <p>You: {c.user}</p>
          <p>AI: {c.bot}</p>
        </div>
      ))}

      <input value={msg} onChange={e=>setMsg(e.target.value)}/>
      <button onClick={send}>Send</button>
      <button onClick={speak}>🎤</button>
    </div>
  );
}
