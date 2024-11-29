const httpClient = require('../utils/http.client');
const config = require('../config/config');
const { JokeStatus } = require('../enums/joke-status.enum');

class ModerateService {
    async getAllTypes() {
        try {
            return await httpClient.get(`${config.deliveryServiceUrl}/api/v1/delivery/types`);
        } catch (error) {
            throw new Error(`Failed to fetch types: ${error.message}`);
        }
    }

    async createJokeType(createTypeDto) {
        try {
            return await httpClient.post(
                `${config.deliveryServiceUrl}/api/v1/delivery/types`,
                createTypeDto
            );
        } catch (error) {
            throw new Error(`Failed to create joke type: ${error.message}`);
        }
    }

    async deleteJoke(jokeId) {
        try {
            return await httpClient.delete(
                `${config.submitServiceUrl}/api/v1/jokes/delete/${jokeId}`
            );
        } catch (error) {
            throw new Error(`Failed to delete joke: ${error.message}`);
        }
    }

    async getAllJokes(page = 1, limit = 10) {
        try {
            return await httpClient.get(
                `${config.submitServiceUrl}/api/v1/jokes/pending?page=${page}&limit=${limit}`
            );
        } catch (error) {
            throw new Error(`Failed to fetch jokes: ${error.message}`);
        }
    }

    async updateJoke(jokeId, updateJokeDto) {
        try {
            // First update the joke
            const updatedJoke = await httpClient.put(
                `${config.submitServiceUrl}/api/v1/jokes/update?id=${jokeId}`,
                updateJokeDto
            );

            // If status is approved, create joke in delivery service
            if (updateJokeDto.status === JokeStatus.APPROVED) {
                try {
                    console.log("node-update function")
                    const deliveryJoke = await httpClient.post(
                        `${config.deliveryServiceUrl}/api/v1/delivery/submit`,
                        {
                            content: updatedJoke.content,
                            type: updatedJoke.type,
                            status: updatedJoke.status
                        }
                    );

                    // Return both the updated joke and delivery service response
                    return {
                        updatedJoke,
                        deliveryJoke,
                        message: 'Joke approved and created in delivery service'
                    };
                } catch (deliveryError) {
                    // If delivery service creation fails, we might want to revert the status
                    await httpClient.put(
                        `${config.submitServiceUrl}/api/v1/jokes/update?id=${jokeId}`,
                        { ...updateJokeDto, status: 'pending' }
                    );

                    throw new Error(`Failed to create joke in delivery service: ${deliveryError.message}`);
                }
            }

            return updatedJoke;
        } catch (error) {
            throw new Error(`Failed to update joke: ${error.message}`);
        }
    }
}

module.exports = new ModerateService();