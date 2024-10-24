import { useState, useContext } from "react";

import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import Navbar from "./components/Navbar";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProjectPage from "./pages/ProjectPage";
import AddProjectPage from "./pages/AddProjectPage";
import EditProjectPage from "./pages/EditProjectPage";
import MyNetworkPage from "./pages/MyNetworkProjectsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditUserPage from "./pages/EditUserPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import SearchUserPage from "./pages/SearchUserPage";
import SearchTechPage from "./pages/SearchTechPage";
import BannerLogin from "./components/BannerLogin"
import imgLogo from "./assets/deep-purple-logo.png";
import imgWeb from "./assets/web-purple.png";
import FooterBar from "./components/FooterBar";
import SearchBar from "./components/SearchBar";
import Private from "./components/auth/Private";



function App() {
  const { isLoggedIn, loggedUserId } = useContext(AuthContext);


  return (
    <div style={{position:"relative"}}>
      <Navbar />
      <SearchBar style={"bigSearchBar"} />

      <img src={imgWeb} alt="web" className="spider-web" />
      <div style={{width:"30vw",maxWidth:"180px",margin:"auto"}}>
      <Link to="/" >
      <img className="logo-tangle" src={imgLogo} alt="logo" style={{width:"30vw",maxWidth:"180px"}}/>
      </Link >
        </div>


      <BannerLogin />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />

        
        <Route
          path="/projects/new-project"
          element={<Private><AddProjectPage /> </Private> }
        />

        <Route
          path="/projects/:projectId"
          element={<ProjectPage />}
        />
        <Route
          path="/projects/:projectId/update"
          element={<Private><EditProjectPage /></Private>}
        />
        
        <Route path="/projects/my-network" element={<Private><MyNetworkPage /></Private>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile/:userId/my-info" element={<Private><EditUserPage /></Private>} />
        <Route
          path="/profile/:userId/change-password"
          element={<Private><ChangePasswordPage /></Private>}
        />
        <Route path="/search" element={<SearchUserPage />} />
        <Route path="/tech/:tech" element={<SearchTechPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isLoggedIn && (
        <Link to="/projects/new-project">
          <button className="addProjectBtn"><span className="plusBtn" >+</span> Add Project</button>
        </Link>
      )}
      <hr />
      <br />
      <FooterBar />
    </div>
  );
}

export default App;
