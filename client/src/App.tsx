import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Toaster } from "@/components/ui/toaster"

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
        <TaskForm />
        <TaskList />
        <Toaster />
      </div>
    </Provider>
  );
};

export default App;
