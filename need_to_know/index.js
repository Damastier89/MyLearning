import express from "express";
import path from "path";
import serverRouter from "./indexRouter/router.js"

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 7000;
const app = express();

app.use(express.static(path.resolve(__dirname, 'index')));
app.use(serverRouter);

app.get('/', (req, res) => {res.render('index')});

app.listen(PORT , () => {console.log(`Server has been started on port ${PORT}`)});