//  Template method
abstract class AFile {
  handleFile(file) {
    this.handleName();
    this.parse(file);
    this.rename(file.fileName);
    this.out();
  }  

  parse(file) {
      return file[0]; // возвращает первую строку файла
  }

  rename(fileName) {
      return fileName + 'hello';
  }

  abstract handleName();
  abstract out();
}

class FileDocx extends AFile {
  fileDocx: any;
  constructor(fileDocx) {
    super(); // вызов конструктора базового класса
    this.fileDocx = fileDocx;
  }  

  handleName() {
    this.fileDocx.append('eof');
  }

  out() {
    this.fileDocx = this.fileDocx.fileName;
  }

  handleFile(file) {
    super.handleFile(file);
  }
}

class FileXls extends AFile {
  fileXml: any;
  constructor(fileXml) {
    super(); // вызов конструктора базового класса
    this.fileXml = fileXml;
  }

  handleName() {
    this.fileXml.append('aot');
  }

  out() {
    this.fileXml = this.fileXml.fileName + 'xls';
  }

  handleFile(file) {
    super.handleFile(file);
  }
}