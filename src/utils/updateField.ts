export function updateField<T>(entity: T, data: any, field: string) {
  if (data[field] !== undefined) {
    // @ts-ignore
    entity[field] = data[field];
  }
}
