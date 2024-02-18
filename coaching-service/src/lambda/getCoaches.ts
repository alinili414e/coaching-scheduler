import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const dynamoDbClient = new DynamoDBClient({ region: "us-east-2" });

export async function handler(event) {
  const tableName = "coachInfoTable";

  try {
    const scanCommand = new ScanCommand({
      TableName: tableName,
    });
    const response = await dynamoDbClient.send(scanCommand);

    // Check if Items is defined before proceeding
    if (!response.Items) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "No coaches found",
          data: [],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    const coaches = response.Items.map((item) => unmarshall(item));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully retrieved coaches",
        data: coaches,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error fetching data from DynamoDB", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to retrieve coaches",
        error: error.message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
}
