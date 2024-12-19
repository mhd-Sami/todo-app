// frontend/src/components/HomePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, ListGroup, Card, Row, Col } from "react-bootstrap";
import image1 from "../assets/image1.jpg"; 
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get("http://localhost:5000/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  };

  const addTask = () => {
    if (newTask.trim()) {
      axios.post("http://localhost:5000/tasks", { text: newTask })
        .then(res => {
          setTasks([...tasks, res.data]);
          setNewTask("");
        })
        .catch(err => console.error(err));
    }
  };

  const toggleTask = (id) => {
    axios.patch(`http://localhost:5000/tasks/${id}`)
      .then(res => setTasks(tasks.map(t => t.id === id ? res.data : t)))
      .catch(err => console.error(err));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(t => t.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <Card 
        style={{ 
          borderRadius: '8px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
        }}
      >
        <Card.Body>
          <div className="mb-4">
            <Form.Group className="d-flex">
              <Form.Control 
                type="text" 
                placeholder="Add a new task" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)}
                className="mr-2"
              />
              <Button 
                variant="primary" 
                onClick={addTask}
                className="d-flex align-items-center"
              >
                <i className="fas fa-plus mr-2"></i> Add
              </Button>
            </Form.Group>
          </div>

          <ListGroup>
            {tasks.map(task => (
              <ListGroup.Item 
                key={task.id} 
                className="d-flex justify-content-between align-items-center"
                variant={task.completed ? "light" : ""}
              >
                <span 
                  style={{ 
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "gray" : "black"
                  }}
                >
                  {task.text}
                </span>
                <div>
                  <Button 
                    variant={task.completed ? "success" : "warning"} 
                    size="sm" 
                    className="mr-2"
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? "Completed" : "Complete"}
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Image Gallery */}
      <div className="mt-4">
        <Row>
          <Col md={6}>
            <Card>
              <Card.Img 
                variant="top" 
                src={image1} 
                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} 
              />
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Img 
                variant="top" 
                src={image2} 
                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} 
              />
            </Card>
          </Col>

          <Col md={6} className="mt-4">
            <Card>
              <Card.Img 
                variant="top" 
                src={image3} 
                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} 
              />
            </Card>
          </Col>


        </Row>
      </div>
    </div>
  );
}

export default HomePage;