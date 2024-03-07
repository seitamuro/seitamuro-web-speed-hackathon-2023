#!/bin/bash
containers=$(docker ps -a -q)
if [ -n "$containers" ]; then
  docker stop $containers
fi