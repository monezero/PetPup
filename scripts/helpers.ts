import { exec, spawn, ChildProcess } from 'child_process';
import { promisify } from 'util';

const promisifiedExec = promisify(exec);

export const timeout = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

export const spawned = (command: string): ChildProcess => {
  const [commandName, ...args] = command.split(' ');
  const child = spawn(commandName, args, {
    stdio: 'inherit',
    shell: true,
  });
  return child;
};

export const execAsync = async (command: string) => {
  const { stderr, stdout } = await promisifiedExec(command);
  if (stderr && !stderr.includes('warning')) {
    throw new Error(stderr);
  }
  return stdout;
};

export const handleEasPromise = async (easCli: ChildProcess) => {
  return new Promise((resolve, reject) => {
    easCli.on('close', code => {
      if (code === 0) {
        resolve(true);
      } else {
        reject();
      }
    });
  });
};
