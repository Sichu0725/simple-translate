import requests
from PIL import Image
from pytesseract import image_to_string

class NaverTranslationApi:
	def __init__	(self, client_id, client_secret) :
		self.client_id = client_id
		self.client_secret = client_secret
		self.headers = {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'X-Naver-Client-Id': self.client_id,
			'X-Naver-Client-Secret': self.client_secret,
		}
  
	def translate(self, text,source_lang, target_lang):

		data = f'source={source_lang}&target={target_lang}&text={text}'.encode()
		response = requests.post('https://openapi.naver.com/v1/papago/n2mt', headers=self.headers, data=data)

		return response.json()


	def detect_language(self, query):
		data = f'query={query}'.encode()

		response = requests.post('https://openapi.naver.com/v1/papago/detectLangs', headers=self.headers, data=data)
		return response.json()