# task-management

Task managing app that allows:
1) Overview with an infinity scroll over the created tasks.
2) Creation of new tasks.

A task is made of: title, assignee, status, creation date, related tasks, watchers.


AT THE MOMENT
- The creation form is ready (TaskCreationScreen.tsx)
- Infinite scroll is done (TaskListScreen.tsx) and running with dummy data.
- RESTful API is basically up with express (api/index.js)


TODO: 
connect all together and debug.
In details: 
- Show tasks in TaskListScreen (in chunks of ~10) by a get request instead of dummy... 
- Add a "Create new task" button to TaskListScreen to navigate to TaskCreationScreen.
- "Finish" button on TaskCreationScreen should:
  - Run a post request with the new task
  - Navigate back to the updated TaskListScreen (make sure that the form is reset in the next creation)
