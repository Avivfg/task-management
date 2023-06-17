export type User = {
  name: string;
  id: number;
  avatar: undefined;
};

export var users: User[] = [];
var nextId = 0;

const createUser = (name: string): User => {
  const newUser: User = {
    name: name,
    id: nextId,
    avatar: undefined,
  };
  nextId++;
  return newUser;
};

const addNewUser = (name: string): void => {
  users.push(createUser(name));
};

// const getUserById = (id: number): User | undefined => {
//   return users.find((user) => user.id === id);
// };

// const removeUser = (userToRremove: User): void => {
//   users = users.filter((user) => user !== userToRremove);
// };

// const removeUserById = (id: number): void => {
//   users = users.filter((user) => user.id !== id);
// };

addNewUser("Aviv");
addNewUser("Adam");
addNewUser("Mellanie");
