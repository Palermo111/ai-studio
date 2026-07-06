import os
from dotenv import load_dotenv

load_dotenv()

DEFAULT_DURATION = 4
DEFAULT_RESOLUTION = "480p"
DEFAULT_ASPECT_RATIO = "9:16"
DEFAULT_OUTPUT_DIR = "storage/videos"

POLL_INTERVAL = 5

DEFAULT_MODEL = "bytedance/seedance-2.0"

# Базовый адрес backend
BASE_URL = os.getenv(
    "BASE_URL",
    "http://localhost:8000",
)

# Секретный ключ для доступа к API
API_SECRET = os.getenv(
    "API_SECRET",
    "",
)