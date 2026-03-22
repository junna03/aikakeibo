const { useState, useEffect, useCallback, useRef } = React;

// --- ヘルパー関数 ---
const fmt = n => `¥${Math.round(Number(n)||0).toLocaleString("ja-JP")}`;
const todayStr = () => new Date().toISOString().split("T")[0];

function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState('daily'); // 今どのタブにいるかを管理
  const [date, setDate] = useState(todayStr());

  // ロック解除画面
  if (!unlocked) {
    return (
      <div style={{height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'linear-gradient(160deg,#FFE0EC,#EDD5FF,#C5EDF5)'}}>
        <div style={{fontSize:50, marginBottom:10}}>🌸</div>
        <h1 style={{color:'#5C3D6B', marginBottom:20, fontFamily:"'Klee One', serif"}}>かけいぼ</h1>
        <div style={{background:'white', padding:30, borderRadius:25, boxShadow:'0 10px 30px rgba(0,0,0,0.1)', width:'80%', maxWidth:300}}>
          <input type="text" id="pass" placeholder="合言葉を入力" style={{width:'100%', padding:12, borderRadius:15, border:'1px solid #ddd', textAlign:'center', marginBottom:15}} />
          <button onClick={() => {
            if(document.getElementById('pass').value === "AI家計簿") setUnlocked(true);
            else alert("合言葉が違います");
          }} className="btn-primary">✨ ひらく</button>
        </div>
      </div>
    );
  }

  // 表示する中身をタブごとに切り替える
  let content;
  if (tab === 'daily') {
    content = (
      <div>
        <div className="card">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="card">
          <h3 style={{fontSize: '15px', marginTop: 0}}>💸 今日の支出</h3>
          <p style={{fontSize: '12px', color: '#A08AB8'}}>「スーパー3000円」など自然な言葉でOK！<br/>レシート写真 📷 からも読み取れるよ</p>
          <textarea placeholder="例：スーパー 3000円&#10;コンビニ 450円"></textarea>
          <button className="btn-primary">✨ カテゴリを自動判定する</button>
          <div style={{textAlign: 'center', marginTop: 20, borderTop: '1px dashed #F0D8F0', paddingTop: 15}}>
             <span style={{fontSize: '12px', color: '#A08AB8'}}>▼ 手動でカテゴリ指定して入力</span>
          </div>
        </div>
        <div style={{textAlign: 'center', marginTop: 40}}>
          <div style={{fontSize: '40px'}}>🌷</div>
          <p style={{color: '#A08AB8', fontSize: '14px'}}>まだ支出がありません<br/>上から入力してみてね✨</p>
        </div>
      </div>
    );
  } else if (tab === 'calendar') {
    content = (
      <div className="card" style={{textAlign:'center'}}>
        <h3>🗓️ カレンダー</h3>
        <p style={{color: '#A08AB8'}}>ここにカレンダーが表示される予定です</p>
        <div style={{fontSize:50}}>📅</div>
      </div>
    );
  } else if (tab === 'report') {
    content = (
      <div className="card" style={{textAlign:'center'}}>
        <h3>📊 レポート</h3>
        <p style={{color: '#A08AB8'}}>今月の支出グラフが表示される予定です</p>
        <div style={{fontSize:50}}>📈</div>
      </div>
    );
  } else if (tab === 'setup') {
    content = (
      <div className="card">
        <h3>🌸 設定</h3>
        <p style={{color: '#A08AB8'}}>カテゴリの編集やデータの書き出しができます</p>
        <button className="btn-primary" style={{background:'#A08AB8'}}>データをすべて消去する</button>
      </div>
    );
  }

  return (
    <div style={{maxWidth: '480px', margin: '0 auto', minHeight: '100vh', background: '#FFF5FA'}}>
      <header>
        <h1>🌸 か け い ぼ 💕</h1>
      </header>
      
      <nav>
        <button className={tab === 'daily' ? 'active' : ''} onClick={() => setTab('daily')}>📅<br/>今日</button>
        <button className={tab === 'calendar' ? 'active' : ''} onClick={() => setTab('calendar')}>🗓️<br/>カレンダー</button>
        <button className={tab === 'report' ? 'active' : ''} onClick={() => setTab('report')}>✨<br/>レポート</button>
        <button className={tab === 'setup' ? 'active' : ''} onClick={() => setTab('setup')}>🌸<br/>設定</button>
      </nav>

      <main style={{padding: '10px'}}>
        {content}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
