interface IContext {
  to: object
  next: <T>(data: T) => T
}

interface IPayload {
  context: IContext
  middlewares: Function[]
  index: number
}

function middlewarePipeline({
  context,
  middlewares,
  index
}: IPayload): ReturnType<IContext['next']> {
  const nextMiddleware = middlewares[index]

  if (!nextMiddleware) {
    return context.next
  }

  return () => {
    const nextPipeline = middlewarePipeline({ context, middlewares, index: (index + 1) as number })
    nextMiddleware({ ...context, nextMiddleware: nextPipeline })
  }
}

export default middlewarePipeline
