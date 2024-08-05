const handleTodoGETService = (req) => {
  console.log('--=/api/*', req.method);
};

const TodoApi = (req, res) => {
  console.log('--=/api/*', req.method);
  if (req.method === 'GET') {
    res.send(handleTodoGETService(req));
  }
  res.send('I am from API');
};

export default TodoApi;
