#!/bin/bash

# 11
sudo_pid=$(ps aux | grep 'sudo node luna_interface_main.js' | awk '{if ($11 == "sudo"){print $2}}')
sudo kill -9 "$sudo_pid"

main_pid=$(ps aux | grep 'node luna_interface_main.js' | awk '{if ($11 == "node"){print $2}}')
sudo kill -9 "$main_pid"
