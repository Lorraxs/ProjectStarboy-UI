export class cRequest {
  private suffix: string = "";
  private resourceName: string = "ProjectStarboy";
  public post(path: string, data?: any, cb?: any) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (cb && xhr.response) {
          if (typeof xhr.response === "string") {
            cb(JSON.parse(xhr.response));
          } else cb(xhr.response);
        }
      }
    };
    xhr.open(
      "post",
      `https://${this.resourceName}/${path}${this.suffix}`,
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data || {}));
  }
}
