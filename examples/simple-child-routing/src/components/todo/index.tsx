import React from 'react';
import { Link } from 'react-router-dom';
import { ToDo } from '../../models/todo';

export const TODOComponent = ({ todo }: { todo: ToDo }) => (
  <div>
    <Link to={'/todo/' + todo.id}>
      <p>{todo.name}</p>
    </Link>
  </div>
);
