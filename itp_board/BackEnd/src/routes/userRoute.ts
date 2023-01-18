import express, { Express, Request, Response } from 'express'


const userRouter:express.Router = express.Router()

userRouter.get('/', (req: Request, res: Response) => {
  res.send('User Data retrieve')
})
userRouter.post('/', (req: Request, res: Response) => {
  const userData = req.body;
  res.send({'User Data create':userData});
})
userRouter.put('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  res.send({'User Data update for':id});
})
userRouter.delete('/:id', (req: Request, res: Response) => {
  const id = req.params.id
  res.send({'User Data delete':id})
})

export default userRouter
