// frontend/src/components/TaskDetailPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, ListGroup, Badge } from "react-bootstrap";

function TaskDetailPage() {
  // State to store tasks
  const [tasks, setTasks] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks when component mounts
  useEffect(() => {
    // Function to fetch tasks
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get("http://localhost:5000/tasks");

        setTasks(response.data);
 
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks. Please try again.");
        setIsLoading(false);
      }
    };

    // Call the fetch function
    fetchTasks();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <Card.Body>
          <h3>Task Details</h3>
          <p>Loading tasks...</p>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Card.Body>
          <h3>Task Details</h3>
          <p className="text-danger">{error}</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h3>Task Details</h3>
          {tasks.length === 0 ? (
            <p>No tasks available. Add a task to get started!</p>
          ) : (
            <ListGroup>
              {tasks.map(task => (
                <ListGroup.Item key={task.id} variant={task.completed ? "light" : ""}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span 
                      style={{ 
                        textDecoration: task.completed ? "line-through" : "none",
                        color: task.completed ? "gray" : "black"
                      }}
                    >
                      {task.text}
                    </span>
                    <Badge 
                      variant={task.completed ? "success" : "warning"}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default TaskDetailPage;