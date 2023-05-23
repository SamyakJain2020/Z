import webapp2
import urllib
import json
from google.appengine.ext.webapp import template

class MainWebPage(webapp2.RequestHandler):
    def get(self):
        path = './template/index.html'
        temp = {}
        self.response.write(template.render(path,temp))
    
    def post(self):
        lat = self.request.get('lat')
        longi = self.request.get('longi')
        url = 'https://api.open-meteo.com/v1/forecast?latitude={}&longitude={}&current_weather=true'.format(lat,longi)
        data = urllib.urlopen(url).read()
        data = json.loads(data)

        if "error" in data:
            template_values={"data": data['reason']}
            path = './template/error.html'

        else:
            temperature=data["current_weather"]["temperature"]
            windspeed=data["current_weather"]["windspeed"]
            template_values={"temperature":temperature,"windspeed":windspeed}
            path = './template/result.html'

        self.response.write(template.render(path,template_values))

app = webapp2.WSGIApplication([('/',MainWebPage)])