import React, { useEffect, useState } from "react";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";
// import { useCallback, useMemo } from "react/cjs/react.production.min";

function App() {
  const [tasks, setTasks] = useState([]);

  const transFormTasks = (tasksObj) => {
    const loadedTasks = [];
    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }
    setTasks(loadedTasks);
  };

  // adding useMemo so that the URL object is not being created again and again.
  // this is required a part of adding fetchTasks to useEffect dependacy at the same time
  // avoiding infinite loop, by using useCallback to the function objects
  // const realURL = useMemo(
  //   () => ,
  //   []
  // );

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    fetchTasks(
      {
        url: "https://practicing-get-post-default-rtdb.firebaseio.com/tasks.json",
      },
      transFormTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
