import { createServer } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function startDev() {
  try {
    const vite = await createServer({
      configFile: resolve(__dirname, 'vite.config.ts'),
      server: {
        port: 5173,
      },
    });

    await vite.listen();
    console.log('Vite dev server is running...');

    // Wait for dev server to be ready
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Handle process termination
    process.on('SIGINT', () => {
      vite.close();
      process.exit();
    });

  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

startDev();