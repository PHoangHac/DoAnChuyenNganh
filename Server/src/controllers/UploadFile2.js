export let handleUpdLoadFile = async (req, res, next) => {
  // 'profile_pic' is the name of our file input field in the HTML form

  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.status(409).json("Please select an image to upload");
  }

  // Display uploaded image for user validation
  const image = req.file;
  let result = `${image.filename}`;

  res.send(result);
};

export let handleUpdLoadMultipleFile = async (req, res, next) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.status(409).json("Please select an image to upload");
  } // The same as when uploading single images

  let result = "";
  const files = req.files;
  // console.log(files);
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `src/assets/images/${files[index].filename} `;
  }
  // result += '<hr/><a href="./">Upload more images</a>';
  res.send(result);
};
