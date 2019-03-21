var feedbackSubmit = function() {
  const serviceIdx = document.URL.indexOf('file.disclaimer');
  const url = document.URL.substring(0,serviceIdx);
  const sForm = new URLSearchParams(new FormData(document.getElementById("feedbackf"))).toString();
  fetch(`${url}file.download?${sForm}`)
    .then(function(response) {
      return response.text();
    })
    .then(function(response) {
      try {
        const errorMsg = JSON.parse(response).error.message;
        document.getElementById("formError").innerHTML = `Error: ${errorMsg}`;
      } catch (e) {
        const hostRegex = /(?:<url>).+(?:<\/url>)/;
        const paramsRegex = /(?:<param>)(.+)(?:<\/param>)/g;
        const fileUrl = response.match(hostRegex)[0].replace('<url>','').replace('</url>','');
        const paramsUrl = response.match(paramsRegex).map(e => e.replace('<param>','').replace('</param>',''))
        document.getElementById("file").setAttribute("href", `${fileUrl}?${paramsUrl.join('&')}`);
        document.getElementById("file").click();
      }
    })
    .catch(function(error) {});
}
