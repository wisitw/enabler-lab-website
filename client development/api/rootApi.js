export const rootEndPoint= 'https://enablerlab.com/api/v1/';

export function objectToBody(object) {
  var formBody = [];
  for (let property in object) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(object[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&");
}