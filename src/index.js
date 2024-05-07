import path from 'path';
import fs from 'fs';
import http from 'http';
import { parseOption, } from 'manner.js/server';
import '~/lib/router/documents';
import global from '~/obj/global';

const [_, ...rest] = process.argv;
const options = parseOption(...rest);

const {
  server,
} = global;

http.createServer({
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
