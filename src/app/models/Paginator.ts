export class Paginator {
  public page = 0;
  public size = 10;
  public number = 0;
  public search = "";
  public last;
  public first;
  public totalPages = 0;
  public map(data){
    this.size = data.response.size;
    this.last = data.response.last;
    this.first = data.response.first;
    this.number = data.response.number;
    this.totalPages = data.response.totalPages;

  }
}
