import { init, nextApp, handle } from "./app";

const port = parseInt(process.env.PORT, 10) || 3009;

const start = async () => {
  const app = await init(nextApp, handle);

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
};

start();
