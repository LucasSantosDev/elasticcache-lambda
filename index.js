const Redis = require("ioredis");

exports.handler = async (event) => {
  const { REDIS_PORT, REDIS_HOST } = process.env;

  const client = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
  });
  try {
    client.on("error", (err) => console.log("Redis Client Error", err));
    client.on("connect", () => console.log("Redis Client Connected"));

    await client.set("data", `value`);
    const value = await client.get("data");

    //log the value
    console.log("value", JSON.stringify(value));

    //disconnect from the redis server
    await client.disconnect();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Success",
          response: value,
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Error",
          response: error.message,
        },
        null,
        2
      ),
    };
  }
};
