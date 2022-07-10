/* eslint-disable prettier/prettier */
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// ENV variables are outside the scope of Express
// Environments: Production and Development environments
// By default, environment is development

// console.log(app.get('env'));
// console.log(process.env);

// Use these packages to use eslint with prettier
// npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev
