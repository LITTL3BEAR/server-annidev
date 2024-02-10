const ErrorHandler = require('../middleware/errorHandler');
const { spawn } = require('child_process');

exports.callPython = (path, ...inputs) => {
  let result
  return new Promise((resolve, reject) => {
    const python = spawn('python', [path, ...inputs]);
    python.stdout.on('data', (data) => result = data.toString());
    python.stderr.on('data', (data) => result = data.toString());
    python.on('error', (error) => result = error.message);
    python.on('close', (code) => {
      if (code == 0) resolve(result);
      else reject(new ErrorHandler(500, result));
    });
  })
}