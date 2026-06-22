from app.providers.openrouter import OpenRouterClient

print("=" * 40)
print("AI Studio")
print("=" * 40)

client = OpenRouterClient()

print("Подключаемся к OpenRouter...")

models = client.find_model("bytedance-seed")

print(f"\nНайдено моделей: {len(models)}\n")

for model in models:
    print(model["id"])