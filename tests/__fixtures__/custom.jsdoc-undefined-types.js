// FIXTURE: This file demonstrates that the jsdoc/no-undefined-types rule is turned off (set to 0)
// The rule would normally flag types in JSDoc comments that are not defined

/**
 * Example function with undefined JSDoc types
 * This should be allowed now that jsdoc/no-undefined-types is set to 0
 *
 * @param {UndefinedType1} param1 - Parameter with undefined type
 * @param {string} param2 - Parameter with defined type
 * @param {CustomObject} param3 - Another parameter with undefined type
 * @returns {AnotherUndefinedType} Return value with undefined type
 */
function exampleWithUndefinedTypes(param1, param2, param3) {
  return { result: param1 + param2 + param3 };
}

/**
 * Example class with undefined JSDoc types
 * This should be allowed now that jsdoc/no-undefined-types is set to 0
 *
 * @class
 * @implements {UndefinedInterface}
 */
class ExampleClass {
  /**
   * Constructor with undefined type
   *
   * @param {NonExistentType} config - Configuration object
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * Method with undefined types
   *
   * @param {UnknownType} param - Parameter with undefined type
   * @returns {ResultType} Return value with undefined type
   */
  exampleMethod(param) {
    return { processed: param };
  }
}

/**
 * Function with complex undefined types
 *
 * @param {Array<UndefinedGenericType>} items - Array of undefined generic type
 * @param {Object<string, AnotherUndefinedType>} mapping - Object with undefined value type
 * @returns {Promise<YetAnotherUndefinedType>} Promise of undefined type
 */
function complexTypes(items, mapping) {
  return Promise.resolve(items.map(item => mapping[item]));
}

module.exports = {
  exampleWithUndefinedTypes,
  ExampleClass,
  complexTypes
};
