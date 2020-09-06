import requests
import os
import json,math
def main(dict):
    apikey = os.getenv('WEATHER_API_KEY')
    print(dict['city'])
    # return dict['city']
    data= requests.post('http://api.openweathermap.org/data/2.5/weather?q='+dict['city']+'&appid='+apikey)
    response = data.content.decode('utf-8')
    # print(response)
    d = json.loads(response)
    print(d['main']['temp'])
    tempA= math.trunc(d['main']['temp']-273)
    tempF=math.trunc(d['main']['feels_like']-273)
    humidity= d['main']['humidity']
    text = 'Temperature in '+ dict['city'] +' is ' +str(tempA) +'\xB0C but feels like '+ str(tempF) +'\xB0C with '+str(humidity)+'% humidity!'
    return {'text':text,'cloud':'Hello from IBM Cloud!'}