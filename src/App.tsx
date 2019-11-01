import React from 'react';
import MyEditor from './components/MyEditor'
import './common/style/iconfont.css'
import './App.css'
const App: React.FC = () => {
  return (
    <div className="App">
      <div id='editor-wrapper'>
        <MyEditor/>
      </div>
    </div>
  );
}

export default App;
