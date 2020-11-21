# create tweet

curl -X POST \
  -H 'Content-Type: application/json' \
  http://localhost:3000/api/tweets \
  -d '{ "text": "140 caracteres" }'

# like

curl -X PUT \
  -H 'Content-Type: application/json' \
  http://localhost:3000/api/tweets/$id/likes


# top liked

curl http://localhost:3000/api/tweets/
