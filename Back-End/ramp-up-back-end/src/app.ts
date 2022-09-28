import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from "express";
import createHttpError from "http-errors";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Ramp Up");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

const errorHandeler: ErrorRequestHandler = (err, req, res) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

app.use(errorHandeler);

app.listen(3000, () =>
  console.log("The application is listening on port 3000!")
);
