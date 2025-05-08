import express from "express";
import { setupSwaggerAggregator } from "./swaggerAggregator";

const app = express();
const port = process.env.PORT;

setupSwaggerAggregator(app);

app.listen(port, () => console.log(`API Gateway running on port ${port}`));
