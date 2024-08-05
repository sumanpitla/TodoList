import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  IconButton,
  Checkbox,
  HStack,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('all');
  const toast = useToast();

  const addTask = () => {
    if (task) {
      if (editIndex !== null) {
        const updatedTasks = tasks.map((t, i) =>
          i === editIndex ? { ...t, text: task } : t
        );
        setTasks(updatedTasks);
        setEditIndex(null);
        toast({ title: 'Task updated', status: 'success', duration: 2000 });
      } else {
        setTasks([...tasks, { text: task, completed: false }]);
        toast({ title: 'Task added', status: 'success', duration: 2000 });
      }
      setTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    toast({ title: 'Task deleted', status: 'error', duration: 2000 });
  };

  const startEditingTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <Box maxW="md" mx="auto" p={4} align="center">
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          To-Do List
        </Text>
        <HStack w="100%">
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
          />
          <Button onClick={addTask} colorScheme="teal">
            {editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </HStack>
        <HStack>
          <Button onClick={() => setFilter('all')}>All</Button>
          <Button onClick={() => setFilter('completed')}>Completed</Button>
          <Button onClick={() => setFilter('incomplete')}>Incomplete</Button>
        </HStack>
        <List spacing={3} w="100%">
          {filteredTasks.map((task, index) => (
            <ListItem
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack>
                <Checkbox
                  isChecked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                <Text
                  as={task.completed ? 'del' : ''}
                  color={task.completed ? 'gray.500' : 'black'}
                >
                  {task.text}
                </Text>
              </HStack>
              <HStack>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => startEditingTask(index)}
                  variant="ghost"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => deleteTask(index)}
                  variant="ghost"
                />
              </HStack>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default ToDoList;
