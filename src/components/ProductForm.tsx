import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, X, Plus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";

// Form validation schema
const productSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  type: z.string().optional(),
  ingredients: z.string().optional(),
  manufacturer: z.string().optional(),
  location: z.string().optional(),
  seals: z.string().optional(),
  variation: z.string().optional(),
  export: z.string().optional(),
  macro: z.string().optional(),
  observations: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: ProductFormValues;
  onSubmit?: (data: ProductFormValues & { images: ImageFile[] }) => void;
  isLoading?: boolean;
}

type ImageFile = {
  id: string;
  file: File;
  preview: string;
  type: "front" | "back" | "additional";
};

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      title: "",
      type: "",
      ingredients: "",
      manufacturer: "",
      location: "",
      seals: "",
      variation: "",
      export: "",
      macro: "",
      observations: "",
    },
  });

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "front" | "back" | "additional",
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check if we already have an image of this type
      const existingImageIndex = images.findIndex((img) => img.type === type);

      const newImage: ImageFile = {
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file),
        type,
      };

      if (existingImageIndex >= 0) {
        // Replace existing image
        const updatedImages = [...images];
        URL.revokeObjectURL(images[existingImageIndex].preview); // Clean up old preview URL
        updatedImages[existingImageIndex] = newImage;
        setImages(updatedImages);
      } else {
        // Add new image
        setImages([...images, newImage]);
      }
    }
  };

  const removeImage = (id: string) => {
    const imageToRemove = images.find((img) => img.id === id);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview); // Clean up preview URL
      setImages(images.filter((img) => img.id !== id));
    }
  };

  const onFormSubmit = (data: ProductFormValues) => {
    try {
      setError(null);
      if (onSubmit) {
        onSubmit({ ...data, images });
      } else {
        // For demonstration purposes
        toast({
          title: "Product Saved",
          description: "Product has been successfully saved.",
        });
        console.log("Form data:", { ...data, images });
      }
    } catch (err) {
      setError("An error occurred while saving the product.");
      console.error(err);
    }
  };

  const handleReset = () => {
    // Clean up image previews
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    reset();
    setError(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {initialData ? "Edit Product" : "Register New Product"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-base font-medium">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                {...register("title")}
                className="mt-1"
                placeholder="Enter product title"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type" className="text-base font-medium">
                  Type
                </Label>
                <Input
                  id="type"
                  {...register("type")}
                  className="mt-1"
                  placeholder="Product type"
                />
              </div>

              <div>
                <Label htmlFor="manufacturer" className="text-base font-medium">
                  Manufacturer
                </Label>
                <Input
                  id="manufacturer"
                  {...register("manufacturer")}
                  className="mt-1"
                  placeholder="Manufacturer name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="ingredients" className="text-base font-medium">
                Ingredients
              </Label>
              <Textarea
                id="ingredients"
                {...register("ingredients")}
                className="mt-1 min-h-[100px]"
                placeholder="List product ingredients"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location" className="text-base font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  {...register("location")}
                  className="mt-1"
                  placeholder="Product location"
                />
              </div>

              <div>
                <Label htmlFor="seals" className="text-base font-medium">
                  Seals
                </Label>
                <Input
                  id="seals"
                  {...register("seals")}
                  className="mt-1"
                  placeholder="Product seals"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="variation" className="text-base font-medium">
                  Variation
                </Label>
                <Input
                  id="variation"
                  {...register("variation")}
                  className="mt-1"
                  placeholder="Product variation"
                />
              </div>

              <div>
                <Label htmlFor="export" className="text-base font-medium">
                  Export
                </Label>
                <Input
                  id="export"
                  {...register("export")}
                  className="mt-1"
                  placeholder="Export information"
                />
              </div>

              <div>
                <Label htmlFor="macro" className="text-base font-medium">
                  Macro
                </Label>
                <Input
                  id="macro"
                  {...register("macro")}
                  className="mt-1"
                  placeholder="Macro information"
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-medium mb-4">Product Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Front Image */}
                <div className="space-y-2">
                  <Label htmlFor="frontImage" className="text-base font-medium">
                    Front Image
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-40 flex flex-col items-center justify-center relative">
                    {images.find((img) => img.type === "front") ? (
                      <div className="relative w-full h-full">
                        <img
                          src={
                            images.find((img) => img.type === "front")?.preview
                          }
                          alt="Front"
                          className="w-full h-full object-contain"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0 bg-white rounded-full p-1"
                          onClick={() =>
                            removeImage(
                              images.find((img) => img.type === "front")?.id ||
                                "",
                            )
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload</p>
                        <input
                          id="frontImage"
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleImageUpload(e, "front")}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Back Image */}
                <div className="space-y-2">
                  <Label htmlFor="backImage" className="text-base font-medium">
                    Back Image
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-40 flex flex-col items-center justify-center relative">
                    {images.find((img) => img.type === "back") ? (
                      <div className="relative w-full h-full">
                        <img
                          src={
                            images.find((img) => img.type === "back")?.preview
                          }
                          alt="Back"
                          className="w-full h-full object-contain"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0 bg-white rounded-full p-1"
                          onClick={() =>
                            removeImage(
                              images.find((img) => img.type === "back")?.id ||
                                "",
                            )
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload</p>
                        <input
                          id="backImage"
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleImageUpload(e, "back")}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Additional Image */}
                <div className="space-y-2">
                  <Label
                    htmlFor="additionalImage"
                    className="text-base font-medium"
                  >
                    Additional Image
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-40 flex flex-col items-center justify-center relative">
                    {images.find((img) => img.type === "additional") ? (
                      <div className="relative w-full h-full">
                        <img
                          src={
                            images.find((img) => img.type === "additional")
                              ?.preview
                          }
                          alt="Additional"
                          className="w-full h-full object-contain"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0 bg-white rounded-full p-1"
                          onClick={() =>
                            removeImage(
                              images.find((img) => img.type === "additional")
                                ?.id || "",
                            )
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload</p>
                        <input
                          id="additionalImage"
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleImageUpload(e, "additional")}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="observations" className="text-base font-medium">
                Observations
              </Label>
              <Textarea
                id="observations"
                {...register("observations")}
                className="mt-1 min-h-[100px]"
                placeholder="Additional observations"
              />
            </div>
          </div>

          <CardFooter className="flex justify-between px-0 pb-0">
            <Button type="button" variant="outline" onClick={handleReset}>
              Clear Form
            </Button>
            <div className="space-x-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Product"
                )}
              </Button>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
