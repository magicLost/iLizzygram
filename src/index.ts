import { init } from "./app";
import { wakeUpDyno, timeoutId } from "./utils/wakeUpDyno";

const port = parseInt(process.env.PORT, 10) || 3009;
let server: any;

const start = async () => {
  const app = await init();

  wakeUpDyno(
    {
      hostname: "localhost",
      port: 3009,
      path: "/sleep",
    },
    0.5
  );

  server = app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
};

process.on("unhandledRejection", (err: Error) => {
  console.error(err.name, err.message);

  clearTimeout(timeoutId);

  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.error("SIGTERM received");

  clearTimeout(timeoutId);

  server.close(() => {
    process.exit(1);
  });
});

start();
