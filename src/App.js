import { useState, useEffect } from 'react'
import Header from './components/Header'
import Task from './components/Task'
import AddTask from './components/AddTask'
import Loader from './components/Loader'


function App() {
  const [isLoading, setLoading] = useState(true);
  const [formCollapse, setFormCollapse] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
      setLoading(false);
    }

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const handleAddTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  }

  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });

    setTasks(state => state.filter(obj => obj.id !== id));
  }

  const toggleTaskReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    
    const data = await res.json()

    setTasks(state => state.map(task => task.id === id ? {...task, reminder: data.reminder } : task));
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-6 col-md-8 col-11 mx-auto bg-light p-4 rounded">
          <Header formCollapse={formCollapse} setFormCollapse={setFormCollapse}/>
          { formCollapse && <AddTask handleAddTask={handleAddTask} /> }
          <div className="card">
            <h5 className="card-header">Current Tasks</h5>
            <div className="card-body px-0">
              { isLoading && <Loader/> }
              {
                !isLoading && (tasks.length > 0 ? 
                  tasks.map(task => (
                    <Task 
                      key={task.id} 
                      handleDeleteTask={handleDeleteTask} 
                      toggleTaskReminder={toggleTaskReminder} 
                      {...task} 
                    />
                  ))
                  :
                  <h4 className="text-center p-4">No Tasks Available.</h4>)
              }
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
