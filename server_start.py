import os
import subprocess

def start_fastapi():
  subprocess.Popen("uvicorn simple_translate.main:app".split(" "))

def start_react():
  os.chdir("simple_translate_front")
  os.system("npx serve -s build -l 80")

if __name__ == "__main__":
  start_fastapi()
  start_react()

