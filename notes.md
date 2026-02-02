Measure latency
Measure token usage

## Requests
Create the quiz
```bash
curl -v localhost:3000/quiz -X POST
```

Get the quiz
```bash
curl -v localhost:3000/quiz/76b850a2-865c-43ec-95f2-d05991dc1f56
```

Update the quiz
```bash
curl -v localhost:3000/quiz/25248637-02e1-4c40-8026-cdc9eb50dae6 \
  -H 'content-type: application/json' \
  -X PUT \
  -d '{
  "questions":[
    {"type":"text","text":"What is your current age?", "answer": "I am 36"},
    {"type":"text","text":"How do you identify your gender?", "answer": "Male"},
    {"type":"text","text":"What is your current relationship status?", "answer": "I am married with two kids"}
  ]
}'
```


readonly@newrelicuniversity.com
curly-parakeet
