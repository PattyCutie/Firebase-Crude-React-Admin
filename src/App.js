import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import "./theme/darkMode.scss";
import { productInputs, userInputs } from "./formSource";
import { DarkModeContext } from "./context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
  //const [darkmode, setDarkmode] = useState(false)
  //use context instead of useState
  const { darkMode } = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext)
  //const currentUser = true; No need this line after added AuthContext
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  //console.log(currentUser)

  return (
    <div className={darkMode ? "app darkMode" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />

            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route 
              path=":productId" 
              element={
                <RequireAuth>
                  <Single />
                </RequireAuth>
              }/>
              <Route
                path="new"
                element={
                <RequireAuth>
                  <New inputs={productInputs} title="Add New Product" />
                </RequireAuth>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
