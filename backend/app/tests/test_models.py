from pprint import pprint

from app.providers.openrouter import OpenRouterClient

client = OpenRouterClient()

models = client.find_model("bytedance")

print(f"\nНайдено моделей: {len(models)}\n")

for model in models:
    pprint(model)
    print("=" * 120)