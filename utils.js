import { HANDLER_ID_SIZE, TOTAL_LENGTH_SIZE } from "./constants.js";

export const readHeader = (buffer) => {
  // Big Endian (BE), Little Endian (LE)
  return {
    length: buffer.readInt32BE(0),
    handlerId: buffer.readInt16BE(TOTAL_LENGTH_SIZE),
  };
};

/**
 *
 * @param {number} length length of the data
 * @param {number} handlerId handler's ID
 * @returns header buffer
 */
export const writeHeader = (length, handlerId) => {
  const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID_SIZE;
  const buffer = Buffer.alloc(headerSize); // 6 bytes
  buffer.writeInt32BE(length + headerSize, 0); // data's length + header's size
  buffer.writeInt16BE(handlerId, TOTAL_LENGTH_SIZE);
  return buffer;
};
