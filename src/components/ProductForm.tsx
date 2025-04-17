import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Upload, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Form validation schema
const productFormSchema = z.object({
  titulo: z.string().min(1, { message: "Título é obrigatório" }),
  tipo: z.string().optional(),
  ingredientes: z.string().optional(),
  fabricante: z.string().optional(),
  local: z.string().optional(),
  selos: z.string().optional(),
  variacao: z.string().optional(),
  exportacao: z.string().optional(),
  macro: z.string().optional(),
  observacoes: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  initialData?: ProductFormValues;
  onSubmit?: (data: ProductFormValues & { images: string[] }) => void;
  onCancel?: () => void;
}

const ProductForm = ({
  initialData,
  onSubmit,
  onCancel,
}: ProductFormProps = {}) => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Initialize form with react-hook-form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData || {
      titulo: "",
      tipo: "",
      ingredientes: "",
      fabricante: "",
      local: "",
      selos: "",
      variacao: "",
      exportacao: "",
      macro: "",
      observacoes: "",
    },
  });

  // Handle form submission
  const handleSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      // In a real application, you would upload images and get URLs back
      // For this scaffold, we'll just use the mock images
      if (onSubmit) {
        onSubmit({ ...data, images });
      }
      setFormSuccess("Produto salvo com sucesso!");
      if (!initialData) {
        form.reset();
        setImages([]);
      }
    } catch (error) {
      setFormError("Erro ao salvar o produto. Tente novamente.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => {
        // In a real app, you would upload the file to a server and get a URL back
        // For this scaffold, we'll create a temporary URL
        return URL.createObjectURL(file);
      });
      setImages([...images, ...newImages]);
    }
  };

  // Remove an image
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Clear the form
  const handleClear = () => {
    form.reset();
    setImages([]);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-background">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-2">
          <X className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold flex-1">
          {initialData ? "Editar Produto" : "Cadastrar Novo Produto"}
        </h1>
      </div>

      {formError && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      {formSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
          <AlertDescription>{formSuccess}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Título */}
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título*</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo */}
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="alimento">Alimento</SelectItem>
                      <SelectItem value="bebida">Bebida</SelectItem>
                      <SelectItem value="higiene">Higiene</SelectItem>
                      <SelectItem value="limpeza">Limpeza</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fabricante */}
            <FormField
              control={form.control}
              name="fabricante"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fabricante</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do fabricante" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Local */}
            <FormField
              control={form.control}
              name="local"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local</FormLabel>
                  <FormControl>
                    <Input placeholder="Local de fabricação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Selos */}
            <FormField
              control={form.control}
              name="selos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selos</FormLabel>
                  <FormControl>
                    <Input placeholder="Selos de qualidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Variação */}
            <FormField
              control={form.control}
              name="variacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variação</FormLabel>
                  <FormControl>
                    <Input placeholder="Variação do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Exportação */}
            <FormField
              control={form.control}
              name="exportacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exportação</FormLabel>
                  <FormControl>
                    <Input placeholder="Informações de exportação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Macro */}
            <FormField
              control={form.control}
              name="macro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Macro</FormLabel>
                  <FormControl>
                    <Input placeholder="Informações macro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          {/* Ingredientes - Multilinha */}
          <FormField
            control={form.control}
            name="ingredientes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredientes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Liste os ingredientes do produto"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Observações - Multilinha */}
          <FormField
            control={form.control}
            name="observacoes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Observações adicionais sobre o produto"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          {/* Image Upload Section */}
          <div className="space-y-4">
            <Label>Imagens do Produto</Label>

            {/* Image Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      src={image}
                      alt={`Produto imagem ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm text-muted-foreground truncate">
                      {index === 0 ? "Imagem Principal" : `Imagem ${index + 1}`}
                    </p>
                  </CardContent>
                </Card>
              ))}

              {/* Upload Button */}
              <Card className="border-dashed border-2 flex items-center justify-center">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <div className="relative">
                    <Input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      multiple
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                      onChange={handleImageUpload}
                    />
                    <div className="flex flex-col items-center justify-center gap-2 py-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-sm font-medium">
                        Clique para adicionar imagens
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG ou JPEG
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Button type="button" variant="outline" onClick={handleClear}>
              Limpar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Salvando..."
                : initialData
                  ? "Atualizar"
                  : "Salvar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
