const file = document.getElementById("file");
const progressbar = document.getElementById("progressbar");

file.addEventListener("change", (e) => {
  const userFile = file.files[0];
  const formData = new FormData();
  formData.append("file", userFile);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/upload");

  xhr.upload.addEventListener("progress", (e) => {
    if (e.lengthComputable) {
      const percent = (e.loaded / e.total) * 100;
      progressbar.value = percent;
    }
  });

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log("Upload complete:", xhr.responseText);
    } else {
      console.error("Upload failed");
    }
  };

  xhr.send(formData);
});

const handleFileFetch = () => {
  fetch("http://localhost:8080/download")
    .then((response) => {
      const contentLength = response.headers.get("content-length");
      if (!contentLength) throw new Error("content length not provided");

      const totalLength = parseInt(contentLength, 10);
      let loaded = 0;
      const reader = response.body.getReader();
      let chunks = [];

      function read() {
        return reader.read().then(({ done, value }) => {
          if (done) {
            return new Blob(chunks);
          }
          chunks.push(value);
          loaded += value.length;
          const percent = (loaded / totalLength) * 100;
          progressbar.value = percent;

          return read();
        });
      }
      return read();
    })
    .then((blob) => {
      // Download complete → use the file (e.g., show link)
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded_file.pdf";
      a.click();
    })
    .catch((err) => console.error(err));
};
