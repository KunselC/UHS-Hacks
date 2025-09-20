const { spawn } = require('child_process');

function runPythonScript(scriptPath, args = []) {
    // Spawn a new child process to execute the Python script
    const pythonProcess = spawn('python', [scriptPath, ...args]);

    let data = '';
    let errorData = '';

    // Collect data from the Python script's standard output
    pythonProcess.stdout.on('data', (stdout) => {
        data += stdout.toString();
    });

    // Collect data from the Python script's standard error
    pythonProcess.stderr.on('data', (stderr) => {
        errorData += stderr.toString();
    });

    // Handle the process exit
    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python script exited with code ${code}`);
            console.error(`Error output: ${errorData}`);
        } else {
            console.log(`Python script finished successfully.`);
            console.log(`Output: ${data}`);
        }
    });

    // Handle any errors during the process creation
    pythonProcess.on('error', (err) => {
        console.error('Failed to start Python script:', err);
    });
}

