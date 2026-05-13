// assets/js/cloudinary.js

export async function uploadToCloudinary(folder, file) {

  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    "admin_upload"
  );

  if (folder) {
    formData.append("folder", folder);
  }

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dntmeiqhg/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
      "Upload gagal"
    );
  }

  return {
    downloadURL: data.secure_url,
    publicId: data.public_id,
  };
}
