import express from 'express';
// rest of the code remains same
const app = express();
const PORT = 8000;

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});