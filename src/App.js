import "./App.css";
import Main from "./main";
import TaskOne from "./task-one";
import TaskTwo from "./task-two";
import TaskThree from "./task-three";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="font-Inter">
        <Routes>
          <Route>
            <Route path="/" element={<Main />} />
            <Route path="/task1" element={<TaskOne />} />
            <Route path="/task2" element={<TaskTwo />} />
            <Route path="/task3" element={<TaskThree />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
