//cant be arrow function
export function assertsIsDefined <T>( val : T): asserts val is NonNullable<T>{
    if (!val) {
        throw Error("val is not defined");
    }
}