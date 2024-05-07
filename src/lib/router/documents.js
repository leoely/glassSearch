import global from '~/obj/global';

const {
  server,
} = global;

server.add('/api/document', async (req, res) => {
  const body = await new Promise((resolve, reject) => {
    req.on('data', (data) => {
      resolve(data.toString());
    });
  });
  const { document, path, } = JSON.parse(body);
  res.write();
  res.end();
});
