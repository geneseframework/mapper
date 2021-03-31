import { Expression, ObjectLiteralExpression, PropertyAssignment } from 'ts-morph';

/**
 * Returns the initializer expression of a property
 * @param name          // The name of the property
 * @param expression    // The ObjectLiteralExpression with the properties
 */
export function getInitializer(name: string, expression: ObjectLiteralExpression): Expression {
    return getProperty(name, expression)?.getInitializer();
}

/**
 * Returns the property assignment of a property
 * @param name          // The name of the property
 * @param expression    // The ObjectLiteralExpression with the properties
 */
function getProperty(name: string, expression: ObjectLiteralExpression): PropertyAssignment {
    return expression?.getProperty(name) as PropertyAssignment;
}
