import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        #self.response.write("Hello guys welcome to my page")
        for i in range(5):
            self.response.write("Name: Sahil Kothari<br>")
            self.response.write("Seat Number: 33243<br>")
            self.response.write("Department: IT<br>")
            self.response.write('<br>')

app =webapp2.WSGIApplication([('/',MainPage)],debug=True)

#cloud terminal command : python google-cloud-sdk/bin/dev_appserver.py /home/pict/33255/app.yaml