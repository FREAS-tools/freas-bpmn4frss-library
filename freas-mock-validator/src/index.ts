import Express from 'express';

const app = Express();

app.post('/validation', (_req, res) => {
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
      message: 'This is not ideal my dude',
    }],
    evidence_sources: null,
  });
});

app.listen(4000, () => {
  console.log('App started');
})
