export const response = ( err, result = '', code = 1) => {
  return {
    code,
    message: err instanceof Error ? err.message : err,
    result
  }
}