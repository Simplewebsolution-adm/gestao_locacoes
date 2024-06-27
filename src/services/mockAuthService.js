let users = [
  { email: 'contato@simplewebsolution.com', password: 'Sws2024!', username: 'Simple Web Solution' }
];

const authServiceMock = {
  register: async (user) => {
    users.push(user);
    return Promise.resolve({ status: 201, data: 'Usuário cadastrado com sucesso' });
  },

  login: async (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      return Promise.resolve({ status: 200, data: { user, token: 'fake-jwt-token' } });
    } else {
      return Promise.reject({ status: 401, message: 'Email ou senha inválidos' });
    }
  },

  getUser: async (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      return Promise.resolve({ status: 200, data: user });
    } else {
      return Promise.reject({ status: 404, message: 'Usuário não encontrado' });
    }
  },

  updateUser: async (userId, updatedUserData) => {
    let userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUserData };
      return Promise.resolve({ status: 200, data: 'Usuário atualizado com sucesso' });
    } else {
      return Promise.reject({ status: 404, message: 'Usuário não encontrado' });
    }
  },

  deleteUser: async (userId) => {
    let userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return Promise.resolve({ status: 200, data: 'Usuário deletado com sucesso' });
    } else {
      return Promise.reject({ status: 404, message: 'Usuário não encontrado' });
    }
  },
};

export default authServiceMock;
