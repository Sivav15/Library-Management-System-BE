const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

module.exports = async (req, res) => {
  try {
    const { key } = req.params;

    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    // Specify the parameters for the HeadObjectCommand
    const getParams = {
      Bucket: process.env.S3_BUCKET,
      Key: key,
    };

    try {
      const { Body, ContentType } = await s3Client.send(
        new GetObjectCommand(getParams)
      );
      const chunks = [];
      for await (const chunk of Body) {
        chunks.push(chunk);
      }
      res.writeHead(200, { "Content-Type": ContentType });
      res.end(Buffer.concat(chunks).toString("base64"), "base64");
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        statusCode: 400,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
    console.log(error);
  }
};
