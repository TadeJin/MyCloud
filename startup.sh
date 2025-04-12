#!/bin/bash

sleep 20
REPORT_FILE="/home/tadeas/report.txt"

sudo umount /dev/sda1 || { echo "Not connected" > $REPORT_FILE; exit 1; }

sleep 3
sudo mount -o uid=33,gid=33,umask=111,dmask=000,fmask=111 /dev/sda1 /mnt/HDD || { echo "Failed to mount" >> $REPORT_FILE; exit 1; }
sleep 3
echo "OK" > $REPORT_FILE
sleep 1
source /home/tadeas/adafruit-env/bin/activate
sleep 1
python /home/tadeas/oledScript.py
