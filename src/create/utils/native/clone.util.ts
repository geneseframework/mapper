/**
 * clone object with deep copy
 */


export function clone(model: any): any {
    if (model) {
        if (Array.isArray(model)) {
            const newArray = [];
            model.forEach(item => newArray.push(this.clone(item)));
            return newArray;
        } else if (typeof model === 'object') {
            const newObject = {};
            Object.keys(model).forEach(key => newObject[key] = this.clone(model[key]));
            return newObject;
        } else {
            return model;
        }
    } else {
        return model;
    }
}
