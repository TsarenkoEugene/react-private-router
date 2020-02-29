import React, { useState } from 'react';
import * as faker from 'faker';

// import { Routes } from './router';
import { Routes } from './router/new-router';
import { ToDo } from './models/todo';

interface ContextInterface {
  todo: ToDo[];
  addTodo: any;
}

export const TODOContext = React.createContext<ContextInterface>({ todo: [], addTodo: (a: any) => a });
const initialToDo = Array(10)
  .fill(0)
  .map(() => ({ address: faker.address.zipCode(), name: faker.commerce.product(), id: faker.random.uuid() }));

const App = () => {
  const [todo, setToDo] = useState<ToDo[]>(initialToDo);
  const addTodo = (newTodo: ToDo) => setToDo([...todo, newTodo]);
  return (
    <TODOContext.Provider value={{ todo, addTodo }}>
      <Routes />
    </TODOContext.Provider>
  );
};

export default App;
