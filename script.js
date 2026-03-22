const { useState, useEffect, useCallback, useRef } = React;

// --- 定数・ヘルパー関数 ---
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

const PRESET_ICONS = ["🍽️","🍜","🍱","🍰","☕","🛒","💊","🚃","👗","🎮","📚","📱","💰","✨","🐶","👶"];
const PRESET_COLORS = ["#FFB3C6","#FFDAB9","#AEC6CF","#B5EAD7","#DDA0DD","#FFF0AA","#A8D8F0"];

const fmt = n => `¥${Math.round(Number(n)||0).toLocaleString("ja-JP")}`;
const todayStr = () => new Date().toISOString().split("T")[0];

// --- ストレージ操作 ---
async function sg(key){ const r = await window.storage.get(key); return r?.value ?? null; }
async function ss(key,val){ await window.storage.set(key, val); }

// --- コンポーネント ---
function PillBtn({children, onClick, variant="primary", full, style:ex={}}){
    const isSpecial = ["primary","mint","lavender"].includes(variant);
    return (
        <button onClick={onClick} style={{
            padding: "10px 20px", borderRadius: 30, cursor: "pointer",
            background: variant === "primary" ? "linear-gradient(135deg,#F9A8C9,#F48FB1)" : "#fff",
            color: variant === "primary" ? "white" : "#5C3D6B",
            border: "1.5px solid #F0D8F0", fontWeight: 700, width: full ? "100%" : "auto", ...ex
        }}>{children}</button>
    );
}

// --- メインアプリ ---
function App() {
    const [unlocked, setUnlocked] = useState(false);
    const [tab, setTab] = useState("daily");

    if (!unlocked) {
        return (
            <div className="lock-screen" style={{textAlign: 'center', padding: '50px'}}>
                <h1>🌸 かけいぼ</h1>
                <p>合言葉「AI家計簿」を入力してください</p>
                <input type="text" onChange={(e) => e.target.value === "AI家計簿" && setUnlocked(true)} 
                       style={{padding: '10px', borderRadius: '10px', border: '1px solid #ddd'}}/>
            </div>
        );
    }

    return (
        <div style={{maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: "#FFF5FA"}}>
            <header style={{padding: '20px', textAlign: 'center', background: '#fff'}}>
                <h1 style={{fontFamily: 'Klee One', letterSpacing: '5px'}}>かけいぼ</h1>
            </header>
            <nav style={{display: 'flex', background: '#fff', borderBottom: '1px solid #eee'}}>
                {["daily", "calendar", "reports", "setup"].map(t => (
                    <button key={t} onClick={() => setTab(t)} style={{flex: 1, padding: '15px', border: 'none', background: tab===t ? '#FFF0F7' : 'none'}}>
                        {t === "daily" ? "📅" : t === "calendar" ? "🗓️" : t === "reports" ? "✨" : "🌸"}
                    </button>
                ))}
            </nav>
            <div style={{padding: '20px'}}>
                {tab === "daily" && <div><h2>今日の支出</h2><p>ここに支出入力機能が入ります</p></div>}
                {tab === "setup" && <div><h2>設定</h2><p>カテゴリや固定費の設定ができます</p></div>}
                {/* 他のタブも同様に実装 */}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
