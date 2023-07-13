import React, { useState } from 'react';
import './App.css';
import { Layout, Input, Button, List } from 'antd';

const { Header, Footer, Content } = Layout;

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputText,
        completed: false,
      };

      setTodoList([...todoList, newTodo]);
      setInputText('');
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodoList(prevList =>
      prevList.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEndTask = (id: number) => {
    setTodoList(prevList => prevList.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id: number) => {
    const todo = todoList.find(todo => todo.id === id);
    if (todo) {
      setInputText(todo.text);
      setEditingTodoId(id);
    }
  };

  const handleSaveEdit = (id: number) => {
    if (inputText.trim() !== '') {
      setTodoList(prevList =>
        prevList.map(todo =>
          todo.id === id ? { ...todo, text: inputText } : todo
        )
      );
    }
    setEditingTodoId(null);
    setInputText('');
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setInputText('');
  };

  return (
    <Layout className="layout">
      <Header className="header">Todo List</Header>
      <Content className="content">
        <div className="input-container">
          <Input
            className="todo-input"
            placeholder="Enter a new task"
            value={inputText}
            onChange={handleInputChange}
          />
          <Button className="add-button" type="primary" onClick={handleAddTodo}>
            Add
          </Button>
        </div>
        <List
          className="todo-list"
          dataSource={todoList}
          renderItem={item => (
            <List.Item
              className={`todo-item${item.completed ? ' completed' : ''}`}
              onDoubleClick={() => handleToggleComplete(item.id)}
            >
              {editingTodoId === item.id ? (
                <>
                  <Input
                    className="edit-input"
                    value={inputText}
                    onChange={handleInputChange}
                    onPressEnter={() => handleSaveEdit(item.id)}
                    onBlur={() => handleSaveEdit(item.id)}
                    autoFocus
                  />
                  <div className="edit-buttons">
                    <Button
                      className="save-edit-button"
                      type="primary"
                      size="small"
                      onClick={() => handleSaveEdit(item.id)}
                    >
                      Save
                    </Button>
                    <Button
                      className="cancel-edit-button"
                      type="primary"
                      size="small"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <span>{item.text}</span>
                  <div className="todo-buttons">
                    <Button
                      className="edit-button"
                      type="primary"
                      size="small"
                      onClick={() => handleEditTodo(item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="end-task-button"
                      type="primary"
                      size="small"
                      onClick={() => handleEndTask(item.id)}
                    >
                      End Task
                    </Button>
                  </div>
                </>
              )}
            </List.Item>
          )}
        />
      </Content>
      <Footer className="footer">Todo List Footer</Footer>
    </Layout>
  );
};

export default App;


// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, ListGroup, Modal } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// interface Todo {
//   id: number;
//   task: string;
//   completed: boolean;
// }

// const App: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [newTodo, setNewTodo] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
//   const [editedTodo, setEditedTodo] = useState('');

//   const addTodo = () => {
//     if (newTodo.trim() === '') return;
//     const newTask: Todo = {
//       id: todos.length + 1,
//       task: newTodo,
//       completed: false,
//     };
//     setTodos([...todos, newTask]);
//     setNewTodo('');
//     setShowModal(false);
//   };

//   const toggleTodo = (id: number) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const deleteTodo = (id: number) => {
//     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//   };

//   const startEditing = (id: number) => {
//     const todoToEdit = todos.find((todo) => todo.id === id);
//     if (todoToEdit) {
//       setEditingTodo(todoToEdit);
//       setEditedTodo(todoToEdit.task);
//       setShowModal(true);
//     }
//   };

//   const saveEditedTodo = () => {
//     if (!editingTodo) return;
//     const updatedTodos = todos.map((todo) =>
//       todo.id === editingTodo.id ? { ...todo, task: editedTodo } : todo
//     );
//     setTodos(updatedTodos);
//     setEditingTodo(null);
//     setEditedTodo('');
//     setShowModal(false);
//   };

//   return (
//     <Container>
//       <h1 className="text-center mt-5">Todo List</h1>
//       <Row className="mt-4">
//         <Col xs={8}>
//           <Button variant="primary" onClick={() => setShowModal(true)}>
//             Add Task
//           </Button>
//         </Col>
//       </Row>
//       <Row className="mt-4">
//         <Col>
//           <ListGroup>
//             {todos.map((todo) => (
//               <ListGroup.Item
//                 key={todo.id}
//                 onClick={() => toggleTodo(todo.id)}
//                 onDoubleClick={() => startEditing(todo.id)} // Added double click event
//                 className={todo.completed ? 'completed' : ''}
//               >
//                 {todo.task}
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   className="float-right"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     deleteTodo(todo.id);
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         </Col>
//       </Row>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editingTodo ? 'Edit Task' : 'Add Task'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formTodo">
//               <Form.Label>Task</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter a task"
//                 value={editingTodo ? editedTodo : newTodo}
//                 onChange={(e) => (editingTodo ? setEditedTodo(e.target.value) : setNewTodo(e.target.value))}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={editingTodo ? saveEditedTodo : addTodo}>
//             {editingTodo ? 'Save' : 'Add'}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default App