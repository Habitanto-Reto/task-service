#!/bin/bash
kafka-topics.sh --create --topic user-created --partitions 1 --replication-factor 1 --config retention.ms=-1 --bootstrap-server localhost:9092