import Express, {json} from 'express';
import cors from 'cors';

const app = Express();

// to avoid problems with CORS
app.use(cors());

// handling the json deserialisation
app.use(json());

// listen to post request on the "/validation" url
app.post('/validation', (req, res) => {
  // log the request!
  console.log(req.body);
  // always send this response - just mocking what the actual
  // validator would do
  res.status(200).send({
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
