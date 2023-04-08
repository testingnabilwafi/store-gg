import { validationResult as valResult } from 'express-validator/src/validation-result'

const validationResult = valResult.withDefaults({
  formatter: (error) => {
    return error.msg
  }
})

export default validationResult
