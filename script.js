const { useState, useEffect, useCallback, useRef } = React;

// --- Claudeで作った元のロジック部分（ここをApp内で使います） ---
function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState('daily');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [expenses, setExpenses] = useState([]); // データを保存する場所

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

  // タブごとの表示内容
  const renderContent = () => {
    switch (tab) {
      case 'daily':
        return (
          <div className="slideUp">
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
            {expenses.length === 0 && (
              <div style={{textAlign: 'center', marginTop: 40}}>
                <div style={{fontSize: '40px'}}>🌷</div>
                <p style={{color: '#A08AB8', fontSize: '14px'}}>まだ支出がありません<br/>上から入力してみてね✨</p>
              </div>
            )}
          </div>
        );
      case 'calendar':
        return <div className="card"><h3>🗓️ カレンダー画面</h3><p>ここにカレンダーのロジックが入ります</p></div>;
      case 'report':
        return <div className="card"><h3>📊 レポート画面</h3><p>支出グラフが表示されます</p></div>;
      case 'setup':
        return <div className="card"><h3>🌸 設定画面</h3><p>カテゴリ設定など</p></div>;
      default:
        return null;
    }
  };

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
        {renderContent()}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
