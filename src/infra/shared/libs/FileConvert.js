import { csvStringToJson } from "convert-csv-to-json";

export default class FileConvert {
  fromCSVToJson(csvString) {
    const jsonData = csvStringToJson(csvString);

    return jsonData;
  }

  fromCSVtoJson() {}
}
