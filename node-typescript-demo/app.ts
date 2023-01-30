import express from 'express';
import todosRoute from './routes/todos';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(todosRoute);
console.log('Server running!')
app.listen(3500);


