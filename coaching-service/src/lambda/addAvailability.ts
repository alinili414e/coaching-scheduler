import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoDbClient = new DynamoDBClient({ region: "us-east-2" });

export async function handler(event) {
  const tableName = "coachInfoTable";
  const { coachId, availability, name } = JSON.parse(event.body);

  try {
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: {
        coachId: { S: coachId },
      },
      UpdateExpression:
        "SET #name = :name, availability = list_append(if_not_exists(availability, :empty_list), :availability)",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":name": { S: name },
        ":availability": {
          L: availability.map((avail) => ({
            M: {
              date: { S: avail.date },
              timeSlots: { L: avail.timeSlots.map((slot) => ({ S: slot })) },
            },
          })),
        },
        ":empty_list": { L: [] },
      },
      ReturnValues: "ALL_NEW",
    });

    const response = await dynamoDbClient.send(updateCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Availability updated successfully",
        updatedAttributes: response.Attributes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to update availability",
        error: error.message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
}
