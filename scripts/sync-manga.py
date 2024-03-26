import re
import sys
import requests 
from bs4 import BeautifulSoup
from pymongo import MongoClient

def scrape_web(url):
  with requests.Session() as session:
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    response = session.get(url, headers=headers ,timeout=10)
    if response.status_code == 200:
      soup = BeautifulSoup(response.text, 'html.parser')
      elements = soup.find_all('div', class_='eph-num')
      if elements and len(elements) > 1:
        chapter = re.findall(r'\d+', elements[1].span.text)[0]
        return chapter
  return None


def update_db(manga):
  filter = { "_id": manga['_id'] }
  update = {"$set": {"status": manga['status']}}
  result = collection.update_one(filter, update)
  return result


client = MongoClient(sys.argv[1])
db = client['annidev_db']
collection = db['mangas']

for manga in collection.find():
  if not manga['link']: continue
  chapter = scrape_web(manga['link'])
  if not chapter: continue
  manga['status'] = "new" if int(chapter) > int(manga['chapter']) else "read"
  update_db(manga)
  # print(f"{manga['name']}|{chapter}|{manga['status']}")

print(f"Sync Done")
client.close()
