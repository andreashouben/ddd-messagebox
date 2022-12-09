import express from "express";
import { PrismaClient, Prisma } from "@prisma/client/";
import { IncomingMessage } from "./incomingMessage.type";
import { Thread } from "./thread.type";

const port = 4321;

const app = express();
app.use(express.json());

const prisma = new PrismaClient({});

app.get("/", (req, res) => {
  res.send("Hello World, how are you?");
});

app.post("/thread", async (req, res) => {
  const { from, to, text, topic }: IncomingMessage = req.body;

  const data: Prisma.ThreadCreateInput = {
    topic,
    messages: {
      create: { from, to, text },
    },
  };

  const { id } = await prisma.thread.create({ data });

  res.status(201).send(JSON.stringify(id));
});

app.get("/thread/:id", async (req, res) => {
  const { id: threadId } = req.params;

  const { id, topic } = (await prisma.thread.findUnique({
    where: { id: threadId },
  }))!;

  const messages = await prisma.message.findMany({
    where: { threadId },
  });

  const thread: Thread = {
    id,
    topic,
    messages,
  };

  res.status(200).send(JSON.stringify(thread));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port} . `);
});
