## QuickDraw Application!

Used the QuickDraw Dataset found on the official website.
https://quickdraw.withgoogle.com/data

Tried Basic CNN, Pretrained Resnet and VGG Model.
Got Accuracy of 92,94%

Used https://deepai.org/api to generate the image using the result of the image predicted.

Added the implementation of : 
Generative Adversarial Text to Image Synthesis : https://arxiv.org/abs/1605.05396 in the code-repo for creating own text-to-image model  [here](https://github.com/charchit7/QuickDraw-App/tree/main/text2Img)

To-Do :
Implement StackGAN: Text to Photo-realistic Image Synthesis with Stacked Generative Adversarial Networks, https://arxiv.org/abs/1612.03242 for text to image generation.

## Flow : 

 - Draw on the Canvas Provided.
 -   Click on Submit.
  -  On Submit api call to model --> predicted text --> text goes to deepai api --> result shown as predicted image. 

## Demo : 
https://user-images.githubusercontent.com/21178353/130356768-d2d19ba2-fb6d-4055-b348-d476f3a71efe.mp4

![quickdrawResnet](https://user-images.githubusercontent.com/21178353/131849976-fa229048-6957-4547-b4e0-845452350bc0.png)
