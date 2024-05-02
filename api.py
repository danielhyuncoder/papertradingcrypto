from fastapi import FastAPI
from bs4 import BeautifulSoup
from fastapi.middleware.cors import CORSMiddleware
import requests

app=FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/data/{coin_name}')
def data(coin_name):
  req=requests.get('https://coinmarketcap.com/currencies/'+coin_name)
  parser=BeautifulSoup(req.text, "html.parser")
  price =parser.find("span", class_="sc-f70bb44c-0 jxpCgO base-text")
  data=parser.find_all("dd", class_="sc-f70bb44c-0 bCgkcs base-text")
  image=parser.find("div", class_="sc-f70bb44c-0 jImtlI").find("img").attrs['src']
  return {"price": price.text,"marketcap": data[0].text.split("%")[1], "volume24": data[1].text.split("%")[1], "circulatingsupply":data[3].text.split("%")[0], "maxsupply":data[5].text.split("%")[0], "fullydilutedcap":data[6].text.split("%")[0], "image": image}
@app.get('/coinprice/{coin_name}')
def coinprice(coin_name):
  req=requests.get('https://coinmarketcap.com/currencies/'+coin_name)
  parser=BeautifulSoup(req.text, "html.parser")
  price =parser.find("span", class_="sc-f70bb44c-0 jxpCgO base-text")
  return price
@app.get("/topcoins")
def topcoins():
  req = requests.get("https://coinmarketcap.com/")
  parser=BeautifulSoup(req.text, "html.parser")
  names = parser.find_all("p", class_="sc-4984dd93-0 kKpPOn")
  prices = parser.find_all("div", class_="sc-500f568e-0 ejtlWy")
  images=parser.find_all("img", class_="coin-logo")
  #print(len(prices))
  cleanedData=[]
  for i in range(len(names)):
    cleanedData.append([names[i].text, prices[i].find("a").find("span").text, images[i].attrs['src']])
  return cleanedData
