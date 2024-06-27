import net from "net";
import { readHeader, writeHeader } from "./utils.js";
import { HANDLER_ID_SIZE, MAX_MESSGAE_LENGTH, TOTAL_LENGTH_SIZE } from "./constants.js";
import handlers from "./handlers/index.js";

const PORT = 5555;

const server = net.createServer((socket) => {
  console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

  socket.on("data", (data) => {
    const { length, handlerId } = readHeader(data);
    console.log("length: ", length);
    console.log("handlerId: ", handlerId);

    if (length > MAX_MESSGAE_LENGTH) {
      console.error(`Error: Message length ${length}`);
      socket.write(`Error: Message too long`);
      socket.end();
      return;
    }

    if (!handlers[handlerId]) {
      console.error(`Error: No handler found for ID ${handlerId}`);
      socket.write(`Error: Invalid handler ID ${handlerId}`);
      socket.end();
      return;
    }

    const buffer = Buffer.from(data);

    const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID_SIZE;
    const message = buffer.subarray(headerSize);

    console.log("Client message: ", message);

    const responseMessage = "Hi, there";
    const responseBuffer = Buffer.from(responseMessage);

    const header = writeHeader(responseBuffer.length, handlerId);
    const packet = Buffer.concat([header, responseBuffer]);

    socket.write(packet); // 받은 data 다시 전송
  });
  socket.on("end", () => {
    // 한 쪽의 연결이 끝났을 때
    console.log(`Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
  });
  socket.on("error", (err) => {
    console.log(`Socket error: ${err}`);
  });
});

server.listen(PORT, () => {
  console.log(`Echo Server listening on port ${PORT}`);
  console.log(server.address());
});
