# ScalableChat: A Next-Gen Distributed Chat Application


## **Overview:**

ScalableChat is a sophisticated web application designed for real-time and scalable chat experiences. Leveraging a modern tech stack, it seamlessly combines backend and frontend technologies to provide a robust chat solution.

![image](https://github.com/codeterrayt/Scalable-Chat-App/assets/76623307/2a45ed73-d3c3-49fb-bb79-076053aca2ff)

#### Tech Stack:
- **Backend:** Express.js, Socket.IO, Redis, Kafka, ZooKeeper, MongoDB
- **Frontend:** Svelte

#### Backend Technologies:

- **Express.js API:** Empowering the backend, Express.js facilitates robust API handling, making it suitable for deployment across distributed systems.
- **Socket.IO:** Enables real-time, bidirectional communication, creating dynamic and responsive chat interactions on the backend.
- **Redis:** Acts as a message broker and caching solution, ensuring scalability and efficiency in handling chat messages.
- **Kafka and ZooKeeper:** Utilized for distributed event streaming and system coordination, enhancing reliability in handling messages.
- **MongoDB:** Serves as the backend database, providing reliable and persistent storage for chat messages.

#### Frontend Technologies:

- **Svelte Framework:** Crafting the frontend with Svelte ensures a responsive and dynamic user interface, optimizing the user experience.


# Features:

- **Real-time Communication:** Enjoy a seamless and instantaneous chat experience facilitated by Socket.IO, enabling bidirectional communication between clients and the server.

- **Scalability:** Achieve high scalability with a powerful combination of technologies. Redis serves as a fast and efficient message broker, Kafka facilitates distributed event streaming, and ZooKeeper effectively manages distributed systems.

- **Persistence:** MongoDB takes the role of the backend database, providing a reliable and persistent storage solution for chat messages.

- **Efficiency:** Redis plays a dual role, not only acting as a message broker but also efficiently caching frequently accessed data. This enhances overall system performance.

- **Modern Frontend:** The frontend is crafted using Svelte, a lightweight and reactive JavaScript framework, ensuring a smooth and responsive user interface.

- ## Real-time and Scalable Experience

	ScalableChat transcends traditional chat applications; it offers an immersive experience. The real-time nature ensures instant communication, while the scalable architecture effortlessly adapts to accommodate growing user bases.

- ## Distributed System Architecture

	Designed as a distributed system, ScalableChat thrives on server independence, allowing it to seamlessly run on any server. This decentralization fosters a resilient and efficient communication model.

- ## Redis for Optimal Caching

	Leveraging Redis for caching, ScalableChat ensures optimal performance. By storing frequently accessed data, it significantly reduces the load on the backend, enhancing overall system efficiency.

- ## Pub/Sub with Redis

	Through Redis Pub/Sub, ScalableChat establishes a distributed pub/sub model, enabling real-time communication across all components of the system. Messages are broadcasted instantly, ensuring a synchronized experience for all users.

- ## Kafka for Efficient Message Storage

	To address the challenge of storing bulk messages without burdening the backend, ScalableChat utilizes Kafka. This efficient solution manages the storage of bulk messages in MongoDB, significantly reducing backend queries and enhancing overall system performance.

# Installation:

## Prerequisites
Before running ScalableChat, ensure that the following dependencies are installed on your system. If not, follow the instructions below for installation.

## 1. Redis

[Redis](https://redis.io/) is used as a message broker and caching solution. Install Redis on your machine or use Docker for a quick setup.

####  Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install redis-server
```

#### Docker:
```bash
docker pull redis
```

## 2. Apache Kafka:


#### Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install default-jre

# Download Kafka from https://kafka.apache.org/downloads
# Extract and run ZooKeeper and Kafka

```

#### Docker: 
```bash
docker pull confluentinc/cp-kafka
```

## 3. Zookeeper:
### Ubuntu/Debian:
```bash
READ STEP 2
```

#### Docker: 
```bash
docker pull zookeeper
```

## 4. MongoDB:
#### Ubuntu/Debian:
```bash 
sudo apt-get update
sudo apt-get install mongodb
```
#### Docker:
```bash 
docker pull mongo
```
## 5. Installation: 

1. Clone the repository:
```git clone https://github.com/codeterrayt/Scalable-Chat-App.git```

2. Install dependencies:
   ```bash
   cd scalable-chat-app && npm install
   cd public && npm install
   ```
3. Run all Installed Prerequisites (Docker):
 ```bash
   docker run -p 27017:27017 mongo
   docker run -p 2181:2181 zookeeper
   docker run -p 6379:6379 redis/redis-stack-server:latest
   docker run -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=<IPv4-Address>:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<IPv4-Address>:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
   ```
4. Before Running the Project: Set Configuration
   - Before launching the ScalableChat project, it's essential to configure the project settings in .env based on your specific setup.
 ```bash
# API ENV'S
WEB_API_PORT=8000
WEB_API_ALLOWED_ORIGIN=["http://localhost:5173", "http://127.0.0.1:5173"]

# DATABASE ENV'S
MONGO_CONNECT_STRING="mongodb://127.0.0.1:27017/scalable-chat-app-db"

# SOCKET ENV'S
SOCKET_ALLOWED_ORIGIN=["http://localhost:5173", "http://127.0.0.1:5173"]


#REDIS ENV'S
REDIS_CHANNEL="redis-message-channel"

#KAFKA ENV'S
KAFKA_GROUP_ID="scalable-chat-app"
KAFKA_BROKERS="<IPv4-Address>:9092"
PROCESS_KAFKA_MESSAGE_LIMIT=100
KAFKA_TOPIC="chat-updates"
KAFKA_NO_OF_PARTITIONS=1
  ```

5. Run Project :
```bash
node ./app/kafka/KafkaAdmin.js
node KafkaConsumerRunner.js 
node index.js
node ./app/Jobs/cron.js
cd ./public && npm run dev
```
 

	
To create a production version of your frontend (first goto public folder):
```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your frontend, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

