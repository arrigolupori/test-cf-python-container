import {Container, getContainer} from "@cloudflare/containers";
import {Hono} from "hono";

export class PythonTestContainer extends Container<Env> {
  defaultPort = 8080;
  sleepAfter = "2m";
  envVars = {
    MESSAGE: "I was passed in via the container class!",
  };

  override onStart() {
    console.log("Container successfully started");
  }

  override onStop() {
    console.log("Container successfully shut down");
  }

  override onError(error: unknown) {
    console.log("Container error:", error);
  }
}

const app = new Hono<{
  Bindings: Env;
}>();

app.get("/", (c) => {
  return c.text(
    "Available endpoints:\n" +
    "GET /error - Start a container that errors (demonstrates error handling)\n" +
    "GET /singleton - Get a single specific container instance",
  );
});

// Demonstrate error handling - this route forces a panic in the container
app.get("/error", async (c) => {
  const container = getContainer(c.env.PYTHON_TEST_CONTAINER, "error-test");
  return await container.fetch(c.req.raw);
});

// Get a single container instance (singleton pattern)
app.get("/singleton", async (c) => {
  const container = getContainer(c.env.PYTHON_TEST_CONTAINER);
  return await container.fetch(c.req.raw);
});

export default app;
