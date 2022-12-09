import { IncomingMessage } from "./incomingMessage.type";
import "isomorphic-fetch";
import { Message } from "./message.type";

describe("Postbox", () => {
  const baseUrl = "http://localhost:4321";
  it("can create new threads, starting with a message", async () => {
    const incomingMessage: IncomingMessage = {
      from: "john.doe@example.com",
      to: "jane.doe@example.com",
      text: "Hi, how are you? Greetings, John",
      topic: "General Conversation",
    };

    const createdResponse = await fetch(`${baseUrl}/thread`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(incomingMessage),
    });

    expect(createdResponse.status).toBe(201);
    const threadId = await createdResponse.json();
    expect(threadId).toBeDefined();

    const messageResponse = await fetch(`${baseUrl}/thread/${threadId}`);
    const message: Message = await messageResponse.json();

    expect(message).toHaveProperty("id");
    expect(message).toEqual(expect.objectContaining(incomingMessage));
  });
});
