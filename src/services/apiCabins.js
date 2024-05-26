import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins cannot be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin cannot be deleted");
  }
}

// if there is id then we know we are in the Edit session
export async function createEditCabin(cabin, id) {
  // checking if the image is already there (no new image for edit)
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

  // creating unique name of the image and replacing the / characters because supabase might create folders based on that /
  // if the image name that user uploads contains / then the supabse will create new folder, we dont want that.
  const imageName = `${Math.random() * 10000}-${cabin.image?.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  console.log("image Path: ", imagePath);
  console.log("Cabin image:", cabin.image);
  // 1. Create cabin
  let query = supabase.from("cabins");

  console.log("This is creating: ", { ...cabin, image: imagePath });
  // A) Create cabin:
  if (!id) {
    query = query.insert([{ ...cabin, image: imagePath }]);
  }

  // B) Edit cabin:
  if (id) {
    query = query.update({ ...cabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("Cabin cannot be created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  // 3. Delete the cabin if there was an error uploading corresponding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin image cannot be uploaded and the cabin is not created"
    );
  }
  return data;
}
