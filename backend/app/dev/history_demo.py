from app.database.history_service import HistoryService


history = HistoryService()

items = history.get_all()

print(f"\nВсего генераций: {len(items)}\n")

for item in items:
    print("-" * 50)
    print(f"ID: {item['id']}")
    print(f"Дата: {item['created_at']}")
    print(f"Модель: {item['model']}")
    print(f"Prompt: {item['prompt']}")
    print(f"Видео: {item['video_path']}")