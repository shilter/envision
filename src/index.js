import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import router from './routes/index.js'
import models, {sequelized} from './models/index.js';

console.log(process.env.MY_SECRET);
const port = process.env.PORT;
const eraseDatabaseOnSync = true;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

app.use('/users',router.users);
app.use('/message',router.message);

app.get('/ping', (req,res) => {
    res.send('Pong');
});

sequelized.sync({ force:eraseDatabaseOnSync }).then( () => {
  app.listen(port, () => {
    console.log('Example app listening on port : '+port)
  });
});