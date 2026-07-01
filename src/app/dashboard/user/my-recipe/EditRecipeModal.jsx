"use client";

import React, { useState, useRef } from "react";
import { Button, Modal, toast } from "@heroui/react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { editRecipe } from "@/lib/action/recipe";
import { FiUploadCloud } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function EditRecipeModal({ recipe }) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [recipeImage, setRecipeImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const recipeId = recipe._id;

  const [formData, setFormData] = useState(recipe);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRecipeImage({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const uploadImageToImageBB = async (imageFile) => {
    const dataPayload = new FormData();
    dataPayload.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: dataPayload,
      }
    );

    const data = await response.json();
    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalImageUrl = formData.imageUrl;

      if (recipeImage?.file) {
        finalImageUrl = await uploadImageToImageBB(recipeImage.file);
      }
      const { _id, ...recipeData } = formData;

      const payload = {
        ...recipeData,
        imageUrl: finalImageUrl,
        status: "active",
        isPubliclyVisible: true,
      };

      const res = await editRecipe(recipeId, payload);

      if (res.modifiedCount){
        toast.success("Recipe Updated Successfully!");
        router.refresh();
        router.push("/dashboard/user/my-recipe");
      }

    } catch (error) {
      console.error(error);
      alert("Failed to update recipe");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal>
      <Button variant="light" isIconOnly className="text-default-500 hover:text-emerald-500 transition-colors duration-200">
        <FaEdit className="text-lg" />
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="max-w-xl md:max-w-2xl rounded-2xl border border-divider/60 shadow-2xl bg-content1 overflow-hidden">
            <Modal.CloseTrigger />
            <Modal.Header className="flex flex-col gap-1 pt-6 px-6 pb-4 border-b border-divider/40 bg-default-50/50">
              <Modal.Heading className="text-xl font-bold tracking-tight text-foreground">
                Update Your Recipe
              </Modal.Heading>
              <p className="text-xs text-default-400 font-medium">
                Modify your recipe s details, ingredients, and instructions below.
              </p>
            </Modal.Header>
            <Modal.Body className="p-0">
              <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-thin">

                {/* SECTION 1: Recipe Info */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 pb-1 border-b border-divider/30">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      1
                    </span>
                    <h2 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
                      Recipe Information
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block  text-xs font-semibold text-default-600 mb-2 pl-2">Recipe Title</label>
                      <input
                        type="text"
                        name="recipeName"
                        required
                        placeholder="e.g. Gourmet Chocolate Lava Cake"
                        value={formData.recipeName}
                        onChange={handleChange}
                        className="w-full p-2 bg-default-100 hover:bg-default-200/70 border border-divider rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-default-600 mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-default-100 hover:bg-default-200/70 border border-divider rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                      >
                        <option value="Breakfast" className="bg-content1 text-foreground">Breakfast</option>
                        <option value="Lunch" className="bg-content1 text-foreground">Lunch</option>
                        <option value="Dinner" className="bg-content1 text-foreground">Dinner</option>
                        <option value="Dessert" className="bg-content1 text-foreground">Dessert</option>
                        <option value="Snacks" className="bg-content1 text-foreground">Snacks</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-default-600 mb-2">Difficulty</label>
                      <select
                        name="difficultyLevel"
                        value={formData.difficultyLevel}
                        onChange={handleChange}
                        className="w-full bg-default-100 hover:bg-default-200/70 border border-divider rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                      >
                        <option value="Easy" className="bg-content1 text-foreground">Easy</option>
                        <option value="Medium" className="bg-content1 text-foreground">Medium</option>
                        <option value="Hard" className="bg-content1 text-foreground">Hard</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-default-600 mb-2">Cuisine Type</label>
                      <input
                        type="text"
                        name="cuisineType"
                        required
                        placeholder="e.g. Italian"
                        value={formData.cuisineType}
                        onChange={handleChange}
                        className="w-full p-2 bg-default-100 hover:bg-default-200/70 border border-divider rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-default-600 mb-2">Prep Time (mins)</label>
                      <input
                        type="number"
                        name="prepTime"
                        required
                        placeholder="e.g. 30"
                        value={formData.prepTime}
                        onChange={handleChange}
                        className="w-full p-2 bg-default-100 hover:bg-default-200/70 border border-divider rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-default-600 mb-1.5">Recipe Banner Image</label>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-3 w-full bg-default-100 hover:bg-default-200/70 border border-divider border-dashed rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 text-left"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-divider bg-default-200/60 overflow-hidden">
                          {recipeImage ? (
                            <Image
                              src={recipeImage.preview}
                              width={40}
                              height={40}
                              alt="Recipe Preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <FiUploadCloud className="text-base text-default-500" />
                          )}
                        </div>

                        <div className="overflow-hidden">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {recipeImage ? recipeImage.file.name : "Replace image file"}
                          </p>
                          <p className="text-[10px] text-default-400">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      </button>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </section>

                {/* SECTION 2: Recipe Details */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 pb-1 border-b border-divider/30">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      2
                    </span>
                    <h2 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
                      Recipe Details & Steps
                    </h2>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-default-600 mb-2">Ingredients List</label>
                    <textarea
                      name="ingredients"
                      rows={4}
                      required
                      placeholder="List ingredients line by line (e.g.,&#10;• 2 cups organic flour&#10;• 1 tsp premium vanilla extract)"
                      value={formData.ingredients}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-default-100 hover:bg-default-200/70 border border-divider rounded-xl  text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-default-600 mb-2">Cooking Instructions</label>
                    <textarea
                      name="instructions"
                      rows={5}
                      required
                      placeholder="Describe step-by-step assembly rules clearly..."
                      value={formData.instructions}
                      onChange={handleChange}
                      className="w-full bg-default-100 hover:bg-default-200/70 border border-divider rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 resize-none"
                    />
                  </div>
                </section>

              

                {/* Footer Action Buttons */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    slot="close"
                    disabled={uploading}
                    className="w-full py-3 text-sm font-bold text-background bg-foreground hover:opacity-90 rounded-xl transition shadow-md active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {uploading ? "Uploading Assets..." : "Publish Changes"}
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
          </Modal.Backdrop>
    </Modal>
  );
}