import net from "net";
import { writeHeader, readHeader } from "./utils.js";
import { HANDLER_ID_SIZE, TOTAL_LENGTH_SIZE } from "./constants.js";

const HOST = "localhost";
const PORT = 5555;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log("Connected to the server...");

  const message = "Hello";
  // const message = "V".repeat(1024);
  const buffer = Buffer.from(message);

  const header = writeHeader(buffer.length, 11);
  const packet = Buffer.concat([header, buffer]);
  client.write(packet); //
});

client.on("data", (data) => {
  // data : Buffer, Buffer 객체는 Byte 배열: 56 30 1c ff 9a ...
  const { length, handlerId } = readHeader(data);
  console.log("length: ", length);
  console.log("handlerId: ", handlerId);
  const buffer = Buffer.from(data);

  const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID_SIZE;
  const message = buffer.subarray(headerSize);
  console.log(`server에게 받은 메세지: ${message}`);
  console.log("message: ", message);
  console.log("string: ", buffer.toString());
  console.log("json: ", buffer.toJSON());
});

client.on("close", () => {
  // 양 쪽의 연결이 완전히 끝났을 때
  console.log(`Connection closed.`);
});

client.on("error", (err) => {
  console.log(`Client error: ${err}`);
});
