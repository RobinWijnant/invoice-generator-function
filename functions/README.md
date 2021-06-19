# Send invoices firebase function

## Deploying

Setup environment variables for the firebase function

```
firebase functions:config:set \
  cloudStorage.bucket="gs://your-bucket.com" \
  cloudStorage.templateXlsx="template.xlsx"
yarn deploy
```

## Local testing

Start firebase emulators

```
npm run serve
```

Setup the python library to test the scheduled cloud function via pubsub

```
git clone git@github.com:googleapis/python-pubsub.git
cd python-pubsub/samples/snippets
pip install -r requirements.txt
export PUBSUB_EMULATOR_HOST=localhost:8085
export PUBSUB_PROJECT_ID=robinwijnant
```

Send pubsub messages

```
python3 publisher.py robinwijnant publish firebase-schedule-sendInvoices
```

Check the logs: http://localhost:4000/logs
