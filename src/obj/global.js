import { default as Server, }from 'advising.js';

const server = new Server({
  threshold: 0.1,
  bond: 5,
  logLevel: 3,
  logInterval: 5,
  logPath: '/var/log/advising/'
});

const global = {
  server,
  paths: {},
  words: {},
  pathCount: {},
  wordCount: {},
};

export default global;
