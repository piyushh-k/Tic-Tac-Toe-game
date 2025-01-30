
import Game from "./square";

function App() {
  const array1 = [18 , 12 , 10]
  function check(value){
    return value==null;
  }

  const checked = array1.filter(check)
  console.log(checked)
  if(checked.length == []){
    console.log("empty")
  }

  return (
    <>
      <center>
        <Game />
      </center>
    </>
  );
}

export default App;
