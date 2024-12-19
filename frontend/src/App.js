// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import HomePage from "./components/HomePage";
import TaskDetailPage from "./components/TaskDetailPage";
import ContactPage from "./components/ContactPage";

function App() {
  return (
    <Router>
      <Navbar 
        bg="primary" 
        variant="dark" 
        style={{
          position: 'fixed', 
          top: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '85%', 
          maxWidth: '90%', 
          borderRadius: '8px', 
          zIndex: 1000,
          background: 'linear-gradient(135deg,rgb(35, 30, 40) 0%,rgb(39, 46, 59) 100%)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}
      >
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <i className="fas fa-clipboard-list mr-2"></i>
            TodoApp
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/" className="text-white mx-2">Home</Nav.Link>
            <Nav.Link href="/task-detail" className="text-white mx-2">Tasks</Nav.Link>
            <Nav.Link href="/contact" className="text-white mx-2">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

     
      <Container 
        style={{ 
          marginTop: "100px", 
          backgroundColor: '#f4f6f9', 
          minHeight: 'calc(100vh - 100px)',
          padding: '10px',
          borderRadius: '8px'
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task-detail" element={<TaskDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;