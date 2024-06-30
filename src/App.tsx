import "./App.css"
import Router from "./Router";



function App() {
  return (
    <div className="body">
      <div className="header">
        <div className="logo-header">
        <a href="/home"><img src="/pandora_title.png" alt="" /></a>
        {/* <div className="item-usuario"><IconeLogin/></div>  */}
        </div>
      </div>
      <Router />
    </div>
  );
}

export default App;
