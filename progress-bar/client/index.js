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
