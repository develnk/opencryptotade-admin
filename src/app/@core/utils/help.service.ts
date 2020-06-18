export class HelpService {

  public static groupBy(arr: any[], fieldName) {
    const index: any[] = [];
    return arr.reduce((previousV: any, currentV: any) => {
      let curIndex = index.findIndex( f => f === currentV[fieldName]);
      if (curIndex === -1) {
        index.push(currentV[fieldName]);
        curIndex = index.length - 1;
      }
      previousV[curIndex] = previousV[curIndex] || [];
      previousV[curIndex].push(currentV);
      return previousV;
    }, []);
  }

}
