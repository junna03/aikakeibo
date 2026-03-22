const { useState, useEffect, useCallback, useRef } = React;

// --- 定数・設定 ---
const DEFAULT_CATEGORIES = [
  { id:"food",      name:"食費",         icon:"🍽️", color:"#FFB3C6" },
  { id:"grocery",   name:"日用品",        icon:"🛒", color:"#FFDAB9" },
  { id:"transport", name:"交通費",        icon:"🚃", color:"#AEC6CF" },
  { id:"health",    name:"医療・健康",    icon:"💊", color:"#B5EAD7" },
  { id:"fashion",   name:"衣類・美容",    icon:"👗", color:"#DDA0DD" },
  { id:"leisure",   name:"娯楽・趣味",    icon:"🎮", color:"#FFF0AA" },
  { id:"telecom",   name:"通信・サブスク",icon:"📱", color:"#A8D8F0" },
  { id:"dining",    name:"外食・飲み会",  icon:"🍜", color:"#FFCBA4" },
  { id:"education", name:"教育・書籍",    icon:"📚", color:"#C3B1E1" },
  { id:"other",     name:"その他",        icon:"✨", color:"#E0E0EE" },
];
const PRESET_ICONS = ["🍽️","🍜","🛒","💊","🚃","👗","🎮","📚","📱","✨","🐶","👶","🏠","💰"];
const PRESET_COLORS = ["#FFB3C6","#FFDAB9","#AEC6CF","#B5EAD7","#DDA0DD","#FFF0AA","#A8D8F0"];
const C = {
  bg:"#FFF5FA", bgCard:"#FFFFFF", bgSoft:"#FFF0F7", pink:"#F48FB1", pinkL:"#FFD6E7", 
  text:"#5C3D6B", textSub:"#A08AB8", border:"#F0D8F0", shadow:"rgba(244,143,177,0.18)"
};

// --- ヘルパー関数 ---
const fmt = n => `¥${Math.round(Number(n)||0).toLocaleString("ja-JP")}`;
const todayStr = () => new Date().toISOString().split("T")[0];

// --- 共通コンポーネント ---
function PillBtn({children, onClick, variant="primary", full, style:ex={}}){
  const bg = variant==="primary" ? `linear-gradient(135deg,#F9A8C9,#F48FB1)` : "white";
  return (
    <button onClick={onClick} style={{
      padding:"12px 20px", borderRadius:30, border:`1.5px solid ${C.border}`, cursor:"pointer",
      background:bg, color:variant==="primary"?"white":C.text, fontWeight:700, 
      width:full?"100%":"auto", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:4, ...ex
    }}>{children}</button>
  );
}

// --- ロック画面 ---
function LockScreen({onUnlock}){
  const [input, setInput] = useState("");
  return (
    <div style={{minHeight:"100vh", background:`linear-gradient(160deg,#FFE0EC,#EDD5FF,#C5EDF5)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24}}>
      <div style={{fontSize:52, marginBottom:8, animation:"floatAnim 3s infinite"}}>🌸</div>
      <h1 style={{fontFamily:"'Klee One',serif", fontSize:24, color:"#5C3D6B", letterSpacing:6}}>かけいぼ</h1>
      <div style={{background:"white", borderRadius:24, padding:28, boxShadow:"0 8px 32px rgba(244,143,177,0.2)", width:"100%", maxWidth:320, marginTop:20}}>
        <input type="text" placeholder="合言葉を入力" value={input} onChange={e=>setInput(e.target.value)} 
               style={{width:"100%", padding:12, border:`1.5px solid ${C.border}`, borderRadius:14, textAlign:"center", marginBottom:14}} />
        <PillBtn onClick={() => input==="AI家計簿" && onUnlock()} full variant="primary">✨ ひらく</PillBtn>
      </div>
    </div>
  );
}

// --- メインアプリ ---
function App(){
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState("daily");
  const [date, setDate] = useState(todayStr());

  if(!unlocked) return <LockScreen onUnlock={() => setUnlocked(true)} />;

  return (
    <div style={{maxWidth:480, margin:"0 auto", minHeight:"100vh", background:C.bg, display:"flex", flexDirection:"column"}}>
      <header style={{background:"linear-gradient(135deg,#FFE0EC,#EDD5FF,#C5EDF5)", padding:"18px 20px", borderBottom:`1px solid ${C.border}`, textAlign:"center"}}>
        <h1 style={{fontFamily:"'Klee One',serif", fontSize:21, color:C.text, letterSpacing:7}}>🌸 かけいぼ 💕</h1>
      </header>

      <nav style={{display:"flex", background:"white", borderBottom:`1px solid ${C.border}`, sticky:"top"}}>
        {[["daily","📅","今日"],["calendar","🗓️","カレンダー"],["reports","✨","レポート"],["setup","🌸","設定"]].map(([k,ic,lb])=>(
          <button key={k} onClick={()=>setTab(k)} style={{
            flex:1, padding:10, border:"none", background:tab===k?C.bgSoft:"white",
            borderBottom:tab===k?`3.5px solid ${C.pink}`:"3.5px solid transparent", cursor:"pointer"
          }}>{ic}<br/><span style={{fontSize:11, fontWeight:700}}>{lb}</span></button>
        ))}
      </nav>

      <div style={{padding:14, flex:1}}>
        {tab === "daily" && (
          <div className="slideUp">
            <div style={{background:"white", borderRadius:20, padding:16, border:`1px solid ${C.border}`, marginBottom:14}}>
              <input type="date" value={date} onChange={e=>setDate(e.target.value)} 
                     style={{width:"100%", padding:12, border:`1.5px solid ${C.border}`, borderRadius:14}}/>
            </div>

            <div style={{background:"white", borderRadius:20, padding:16, border:`1px solid ${C.border}`, boxShadow:`0 4px 20px ${C.shadow}`}}>
              <h3 style={{fontSize:15, color:C.text, marginBottom:12}}>💸 今日の支出</h3>
              <textarea placeholder="例：スーパー 3000円&#10;コンビニ 450円" 
                        style={{width:"100%", height:100, padding:12, border:`1.5px solid ${C.border}`, borderRadius:14, background:C.bgSoft}} />
              <PillBtn full variant="primary" style={{marginTop:12}}>✨ カテゴリを自動判定する</PillBtn>
              <div style={{textAlign:"center", marginTop:16, borderTop:`1px dashed ${C.border}`, paddingTop:16}}>
                <span style={{fontSize:12, color:C.textSub}}>▼ 手動でカテゴリ指定して入力</span>
              </div>
            </div>
            
            <div style={{textAlign:"center", marginTop:40}}>
              <span style={{fontSize:40}}>🌷</span>
              <p style={{color:C.textSub, fontSize:14, marginTop:10}}>まだ支出がありません<br/>上から入力してみてね✨</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
