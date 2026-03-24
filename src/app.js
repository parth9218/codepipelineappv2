exports.handler = async (event) => {
    console.log(`Received request. Event: ${JSON.stringify(event)}`);

    const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Hello from the Demo Lambda API! Environment is dictated by the Git branch deployed.",
            timestamp: new Date().toISOString()
        }),
    };

    return response;
};
