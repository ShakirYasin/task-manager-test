import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { createTask, TaskStatusEnum } from '../store/tasksSlice';
import { useToast } from "@/hooks/use-toast"

const TaskForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '') {
      toast({
        title: "Error",
        description: "Title cannot be empty",
        variant: "destructive",
      })
      return;
    }

    if (description.trim() === '') {
      toast({
        title: "Error",
        description: "Description cannot be empty",
        variant: "destructive",
      })
      return;
    }

    dispatch(createTask({ title, description, status: TaskStatusEnum.PENDING }))
      .unwrap()
      .then(() => {
        setTitle('');
        setDescription('');
        toast({
          title: "Success",
          description: "Task created successfully",
        })
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: `Failed to create task: ${error.message}`,
          variant: "destructive",
        })
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Task</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
        />
      </div>
      <button 
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
