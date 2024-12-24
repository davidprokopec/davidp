import { error } from 'elysia'

type Cause = string | Array<unknown> | unknown

export function unauthorized(cause?: Cause) {
  return error(401, {
    errors: { body: [cause ? `${cause}` : 'Unauthorized'] },
  })
}

export function forbidden(cause?: Cause) {
  return error(403, {
    errors: { body: [cause ? `${cause}` : 'Forbidden'] },
  })
}

export function unprocessable(cause?: Cause) {
  return error(422, {
    errors: {
      body:
        (cause as Array<unknown>)?.length || 0 > 0
          ? cause
          : [cause ? `${cause}` : 'Validation failed, check parameters'],
    },
  })
}
