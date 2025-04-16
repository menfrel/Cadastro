import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface ProductDetailProps {
  product?: {
    id: number;
    titulo: string;
    tipo: string;
    ingredientes: string;
    fabricante: string;
    local: string;
    selos: string;
    variacao: string;
    exportacao: string;
    macro: string;
    imagem_front: string;
    imagem_verso: string;
    imagem_adicional: string;
    observacoes: string;
    data_cadastro: string;
  };
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for when no product is provided
  const defaultProduct = {
    id: Number(id) || 1,
    titulo: "Produto Exemplo",
    tipo: "Alimento",
    ingredientes:
      "Água, açúcar, conservantes, corantes artificiais, aromatizantes.",
    fabricante: "Indústria Alimentícia ABC",
    local: "São Paulo, Brasil",
    selos: "Orgânico, Sem Glúten, Vegano",
    variacao: "Tradicional",
    exportacao: "Sim - América Latina",
    macro: "Carboidratos: 25g, Proteínas: 5g, Gorduras: 2g",
    imagem_front:
      "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=800&q=80",
    imagem_verso:
      "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=800&q=80",
    imagem_adicional:
      "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=800&q=80",
    observacoes: "Este é um produto exemplo para demonstração do sistema.",
    data_cadastro: new Date().toISOString(),
  };

  const productData = product || defaultProduct;
  const selosArray = productData.selos.split(",").map((selo) => selo.trim());

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/products/edit/${productData.id}`);
  };

  const handleDelete = () => {
    // In a real application, this would show a confirmation dialog
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      // API call would go here
      navigate("/products");
    }
  };

  return (
    <motion.div
      className="container mx-auto py-8 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold flex-1">Detalhes do Produto</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Imagens do Produto</CardTitle>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full">
                <CarouselContent>
                  {[
                    productData.imagem_front,
                    productData.imagem_verso,
                    productData.imagem_adicional,
                  ]
                    .filter(Boolean)
                    .map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <div className="overflow-hidden rounded-lg">
                            <img
                              src={image}
                              alt={`Imagem ${index + 1} do produto`}
                              className="w-full h-64 object-cover"
                            />
                          </div>
                          <p className="text-center mt-2 text-sm text-muted-foreground">
                            {index === 0
                              ? "Frente"
                              : index === 1
                                ? "Verso"
                                : "Adicional"}
                          </p>
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{productData.titulo}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {selosArray.map((selo, index) => (
                  <Badge key={index} variant="secondary">
                    {selo}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Tipo
                  </h3>
                  <p>{productData.tipo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Fabricante
                  </h3>
                  <p>{productData.fabricante}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Local
                  </h3>
                  <p>{productData.local}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Variação
                  </h3>
                  <p>{productData.variacao}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Exportação
                  </h3>
                  <p>{productData.exportacao}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Macro
                  </h3>
                  <p>{productData.macro}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Ingredientes
                </h3>
                <div className="bg-muted p-3 rounded-md whitespace-pre-line">
                  {productData.ingredientes}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Observações
                </h3>
                <div className="bg-muted p-3 rounded-md whitespace-pre-line">
                  {productData.observacoes}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="text-sm text-muted-foreground">
                Data de Cadastro:{" "}
                {new Date(productData.data_cadastro).toLocaleDateString(
                  "pt-BR",
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
