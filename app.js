const express = require('express');
const router = require('./router');
const port = process.env.PORT || 3333;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/register', router.registerRouter);
app.use('/login', router.loginRouter);
app.use('/finduser', router.findUser);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
