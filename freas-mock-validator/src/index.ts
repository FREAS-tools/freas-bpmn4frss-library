import Express from 'express';
import cors from 'cors';

const app = Express();

app.use(cors());

// listen to post request on the "/validation" url
app.post('/validation', (_req, res) => {
  // always send this response - just mocking what the actual
  // validator would do
  res.send({
    errors: [
      {
        source: [
          'StartEvent_1h6bumc',
          'Activity_1xodtqr',
        ],
        message: 'Some ridiculously long and complicated error message',
        severity: 'HIGH'
      },
      {
        source: ['DataStoreReference_0t5xi7v'],
        message: 'There is another problem',
        severity: "LOW",
      }
    ],
    warnings: [{
      source: ["DataObjectReference_1y93c3a"],
      message: 'This is not ideal, but it is just a warning, right?',
    }],
    evidence_sources: null,
  });
});

app.use((_req, res) => {
  res.status(404).send({
    error: 'Wrong endpoint',
  });
});

app.listen(4000, () => {
  console.log('App started');
});
