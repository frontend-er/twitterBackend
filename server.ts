import express from 'express';


const app = express();


app.get('/users', (_, res: express.Response) => {
   res.send('Salut  ')
});



app.listen(8888, (): void => {
   console.log("SERVER RUNNED")
});