import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/index';
import { fetchTasks, updateTask, deleteTask, TaskStatusEnum, TaskStatus } from '../store/tasksSlice';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const status = useSelector((state: RootState) => state.tasks.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleStatusChange = (taskId: number, newStatus: TaskStatus) => {
    dispatch(updateTask({ id: taskId, status: newStatus }));
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Task List</h2>
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{task.title}</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon"
                    aria-label="Delete task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="p-4">
                    <p className="text-sm font-medium">Delete this task?</p>
                    <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button size="sm" variant="outline">
                        Cancel
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <p>{task.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span>Status: {task.status}</span>
              <div className="flex items-center space-x-2">
                <span>Pending</span>
                <Switch
                  checked={task.status === TaskStatusEnum.COMPLETED}
                  onCheckedChange={(checked) => 
                    handleStatusChange(
                      task.id, 
                      checked ? TaskStatusEnum.COMPLETED : TaskStatusEnum.PENDING
                    )
                  }
                />
                <span>Completed</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Created at: {new Date(task.createdAt).toLocaleString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
