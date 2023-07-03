const { spawn } = require('child_process');

exports.callPython = (path, ...inputs) => {
  return new Promise((resolve, reject) => {
    const python = spawn('python', [path, ...inputs]);

    python.stdout.on('data', (data) => {
      console.log(`Python script stdout: ${data}`);
    });

    python.on('error', (error) => {
      console.error(`An error occurred while executing the Python script: ${error.message}`);
    });

    python.stderr.on('data', (data) => {
      console.error(`Python script stderr: ${data}`);
    });

    python.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
      resolve(code);
    });
  })
}