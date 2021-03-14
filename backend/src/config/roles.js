const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', 'sendMessages', 'getMessages']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'sendMessages', 'getMessages', 'manageMessages']);

module.exports = {
  roles,
  roleRights,
};
