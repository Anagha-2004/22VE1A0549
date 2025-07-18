import { useState} from "react";
import "./App.css";
function App(){
  const[longUrl,setLongUrl]=useState("");
  const[shortUrl,setshortUrl]=useState("");
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const res=await fetch("http://localhost:5000/shorten",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({longUrl}),

    });
    const data=await res.json();
    setshortUrl(data.shortUrl);
  };
  return(
    <div>
      <h1>Shorten Url</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={longUrl}
          onChange={(e)=>setLongUrl(e.target.value)}
          placeholder="enter your url"
          style={{width:"300px"}}/>
          <button>shorted</button>
      </form>
      {shortUrl && <p>Short Url: <a href={shortUrl}>{shortUrl}</a></p>}

    </div>
  )
}
export default App;