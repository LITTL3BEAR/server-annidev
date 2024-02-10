import re
import sys
import requests 
from bs4 import BeautifulSoup
from pymongo import MongoClient

def scrape_web(url):
  response = requests.get(url)
  soup = BeautifulSoup(response.text, 'html.parser')
  element = soup.find_all('div', class_='eph-num')
  chapter = re.findall(r'\d+', element[1].span.text)[0]
  return chapter

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
