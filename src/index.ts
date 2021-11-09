import { app } from './app';

console.log(process.env.NODE_ENV)

app.listen(process.env.PORT || 5000, () => {
    console.log("Server on port 5000 \nhttp://localhost:5000 ")
})
