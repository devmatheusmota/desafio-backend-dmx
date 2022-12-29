import app from './app';

const server = app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});

export default server;
