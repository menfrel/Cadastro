import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Eye, Pencil, Trash2, Search } from "lucide-react";

interface Product {
  id: number;
  titulo: string;
  tipo: string;
  fabricante: string;
  local: string;
  data_cadastro: string;
}

const ProductList = () => {
  // Mock data for demonstration
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      titulo: "Cereal Matinal Integral",
      tipo: "Alimento",
      fabricante: "Nutrifoods",
      local: "São Paulo",
      data_cadastro: "2023-05-15",
    },
    {
      id: 2,
      titulo: "Bebida Láctea Fermentada",
      tipo: "Bebida",
      fabricante: "Lacticínios Puro",
      local: "Minas Gerais",
      data_cadastro: "2023-06-22",
    },
    {
      id: 3,
      titulo: "Biscoito Integral",
      tipo: "Alimento",
      fabricante: "Nutrifoods",
      local: "Rio de Janeiro",
      data_cadastro: "2023-07-10",
    },
    {
      id: 4,
      titulo: "Suco Natural de Laranja",
      tipo: "Bebida",
      fabricante: "Sucos Naturais",
      local: "Bahia",
      data_cadastro: "2023-08-05",
    },
    {
      id: 5,
      titulo: "Barra de Cereal",
      tipo: "Alimento",
      fabricante: "Nutrifoods",
      local: "São Paulo",
      data_cadastro: "2023-09-18",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.fabricante.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (deleteProductId !== null) {
      setProducts(products.filter((product) => product.id !== deleteProductId));
      setDeleteProductId(null);
    }
  };

  return (
    <div className="w-full bg-background p-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Produtos</CardTitle>
            <Button>Novo Produto</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6 relative">
            <Input
              placeholder="Buscar por título ou fabricante"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Fabricante</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell className="font-medium">
                        {product.titulo}
                      </TableCell>
                      <TableCell>{product.tipo}</TableCell>
                      <TableCell>{product.fabricante}</TableCell>
                      <TableCell>{product.local}</TableCell>
                      <TableCell>{product.data_cadastro}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Detalhes do Produto</DialogTitle>
                                <DialogDescription>
                                  Visualizando informações do produto{" "}
                                  {product.titulo}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">ID:</p>
                                    <p>{product.id}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">
                                      Título:
                                    </p>
                                    <p>{product.titulo}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Tipo:</p>
                                    <p>{product.tipo}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">
                                      Fabricante:
                                    </p>
                                    <p>{product.fabricante}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">
                                      Local:
                                    </p>
                                    <p>{product.local}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">
                                      Data de Cadastro:
                                    </p>
                                    <p>{product.data_cadastro}</p>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Fechar</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteProductId(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirmar exclusão
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir o produto "
                                  {product.titulo}"? Esta ação não pode ser
                                  desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDeleteConfirm}
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      Nenhum produto encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={currentPage === page}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductList;
