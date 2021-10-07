import { App } from './app';

const run = async () => {
  const app = new App();
  await app.run();
  process.exit(0);
};

try {
  run();
} catch (error) {
  console.error(error);
  process.exit(-1);
}