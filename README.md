# Node.js Streams

This project demonstrates the use of Node.js streams to handle file uploads and processing in an efficient and memory-optimized way. By processing files in chunks rather than loading them entirely into memory, streams provide a significant performance boost, especially for large files. Here, we build an API that accepts file uploads and processes them using streams, showcasing how to read, write, and transform data in real-time.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/Yesarib/node-streams.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the Server:
   ```
   npm start
   ```

The server will run on ```http://localhost:5000.```

### Example Endpoints
- /upload: Uploads a file to the server and saves it to the uploads folder using streams for efficient handling.

- /upload/chunk: Processes each chunk of the file using a transform stream, modifying data before saving it. In this example, data is converted to uppercase.

### Benefits of Streams
- Memory Efficiency: Streams handle data in chunks, reducing memory usage.
- Performance Optimization: Operations start as soon as data begins flowing, without waiting for the complete file.
- Real-Time Data Processing: Transformations and modifications can occur on-the-fly.

This project is a foundation for more complex applications involving real-time data handling, such as video/audio streaming, large file transfers, or real-time transformations.

