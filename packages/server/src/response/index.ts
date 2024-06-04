export function successRes(body: object): {
  status: 200;
  message: string;
  body: object;
} {
  return {
    status: 200,
    message: 'success',
    body,
  };
}

export function errorRes(body: object): {
  status: 500;
  message: string;
  body: object;
} {
  return {
    status: 500,
    message: 'error',
    body: body,
  };
}

export function notFoundRes(body: object): {
  status: 404;
  message: string;
  body: object;
} {
  return {
    status: 404,
    message: 'not found',
    body: body,
  };
}
