import time
import os
import psutil
import board
import busio
import datetime
import adafruit_ssd1306
import subprocess
from PIL import Image, ImageDraw, ImageFont


i2c = busio.I2C(board.SCL, board.SDA)
WIDTH, HEIGHT = 128, 64  # 128x64 display
oled = adafruit_ssd1306.SSD1306_I2C(WIDTH, HEIGHT, i2c)


def get_cpu_temp():
    try:
        temp_str = os.popen("cat /sys/class/thermal/thermal_zone0/temp").readline().strip()
        return round(int(temp_str) / 1000,2)  # Return temperature in °C
    except:
        return "N/A"

def get_cpu_load():
    load = psutil.cpu_percent(interval=1)  # 1 second interval to calculate load
    return load

def get_available_storage():
    statvfs = os.statvfs('/mnt/HDD')
    free_space = statvfs.f_frsize * statvfs.f_bavail / (1024 * 1024 * 1024)  # GB
    return round(free_space, 2)

def getIp():
    ip_address = subprocess.check_output("hostname -I", shell=True).decode("utf-8").strip()
    return ip_address

font = ImageFont.truetype("/usr/share/fonts/truetype/roboto/unhinted/RobotoCondensed-Regular.ttf",11)
fontBold = ImageFont.truetype("/usr/share/fonts/truetype/roboto/unhinted/RobotoCondensed-Bold.ttf",12)

cloudImage = Image.open("/home/tadeas/cloudImage.bmp")
cloudImage = cloudImage.resize((20,15))
cloudImage = cloudImage.convert('RGB')
cloudImage = cloudImage.convert("1")

while True:
    if (datetime.datetime.now().hour < 23 and datetime.datetime.now().hour > 5): 
        
        image = Image.new("1", (WIDTH, HEIGHT), 1)
        draw = ImageDraw.Draw(image)

        title = "MyCloud SERVER"
        title_height = 12
        draw.text((15, 0), title, font=fontBold, fill=0)

        cpu_temp = get_cpu_temp()
        cpu_load = get_cpu_load()
        available_storage = get_available_storage()
        ip = getIp()

        text_line_1 = f"CPU TEMP: {cpu_temp}°C"
        text_line_2 = f"CPU Load: {cpu_load}%"
        text_line_3 = f"Free Storage: {available_storage}GB"
        textLine4 = f"IP: {ip}"

        draw.text((0,title_height + 2), text_line_1, font=font, fill=0)
        draw.text((0,title_height + 14), text_line_2, font=font, fill=0)
        draw.text((0,title_height + 26), text_line_3, font=font, fill=0)
        draw.text((0,title_height + 38), textLine4, font=font, fill=0)
        
        image.paste(cloudImage,(105,2))

        oled.image(image)
        oled.show()
        
        time.sleep(2)
    else:
        image = Image.new("1", (WIDTH, HEIGHT), 0)
        draw = ImageDraw.Draw(image)
        oled.image(image)
        oled.show()
