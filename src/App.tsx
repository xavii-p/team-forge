import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import { useState, useEffect } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Projects from "./components/Projects";
import ClassPage from "./components/ClassPage";
import AddClass from "./components/AddClass";
import JoinClass from "./components/JoinClass";
import CreateClass from "./components/CreateClass";
import Messages from "./components/Messages";
import ProfilePage from "./components/ProfilePage";
import ClassPageProjects from "./components/ClassPageProjects";
import ClassPagePeople from "./components/ClassPagePeople";
import PrivateRoute from "./PrivateRoutes/index";

import { getEmailFromJWT, getUsernameFromJWT } from "./jwtUtils";

interface User {
  name: string;
  email: string;
}

const App: React.FC = () => {
  const { classID } = useParams();

  //  const classObj = classes.find((cls) => cls.id === id);

  const [user, setUser] = useState<User>({ name: "", email: "" });

  useEffect(() => {
    const decodedUsername = getUsernameFromJWT();
    const decodedEmail = getEmailFromJWT();
    if (decodedUsername) {
      setUser({
        name: decodedUsername,
        email: decodedEmail,
        // Set other properties as needed
      });
    }
  }, []);

  const handleLogin = (user: User) => {
    setUser(user);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("jwt"); // should not remove token, just let it expire
    setUser({ name: "", email: "" });
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/Home"
            element={
              <PrivateRoute>
                <Home user={user} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          <Route
            path="/ProfilePage"
            element={
              <PrivateRoute>
                <ProfilePage user={user} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          <Route path="/Projects">
            <Route
              path=""
              element={
                <PrivateRoute>
                  <Projects user={user} onLogout={handleLogout} />
                </PrivateRoute>
              }
            />
            <Route
              path="/Projects/:classID"
              element={
                <PrivateRoute>
                  <ClassPage user={user} onLogout={handleLogout} />
                </PrivateRoute>
              }
            />
            <Route
              path="/Projects/:classID/projects"
              element={
                <PrivateRoute>
                  <ClassPageProjects user={user} onLogout={handleLogout} />
                </PrivateRoute>
              }
            />
            <Route
              path="/Projects/:classID/people"
              element={
                <PrivateRoute>
                  <ClassPagePeople user={user} onLogout={handleLogout} />
                </PrivateRoute>
              }
            />
            <Route
              path="/Projects/AddClass"
              element={
                <PrivateRoute>
                  <AddClass user={user} onLogout={handleLogout} />
                </PrivateRoute>
              }
            >
              <Route
                path="/Projects/AddClass/JoinClass"
                element={
                  <PrivateRoute>
                    <JoinClass user={user} onLogout={handleLogout} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/Projects/AddClass/CreateClass"
                element={
                  <PrivateRoute>
                    <CreateClass user={user} onLogout={handleLogout} />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>
          <Route
            path="/Messages"
            element={
              <PrivateRoute>
                <Messages user={user} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
