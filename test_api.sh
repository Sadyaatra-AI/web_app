#!/bin/bash

BASE_URL="http://localhost:3000/api"

echo "*********SADHYAATRA API TEST SUITE*********"
echo ""

# Helper to print colored headers
print_header() {
    echo -e "\n\033[1;34m=== $1 ===\033[0m"
}

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "\033[1;31mError: 'jq' is not installed. Please install it (e.g. sudo apt install jq) to format the JSON output.\033[0m"
    exit 1
fi

print_header "1. Testing GET /explore/trending"
curl -s "$BASE_URL/explore/trending" | jq .

print_header "2. Testing GET /explore/destinations"
DESTINATIONS=$(curl -s "$BASE_URL/explore/destinations?page=1&limit=3")
echo "$DESTINATIONS" | jq .

# Extract the first destination ID to test dependent endpoints dynamically
DEST_ID=$(echo "$DESTINATIONS" | jq -r '.data[0].destination_id')

if [ "$DEST_ID" != "null" ] && [ -n "$DEST_ID" ]; then
    print_header "3. Testing GET /explore/destinations/{id}"
    curl -s "$BASE_URL/explore/destinations/$DEST_ID" | jq .

    print_header "4. Testing GET /explore/hidden-gems"
    curl -s "$BASE_URL/explore/hidden-gems?destination_id=$DEST_ID" | jq .

    print_header "5. Testing GET /explore/ar/{id}"
    curl -s "$BASE_URL/explore/ar/$DEST_ID" | jq .
else
    echo -e "\n\033[1;33mSkipping tests that require destination_id (No destinations returned from the database).\033[0m"
fi

print_header "6. Testing GET /explore/recommendations"
curl -s "$BASE_URL/explore/recommendations?interests=food,culture&budget=50000&travel_style=explorer" | jq .

print_header "7. Testing POST /chat"
CHAT_RES=$(curl -s -X POST "$BASE_URL/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "What is a good place to visit for 3 days in South India?"}')
echo "$CHAT_RES" | jq .

# Extract the conversation ID to test dependent endpoints
CONV_ID=$(echo "$CHAT_RES" | jq -r '.conversation_id')

if [ "$CONV_ID" != "null" ] && [ -n "$CONV_ID" ]; then
    print_header "8. Testing GET /chat/conversations/{id}"
    curl -s "$BASE_URL/chat/conversations/$CONV_ID" | jq .

    print_header "9. Testing POST /chat/plan-preview"
    curl -s -X POST "$BASE_URL/chat/plan-preview" \
      -H "Content-Type: application/json" \
      -d "{
        \"conversation_id\": \"$CONV_ID\",
        \"destination\": \"Kerala\",
        \"duration_days\": 3,
        \"budget\": 25000,
        \"interests\": [\"beaches\", \"food\"]
      }" | jq .
else
    echo -e "\n\033[1;33mSkipping chat endpoints that require conversation_id (Chat creation failed).\033[0m"
fi

echo -e "\033[1;32m**********SADHYAATRA API TEST SUITE COMPLETE**********\033[0m"
