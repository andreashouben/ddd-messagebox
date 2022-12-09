import { IncomingMessage } from '../../incomingMessage.type';
import { startThread } from './thread';
import { Message } from '../../message.type';
import {Thread} from '../../thread.type';
import {randomUUID} from 'crypto';


type ThreadEntity = {
  id?: string;
  topic: string;
  messages: Message[];
};

type MessageEntity = {
  from: string;
  to: string;
  text: string;
};

interface ThreadStorage {
    storeThread : (thread: Thread) => string;
    findThread: (threadId: string) => Thread;
}

describe('Thread', () => {
  it('starts a thread by retrieving a message', () => {
    const message: IncomingMessage = {
      from: 'john@example.com',
      to: 'ephraim@example.com',
      text: 'Hi Ephraim, how are you?',
      topic: "Let's talk",
    };


    const threadStorage: ThreadStorage = {
        #threads: [],
      storeThread : (thread) =>{
            thread.id = randomUUID();

          return thread.id
      }
      findThread: (id) =>
    };
    threadStorage.prototype.constructor(
    })
    })

    startThread(messageStorage, message);
  });
});
