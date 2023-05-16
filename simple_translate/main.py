from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .translate import NaverTranslationApi

import os

load_dotenv(verbose=True)
app = FastAPI()

origins = [
  "http://localhost:8000",
  "http://localhost"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)
api = NaverTranslationApi(os.getenv("CLIENT_ID"), os.getenv("CLIENT_SECRET") )
print(api.client_id, api.client_secret)

@app.get("/translate/")
def translate(text: str = "", source_lang: str | None = None, target_lang: str = "en"):
  if source_lang:
    #translate
    return api.translate(text, source_lang, target_lang)
  #target lang detect
  source_lang = api.detect_language(text)["langCode"]
  #translate
  return api.translate(text, source_lang, target_lang)
