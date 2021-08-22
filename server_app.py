from utils import image_resize
from flask import Flask, request, render_template
import requests
from flask.sessions import SessionMixin
import numpy as np
from PIL import Image
import base64
import re
import io
from cnn_net import Net, data_classes
import cv2
import torch

from utils import image_resize

app = Flask(__name__)
model = Net()
model.load_state_dict(torch.load('/home/charchit/Desktop/QuickDraw/models/mark1_25.pt',map_location='cpu'))
model.eval()

@app.route("/")
def greet():
    return render_template('home.html')
import os

@app.route('/sketch',methods=['GET','POST'])
def sketch():
    if request.method == 'GET':
        return render_template('sketch.html')
    else:
        image_b64 = request.values['imageBase64']
        # print(image_b64)
        image_data = re.sub('^data:image/.+;base64,', '', image_b64)
        image_data = base64.b64decode(image_data)
        # print(type(image_data))
        # image_PIL = Image.open(io.BytesIO(image_data))
        # image_PIL = Image.open(image_data)
        # image_np = np.array(image_PIL)
        # image_PIL.save('/home/charchit/Desktop/QuickDraw/ss3.png')
        
        with Image.open(io.BytesIO(image_data)) as im:
                # im.save('/home/charchit/Desktop/QuickDraw/ss3.png')
                a = np.array(im)
                b = a[:,:,1:4]
                c = cv2.cvtColor(b,cv2.COLOR_BGR2GRAY)
                c = image_resize(c,28,28)
                d = cv2.resize(c,(28,28))
                e = np.array([[np.array(d)]]).astype(np.float32)
                f = torch.from_numpy(e)
                output = model(f)
                xx = (torch.argmax(output))
                pred = data_classes[xx]

        print('Image received: {}'.format(a.shape))
        r = requests.post("https://api.deepai.org/api/text2img",data={'text': pred,},headers={'api-key': '800c051a-ca4f-4492-8311-bf28b800f904'})
        url = r.json()['output_url']

        # return base64.encodebytes(image_data)
        dict_data = {
            'a' : pred,
            'b' : r.json()['output_url']
        }
        
        return dict_data


if __name__ == '__main__':
    app.run()