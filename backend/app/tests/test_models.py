import json
import requests

API_KEY = "sk-P4he8e1aHv2e1hdS522a4fD6D62b491f9d2e8022E2C2D957"

BASE_URL = "https://api.laozhang.ai"

url = f"{BASE_URL}/api/v3/contents/generations/tasks"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

payload = {
    "model": "doubao-seedance-2-0-260128",
    "content": [
        {
            "type": "text",
            "text": "A cute orange cat slowly blinks. Cinematic lighting."
        }
    ],
    "ratio": "9:16",
    "resolution": "480p",
    "duration": 4,
    "generate_audio": False,
    "return_last_frame": True,
}

print("=" * 80)
print("REQUEST")
print("=" * 80)
print(json.dumps(payload, indent=2, ensure_ascii=False))

response = requests.post(
    url,
    headers=headers,
    json=payload,
)

print()
print("=" * 80)
print("STATUS:", response.status_code)
print("=" * 80)

try:
    data = response.json()
    print(json.dumps(data, indent=2, ensure_ascii=False))
except Exception:
    print(response.text)
    raise

if response.status_code == 200:
    print()
    print("=" * 80)
    print("TASK CREATED")
    print("=" * 80)

    task_id = (
        data.get("id")
        or data.get("task_id")
        or data.get("data", {}).get("id")
    )

    print("TASK ID:", task_id)