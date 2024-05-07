import path from 'path';
import fs from 'fs';
import https from 'https';
import { parseOption, } from 'manner.js/server';
import '~/lib/router/documents';
import global from '~/obj/global';

const [_, ...rest] = process.argv;
const options = parseOption(...rest);

const {
  server,
} = global;

https.createServer({
  key: fs.readFileSync('asset/glassSearch-key.pem'),
  cert: fs.readFileSync('asset/glassSearch-cert.pem'),
}, async (req, res) => {
  if (req.method === 'POST') {
    const router = server.match(req.url);
    if (router !== undefined) {
      await router(req, res);
    }
  } else {
    res.end(JSON.stringify({
      status: 0,
      error: 'Only support post method.'
    }));
  }
}).listen(options.p || options.port);
