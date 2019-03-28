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
        document.getElementById("formError").innerHTML = '';
        const hostRegex = /(?:<url>).+(?:<\/url>)/;
        const fileUrl = response.match(hostRegex)[0].replace('<url>','').replace('</url>','');
        document.getElementById("file").setAttribute("href", `${fileUrl}`);
        document.getElementById("file").click();
      }
    })
    .catch(function(error) {});
}
