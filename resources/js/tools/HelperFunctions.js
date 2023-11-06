export function downloadCSVStream(stream, fileName) {
  const url = window.URL.createObjectURL(new Blob([stream]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
