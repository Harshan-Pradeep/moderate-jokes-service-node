# moderate-jokes-service-node
A microservice designed for moderators to manage jokes. It includes authentication, allowing moderators to edit, approve, or reject submitted jokes.


## Badges

![Build Status](https://github.com/Harshan-Pradeep/moderate-jokes-service-node/actions/workflows/node.js.yml/badge.svg?branch=main)


## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contact Information](#contact-information)

## Prerequisites

- **Node.js**: 22.x
- **npm**

## Installation

```bash
# Clone the repository
git clone https://github.com/Harshan-Pradeep/moderate-jokes-service-node.git

# Navigate into the directory
cd moderate-jokes-service-node

# Install dependencies
npm install
```

## Usage

```
# Start the development server
npm run start:dev
```
Access the application at `http://localhost:3000` | [http://ec2-13-233-163-9.ap-south-1.compute.amazonaws.com](http://ec2-13-233-163-9.ap-south-1.compute.amazonaws.com/)

## Deployment

### AWS EC2 Setup

- **Instance Type**: t3.micro
- **Operating System**: Ubuntu 24.04 LTS
- **AWS Services Used**: EC2


### Deployment Steps

1. **Launch an EC2 Instance**:
   - Go to the AWS Management Console and launch a new EC2 instance with the specified instance type and operating system.
2. **Configure Security Groups**:
   - 80 for HTTP
3. **Install Required Software**:
   - Install Node.js 22.x, Nginx, pm2 and npm
4. **Clone the Repository**:
   ```bash
   git clone https://github.com/Harshan-Pradeep/moderate-jokes-service-node.git
   ```
5. **Install Dependencies**:
   ```bash
   cd moderate-jokes-service-node
   npm install
   ```
6. **Set Up Environment Variables**:
   - Create a `.env` file with the required environment variables (see [Environment Variables](#environment-variables)).
7. **Start the Application**:
   ```bash
   node index.js
   ```
9. **Configure a Process Manager **:
   - Use PM2 to keep the application running in the background.

## CI/CD Pipeline

The project utilizes GitHub Actions for continuous integration and deployment.

- **Workflow File**: `node.js.yml`
- **Triggers**: On push to the `main` branch
- **Pipeline Steps**:
  - **Checkout Code**: Retrieves the latest code from the repository.
  - **Install Dependencies**: Runs `npm install`.
  - **Build Application**: Prepares the application for deployment.
  - **Deploy to AWS EC2**: Uses SSH or AWS services to deploy the updated code.

## Testing

Currently, there are no tests included. Future updates will provide unit and integration tests using a testing framework like Jest.

## Environment Variables

Create a `.env` file in the root directory and include the following variables:

```env
DELIVERY_SERVICE_URL=http://ec2-13-60-197-178.eu-north-1.compute.amazonaws.com
SUBMIT_SERVICE_URL=http://ec2-65-0-99-51.ap-south-1.compute.amazonaws.com
JWT_SECRET=your secreate
```

An example `.env.example` file is provided for reference.

## API Documentation

The API is documented using Swagger

Access the API documentation at:

[http://ec2-13-233-163-9.ap-south-1.compute.amazonaws.com/api-docs](http://ec2-13-233-163-9.ap-south-1.compute.amazonaws.com/api-docs)

## Contact Information

- **Name**: Harshan Pradeep
- **LinkedIn**: [https://www.linkedin.com/in/harshan-pradeep](https://www.linkedin.com/in/harshan-pradeep-40712a29b/)
